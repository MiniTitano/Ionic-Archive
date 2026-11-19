(function () {
  'use strict';
  const D = window.IA, A = window.Art, U = window.IAUI;
  const { $ } = U;
  const F = D.figures, N = F.length;
  const tierOf = (id) => D.tiers.find((t) => t.id === id);
  const chip = (id) => `<span class="chip chip--${id}">${tierOf(id).label}</span>`;
  const secret = (f) => f.tier === 'secret';
  const pad = (n) => String(n).padStart(2, '0');
  const look = (f) => `data-bg="#111214" data-accent="${f.rim}"`;
  const opts = (f) => ({ bg: f.accent, accent: f.rim });

  /* hero: a big turntable that cycles through the figures on its own */
  const shown = F.filter((f) => !secret(f));
  const hero = $('#heroFig');
  hero.innerHTML = `<div class="mfstage__disc"></div>
<div class="mfstage__fig" id="heroView" data-fig3d="${shown[0].model}" ${look(shown[0])} data-spin="0.5" tabindex="0" aria-label="3D figure, drag to spin"></div>
<div class="mfstage__tag"><span class="mono" id="heroNum">${shown[0].num} / ${pad(N)}</span><b id="heroName">${shown[0].name}</b><span class="mono mfstage__fin">● Random colour</span></div>
<span class="mfstage__hint mono">↔ Drag to spin</span>`;
  let hi = 0;
  const heroView = $('#heroView');
  const paint = (f) => { hero.style.setProperty('--acc', f.accent); $('#heroNum').textContent = `${f.num} / ${pad(N)}`; $('#heroName').textContent = f.name; };
  paint(shown[0]);
  if (!U.RM) setInterval(() => {
    if (heroView.classList.contains('is-drag') || document.hidden) return;
    hi = (hi + 1) % shown.length; const f = shown[hi];
    window.Fig3D.set(heroView, f.model, 'white', opts(f)); paint(f);
  }, 6000);

  /* the series: every figure in 3D on its own colour */
  $('#figs').innerHTML = F.map((f) => {
    const S = secret(f);
    // one shared card colour for the whole series
    return `<article class="fig3 tier-${f.tier}${S ? ' is-secret' : ''} is-darkbg rv" style="--acc:#111214">
<div class="fig3__top"><span class="fig3__num mono">${f.num} / ${pad(N)}</span>${chip(f.tier)}</div>
<div class="fig3__view" data-fig3d="${f.model}" ${look(f)}${S ? ' data-mode="sil"' : ''} data-start="${(Math.random() - 0.5).toFixed(2)}" tabindex="0" aria-label="${S ? 'IONIC, the secret figure' : f.name + ', 3D, drag to spin'}"></div>
<div class="fig3__body"><h3${S ? ' class="ionic-glow"' : ''}>${f.name}</h3><p class="fig3__role mono">${S ? 'Classified' : f.role}</p><span class="fig3__fin mono"><b class="fin-c">Colour: random</b><b class="fin-g">Glow chase · 1 in ${Math.round(100 / D.glowOdds)}</b></span><p class="fig3__lore">${S ? 'Nobody has found this one in a box yet. You\'ll know it when you see it.' : f.lore}</p></div>
</article>`;
  }).join('');

  /* lights off: see every figure's glow-in-the-dark chase edition */
  const lb = $('#lightsBtn');
  lb.addEventListener('click', () => {
    const on = lb.getAttribute('aria-pressed') !== 'true';
    lb.setAttribute('aria-pressed', String(on));
    document.body.classList.toggle('lights-off', on);
    window.Fig3D.lights(on);
  });

  /* unboxing game */
  const stage = $('#stage'), boxBtn = $('#boxBtn'), result = $('#result'), log = $('#log');
  boxBtn.innerHTML = A.box();
  let busy = false, opened = 0;
  function pick() {
    let r = Math.random() * 100;
    for (const t of D.tiers) {
      if (r < t.odds) { const pool = F.filter((f) => f.tier === t.id); return pool[Math.floor(Math.random() * pool.length)]; }
      r -= t.odds;
    }
    return F[0];
  }
  result.innerHTML = `<div class="rv-fig" id="revealView" data-fig3d="${F[0].model}" ${look(F[0])} data-spin="0.9"></div><div id="revealText"></div>`;
  const revealView = $('#revealView');
  function open() {
    if (busy) return;
    if (stage.classList.contains('is-revealed')) { reset(); setTimeout(open, U.RM ? 0 : 320); return; }
    busy = true;
    const f = pick(), glow = Math.random() * 100 < D.glowOdds;
    const d1 = U.RM ? 0 : 650, d2 = U.RM ? 0 : 1150;
    stage.classList.add('is-shaking');
    setTimeout(() => { stage.classList.remove('is-shaking'); stage.classList.add('is-open'); }, d1);
    setTimeout(() => {
      window.Fig3D.set(revealView, f.model, 'white', Object.assign(opts(f), { glow }));
      stage.classList.toggle('is-glow', glow);
      stage.style.setProperty('--acc', f.rim);
      $('#revealText').innerHTML = `<div class="rv-chips">${chip(f.tier)}${glow ? '<span class="chip chip--glow">Glow chase</span>' : ''}</div><h3>${f.name}</h3><p class="label" style="color:var(--night-muted)">${f.num} / ${pad(N)}</p><p class="fine" style="color:var(--night-muted)">Yours comes in a random colour.</p>
<button class="btn btn--line" type="button" id="again" style="margin-top:6px;min-height:42px">Open another box</button>`;
      stage.classList.add('is-revealed');
      $('#openBtn').innerHTML = 'Open another box <span class="arr">→</span>';
      opened++;
      log.insertAdjacentHTML('afterbegin', `<li><span>Bag ${String(opened).padStart(3, '0')} · ${f.num} ${f.name}${glow ? ' · GLOW' : ''}</span><span>${tierOf(f.tier).label}</span></li>`);
      while (log.children.length > 4) log.lastElementChild.remove();
      $('#again').addEventListener('click', open);
      busy = false;
    }, d2);
  }
  function reset() { stage.classList.remove('is-open', 'is-revealed', 'is-shaking'); }
  boxBtn.addEventListener('click', open);
  $('#openBtn').addEventListener('click', open);

  /* my collection */
  const KEY = 'ia-collection-s01';
  let have = new Set(U.store.get(KEY, []));
  const cl = $('#checklist');
  cl.innerHTML = F.map((f) => `<label><input class="chk" type="checkbox" value="${f.num}"${have.has(f.num) ? ' checked' : ''}><span class="mono">${f.num}</span><span class="nm">${secret(f) ? `<b class="ionic-glow">${f.name}</b>` : f.name}</span>${chip(f.tier)}</label>`).join('');
  function prog() {
    const n = have.size;
    $('#pNum').textContent = `${n}/${N}`;
    $('#pBar').style.width = `${(n / N) * 100}%`;
  }
  cl.addEventListener('change', (e) => {
    const v = e.target.value; e.target.checked ? have.add(v) : have.delete(v);
    U.store.set(KEY, [...have]); prog();
    if (have.size === N) U.toast('Series 01 complete. The archive noticed.');
  });
  prog();

  if (window.Fig3D) window.Fig3D.scan();
  U.observe();
})();
