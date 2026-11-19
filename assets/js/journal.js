/* =========================================================
   IONIC ARCHIVE — Journal: a table of loose prints, a scroll-driven
   film strip, a contact sheet and a lightbox.
   ========================================================= */
(function () {
  'use strict';
  const D = window.IA, U = window.IAUI;
  const $ = (s, r) => (r || document).querySelector(s);
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = (n) => String(n).padStart(2, '0');
  const J = 'assets/img/journal/';

  /* ---------- photos shot ON the cameras ---------- */
  // tags drive the roll filters; stamp = the camera's own date imprint when the photo has one
  const ON = [
    { f: 'lighthouse', cam: 'Sony Cyber-shot DSC-P52', place: 'Capri', tags: ['sea', 'day'], stamp: '17 6 2023' },
    { f: 'tram-dusk', cam: 'Sony Cyber-shot DSC-M2', place: 'Budapest', tags: ['city', 'dusk'] },
    { f: 'pantheon-night', cam: 'Sony Cyber-shot DSC-M2', place: 'Rome', tags: ['city', 'night'] },
    { f: 'snow-track', cam: 'Sony Cyber-shot DSC-M2', place: 'Apennines', tags: ['road', 'winter'] },
    { f: 'attic-chair', cam: 'Sony Cyber-shot DSC-P93', place: 'Empty house', tags: ['ruins'], stamp: '24 4 2022' },
    { f: 'sunset-4x4', cam: 'Contax i4R', place: 'Apennines', tags: ['road', 'dusk'], stamp: '10.01.2004' },
    { f: 'hedgehog', cam: 'Sony Cyber-shot DSC-P32', place: 'Home', tags: ['creatures', 'night'], stamp: '19 5 2022' },
    { f: 'bridge-night', cam: 'Sony Cyber-shot DSC-M2', place: 'Budapest', tags: ['city', 'night'] },
    { f: 'house-hill', cam: 'Sony Cyber-shot DSC-F88', place: 'Countryside', tags: ['road', 'dusk'] },
    { f: 'poppy-beetle', cam: 'Sony Cyber-shot DSC-T2', place: 'Field', tags: ['creatures', 'day'] },
    { f: 'empty-house', cam: 'Sony Cyber-shot DSC-P93', place: 'High plain', tags: ['ruins', 'winter'], stamp: '21 12 2024' },
    { f: 'facade-night', cam: 'Sony Cyber-shot DSC-M2', place: 'Rome', tags: ['city', 'night'] },
    { f: 'fruit-stall', cam: 'Sony Cyber-shot DSC-M2', place: 'Market', tags: ['city', 'day'] },
    { f: 'dusk-4x4', cam: 'Sony Cyber-shot DSC-M2', place: 'Ridge', tags: ['road', 'dusk'] },
    { f: 'tall-grass', cam: 'Sony Cyber-shot DSC-T2', place: 'Woods', tags: ['day'] },
    { f: 'bee', cam: 'Sony Cyber-shot DSC-T2', place: 'Meadow', tags: ['creatures', 'day'] },
    { f: 'pizza-box', cam: 'Contax i4R', place: 'Kitchen', tags: ['day'] }
  ].map((p, i) => Object.assign(p, { src: `${J}${p.f}.jpg`, sm: `${J}${p.f}-720.jpg`, no: i + 1, kind: 'on', t: p.cam ? `Shot on the ${p.cam}` : p.place }));
  // cam = the camera that took the photo: fill in the model and the caption reads "Shot on the …"

  /* ---------- photos taken OF the cameras, for the archive ---------- */
  const OF = D.products.filter((p) => p.photos).flatMap((p) => p.photos.list.slice(0, 3).map(([f, l]) => ({
    src: `${p.photos.dir}/${f}.jpg`, sm: `${p.photos.dir}/${f}.jpg`, t: `${p.name} · ${l}`, place: p.id, href: `product.html?id=${p.id}`, kind: 'of', sold: p.status === 'sold'
  })));
  ['xm2-rooftop', 'xm2-garden', 'selfie-street', 'flash-wall', 'dvcam-lens'].forEach((m) => {
    const big = m === 'flash-wall' ? '2000' : '1200', sm = m === 'flash-wall' ? '1000' : '720';
    OF.push({ src: `assets/img/manifesto/${m}-${big}.jpg`, sm: `assets/img/manifesto/${m}-${sm}.jpg`, t: { 'xm2-rooftop': 'XM2 on the roof', 'xm2-garden': 'XM2 in the garden', 'selfie-street': 'Street selfie', 'flash-wall': 'Flash against the wall', 'dvcam-lens': 'DVCAM lens' }[m], place: 'Manifesto', kind: 'of' });
  });
  OF.forEach((p, i) => { p.no = i + 1; });

  $('#jrCount').textContent = ON.length;

  /* =========================================================
     LIGHTBOX
     ========================================================= */
  const lb = $('#jrLb'), lbImg = $('#jrLbImg'), lbCap = $('#jrLbCap');
  let lbSet = ON, lbI = 0, lastFocus = null;
  function cap(p, set) {
    const n = `${pad(set.indexOf(p) + 1)} / ${pad(set.length)}`;
    return `<span class="mono">${p.kind === 'on' ? 'ROLL 01' : 'ARCHIVE'} · ${n}</span><b>${p.t}</b><span class="mono">${p.place}${p.stamp ? ` · <i class="jr-dstamp">${p.stamp}</i>` : ''}</span>${p.href ? `<a class="mono" href="${p.href}">Open the record →</a>` : ''}`;
  }
  function show(i) {
    lbI = (i + lbSet.length) % lbSet.length; const p = lbSet[lbI];
    lbImg.classList.remove('in'); lbImg.src = p.src; lbImg.alt = p.t; lbCap.innerHTML = cap(p, lbSet);
    lbImg.onload = () => lbImg.classList.add('in');
  }
  function open(set, i) {
    lbSet = set; lastFocus = document.activeElement; lb.hidden = false; document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => lb.classList.add('on')); show(i); $('[data-lb="close"]', lb).focus();
  }
  function close() { lb.classList.remove('on'); document.body.style.overflow = ''; setTimeout(() => { lb.hidden = true; }, 250); if (lastFocus) lastFocus.focus(); }
  lb.addEventListener('click', (e) => { const a = e.target.closest('[data-lb]'); if (a) { const k = a.dataset.lb; if (k === 'close') close(); if (k === 'prev') show(lbI - 1); if (k === 'next') show(lbI + 1); } else if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => { if (lb.hidden) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') show(lbI + 1); if (e.key === 'ArrowLeft') show(lbI - 1); });
  let tx = null;
  lb.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => { if (tx === null) return; const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) show(lbI + (d < 0 ? 1 : -1)); tx = null; });

  /* =========================================================
     01 · THE TABLE — loose prints, drag to move, tap to open
     ========================================================= */
  const pile = $('#jrPile');
  let z = 10;
  const PILE = ON; // every photo of the roll goes on the table
  pile.innerHTML = PILE.map((p, i) => `<figure class="jr-print" data-i="${i}" tabindex="0" role="button" aria-label="${p.t}, open">
    <img src="${p.sm}" alt="" draggable="false" loading="${i < 5 ? 'eager' : 'lazy'}">
    <figcaption>${p.stamp ? `<i class="jr-dstamp">${p.stamp}</i>` : ''}<span>${p.cam ? p.cam.replace('Sony Cyber-shot ', '') : p.place}</span></figcaption></figure>`).join('');
  const prints = [...pile.children];
  // wide screens: the table fills the whole section, so spread the prints over all of it,
  // including the space under the title, and only keep them off the title and buttons
  function scatterWide(W, H) {
    const pr = pile.getBoundingClientRect();
    // measure the text and buttons themselves, not their full-width blocks
    const rng = document.createRange();
    const head = ['.jr-kick', '.jr-h'].map((s) => document.querySelector(s)).filter(Boolean).map((e) => { rng.selectNodeContents(e); return rng.getBoundingClientRect(); })
      .concat([...document.querySelectorAll('.jr-actions > *')].map((e) => e.getBoundingClientRect()));
    const T = { l: Math.min(...head.map((r) => r.left)) - pr.left - 16, t: Math.min(...head.map((r) => r.top)) - pr.top - 16,
      r: Math.max(...head.map((r) => r.right)) - pr.left + 16, b: Math.max(...head.map((r) => r.bottom)) - pr.top + 16 };
    const n = prints.length, w = Math.min(380, W * (n > 12 ? 0.235 : 0.25)), h = w * 0.95;
    const cols = Math.max(3, Math.round(Math.sqrt(n * W / H) * 1.25)), rows = Math.max(2, Math.ceil(n * 1.6 / cols));
    const cw = (W - w) / (cols - 1), ch = (H - h - 40) / (rows - 1);
    const hits = (x, y) => x < T.r && x + w > T.l && y < T.b && y + h > T.t;
    let cells = [];
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) cells.push([c * cw, 40 + r * ch]);
    cells = cells.filter(([x, y]) => !hits(x, y)).sort(() => Math.random() - 0.5);
    return prints.map((el, i) => {
      let [x, y] = cells[i % cells.length], tries = 0, nx, ny;
      do { nx = x + (Math.random() - 0.5) * cw * 0.6; ny = y + (Math.random() - 0.5) * ch * 0.6; tries++; }
      while (hits(nx, ny) && tries < 12);
      if (hits(nx, ny)) { nx = x; ny = y; }
      return [Math.max(-w * 0.05, Math.min(W - w * 0.95, nx)), Math.max(30, Math.min(H - h, ny)), w];
    });
  }
  function throwPrints(animate) {
    const W = pile.clientWidth, H = pile.clientHeight, small = W < 700, wide = innerWidth >= 1100;
    if (!small) {
      scatterWide(W, H).forEach(([x, y, w], i) => {
        const el = prints[i], rot = (Math.random() - 0.5) * 34;
        el.style.width = `${w}px`;
        el.dataset.x = x; el.dataset.y = y; el.dataset.r = rot;
        el.style.transition = animate && !RM ? `transform .9s cubic-bezier(.2,.8,.2,1) ${i * 45}ms` : 'none';
        el.style.transform = `translate(${x}px,${y}px) rotate(${rot}deg)`;
        el.style.zIndex = i + 1;
      });
      z = prints.length + 1;
      return;
    }
    const CX = wide ? W * 0.7 : W / 2, CY = wide ? H * 0.52 : H / 2;
    prints.forEach((el, i) => {
      const w = small ? W * 0.52 : Math.min(340, W * 0.22);
      el.style.width = `${w}px`;
      // a loose fan, heavier towards the middle, never fully off the table
      const a = (i / prints.length) * Math.PI * 2 + Math.random() * 0.6, r = 0.18 + Math.random() * 0.32;
      const x = Math.max(wide ? W * 0.5 : -w * 0.2, Math.min(W - w * (wide ? 1.02 : 0.8), CX - w / 2 + Math.cos(a) * W * r * (small ? 0.55 : wide ? 0.42 : 0.85)));
      const y = Math.max(wide ? 70 : 0, Math.min(H - w * 0.95, CY - w * 0.42 + Math.sin(a) * H * r * (wide ? 0.95 : 0.7)));
      const rot = (Math.random() - 0.5) * 34;
      el.dataset.x = x; el.dataset.y = y; el.dataset.r = rot;
      el.style.transition = animate && !RM ? `transform .9s cubic-bezier(.2,.8,.2,1) ${i * 45}ms` : 'none';
      el.style.transform = `translate(${x}px,${y}px) rotate(${rot}deg)`;
      el.style.zIndex = i + 1;
    });
    z = prints.length + 1;
  }
  // start stacked in the middle, then throw
  prints.forEach((el) => { el.style.transform = `translate(${pile.clientWidth / 2 - 120}px,${pile.clientHeight / 2 - 100}px) rotate(0deg) scale(.9)`; });
  requestAnimationFrame(() => requestAnimationFrame(() => throwPrints(true)));
  addEventListener('resize', () => throwPrints(false));
  $('#jrShuffle').addEventListener('click', () => throwPrints(true));

  prints.forEach((el) => {
    let sx, sy, ox, oy, moved = false, id = null;
    el.addEventListener('pointerdown', (e) => {
      id = e.pointerId; el.setPointerCapture(id); moved = false;
      sx = e.clientX; sy = e.clientY; ox = +el.dataset.x; oy = +el.dataset.y;
      el.style.zIndex = ++z; el.style.transition = 'box-shadow .2s'; el.classList.add('is-up');
    });
    el.addEventListener('pointermove', (e) => {
      if (id !== e.pointerId) return;
      const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
      const r = +el.dataset.r + dx * 0.04;
      el.style.transform = `translate(${ox + dx}px,${oy + dy}px) rotate(${r}deg) scale(1.04)`;
      el.dataset.nx = ox + dx; el.dataset.ny = oy + dy; el.dataset.nr = r;
    });
    const up = (e) => {
      if (id !== e.pointerId) return; id = null; el.classList.remove('is-up');
      if (moved) { el.dataset.x = el.dataset.nx; el.dataset.y = el.dataset.ny; el.dataset.r = el.dataset.nr; el.style.transition = 'transform .25s ease'; el.style.transform = `translate(${el.dataset.x}px,${el.dataset.y}px) rotate(${el.dataset.r}deg)`; }
      else open(ON, ON.indexOf(PILE[+el.dataset.i]));
    };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(ON, ON.indexOf(PILE[+el.dataset.i])); } });
  });

  // pull a random print: it lifts to the centre, then opens
  $('#jrPull').addEventListener('click', () => {
    const el = prints[Math.floor(Math.random() * prints.length)];
    const W = pile.clientWidth, H = pile.clientHeight, w = el.offsetWidth, wide = innerWidth >= 1100;
    el.style.zIndex = ++z; el.style.transition = RM ? 'none' : 'transform .6s cubic-bezier(.2,.8,.2,1)';
    el.dataset.x = (wide ? W * 0.66 : W / 2) - w / 2; el.dataset.y = H / 2 - w * 0.45; el.dataset.r = 0;
    el.style.transform = `translate(${el.dataset.x}px,${el.dataset.y}px) rotate(0deg) scale(1.12)`;
    setTimeout(() => open(ON, ON.indexOf(PILE[+el.dataset.i])), RM ? 0 : 650);
  });

  /* =========================================================
     02 · THE ROLL — vertical scroll moves the strip sideways
     ========================================================= */
  const roll = $('#jrRoll'), track = $('#jrTrack'), bar = $('#jrBar'), frameLbl = $('#jrFrame'), chips = $('#jrChips');
  const FILTERS = [['all', 'All'], ['night', 'Night'], ['city', 'City'], ['road', 'Road'], ['ruins', 'Ruins'], ['creatures', 'Creatures'], ['dusk', 'Dusk']];
  let rollSet = ON;
  chips.innerHTML = FILTERS.map(([k, l], i) => `<button type="button" data-f="${k}" aria-pressed="${i === 0}">${l}</button>`).join('');
  function buildRoll() {
    track.innerHTML = rollSet.map((p, i) => `<figure class="jr-frame" data-i="${i}" tabindex="0" role="button" aria-label="${p.t}, open">
      <span class="jr-frame__no mono">${pad(p.no)}A</span><div class="jr-frame__img"><img src="${p.sm}" alt="" loading="lazy" draggable="false"></div>
      <figcaption><b>${p.t}</b><span class="mono">${p.place}${p.stamp ? ` · ${p.stamp}` : ''}</span></figcaption></figure>`).join('');
    sizeRoll(); onScroll(true);
  }
  // the page only "holds" the reader for the first few frames; the rest of the strip scrolls freely sideways
  const strip = $('#jrStrip'), LOCK = 3;
  function sizeRoll() {
    const f = track.querySelector('.jr-frame'), step = f ? f.offsetWidth + 18 : 400;
    const full = Math.max(0, track.scrollWidth - strip.clientWidth);
    const lock = Math.min(full, step * LOCK);
    roll.style.height = `${innerHeight + lock}px`;
    roll.dataset.lock = lock; roll.dataset.full = full; roll.dataset.step = step;
  }  chips.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    chips.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    rollSet = b.dataset.f === 'all' ? ON : ON.filter((p) => p.tags.includes(b.dataset.f));
    buildRoll();
    const top = roll.getBoundingClientRect().top + scrollY; if (scrollY > top) scrollTo({ top, behavior: RM ? 'auto' : 'smooth' });
  });
  track.addEventListener('click', (e) => { const f = e.target.closest('.jr-frame'); if (f) open(rollSet, +f.dataset.i); });
  track.addEventListener('keydown', (e) => { const f = e.target.closest('.jr-frame'); if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(rollSet, +f.dataset.i); } });
  let ticking = false;
  function label() {
    const full = +roll.dataset.full || 1, p = Math.min(1, strip.scrollLeft / full);
    bar.style.transform = `scaleX(${p.toFixed(3)})`;
    const n = Math.min(rollSet.length, Math.round(strip.scrollLeft / (+roll.dataset.step || 1)) + 1);
    frameLbl.textContent = `FRAME ${pad(n)} / ${pad(rollSet.length)}`;
  }
  let lastY = -1;
  function onScroll(force) {
    ticking = false;
    // only react to real vertical movement (stray scroll events must not undo a sideways swipe)
    if (force !== true && scrollY === lastY) return label(); lastY = scrollY;
    const top = roll.getBoundingClientRect().top, lock = +roll.dataset.lock || 0;
    // only drive the strip while the page is inside the locked stretch
    if (lock && top <= 0 && -top <= lock) strip.scrollLeft = -top;
    else if (lock && top > 0) strip.scrollLeft = 0;
    label();
  }
  strip.addEventListener('scroll', label, { passive: true });
  // arrows + mouse drag for the rest of the roll
  roll.querySelectorAll('[data-roll]').forEach((b) => b.addEventListener('click', () => glide(strip.scrollLeft + (+b.dataset.roll) * (+roll.dataset.step || 400))));
  function glide(to) {
    const from = strip.scrollLeft, t0 = performance.now(), D = RM ? 1 : 420;
    const step = (now) => { const k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 3); strip.scrollLeft = from + (to - from) * e; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  let dx0 = null, sl0 = 0, dragged = false;
  strip.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; dx0 = e.clientX; sl0 = strip.scrollLeft; dragged = false; });
  addEventListener('pointermove', (e) => { if (dx0 === null) return; const d = e.clientX - dx0; if (Math.abs(d) > 5) { dragged = true; strip.classList.add('is-drag'); } strip.scrollLeft = sl0 - d; });
  addEventListener('pointerup', () => { dx0 = null; strip.classList.remove('is-drag'); });
  strip.addEventListener('click', (e) => { if (dragged) { e.stopPropagation(); e.preventDefault(); dragged = false; } }, true);  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', () => { sizeRoll(); onScroll(); });
  buildRoll();
  track.querySelectorAll('img').forEach((im) => im.addEventListener('load', () => { sizeRoll(); onScroll(); }, { once: true }));

  if (U && U.observe) U.observe();
})();
