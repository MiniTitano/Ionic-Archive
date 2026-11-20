/* =========================================================
   IONIC ARCHIVE — Ionic TV
   A CRT you flip through: VHS shelf, channel static, VCR on-screen display,
   a cassette window whose spools wind with the tape. Files in assets/video/.
   ========================================================= */
(function () {
  'use strict';
  const host = document.getElementById('ionictv');
  if (!host) return;
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = (n) => String(n).padStart(2, '0');

  // label: handwritten spine; col: spine sticker colour; brand stripe colours give each tape its own make
  const TAPES = [
    { file: 'nyc-skate.mp4', label: 'NYC skate ’00', note: 'Downtown, early 2000s', mode: 'SP', col: '#FFE14D', stripe: ['#111', '#e5322d'] },
    { file: 'progetto-4.webm', label: 'Session #4', note: 'Fisheye, ledges, rails', mode: 'SP', col: '#9CFF5E', stripe: ['#0e2a6b', '#5c8bff'] },
    { file: 'plan-b-92.mp4', label: 'Plan B ’92', note: 'Questionable, Sal Barbier', mode: 'LP', col: '#ffffff', stripe: ['#111', '#ffd83d'] },
    { file: 'valentines.mp4', label: 'Valentines', note: 'Seaside, sunflowers, a plane window', mode: 'SP', col: '#FF8CC6', stripe: ['#6b0e3a', '#ff6fb5'] },
    { file: 'abandoned-house.webm', label: 'Old house ’88', note: 'Somebody left the camera running', mode: 'EP', start: 88, col: '#c8c2b4', stripe: ['#2a2d33', '#a9afb8'] },
    { file: 'forest-drive.mp4', label: 'Forest drive', note: 'Out of town, windows down', mode: 'SP', col: '#3EE08F', stripe: ['#0b3d24', '#3ee08f'] }
  ];

  host.innerHTML = `
<div class="itv">
  <div class="itv__set">
    <div class="itv__tv">
      <div class="itv__screen" id="itvScreen">
        <video id="itvV" muted playsinline preload="metadata" aria-label="Found tape"></video>
        <canvas id="itvSnow" width="160" height="120" aria-hidden="true"></canvas>
        <div class="itv__glass" aria-hidden="true"></div>
        <div class="itv__osd" aria-hidden="true">
          <span class="itv__ch" id="itvCh">CH 01</span>
          <span class="itv__st" id="itvSt">▶ PLAY</span>
          <span class="itv__lab" id="itvLab"></span>
          <span class="itv__tc" id="itvTc">0:00:00</span>
          <span class="itv__big" id="itvBig"></span>
        </div>
        <button class="itv__start" id="itvStart" type="button" hidden>▶ Press play</button>
      </div>
      <div class="itv__chin">
        <span class="itv__brand">IONIC<b>COLOR · 14"</b></span>
        <span class="itv__led" id="itvLed" aria-hidden="true"></span>
        <span class="itv__grille" aria-hidden="true"></span>
      </div>
    </div>
    <div class="itv__deck" role="group" aria-label="Tape controls">
      <button type="button" data-a="prev" aria-label="Previous channel">CH ▼</button>
      <button type="button" data-a="rew" aria-label="Back 10 seconds">◀◀</button>
      <button type="button" data-a="play" class="is-main" aria-label="Pause" id="itvPlay">❚❚</button>
      <button type="button" data-a="ff" aria-label="Forward 10 seconds">▶▶</button>
      <button type="button" data-a="next" aria-label="Next channel">CH ▲</button>
      <button type="button" data-a="snd" aria-pressed="false" id="itvSnd" aria-label="Sound">🔇 SOUND</button>
    </div>
  </div>

  <div class="itv__side">
    <div class="itv__cass" aria-hidden="true">
      <div class="itv__cassbody">
        <span class="itv__casslabel" id="itvCassLab"></span>
        <div class="itv__win"><i class="itv__spool l" id="itvL"></i><i class="itv__spool r" id="itvR"></i><i class="itv__tape" id="itvTape"></i></div>
        <span class="itv__cassmeta mono" id="itvCassMeta"></span>
      </div>
    </div>
    <div class="itv__scrub"><input type="range" id="itvSeek" min="0" max="1000" value="0" aria-label="Tape position"><span class="mono" id="itvLen">0:00</span></div>
    <ol class="itv__shelf" id="itvShelf">${TAPES.map((t, i) => `<li><button type="button" data-i="${i}" style="--c:${t.col};--s1:${t.stripe[0]};--s2:${t.stripe[1]}" aria-pressed="false">
      <span class="sp__brand mono">IA E-180</span><span class="sp__label">${t.label}</span><span class="sp__ch mono">CH ${pad(i + 1)}</span></button></li>`).join('')}</ol>
  </div>
</div>`;

  const $ = (id) => document.getElementById(id);
  const v = $('itvV'), snow = $('itvSnow'), sx = snow.getContext('2d'), screen = $('itvScreen');
  const ch = $('itvCh'), st = $('itvSt'), lab = $('itvLab'), tc = $('itvTc'), big = $('itvBig'), led = $('itvLed');
  const L = $('itvL'), R = $('itvR'), tape = $('itvTape'), seek = $('itvSeek'), len = $('itvLen');
  const shelf = $('itvShelf'), playBtn = $('itvPlay'), sndBtn = $('itvSnd'), start = $('itvStart');
  let cur = -1, want = true, visible = false, snowT = 0, bigT = 0;
  const fmt = (s) => { s = Math.max(0, Math.floor(s || 0)); return `${Math.floor(s / 60)}:${pad(s % 60)}`; };

  /* static: drawn into a tiny canvas, scaled up by CSS */
  const img = sx.createImageData(160, 120);
  function drawSnow() {
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) { const g = Math.random() * 255; d[i] = d[i + 1] = d[i + 2] = g; d[i + 3] = 255; }
    sx.putImageData(img, 0, 0);
    // rolling bar
    const y = (performance.now() / 6) % 140 - 20; sx.fillStyle = 'rgba(0,0,0,.35)'; sx.fillRect(0, y, 160, 14);
  }
  function burst(ms) {
    snow.classList.add('on'); snowT = performance.now() + ms;
    const tick = () => { drawSnow(); if (performance.now() < snowT) requestAnimationFrame(tick); else snow.classList.remove('on'); };
    requestAnimationFrame(tick);
  }
  function flashBig(text) { big.textContent = text; big.classList.add('on'); clearTimeout(bigT); bigT = setTimeout(() => big.classList.remove('on'), 1400); }

  function tune(i, user) {
    i = (i + TAPES.length) % TAPES.length;
    if (i === cur) return;
    cur = i; const t = TAPES[i];
    shelf.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
    ch.textContent = `CH ${pad(i + 1)}`; lab.textContent = t.label.toUpperCase(); $('itvCassLab').textContent = t.label;
    $('itvCassMeta').textContent = `${t.mode} · ${t.note}`;
    host.style.setProperty('--tc', t.col);
    flashBig(`CH ${pad(i + 1)}`);
    if (!RM) burst(user ? 520 : 300);
    v.src = `assets/video/${t.file}`; v.load();
    v.addEventListener('loadedmetadata', () => {
      const go = () => { if (S()) v.currentTime = S(); len.textContent = fmt(v.duration - S()); if (want && visible) play(); };
      // browser-recorded WebM has no duration in its header: jump to the end once to learn it
      if (!isFinite(v.duration)) {
        v.addEventListener('durationchange', function fix() { if (isFinite(v.duration)) { v.removeEventListener('durationchange', fix); v.currentTime = 0; go(); } });
        v.currentTime = 1e7;
      } else go();
    }, { once: true });
  }
  // a tape can begin part-way into its file (e.g. to skip a damaged first half)
  const S = () => (cur >= 0 && TAPES[cur].start) || 0;
  function play() { const p = v.play(); if (p) p.then(() => { start.hidden = true; }).catch(() => { start.hidden = false; }); }
  function setState() {
    const on = !v.paused;
    st.textContent = on ? (v.playbackRate > 1 ? '▶▶ FF' : '▶ PLAY') : '❚❚ PAUSE';
    playBtn.textContent = on ? '❚❚' : '▶'; playBtn.setAttribute('aria-label', on ? 'Pause' : 'Play');
    host.classList.toggle('is-playing', on); led.classList.toggle('on', on);
  }
  v.addEventListener('play', setState); v.addEventListener('pause', setState); v.addEventListener('ratechange', setState);
  v.addEventListener('ended', () => tune(cur + 1));
  v.addEventListener('timeupdate', () => {
    const s = S(), ct = Math.max(0, v.currentTime - s), p = v.duration ? ct / (v.duration - s) : 0;
    tc.textContent = `0:${pad(Math.floor(ct / 60))}:${pad(Math.floor(ct % 60))}`;
    seek.value = Math.round(p * 1000);
    // tape moves from the left spool to the right one
    const rl = 0.35 + 0.65 * (1 - p), rr = 0.35 + 0.65 * p;
    L.style.setProperty('--r', rl.toFixed(3)); R.style.setProperty('--r', rr.toFixed(3));
    tape.style.setProperty('--p', p.toFixed(3));
  });
  seek.addEventListener('input', () => { if (v.duration) { v.currentTime = S() + (v.duration - S()) * seek.value / 1000; if (!RM) burst(160); } });

  function act(a) {
    if (a === 'prev') tune(cur - 1, true);
    if (a === 'next') tune(cur + 1, true);
    if (a === 'play') { want = v.paused; if (v.paused) play(); else v.pause(); }
    if (a === 'rew') { v.currentTime = Math.max(S(), v.currentTime - 10); flashBig('◀◀ REW'); if (!RM) burst(200); }
    if (a === 'ff') { v.currentTime = Math.min(v.duration - 0.5, v.currentTime + 10); flashBig('▶▶ FF'); if (!RM) burst(200); }
    if (a === 'snd') { v.muted = !v.muted; sndBtn.setAttribute('aria-pressed', String(!v.muted)); sndBtn.textContent = v.muted ? '🔇 SOUND' : '🔊 SOUND'; flashBig(v.muted ? 'MUTE' : 'VOL ▮▮▮▮▮▮▯▯'); if (!v.muted) play(); document.dispatchEvent(new CustomEvent('ia:tv-sound', { detail: !v.muted })); }
    if (a === 'full') { const el = screen; if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen(); }
  }
  host.querySelector('.itv__deck').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) act(b.dataset.a); });
  shelf.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { want = true; tune(+b.dataset.i, true); } });
  start.addEventListener('click', () => { want = true; play(); });
  screen.addEventListener('click', (e) => { if (e.target === start) return; act('play'); });
  host.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); act('next'); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); act('prev'); }
    if (e.key === ' ') { e.preventDefault(); act('play'); }
    if (e.key === 'm' || e.key === 'M') act('snd');
  });
  // swipe on the screen flips channels on phones
  let sx0 = null;
  screen.addEventListener('touchstart', (e) => { sx0 = e.touches[0].clientX; }, { passive: true });
  screen.addEventListener('touchend', (e) => { if (sx0 === null) return; const dx = e.changedTouches[0].clientX - sx0; if (Math.abs(dx) > 50) act(dx < 0 ? 'next' : 'prev'); sx0 = null; });

  /* only play while the set is on screen */
  new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible) { if (cur < 0) { want = !RM; tune(0); } else if (want) play(); }
    else v.pause();
  }, { threshold: 0.35 }).observe(screen);
})();
