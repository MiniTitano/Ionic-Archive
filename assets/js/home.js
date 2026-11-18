(function () {
  'use strict';
  const D = window.IA, A = window.Art, U = window.IAUI;
  const { $ } = U;

  /* ---------- hero reel: self-running montage, two separate sets ----------
     DESKTOP: horizontal photos for landscape screens.
     MOBILE:  vertical photos for portrait screens (phones), so nothing gets cropped or upscaled.
     Each entry: [file base in assets/img/hero/, alt text, width, height, focus point] */
  const DESKTOP = {
    list: [
      // [..., desktop focus, focus if shown on a narrow screen while no vertical set exists]
      ['hero-15', 'Filming through a Sony Handycam viewfinder under radio masts', 2000, 1333, '45% 50%', '46% 50%'],
      ['hero-16', 'A Sony camcorder\'s flip-out screen framing a sunset over wind turbines', 2000, 1333, '60% 55%', '64% 55%'],
      ['hero-17', 'A Sony 3CCD camcorder held out at arm\'s length against a red graffiti wall', 2000, 1333, '50% 40%', '66% 40%'],
      ['hero-18', 'Lying on the grass, filming a friend with a Sony Handycam', 2000, 1333, '55% 55%', '68% 50%'],
      ['hero-19', 'A Sony DVCAM camcorder carried at hip height against a red wall', 2000, 1333, '45% 55%', '40% 60%'],
      ['hero-20', 'Checking a Sony DVCAM camcorder, seated in a chair', 2000, 1333, '50% 45%', '45% 45%'],
      ['hero-21', 'Holding a Canon XM2 camcorder, shot from below between buildings', 2000, 1333, '50% 40%', '45% 40%'],
      ['hero-22', 'Two friends on the grass, one filming with a Sony Digital8 Handycam', 2000, 1333, '50% 40%', '50% 40%'],
      ['hero-23', 'Two hands holding a red Ferrari Olympus compact in front of Place des Vosges', 2000, 1333, '58% 45%', '58% 45%']
    ]
  };
  // no separate vertical set: phones show the same photos, framed on their phone focus point
  const MOBILE = { list: [] };
  // camcorder-style data code burned into the corner, one per frame
  const STAMPS = ["NOV 17 '03  23:41", "AUG 02 '04  20:52", "MAR 09 '02  01:13", "JUL 21 '05  17:06", "OCT 30 '03  00:27", "FEB 14 '04  15:48", "DEC 31 '02  23:59", "JAN 06 '06  12:30", "MAY 18 '04  19:22", "SEP 05 '03  02:44"];

  // same rhythm for any number of frames: two long holds, two quick cuts, repeat
  function autoEdit(n) {
    const e = [];
    for (let i = 0; i < n; i++) e.push([i, 2500, 'fade']);
    return e;
  }

  const reel = $('#reel'), wrap = $('#reelSlides');
  let slides = [], set = DESKTOP, EDIT = [], LOOP = 1, REW = [];
  let cur = 0;

  // a new random order on every visit
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  DESKTOP.list = shuffle(DESKTOP.list); MOBILE.list = shuffle(MOBILE.list);

  function mount(next) {
    set = next;
    EDIT = set.edit || autoEdit(set.list.length);
    LOOP = EDIT.reduce((t, e) => t + e[1], 0);
    const order = EDIT.map((e) => e[0]);
    REW = order.slice().reverse().concat(order.slice().reverse().filter((_, k) => k % 2)).slice(0, 12);
    wrap.innerHTML = set.list.map(([f, alt, w, h, pos, posM], i) => {
      const big = w > h ? 2000 : 1200, small = w > h ? 1000 : 720;
      return `<figure class="reel__slide${i === 0 ? ' is-on' : ''}" aria-label="${i + 1} of ${set.list.length}"${i ? ' aria-hidden="true"' : ''}>
<img src="assets/img/hero/${f}.jpg" srcset="assets/img/hero/${f}-${small}.jpg ${small}w, assets/img/hero/${f}.jpg ${big}w" sizes="100vw" width="${w}" height="${h}" alt="${alt}" style="--pos:${pos || '50% 50%'};--pos-m:${posM || pos || '50% 50%'}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></figure>`;
    }).join('');
    slides = [...wrap.children];
    reel.classList.toggle('is-portrait', set === MOBILE);
    cur = 0; step = 0; tapeMs = 0; rewinding = false; reel.classList.remove('is-rew');
    stamp.textContent = STAMPS[0];
    if (playing) run();
  }

  const glitch = $('#reelGlitch'), flash = $('#reelFlash'), stamp = $('#reelStamp');
  // tape-dropout cut: slices of the incoming frame jump sideways with an RGB split, then lock in
  function dropout(img) {
    if (U.RM || !img.complete) return;
    const cs = getComputedStyle(img), src = img.currentSrc || img.src;
    const bg = `background-image:url('${src}');background-position:${cs.objectPosition}`;
    let html = '';
    const n = 7 + Math.floor(Math.random() * 4);
    for (let k = 0; k < n; k++) {
      const top = Math.random() * 92, h = 2 + Math.random() * 11;
      const x = (Math.random() < .5 ? -1 : 1) * (3 + Math.random() * 14);
      const kind = k % 3 === 1 ? 'r' : k % 3 === 2 ? 'b' : '';
      html += `<i class="${kind}" style="${bg};clip-path:inset(${top}% 0 ${Math.max(0, 100 - top - h)}% 0);--x:${x}%;--t:${(.22 + Math.random() * .2).toFixed(2)}s"></i>`;
    }
    glitch.innerHTML = html;
    flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go');
    clearTimeout(dropout.t); dropout.t = setTimeout(() => { glitch.innerHTML = ''; }, 600);
  }

  // put a frame on screen; kind = 'drop' (tape dropout), 'hard' (straight cut) or 'rew' (rewind flicker)
  function show(i, kind) {
    // coming back to a tab re-runs the current step: keep the frame that's already up instead of re-fading it
    if (i === cur && slides[cur].classList.contains('is-on') && kind !== 'rew' && show.started) return;
    show.started = true;
    if (i !== cur) {
      slides.forEach((s) => s.classList.remove('was-on'));
      slides[cur].classList.add('was-on');
      slides[cur].classList.remove('is-on'); slides[cur].setAttribute('aria-hidden', 'true');
      cur = i;
    }
    const s = slides[cur];
    s.classList.remove('is-on', 'cut-hard'); void s.offsetWidth;
    s.classList.add('is-on'); s.removeAttribute('aria-hidden');
    if (kind === 'rew') s.classList.add('cut-hard');
    stamp.textContent = STAMPS[cur % STAMPS.length];

    // warm up the frames that come next
    slides.forEach((x, k) => { const im = x.querySelector('img'); if (im.loading === 'lazy' && Math.abs(k - cur) <= 3) im.loading = 'eager'; });
  }

  /* playback: at the end of the reel the "tape" rewinds itself and plays again */
  const state = $('#reelState'), tcEl = $('#reelTc'), tape = $('#reelTape'), btn = $('#reelPlay');
  let step = 0, timer = null, playing = !U.RM, rewinding = false, tapeMs = 0, hidden = false;

  const fmt = (ms) => { const f = Math.floor(ms / 40); return `0:${String(Math.floor(f / 1500) % 60).padStart(2, '0')}:${String(Math.floor(f / 25) % 60).padStart(2, '0')}:${String(f % 25).padStart(2, '0')}`; };
  const setState = (t) => { state.innerHTML = `<i></i>${t}`; reel.dataset.state = t.toLowerCase().replace(/\W+/g, ''); };

  function run() {
    clearTimeout(timer);
    if (!playing || hidden) return;
    const [i, hold, kind] = EDIT[step];
    show(i, kind);
    timer = setTimeout(() => {
      timer = null; step++;
      if (step >= EDIT.length) { step = 0; rewind(); } else run();
    }, hold);
  }
  function rewind() {
    rewinding = true; setState('◀◀ REW'); reel.classList.add('is-rew');
    const seq = REW;
    let k = 0;
    const tick = () => {
      if (!playing || hidden) { rewinding = false; reel.classList.remove('is-rew'); return; }
      if (k < seq.length) { show(seq[k++], 'rew'); timer = setTimeout(tick, 70); return; }
      rewinding = false; reel.classList.remove('is-rew'); tapeMs = 0; setState('▶ PLAY'); run();
    };
    tick();
  }
  // tape counter + progress
  setInterval(() => {
    if (playing && !hidden) tapeMs = rewinding ? Math.max(0, tapeMs - LOOP / 9) : Math.min(LOOP, tapeMs + 100);
    tcEl.textContent = fmt(tapeMs);
    tape.style.transform = `scaleX(${(tapeMs / LOOP).toFixed(4)})`;
  }, 100);

  function setPlaying(p) {
    playing = p;
    btn.textContent = p ? '❚❚ PAUSE' : '▶ PLAY';
    btn.setAttribute('aria-label', p ? 'Pause the hero slideshow' : 'Play the hero slideshow');
    setState(p ? '▶ PLAY' : '❚❚ PAUSE');
    if (p) run(); else { clearTimeout(timer); reel.classList.remove('is-rew'); rewinding = false; }
  }
  btn.addEventListener('click', () => setPlaying(!playing));
  // pause while the tab is hidden; on return pick up where it was instead of restarting the frame's hold
  document.addEventListener('visibilitychange', () => { hidden = document.hidden; if (hidden) { clearTimeout(timer); timer = null; } else if (playing && !timer && !rewinding) run(); });
  // pick the set for the screen shape, and swap if the phone is rotated / the window resized
  const portrait = window.matchMedia('(orientation: portrait) and (max-width: 1024px)');
  const pick = () => (portrait.matches && MOBILE.list.length ? MOBILE : DESKTOP);
  if (U.RM) { playing = false; setState('■ STILL'); btn.textContent = '▶ PLAY'; btn.setAttribute('aria-label', 'Play the hero slideshow'); }
  else { btn.textContent = '❚❚ PAUSE'; setState('▶ PLAY'); }
  mount(pick());
  const onShape = () => { const s = pick(); if (s !== set) { clearTimeout(timer); mount(s); } };
  if (portrait.addEventListener) portrait.addEventListener('change', onShape); else portrait.addListener(onShape);

  /* the deal: three pillars */
  // three pieces on sale right now, picked at random on every visit (real photos first)
  // the three most expensive pieces on sale right now, priciest first
  const fanPicks = D.products.filter((p) => p.status === 'available').sort((a, b) => b.price - a.price).slice(0, 3);
  $('#pillarSel').innerHTML = fanPicks.map((p, i) =>
    `<a class="fan__card" style="--i:${i}" href="product.html?id=${p.id}" aria-label="${p.name}, ${U.eur(p.price)}"><div class="fan__media">${U.view(p, 'a')}</div><span class="mono">${p.id} · ${U.eur(p.price)}</span></a>`).join('');
  const F = D.figures;
  $('#pillarFig').innerHTML = `<div class="figstage__blob"></div>
<div class="figstage__box">${A.box()}</div>
<div class="figstage__fig figstage__fig--a" data-fig3d="${F[1].model}" data-bg="#2F6BFF" data-accent="${F[1].rim}" data-start="-0.9" data-spin="0.6" title="Drag to spin"></div>
<div class="figstage__fig figstage__fig--q" data-fig3d="${F[5].model}" data-mode="sil" data-accent="#FFE14D" data-start="0.4" data-spin="-0.5"></div>`;

  /* new arrivals */
  const fresh = D.products.filter((p) => p.status !== 'sold' && p.type !== 'accessories').sort((a, b) => b.added.localeCompare(a.added)).slice(0, 4);
  $('#arrivals').innerHTML = fresh.map((p) => `<div class="rv">${U.card(p)}</div>`).join('');

  /* categories */
  const cnt = (t) => D.products.filter((p) => p.type === t && p.status === 'available').length;
  // risograph-poster cards: a real archive photo printed in one ink on coloured paper, slightly off-register
  const CATS = [
    ['camcorders', 'pink', 'Camcorders', 'Tape, disc, card. The soft image of a 2000s summer holiday.', 'assets/img/ia-0056/front.jpg', 'MiniDV · Digital8 · Hi8'],
    ['accessories', 'yellow', 'Tapes & accessories', 'Decks, Video Walkmans, tapes and the kit that keeps them running.', 'assets/img/ia-0057/closed.jpg', 'Decks · tapes · chargers'],
    ['compacts', 'blue', 'Digital compacts', 'Direct flash, dense colour, the date in the corner.', 'assets/img/ia-0044/side-open.jpg', 'CCD · 1999—2008']
  ];
  $('#cats').innerHTML = CATS.map(([t, c, name, txt, img, tag], i) => `<a class="cat cat--${c} rv" href="archive.html?type=${t}">
<div class="cat__top label"><span>0${i + 1} / ${t.toUpperCase()}</span><span>${cnt(t) ? `${cnt(t)} available` : 'In the vault'}</span></div>
<div class="cat__riso" aria-hidden="true"><img class="r1" src="${img}" alt="" loading="lazy"><img class="r2" src="${img}" alt="" loading="lazy"><i class="dots"></i></div>
<span class="cat__big" aria-hidden="true">0${i + 1}</span>
<span class="cat__tag mono" aria-hidden="true">${tag}</span>
<div class="cat__txt"><h3>${name}&nbsp;<span class="arr">→</span></h3><p>${txt}</p></div></a>`).join('');

  if (window.Fig3D) window.Fig3D.scan();

  U.observe();
})();
