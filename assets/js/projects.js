/* =========================================================
   IONIC ARCHIVE — Projects: a workbench file per project.
   Parts are tapes (A plays, B is still being filmed), steps jump the video,
   the colour bench previews the repaint on the masked shell.
   ========================================================= */
(function () {
  'use strict';
  const host = document.getElementById('pjFile');
  if (!host) return;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = (n) => String(n).padStart(2, '0');
  const fmt = (s) => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`;
  const I = 'assets/img/projects/';

  const PROJECT = {
    no: '01', title: 'Strip & repaint', subject: 'Sony handheld camcorder',
    parts: [
      { k: 'A', name: 'Teardown', state: 'live', src: 'assets/video/projects/teardown-720.mp4', poster: `${I}poster.jpg`,
        steps: [
          [0, 'Screws out', '', `${I}ch1.jpg`],
          [28, 'Handle and viewfinder off', '', `${I}ch2.jpg`],
          [62, 'Side panels off', '', `${I}ch3.jpg`],
          [95, 'Masking the insides', '', `${I}ch4.jpg`],
          [125, 'Panels ready for paint', '', `${I}ch5.jpg`]
        ] },
      { k: 'B', name: 'Paint', state: 'soon', poster: `${I}ch5.jpg` }
    ]
  };
  const SW = [['#e5322d', 'Rec red'], ['#2F6BFF', 'Ionic blue'], ['#FFE14D', 'Tape yellow'], ['#9CFF5E', 'NightShot'], ['#FF8CC6', 'Bubblegum'], ['#f4f1ea', 'Bone']];
  const A = PROJECT.parts[0];

  host.innerHTML = `
<div class="pj-tag mono"><span>PROJECT ${PROJECT.no}</span><b>${PROJECT.title}</b><span>${PROJECT.subject}</span><span class="pj-tag__st"><i></i>In progress · 1 of 2</span></div>
<div class="pj-parts" role="tablist" aria-label="Parts">${PROJECT.parts.map((p, i) => `<button type="button" role="tab" data-p="${i}" aria-selected="${i === 0}" class="pj-part pj-part--${p.state}">
  <span class="pj-part__k">${p.k}</span><span class="pj-part__t"><b>${p.name}</b><em class="mono">${p.state === 'live' ? `${p.steps.length} steps · watch` : 'Being filmed'}</em></span>${p.state === 'soon' ? '<span class="pj-lock" aria-hidden="true">●REC</span>' : ''}</button>`).join('')}</div>

<div class="pj-stage" id="pjA">
  <div class="pj-mon">
    <div class="pj-screen" id="pjScreen">
      <video id="pjV" playsinline preload="none" poster="${A.poster}" aria-label="Teardown video"></video>
      <button type="button" class="pj-big" id="pjBig" aria-label="Play"><span>▶</span><em class="mono">Play part A</em></button>
      <span class="pj-osd mono" id="pjOsd">STEP 01 · ${A.steps[0][1].toUpperCase()}</span>
    </div>
    <div class="pj-ctl">
      <button type="button" id="pjPlay" aria-label="Play">▶</button>
      <div class="pj-rail" id="pjRail" role="slider" aria-label="Position" tabindex="0">
        ${A.steps.map((s, i) => `<i class="pj-rail__mark" style="left:var(--m${i})" data-tip="${pad(i + 1)} ${s[1]}"></i>`).join('')}
        <span class="pj-rail__fill" id="pjFill"></span><span class="pj-rail__tip mono" id="pjTip"></span>
      </div>
      <span class="mono pj-time" id="pjTime">0:00</span>
      <button type="button" id="pjSnd" aria-pressed="false" aria-label="Sound">🔇</button>
      <button type="button" id="pjFull" aria-label="Full screen">⛶</button>
    </div>
  </div>
  <ol class="pj-steps" id="pjSteps">${A.steps.map((s, i) => `<li><button type="button" data-s="${i}" aria-current="${i === 0}">
    <span class="pj-steps__img"><img src="${s[3]}" alt="" loading="lazy"><i class="pj-steps__bar"></i></span>
    <span class="pj-steps__no mono">${pad(i + 1)} · ${fmt(s[0])}</span><b>${s[1]}</b>${s[2] ? `<em>${s[2]}</em>` : '' }</button></li>`).join('')}</ol>
</div>

<div class="pj-stage pj-soon" id="pjB" hidden>
  <div class="pj-soon__shell" id="pjShell" style="--paint:${SW[0][0]}">
    <img src="${PROJECT.parts[1].poster}" alt="The masked shell, waiting for paint">
    <i class="pj-soon__tint"></i><span class="pj-soon__tape mono">PART B · PAINT · ON TAPE SOON</span>
  </div>
  <div class="pj-soon__side">
    <p class="label">Part B</p>
    <h3 class="pj-soon__h">Paint: coming next.</h3>
    <p class="pj-soon__p">Try a colour on the shell.</p>
    <div class="pj-sw" role="radiogroup" aria-label="Preview colour">${SW.map(([c, n], i) => `<button type="button" role="radio" aria-checked="${i === 0}" data-c="${c}" style="--c:${c}" aria-label="${n}"><i></i><span class="mono">${n}</span></button>`).join('')}</div>
  </div>
</div>`;

  const $ = (id) => document.getElementById(id);
  const v = $('pjV'), big = $('pjBig'), playB = $('pjPlay'), rail = $('pjRail'), fill = $('pjFill'), tip = $('pjTip'), time = $('pjTime'), osd = $('pjOsd');
  const steps = [...host.querySelectorAll('#pjSteps button')];
  let loaded = false, cur = 0;
  const load = () => { if (!loaded) { v.src = A.src; v.preload = 'auto'; loaded = true; } };
  const dur = () => v.duration || 154;
  function placeMarks() { A.steps.forEach((s, i) => rail.style.setProperty(`--m${i}`, `${(s[0] / dur()) * 100}%`)); }
  placeMarks(); v.addEventListener('loadedmetadata', placeMarks);
  function play() { load(); const p = v.play(); if (p) p.catch(() => {}); }
  function toggle() { if (v.paused) play(); else v.pause(); }
  function ui() { const on = !v.paused; playB.textContent = on ? '❚❚' : '▶'; playB.setAttribute('aria-label', on ? 'Pause' : 'Play'); host.classList.toggle('is-playing', on); big.hidden = on || v.currentTime > 0; }
  v.addEventListener('play', ui); v.addEventListener('pause', ui);
  v.addEventListener('timeupdate', () => {
    const t = v.currentTime, p = t / dur();
    fill.style.transform = `scaleX(${p.toFixed(4)})`; time.textContent = `${fmt(t)} / ${fmt(dur())}`;
    let s = 0; A.steps.forEach((st, i) => { if (t >= st[0]) s = i; });
    const end = (A.steps[s + 1] || [dur()])[0];
    steps.forEach((b, i) => { b.setAttribute('aria-current', String(i === s)); b.style.setProperty('--sp', i < s ? 1 : i === s ? ((t - A.steps[s][0]) / (end - A.steps[s][0])).toFixed(3) : 0); });
    if (s !== cur) { cur = s; osd.textContent = `STEP ${pad(s + 1)} · ${A.steps[s][1].toUpperCase()}`; osd.classList.remove('on'); void osd.offsetWidth; osd.classList.add('on'); }
  });
  big.addEventListener('click', play); playB.addEventListener('click', toggle);
  $('pjScreen').addEventListener('click', (e) => { if (e.target === v) toggle(); });
  steps.forEach((b) => b.addEventListener('click', () => { load(); const go = () => { v.currentTime = A.steps[+b.dataset.s][0] + 0.05; play(); }; if (v.readyState >= 1) go(); else v.addEventListener('loadedmetadata', go, { once: true }); }));
  const seekAt = (x) => { const r = rail.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / r.width)); };
  rail.addEventListener('pointermove', (e) => { const p = seekAt(e.clientX), t = p * dur(); let s = 0; A.steps.forEach((st, i) => { if (t >= st[0]) s = i; }); tip.textContent = `${fmt(t)} · ${A.steps[s][1]}`; tip.style.left = `${p * 100}%`; });
  rail.addEventListener('click', (e) => { load(); const p = seekAt(e.clientX); const go = () => { v.currentTime = p * dur(); play(); }; if (v.readyState >= 1) go(); else v.addEventListener('loadedmetadata', go, { once: true }); });
  rail.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') v.currentTime += 5; if (e.key === 'ArrowLeft') v.currentTime -= 5; });
  $('pjSnd').addEventListener('click', (e) => { v.muted = !v.muted; e.currentTarget.textContent = v.muted ? '🔇' : '🔊'; e.currentTarget.setAttribute('aria-pressed', String(!v.muted)); document.dispatchEvent(new CustomEvent('ia:tv-sound', { detail: !v.muted && !v.paused })); });
  v.muted = true;
  $('pjFull').addEventListener('click', () => { const el = $('pjScreen'); if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen(); });

  // parts tabs
  host.querySelectorAll('.pj-part').forEach((b) => b.addEventListener('click', () => {
    host.querySelectorAll('.pj-part').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    const B = b.dataset.p === '1'; $('pjA').hidden = B; $('pjB').hidden = !B; if (B) v.pause();
  }));
  // colour bench
  host.querySelectorAll('.pj-sw button').forEach((b) => b.addEventListener('click', () => {
    host.querySelectorAll('.pj-sw button').forEach((x) => x.setAttribute('aria-checked', String(x === b)));
    $('pjShell').style.setProperty('--paint', b.dataset.c);
  }));
  // start loading the video when the section gets close
  if ('IntersectionObserver' in window) new IntersectionObserver(([en], o) => { if (en.isIntersecting) { v.preload = 'metadata'; v.src = A.src; loaded = true; o.disconnect(); } }, { rootMargin: '600px' }).observe(host);
  if (RM) host.classList.add('rm');
})();
