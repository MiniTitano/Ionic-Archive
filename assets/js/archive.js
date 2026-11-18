(function () {
  'use strict';
  const D = window.IA, U = window.IAUI, A = window.Art;
  const { $, $$ } = U;
  const P = D.products;
  const pad = (n) => String(n).padStart(2, '0');
  const Y0 = Math.min(1999, ...P.map((p) => p.year)), Y1 = Math.max(2012, ...P.map((p) => p.year)); // the timeline stretches to the newest piece
  const LAST = `2009–${Y1}`, FIRST = `1999–2002`.replace('1999', String(Y0));

  /* ---------- filters (type lives in the tabs, exact year in the timeline) ---------- */
  const yearB = (y) => (y <= 2002 ? FIRST : y <= 2005 ? '2003–2005' : y <= 2008 ? '2006–2008' : LAST);
  const resB = (p) => (p.type === 'accessories' ? null : p.mp < 2 ? '< 2 MP (video)' : p.mp < 4 ? '2–4 MP' : p.mp < 6 ? '4–6 MP' : '6 MP and up');
  const GROUPS = [
    { key: 'brand', label: 'Brand', get: (p) => p.brand },
    { key: 'year', label: 'Era', get: (p) => yearB(p.year), opts: [FIRST, '2003–2005', '2006–2008', LAST] },
    { key: 'format', label: 'Format / media', get: (p) => p.format },
    { key: 'res', label: 'Sensor / resolution', get: resB, opts: ['< 2 MP (video)', '2–4 MP', '4–6 MP', '6 MP and up'] },
    { key: 'grade', label: 'Condition', get: (p) => p.grade, opts: ['A+', 'A', 'B', 'C'], name: (v) => `${v} · ${D.grades[v][1]}` }
  ];
  const TYPES = [['', 'All'], ['camcorders', 'Camcorders'], ['compacts', 'Digital compacts'], ['accessories', 'Tapes & accessories']].filter(([t]) => !t || P.some((p) => p.type === t));
  const GRADE_RANK = { 'A+': 0, A: 1, B: 2, C: 3 };
  const maxPrice = Math.ceil(Math.max(...P.map((p) => p.price)) / 50) * 50;

  const qs = new URLSearchParams(location.search);
  const state = {
    sel: {}, type: qs.get('type') || '', yr: +qs.get('yr') || 0, q: qs.get('q') || '',
    price: maxPrice, sold: true, sort: 'price-desc', view: U.store.get('ia-view', 'grid')
  };
  GROUPS.forEach((g) => { state.sel[g.key] = new Set(qs.getAll(g.key)); });

  /* ---------- header stats ---------- */
  const c = (s) => P.filter((p) => p.status === s).length;
  const latest = P.slice().sort((a, b) => b.added.localeCompare(a.added))[0];
  const when = new Date(latest.added).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  $('#stats').innerHTML = [
    ['Available', c('available'), 'ok'], ['Reserved', c('reserved'), 'res'], ['In the vault', c('sold'), 'sold'], ['Catalogued', P.length, '']
  ].map(([l, n, k]) => `<div class="st st--${k || 'all'}"><dt class="label">${k ? `<i class="lg lg--${k}"></i>` : ''}${l}</dt><dd>${pad(n)}</dd></div>`).join('') +
    `<div class="st st--last"><dt class="label">Last entry</dt><dd><a href="product.html?id=${latest.id}"><span class="mono">${latest.id}</span> ${latest.name}</a><span class="mono">${when}</span></dd></div>`;

  /* ---------- filter form ---------- */
  const form = $('#fform');
  form.innerHTML = `<div class="fgroup"><label class="switch"><span>Show the vault <small>(sold pieces)</small></span><input type="checkbox" id="fsold" checked></label></div>` +
    GROUPS.map((g) => {
      const vals = g.opts || [...new Set(P.map(g.get).filter(Boolean))].sort();
      return `<fieldset class="fgroup"><legend>${g.label}</legend>${vals.map((v) => {
        const id = `f-${g.key}-${v.replace(/\W+/g, '')}`;
        return `<label class="opt" for="${id}"><input class="chk" type="checkbox" id="${id}" data-g="${g.key}" value="${v}"${state.sel[g.key].has(v) ? ' checked' : ''}><span>${g.name ? g.name(v) : v}</span><span class="n" data-n="${g.key}|${v}"></span></label>`;
      }).join('')}</fieldset>`;
    }).join('') +
    `<fieldset class="fgroup"><legend>Max price</legend><input class="range" type="range" id="fprice" min="0" max="${maxPrice}" step="10" value="${maxPrice}" aria-label="Max price"><div class="range-val"><span>€0</span><span id="fpriceV">${U.eur(maxPrice)}</span></div></fieldset>
<div class="fgroup" style="border:0"><button class="link" type="button" id="freset">Clear all filters</button></div>`;

  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');
  // skip: which dimension to ignore (used for faceted counts)
  function match(p, skip) {
    if (skip !== 'type' && state.type && p.type !== state.type) return false;
    if (skip !== 'yr' && state.yr && p.year !== state.yr) return false;
    if (state.q) { const q = norm(state.q); if (!norm(`${p.id} ${p.name} ${p.brand} ${p.format}`).includes(q)) return false; }
    if (p.status !== 'sold' && p.price > state.price) return false;
    return GROUPS.every((g) => g.key === skip || !state.sel[g.key].size || state.sel[g.key].has(g.get(p)));
  }
  const SORTS = {
    recent: (a, b) => b.added.localeCompare(a.added),
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'year-asc': (a, b) => a.year - b.year,
    'year-desc': (a, b) => b.year - a.year,
    grade: (a, b) => GRADE_RANK[a.grade] - GRADE_RANK[b.grade] || b.added.localeCompare(a.added)
  };
  const live = (p) => p.status !== 'sold';
  const res = (n) => `${n} ${n === 1 ? 'piece' : 'pieces'}`;

  /* ---------- index (ledger) view ---------- */
  const shortSensor = (p) => (p.sensor === '—' ? '—' : p.sensor.replace(/^.*·\s*/, ''));
  function row(p) {
    const sold = p.status === 'sold';
    return `<a class="irow${sold ? ' is-sold' : ''}" href="product.html?id=${p.id}">
<span class="irow__th">${U.view(p, 'a')}</span>
<span class="irow__name"><b>${p.name}</b><small>${U.TYPE[p.type]}</small></span>
<span class="irow__yr mono">${p.year}</span>
<span class="irow__fmt">${p.format}</span>
<span class="irow__sen mono">${shortSensor(p)}</span>
<span class="irow__gr"><b class="gpill">${p.grade}</b></span>
<span class="irow__st">${U.statusTag(p)}</span>
<span class="irow__pr">${sold ? `<s class="mono" style="text-decoration:none;color:var(--rec)">Sold ${U.eur(p.price)}</s>` : U.eur(p.price)}</span>
<span class="irow__go" aria-hidden="true">→</span></a>`;
  }
  const head = `<div class="irow irow--head" aria-hidden="true"><span></span><span>Model</span><span>Year</span><span class="irow__fmt">Format</span><span class="irow__sen">Sensor</span><span>Grade</span><span>Status</span><span class="irow__pr">Price</span><span class="irow__go"></span></div>`;
  const block = (list) => state.view === 'index'
    ? `<div class="ledger">${head}${list.map(row).join('')}</div>`
    : `<div class="grid">${list.map(U.card).join('')}</div>`;

  /* ---------- render ---------- */
  function render() {
    const all = P.filter((p) => match(p)).sort(SORTS[state.sort]);
    const shop = all.filter(live), vault = all.filter((p) => !live(p));
    $('#results').innerHTML = shop.length ? block(shop)
      : `<div class="noresult"><h2 class="h3">Nothing on the shelf matches.</h2><p>The archive changes every week. Get an alert when something similar comes in.</p><a class="btn btn--ink" href="index.html#nl-h">Turn on alerts</a></div>`;
    $('#vault').innerHTML = state.sold && vault.length
      ? `<div class="vault"><div class="vault__head"><span class="label"><i class="lg lg--sold"></i>The vault</span><h2 class="h3">Sold, not forgotten.</h2><p>${res(vault.length)} that found a new home. Their records stay here as a reference, with every test and every note.</p></div>${block(vault)}</div>` : '';
    $('#count').innerHTML = `<b>${pad(shop.length)}</b> on the shelf${state.sold && vault.length ? ` · ${pad(vault.length)} in the vault` : ''}`;
    $('#fapply').textContent = `Show ${res(all.length)}`;

    // tabs with counts
    $('#ttabs').innerHTML = TYPES.map(([k, l]) => {
      const n = P.filter((p) => (!k || p.type === k) && match(p, 'type') && live(p)).length;
      return `<button type="button" role="tab" data-type="${k}" aria-selected="${state.type === k}">${l}<span class="mono">${pad(n)}</span></button>`;
    }).join('');

    // timeline: every piece is a dot above its year; dimmed when the other filters exclude it
    let tl = '';
    for (let y = Y0; y <= Y1; y++) {
      const ps = P.filter((p) => p.year === y).sort((a, b) => live(b) - live(a));
      const on = state.yr === y;
      tl += `<button type="button" class="ty${on ? ' is-on' : ''}${ps.length ? '' : ' is-empty'}" data-yr="${y}" aria-pressed="${on}" aria-label="${y}: ${ps.length} pieces"${ps.length ? '' : ' disabled'}>
<span class="ty__dots">${ps.map((p) => `<i class="dot dot--${p.status === 'available' ? 'ok' : p.status === 'reserved' ? 'res' : 'sold'}${match(p, 'yr') ? '' : ' is-off'}" title="${p.id} · ${p.name}"></i>`).join('')}</span>
<span class="ty__y mono">${(y === Y0 || y === Y1) ? y : `'${String(y).slice(2)}`}</span></button>`;
    }
    $('#tline').innerHTML = tl;

    // faceted counts in the sidebar
    $$('[data-n]').forEach((el) => {
      const [g, v] = el.dataset.n.split('|');
      const grp = GROUPS.find((x) => x.key === g);
      const k = P.filter((p) => match(p, g) && grp.get(p) === v).length;
      el.textContent = k;
      const inp = el.parentElement.querySelector('input');
      inp.disabled = k === 0 && !inp.checked;
      el.parentElement.classList.toggle('is-zero', k === 0 && !inp.checked);
    });

    // active chips
    const active = [];
    if (state.yr) active.push(['yr', '', `Year ${state.yr}`]);
    if (state.q) active.push(['q', '', `“${state.q}”`]);
    GROUPS.forEach((g) => state.sel[g.key].forEach((v) => active.push([g.key, v, g.name ? g.name(v) : v])));
    if (state.price < maxPrice) active.push(['price', '', `≤ ${U.eur(state.price)}`]);
    $('#chips').innerHTML = active.map(([g, v, l]) => `<button class="chip-x" type="button" data-chip="${g}|${v}" aria-label="Remove filter ${l}">${l} ✕</button>`).join('');
    $('#fcount').textContent = active.length ? `(${active.length})` : '';

    // view toggle
    $$('[data-view]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === state.view)));

    // readable URL
    const q = new URLSearchParams();
    if (state.type) q.set('type', state.type);
    if (state.yr) q.set('yr', state.yr);
    if (state.q) q.set('q', state.q);
    GROUPS.forEach((g) => state.sel[g.key].forEach((v) => q.append(g.key, v)));
    if (state.sort !== 'price-desc') q.set('sort', state.sort);
    history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : ''));
  }

  /* ---------- events ---------- */
  form.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.g) { t.checked ? state.sel[t.dataset.g].add(t.value) : state.sel[t.dataset.g].delete(t.value); }
    if (t.id === 'fsold') state.sold = t.checked;
    render();
  });
  $('#fprice').addEventListener('input', (e) => { state.price = +e.target.value; $('#fpriceV').textContent = U.eur(state.price); render(); });
  function clearAll() {
    GROUPS.forEach((g) => state.sel[g.key].clear()); state.price = maxPrice; state.sold = true; state.yr = 0; state.q = ''; state.type = '';
    $$('input[data-g]', form).forEach((i) => { i.checked = false; });
    $('#fprice').value = maxPrice; $('#fpriceV').textContent = U.eur(maxPrice); $('#fsold').checked = true; $('#q').value = '';
    render();
  }
  $('#freset').addEventListener('click', clearAll);
  $('#chips').addEventListener('click', (e) => {
    const b = e.target.closest('[data-chip]'); if (!b) return;
    const [g, v] = b.dataset.chip.split('|');
    if (g === 'price') { state.price = maxPrice; $('#fprice').value = maxPrice; $('#fpriceV').textContent = U.eur(maxPrice); }
    else if (g === 'yr') state.yr = 0;
    else if (g === 'q') { state.q = ''; $('#q').value = ''; }
    else { state.sel[g].delete(v); const i = $(`input[data-g="${g}"][value="${v}"]`, form); if (i) i.checked = false; }
    render();
  });
  $('#ttabs').addEventListener('click', (e) => { const b = e.target.closest('[data-type]'); if (!b) return; state.type = b.dataset.type; render(); });
  $('#tline').addEventListener('click', (e) => { const b = e.target.closest('[data-yr]'); if (!b) return; const y = +b.dataset.yr; state.yr = state.yr === y ? 0 : y; render(); });
  const qIn = $('#q'); qIn.value = state.q;
  let qt; qIn.addEventListener('input', () => { clearTimeout(qt); qt = setTimeout(() => { state.q = qIn.value.trim(); render(); }, 120); });
  $$('[data-view]').forEach((b) => b.addEventListener('click', () => { state.view = b.dataset.view; U.store.set('ia-view', state.view); render(); }));
  const sort = $('#sort');
  if (qs.get('sort') && SORTS[qs.get('sort')]) { state.sort = qs.get('sort'); sort.value = state.sort; }
  sort.addEventListener('change', () => { state.sort = sort.value; render(); });

  /* mobile filter drawer */
  const panel = $('#filters'), tog = $('#ftoggle');
  const setOpen = (o) => { panel.classList.toggle('open', o); tog.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; if (o) $('#fclose').focus(); else tog.focus(); };
  tog.addEventListener('click', () => setOpen(true));
  $('#fclose').addEventListener('click', () => setOpen(false));
  $('#fapply').addEventListener('click', () => { setOpen(false); window.scrollTo({ top: $('.atool').offsetTop - 70, behavior: U.RM ? 'auto' : 'smooth' }); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('open')) setOpen(false); });

  render();
})();
