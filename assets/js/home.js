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
      ['hero-22', 'Two friends on the grass, one filming with a Sony Digital8 Handycam', 2000, 1333, '50% 40%', '50% 40%']
    ]
  };
  // phones in portrait get their own vertical photos
  const MOBILE = {
    list: [
      ['hero-m-01', 'A 3CCD DVCAM camcorder held up against a red graffiti wall', 1200, 1800, '50% 45%'],
      ['hero-m-02', 'At night, a DVCAM camcorder carried alongside a paint-splattered bike', 1200, 1800, '50% 40%'],
      ['hero-m-03', 'Filming from a scaffold with a compact camera, shot from below', 1200, 1800, '55% 40%'],
      ['hero-m-04', 'A camcorder raised overhead in a mid-stride pose', 1200, 1800, '50% 35%'],
      ['hero-m-05', 'Two friends on a scooter with a Handycam and a swivel Coolpix', 1200, 1800, '55% 50%'],
      ['hero-m-06', 'Lying on the grass with a Handycam, a Coolpix in a pink bag', 1200, 1800, '45% 45%']
    ]
  };

  // same rhythm for any number of frames: two long holds, two quick cuts, repeat
  function autoEdit(n) {
    const e = [];
    for (let i = 0; i < n; i++) e.push([i, 2500, 'fade']);
    return e;
  }

  const reel = $('#reel'), wrap = $('#reelSlides');
  let slides = [], set = DESKTOP, EDIT = [], REW = [];
  let cur = 0;

  // a new random order on every visit
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  DESKTOP.list = shuffle(DESKTOP.list); MOBILE.list = shuffle(MOBILE.list);

  function mount(next) {
    set = next;
    EDIT = set.edit || autoEdit(set.list.length);
    const order = EDIT.map((e) => e[0]);
    REW = order.slice().reverse().concat(order.slice().reverse().filter((_, k) => k % 2)).slice(0, 12);
    wrap.innerHTML = set.list.map(([f, alt, w, h, pos, posM], i) => {
      const big = w > h ? 2000 : 1200, small = w > h ? 1000 : 720;
      return `<figure class="reel__slide${i === 0 ? ' is-on' : ''}" aria-label="${i + 1} of ${set.list.length}"${i ? ' aria-hidden="true"' : ''}>
<img src="assets/img/hero/${f}.jpg" srcset="assets/img/hero/${f}-${small}.jpg ${small}w, assets/img/hero/${f}.jpg ${big}w" sizes="100vw" width="${w}" height="${h}" alt="${alt}" style="--pos:${pos || '50% 50%'};--pos-m:${posM || pos || '50% 50%'}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></figure>`;
    }).join('');
    slides = [...wrap.children];
    reel.classList.toggle('is-portrait', set === MOBILE);
    cur = 0; step = 0; rewinding = false; reel.classList.remove('is-rew');
    if (stamp) stamp.textContent = '';
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


    // warm up the frames that come next
    slides.forEach((x, k) => { const im = x.querySelector('img'); if (im.loading === 'lazy' && Math.abs(k - cur) <= 3) im.loading = 'eager'; });
  }

  /* playback: at the end of the reel the "tape" rewinds itself and plays again */
  const btn = $('#reelPlay');
  let step = 0, timer = null, playing = !U.RM, rewinding = false, hidden = false;

  const setState = (t) => { reel.dataset.state = t.toLowerCase().replace(/\W+/g, ''); };

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
      rewinding = false; reel.classList.remove('is-rew'); setState('▶ PLAY'); run();
    };
    tick();
  }

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

  /* hero link: the arrow leans towards the pointer */
  (() => {
    const go = $('#heroGo'), arr = $('#hgoArr');
    if (!go) return;
    if (!U.RM && window.matchMedia('(hover: hover)').matches) {
      go.addEventListener('pointermove', (e) => {
        const r = arr.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1, m = Math.min(14, d / 12);
        arr.style.transform = `translate(${(dx / d * m).toFixed(1)}px,${(dy / d * m).toFixed(1)}px)`;
      });
      go.addEventListener('pointerleave', () => { arr.style.transform = ''; });
    }
  })();

  /* the deal: three pillars */
  // three pieces on sale right now, picked at random on every visit (real photos first)
  // the three most expensive pieces on sale right now, priciest first
  const fanPicks = D.products.filter((p) => p.status === 'available').sort((a, b) => b.price - a.price).slice(0, 3);
  $('#pillarSel').innerHTML = fanPicks.map((p, i) =>
    `<a class="fan__card" style="--i:${i}" href="product.html?id=${p.id}" aria-label="${p.name}, ${U.eur(p.price)}"><div class="fan__media">${U.view(p, 'a')}</div><span class="mono">${p.id} · ${U.eur(p.price)}</span></a>`).join('');
  const F = D.figures;
  $('#pillarFig').innerHTML = `<div class="figstage__blob"></div>
<div class="figstage__box">${A.box()}</div>
<div class="figstage__fig figstage__fig--a" data-fig3d="${F[1].model}" data-bg="#2F6BFF" data-accent="${F[1].rim}" data-start="-0.9" data-spin="0.6" title="Drag to spin"></div>`;

  // the figure in the pillar shows its glow-in-the-dark edition (fig3d.js loads after this file)
  document.addEventListener('DOMContentLoaded', () => { const el = document.querySelector('#pillarFig .figstage__fig--a'); if (el && window.Fig3D) window.Fig3D.set(el, el.dataset.fig3d, 'white', { glow: true }); });

  /* the three "What we offer" cards follow the scroll: --s runs from +1 (entering below) through 0 (centred) to -1 (leaving above) */
  (() => {
    const cards = [...document.querySelectorAll('.pillars .pillar')];
    if (U.RM || !cards.length) return;
    let raf = 0;
    const upd = () => {
      raf = 0; const vh = window.innerHeight;
      cards.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -50 || r.top > vh + 50) return;
        const s = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
        el.style.setProperty('--s', s.toFixed(3)); el.style.setProperty('--o', (1 - s * s).toFixed(3));
      });
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(upd); };
    window.addEventListener('scroll', req, { passive: true }); window.addEventListener('resize', req);
    upd();
  })();

  /* Tested: the check list drifts on its own until someone touches it; tapping a check runs it again */
  (() => {
    const log = $('#testlog');
    if (!log) return;
    const rows = [...log.children];
    const run = (li) => {
      if (li.classList.contains('is-run')) return;
      const b = li.querySelector('b'), res = b.textContent;
      li.classList.remove('is-ok'); li.classList.add('is-run'); b.textContent = '···';
      setTimeout(() => { li.classList.remove('is-run'); b.textContent = res; void li.offsetWidth; li.classList.add('is-ok'); }, U.RM ? 400 : 1100);
    };
    rows.forEach((li) => {
      li.tabIndex = 0; li.setAttribute('role', 'button');
      li.setAttribute('aria-label', `Run the ${li.querySelector('span').textContent.toLowerCase()} check again`);
      li.addEventListener('click', () => run(li));
      li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); run(li); } });
    });
    if (U.RM) return;
    // slow drift: about 16 px a second, a pause at the end, then back to the top
    let pos = 0, last = 0, hold = 0, visible = false, raf = 0;
    const pause = (ms) => { hold = performance.now() + ms; pos = log.scrollTop; };
    const tick = (t) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = last ? Math.min(64, t - last) : 16; last = t;
      if (t > hold) {
        const max = log.scrollHeight - log.clientHeight;
        if (max > 0) {
          if (Math.abs(log.scrollTop - pos) > 2) pos = log.scrollTop; // someone scrolled it: carry on from there
          pos += dt * 0.016;
          if (pos >= max) { pos = max; log.scrollTop = pos; hold = t + 1800; setTimeout(() => { log.scrollTo({ top: 0, behavior: 'smooth' }); pos = 0; hold = performance.now() + 1600; }, 1500); }
          else log.scrollTop = pos;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    const go = () => { if (!raf) { last = 0; raf = requestAnimationFrame(tick); } };
    ['pointerenter', 'pointerdown', 'touchstart', 'wheel', 'focusin'].forEach((ev) => log.addEventListener(ev, () => pause(4000), { passive: true }));
    log.addEventListener('pointermove', () => pause(4000), { passive: true });
    log.addEventListener('scroll', () => { if (performance.now() < hold) pos = log.scrollTop; }, { passive: true });
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) { pause(1200); go(); } }, { threshold: 0.3 }).observe(log);
  })();
  /* new arrivals */
  const fresh = D.products.filter((p) => p.status !== 'sold' && p.type !== 'accessories').sort((a, b) => b.added.localeCompare(a.added)).slice(0, 4);
  $('#arrivals').innerHTML = fresh.map((p) => `<div class="rv">${U.card(p)}</div>`).join('');

  /* categories */
  const cnt = (t) => D.products.filter((p) => p.type === t && p.status === 'available').length;
  // risograph-poster cards: a real archive photo printed in one ink on coloured paper, slightly off-register
  const CATS = [
    // ink layers made by tools/riso-ink.ps1 from ia-0056/front, ia-0057/closed and ia-0044/side-open (black ink on transparent, no blend mode needed)
    ['camcorders', 'pink', 'Camcorders', 'Tape, disc, card. The soft image of a 2000s summer holiday.', 'assets/img/riso/camcorders', 'MiniDV · Digital8 · Hi8'],
    ['accessories', 'yellow', 'Tapes & accessories', 'Decks, Video Walkmans, tapes and the kit that keeps them running.', 'assets/img/riso/accessories', 'Decks · tapes · chargers'],
    ['compacts', 'blue', 'Digital compacts', 'Direct flash, dense colour, the date in the corner.', 'assets/img/riso/compacts', 'CCD · 1999—2008']
  ];
  $('#cats').innerHTML = CATS.map(([t, c, name, txt, img, tag], i) => `<a class="cat cat--${c} rv" href="archive.html?type=${t}">
<div class="cat__top label"><span>0${i + 1} / ${t.toUpperCase()}</span><span>${cnt(t) ? `${cnt(t)} available` : 'In the vault'}</span></div>
<div class="cat__riso" aria-hidden="true"><img class="r1" src="${img}-r1.png" alt="" loading="lazy"><img class="r2" src="${img}-r2.png" alt="" loading="lazy"><i class="dots"></i></div>
<span class="cat__big" aria-hidden="true">0${i + 1}</span>
<span class="cat__tag mono" aria-hidden="true">${tag}</span>
<div class="cat__txt"><h3>${name}&nbsp;<span class="arr">→</span></h3><p>${txt}</p></div></a>`).join('');

  if (window.Fig3D) window.Fig3D.scan();

  U.observe();
})();
