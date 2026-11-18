/* =========================================================
   IONIC ARCHIVE — Radio: the site soundtrack.
   Shuffled once per visit, keeps playing position across pages,
   starts on the first tap/click/key if the browser blocks autoplay.
   ========================================================= */
(function () {
  'use strict';
  if (window.__iaRadio) return; window.__iaRadio = true;
  const TRACKS = [
    ['brickman-pacific', 'Pacific (Original Mix)', 'Brickman'],
    ['en-voice-vega', 'Vega', 'EN Voice'],
    ['martin-schulte-spring-aroma', 'Spring Aroma', 'Martin Schulte'],
    ['glm-rst-still-love-you', 'still love you (slowed)', 'GLM-RST'],
    ['mikkel-metal-lommer', 'Lommer (Pablo Bolivar Remix)', 'Mikkel Metal'],
    ['marko-furstenberg-freedom-exists', 'Freedom Exists', 'Marko Fürstenberg'],
    ['andrey-pushkarev-undelivered-package', 'Undelivered Package', 'Andrey Pushkarev'],
    ['alessandro-crimi-space-cocktail', 'Space Cocktail', 'Alessandro Crimi'],
    ['takaaki-itoh-receptor', 'Receptor (Claudio PRC Remix)', 'Takaaki Itoh'],
    ['substance-resonance', 'Resonance', 'Substance']
  ];
  const ss = { get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } } };
  const ls = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } } };
  const pad = (n) => String(n).padStart(2, '0');
  const fmt = (s) => (isFinite(s) ? `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}` : '0:00');

  // one shuffle per visit (session), so changing page doesn't reshuffle
  let st = ss.get('ia-radio');
  if (!st || !Array.isArray(st.order) || st.order.length !== TRACKS.length) {
    const o = TRACKS.map((_, i) => i); for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; }
    st = { order: o, pos: 0, t: 0 };
  }
  const userOff = ls.get('ia-radio-off') === '1'; // the visitor paused it on purpose last time

  const a = new Audio(); a.preload = 'auto'; a.volume = 0.55;
  document.body.insertAdjacentHTML('beforeend', `
<div class="mp" id="mp" role="region" aria-label="Ionic Radio">
  <button type="button" class="mp__disc" id="mpToggle" aria-label="Play"><i class="mp__reel"></i><i class="mp__reel r2"></i></button>
  <div class="mp__info">
    <span class="mp__lbl mono"><i class="mp__dot"></i><span id="mpState">IONIC RADIO</span> · <span id="mpNo"></span></span>
    <div class="mp__title"><span id="mpTitle"></span></div>
    <div class="mp__bar" id="mpBar"><i id="mpFill"></i></div>
  </div>
  <div class="mp__ctrl">
    <button type="button" data-a="prev" aria-label="Previous track">⏮</button>
    <button type="button" data-a="play" id="mpPlay" aria-label="Play">▶</button>
    <button type="button" data-a="next" aria-label="Next track">⏭</button>
    <button type="button" data-a="list" id="mpListBtn" aria-expanded="false" aria-label="Tracklist">☰</button>
  </div>
  <ol class="mp__list" id="mpList" hidden></ol>
  <span class="mp__hint mono" id="mpHint" hidden>♪ Tap anywhere to tune in</span>
</div>`);
  const el = (id) => document.getElementById(id);
  const mp = el('mp'), title = el('mpTitle'), no = el('mpNo'), fill = el('mpFill'), play = el('mpPlay'), list = el('mpList'), hint = el('mpHint'), state = el('mpState');

  function cur() { return TRACKS[st.order[st.pos]]; }
  function render() {
    const [, t, ar] = cur();
    title.textContent = `${ar} — ${t}`;
    title.parentElement.classList.toggle('is-long', title.textContent.length > 26);
    no.textContent = `${pad(st.pos + 1)}/${pad(TRACKS.length)}`;
    list.innerHTML = st.order.map((ti, i) => `<li><button type="button" data-p="${i}" aria-current="${i === st.pos}"><span class="mono">${pad(i + 1)}</span><b>${TRACKS[ti][1]}</b><em>${TRACKS[ti][2]}</em></button></li>`).join('');
  }
  function load(t0) { a.src = `assets/audio/${cur()[0]}.mp3`; if (t0) a.addEventListener('loadedmetadata', () => { a.currentTime = Math.min(t0, (a.duration || 1e9) - 2); }, { once: true }); render(); save(); }
  function save() { st.t = a.currentTime || st.t || 0; ss.set('ia-radio', st); }
  function setUI() {
    const on = !a.paused;
    mp.classList.toggle('is-on', on);
    play.textContent = on ? '❚❚' : '▶'; play.setAttribute('aria-label', on ? 'Pause' : 'Play');
    el('mpToggle').setAttribute('aria-label', on ? 'Pause' : 'Play');
    state.textContent = on ? 'ON AIR' : 'IONIC RADIO';
  }
  function go(d) { st.pos = (st.pos + d + TRACKS.length) % TRACKS.length; st.t = 0; load(0); start(); }
  function start() { const p = a.play(); if (p) p.then(() => { hint.hidden = true; ls.set('ia-radio-off', '0'); }).catch(() => armGesture()); }
  function toggle() { if (a.paused) start(); else { a.pause(); ls.set('ia-radio-off', '1'); } }

  // browsers only allow sound after a gesture: arm a one-time listener
  let armed = false;
  function armGesture() {
    if (armed) return; armed = true; hint.hidden = false;
    const go1 = (e) => { if (e.target.closest && e.target.closest('#mp')) return; ['pointerdown', 'keydown', 'touchend'].forEach((k) => removeEventListener(k, go1, true)); armed = false; start(); };
    ['pointerdown', 'keydown', 'touchend'].forEach((k) => addEventListener(k, go1, true));
  }

  a.addEventListener('play', setUI); a.addEventListener('pause', setUI);
  a.addEventListener('ended', () => go(1));
  a.addEventListener('error', () => setTimeout(() => go(1), 600));
  a.addEventListener('timeupdate', () => { fill.style.transform = `scaleX(${a.duration ? (a.currentTime / a.duration).toFixed(4) : 0})`; el('mpBar').title = `${fmt(a.currentTime)} / ${fmt(a.duration)}`; });
  setInterval(save, 2000); addEventListener('pagehide', save);

  mp.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'mpToggle' || b.dataset.a === 'play') toggle();
    if (b.dataset.a === 'prev') { if (a.currentTime > 4) { a.currentTime = 0; start(); } else go(-1); }
    if (b.dataset.a === 'next') go(1);
    if (b.dataset.a === 'list') { const o = list.hidden; list.hidden = !o; b.setAttribute('aria-expanded', String(o)); mp.classList.toggle('is-open', o); }
    if (b.dataset.p) { st.pos = +b.dataset.p; st.t = 0; load(0); start(); }
  });
  el('mpBar').addEventListener('click', (e) => { if (!a.duration) return; const r = e.currentTarget.getBoundingClientRect(); a.currentTime = a.duration * (e.clientX - r.left) / r.width; });

  // step aside when a Found Tapes video turns its sound on
  let ducked = false;
  document.addEventListener('ia:tv-sound', (e) => {
    if (e.detail && !a.paused) { ducked = true; a.pause(); }
    else if (!e.detail && ducked) { ducked = false; start(); }
  });

  load(st.t);
  if (!userOff) start(); else setUI();
})();
