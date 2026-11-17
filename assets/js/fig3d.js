/* =========================================================
   IONIC ARCHIVE — 3D minifigure viewer
   One shared WebGL renderer draws every figure on the page into its own
   2D canvas, so a page can show many figures without many GL contexts.
   Markup: <div data-fig3d="fig-01" data-mode="white|sil" data-accent="#2F6BFF"></div>
   Meshes: assets/figures/fig-XX.iam (see DESIGN.md, converted from the Bambu 3MF files)
   ========================================================= */
(function () {
  'use strict';
  const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const views = new Set();
  let threeP = null, R = null, scene, cam, mesh, matWhite, matSil, matGlow, hemi, key, fill, rimA, rimB, running = false, last = 0, failed = false;
  let lightsOff = false, cutMark, cutWall, matCut;

  function loadThree() {
    if (window.THREE) return Promise.resolve();
    if (!threeP) threeP = new Promise((res, rej) => { const s = document.createElement('script'); s.src = CDN; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
    return threeP;
  }

  /* ---------- mesh files ---------- */
  const geos = {};
  function loadGeo(id) {
    if (!geos[id]) geos[id] = fetch(`assets/figures/${id}.iam`).then((r) => { if (!r.ok) throw new Error(id); return r.arrayBuffer(); }).then(parse);
    return geos[id];
  }
  function parse(buf) {
    const dv = new DataView(buf);
    const magic = String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3));
    if (magic !== 'IAM1' && magic !== 'IAM2') throw new Error('bad mesh');
    const vc = dv.getUint32(4, true), ic = dv.getUint32(8, true);
    const mn = [dv.getFloat32(12, true), dv.getFloat32(16, true), dv.getFloat32(20, true)];
    const mx = [dv.getFloat32(24, true), dv.getFloat32(28, true), dv.getFloat32(32, true)];
    const big = dv.getUint32(36, true) & 1;
    let off = 40, bodyIc = ic, qmn = mn, qmx = mx;
    if (magic === 'IAM2') {
      // IAM2 also carries the engraving cutters (Bambu "negative parts") after the body indices
      bodyIc = dv.getUint32(40, true);
      qmn = [dv.getFloat32(44, true), dv.getFloat32(48, true), dv.getFloat32(52, true)];
      qmx = [dv.getFloat32(56, true), dv.getFloat32(60, true), dv.getFloat32(64, true)];
      off = 68;
    }
    const q = new Uint16Array(buf, off, vc * 3); off += vc * 6; if (off % 4) off += 2;
    const idx = big ? new Uint32Array(buf, off, ic) : new Uint16Array(buf, off, ic);
    const pos = new Float32Array(vc * 3);
    for (let i = 0; i < pos.length; i++) { const k = i % 3; pos[i] = qmn[k] + (q[i] / 65535) * (qmx[k] - qmn[k]); }
    const all = new THREE.BufferGeometry();
    all.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    all.setIndex(new THREE.BufferAttribute(idx, 1));
    all.computeVertexNormals();
    const part = (a, b) => { const p = new THREE.BufferGeometry(); p.setAttribute('position', all.getAttribute('position')); p.setAttribute('normal', all.getAttribute('normal')); p.setIndex(new THREE.BufferAttribute(idx.subarray(a, b), 1)); return p; };
    const g = bodyIc < ic ? part(0, bodyIc) : all;
    g.userData = { h: mx[1] - mn[1], w: Math.max(mx[0] - mn[0], mx[2] - mn[2]), cut: bodyIc < ic ? part(bodyIc, ic) : null };
    return g;
  }

  /* ---------- shared renderer ---------- */
  function initRenderer() {
    if (R || failed) return !!R;
    try {
      R = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) { failed = true; return false; }
    R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    R.outputEncoding = THREE.sRGBEncoding;
    // linear tone mapping keeps filament colours saturated (ACES washes bright plastics out to pastel)
    R.toneMapping = THREE.LinearToneMapping;
    R.toneMappingExposure = 0.95;
    R.setClearColor(0x000000, 0);
    R.setScissorTest(true);
    scene = new THREE.Scene();
    cam = new THREE.PerspectiveCamera(26, 1, 1, 2000);
    // white satin PLA, as printed
    matWhite = new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#F4F1EA').convertSRGBToLinear(), roughness: 0.46, metalness: 0, clearcoat: 0.3, clearcoatRoughness: 0.4 });
    // secret figure: glossy black silhouette that still catches the rim light
    matSil = new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#0D0E10').convertSRGBToLinear(), roughness: 0.32, metalness: 0.1, clearcoat: 0.6, clearcoatRoughness: 0.2 });
    hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    key = new THREE.DirectionalLight(0xffffff, 1.25); key.position.set(70, 120, 140);
    fill = new THREE.DirectionalLight(0xffffff, 0.35); fill.position.set(-140, 40, 80);
    rimA = new THREE.DirectionalLight(0xffffff, 1.9); rimA.position.set(-90, 90, -150);
    rimB = new THREE.DirectionalLight(0xffffff, 1.1); rimB.position.set(140, 30, -90);
    scene.add(hemi, key, fill, rimA, rimB);
    // glow-in-the-dark filament, seen with the lights off
    matGlow = new THREE.MeshStandardMaterial({ color: new THREE.Color('#9CFF6E').convertSRGBToLinear(), emissive: new THREE.Color('#5CFF3A').convertSRGBToLinear(), emissiveIntensity: 0.4, roughness: 0.55, metalness: 0, envMapIntensity: 0.2 });
    mesh = new THREE.Mesh(new THREE.BufferGeometry(), matWhite);
    scene.add(mesh);
    /* engraved text (the "IONIC" / "archive" lettering): stencil-buffer subtraction.
       1) the cutters' front faces that sit in front of the figure surface mark the stencil;
       2) where marked, the cutters' inner (back) faces lying behind that surface are drawn:
          those are the walls and floor of the engraving. */
    const empty = new THREE.BufferGeometry();
    cutMark = new THREE.Mesh(empty, new THREE.MeshBasicMaterial({
      colorWrite: false, depthWrite: false, side: THREE.FrontSide,
      stencilWrite: true, stencilRef: 1, stencilFunc: THREE.AlwaysStencilFunc, stencilZPass: THREE.ReplaceStencilOp
    }));
    matCut = new THREE.MeshStandardMaterial({
      color: 0x888888, roughness: 0.85, metalness: 0, side: THREE.BackSide, depthFunc: THREE.GreaterDepth, depthWrite: false,
      stencilWrite: true, stencilRef: 1, stencilFunc: THREE.EqualStencilFunc, stencilZPass: THREE.KeepStencilOp
    });
    cutWall = new THREE.Mesh(empty, matCut);
    mesh.renderOrder = 0; cutMark.renderOrder = 1; cutWall.renderOrder = 2;
    mesh.add(cutMark, cutWall);
    // studio reflection map: soft-box stripes on a grey sweep, so gloss and chrome have something to reflect
    const c = document.createElement('canvas'); c.width = 512; c.height = 256;
    const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, '#ffffff'); g.addColorStop(.35, '#cfd5df'); g.addColorStop(.55, '#6d7480'); g.addColorStop(1, '#1b1d22');
    x.fillStyle = g; x.fillRect(0, 0, 512, 256);
    x.fillStyle = '#ffffff'; x.fillRect(60, 40, 70, 60); x.fillRect(300, 30, 140, 26);
    x.fillStyle = 'rgba(255,255,255,.7)'; x.fillRect(0, 118, 512, 6);
    x.fillStyle = '#9fb6ff'; x.fillRect(180, 70, 60, 40);
    x.fillStyle = '#ffc2e2'; x.fillRect(420, 80, 50, 50);
    const tex = new THREE.CanvasTexture(c); tex.mapping = THREE.EquirectangularReflectionMapping; tex.encoding = THREE.sRGBEncoding;
    const pm = new THREE.PMREMGenerator(R);
    scene.environment = pm.fromEquirectangular(tex).texture;
    tex.dispose(); pm.dispose();
    return true;
  }

  /* ---------- random colour: every Dropout can be printed in any filament colour,
     so each figure keeps cycling through the palette (no fixed colour is promised) ---------- */
  const PALETTE = ['#F4F1EA', '#2E55F5', '#FF7EB9', '#3EE08F', '#FFD83D', '#FF8A3C', '#E5322D', '#8A6BFF', '#22B5E3', '#C8FF4D', '#A9AFB8']; // no black: black is reserved for the hidden secret figure
  const HOLD = 2.4, FADE = 0.7; // seconds per colour, seconds of cross-fade
  const near = (a, b) => { const x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16); return Math.abs((x >> 16) - (y >> 16)) + Math.abs(((x >> 8) & 255) - ((y >> 8) & 255)) + Math.abs((x & 255) - (y & 255)) < 150; };
  function colourAt(v, t) {
    if (!v.pal) {
      // skip colours that would vanish into the card behind the figure
      v.pal = PALETTE.filter((c) => !v.bg || !near(c, v.bg));
      for (let i = v.pal.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [v.pal[i], v.pal[j]] = [v.pal[j], v.pal[i]]; }
      v.lin = v.pal.map((c) => new THREE.Color(c).convertSRGBToLinear());
      v.tc0 = t - Math.random() * HOLD;
      v.col = new THREE.Color();
    }
    if (RM) return v.col.copy(v.lin[0]);
    const span = HOLD + FADE, k = (t - v.tc0) / span, i = Math.floor(k) % v.lin.length, f = (k - Math.floor(k)) * span;
    const a = v.lin[i], b = v.lin[(i + 1) % v.lin.length];
    const m = f < HOLD ? 0 : (f - HOLD) / FADE, e = m * m * (3 - 2 * m);
    return v.col.copy(a).lerp(b, e);
  }

  /* ---------- views ---------- */
  function attach(el) {
    if (el._fig) return el._fig;
    const v = {
      el, id: el.dataset.fig3d, mode: el.dataset.mode || 'white', accent: el.dataset.accent || '#2F6BFF',
      bg: el.dataset.bg || null,
      spin: parseFloat(el.dataset.spin || '0.45'), rot: parseFloat(el.dataset.start || '-0.5'), vel: 0, drag: null,
      visible: false, geo: null, pop: 0, peek: false, t0: Math.random() * 10
    };
    el._fig = v;
    el.classList.add('f3d');
    el.insertAdjacentHTML('beforeend', `<img class="f3d__poster" src="assets/figures/${v.id}-poster.png" alt="" aria-hidden="true"><canvas class="f3d__cv" aria-hidden="true"></canvas><span class="f3d__load mono" aria-hidden="true">LOADING TAPE…</span>`);
    v.cv = el.querySelector('canvas'); v.ctx = v.cv.getContext('2d'); v.poster = el.querySelector('.f3d__poster');
    if (v.mode === 'sil') el.classList.add('is-sil');
    // drag to spin (horizontal only, so vertical page scrolling still works on touch)
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      v.drag = { x: e.clientX, t: performance.now() }; v.vel = 0; el.setPointerCapture(e.pointerId); el.classList.add('is-drag');
      if (el.dataset.peek !== undefined) v.peek = true;
    });
    el.addEventListener('pointermove', (e) => {
      if (!v.drag) return;
      const now = performance.now(), dx = e.clientX - v.drag.x;
      v.rot += dx * 0.012; v.vel = (dx * 0.012) / Math.max(16, now - v.drag.t) * 16;
      v.drag = { x: e.clientX, t: now };
    });
    const end = () => { v.drag = null; v.peek = false; el.classList.remove('is-drag'); };
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
    el.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') v.rot -= 0.3; if (e.key === 'ArrowRight') v.rot += 0.3; });
    io.observe(el);
    views.add(v);
    return v;
  }

  function show(v) {
    if (failed) return;
    loadThree().then(() => {
      if (!initRenderer()) { v.el.classList.add('is-fallback'); return; }
      return loadGeo(v.id).then((g) => {
        v.geo = g; v.pop = 1; v.el.classList.add('is-ready'); start();
      });
    }).catch(() => v.el.classList.add('is-fallback'));
  }

  const io = new IntersectionObserver((ents) => ents.forEach((e) => {
    const v = e.target._fig; if (!v) return;
    v.visible = e.isIntersecting;
    if (v.visible && !v.geo) show(v);
    if (v.visible) start();
  }), { rootMargin: '200px 0px' });

  function start() { if (!running && R) { running = true; last = performance.now(); requestAnimationFrame(loop); } }

  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    let any = false;
    views.forEach((v) => {
      if (!v.visible || !v.geo || !document.body.contains(v.el)) return;
      any = true;
      if (!v.drag) {
        v.rot += v.vel; v.vel *= 0.94;
        if (!RM && Math.abs(v.vel) < 0.002) v.rot += v.spin * dt;
      }
      if (v.pop > 0) v.pop = Math.max(0, v.pop - dt * 2.2);
      draw(v, now / 1000);
    });
    if (any) requestAnimationFrame(loop); else running = false;
  }

  function draw(v, t) {
    const r = v.el.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
    const pr = R.getPixelRatio();
    // grow the shared drawing buffer when a bigger view appears
    const size = R.getSize(new THREE.Vector2());
    if (size.x < w || size.y < h) R.setSize(Math.max(size.x, w), Math.max(size.y, h), false);
    const bw = Math.floor(w * pr), bh = Math.floor(h * pr);
    if (v.cv.width !== bw || v.cv.height !== bh) { v.cv.width = bw; v.cv.height = bh; }

    const g = v.geo, H = g.userData.h;
    mesh.geometry = g;
    const dark = v.mode === 'sil' && !v.peek;
    const glow = !dark && (v.glow || lightsOff);
    if (dark) mesh.material = matSil;
    else if (glow) { matGlow.emissiveIntensity = RM ? 0.42 : 0.36 + Math.sin(t * 1.8 + v.t0) * 0.1; mesh.material = matGlow; }
    else { matWhite.color.copy(colourAt(v, t)); mesh.material = matWhite; }
    // engraving: same colour as the body, in shadow
    const cg = g.userData.cut;
    cutMark.visible = cutWall.visible = !!cg;
    if (cg) {
      cutMark.geometry = cutWall.geometry = cg;
      matCut.color.copy(dark ? matSil.color : glow ? matGlow.color : matWhite.color).multiplyScalar(dark ? 1 : 0.5);
      matCut.emissive.copy(glow ? matGlow.emissive : new THREE.Color(0)).multiplyScalar(glow ? matGlow.emissiveIntensity * 0.45 : 0);
    }
    // room light: dim when the figure is glowing, just enough to keep its volume readable
    const L = glow ? 0.32 : 1;
    hemi.intensity = 0.5 * L; key.intensity = 1.25 * L; fill.intensity = 0.35 * L; rimB.intensity = 1.1 * L;
    // tiny idle float + pop-in with overshoot when a figure arrives
    const q = 1 - v.pop, b = q - 1, s = v.pop > 0 ? 0.6 + 0.4 * (1 + 2.7 * b * b * b + 1.7 * b * b) : 1;
    mesh.scale.setScalar(s);
    mesh.rotation.set(0, v.rot, 0);
    mesh.position.y = RM ? 0 : Math.sin(t * 1.6 + v.t0) * H * 0.012;

    const acc = new THREE.Color(v.accent);
    rimA.color.copy(acc); rimB.color.copy(acc).lerp(new THREE.Color(0xffffff), 0.45);
    hemi.groundColor.copy(acc).multiplyScalar(0.55);
    rimA.intensity = (dark ? 3.2 : 1.9) * (glow ? 0.12 : 1);

    const aspect = w / h;
    cam.aspect = aspect;
    let fitH = H * 1.18;
    const needW = g.userData.w * 1.25;
    if (needW / aspect > fitH) fitH = needW / aspect;
    const dist = fitH / 2 / Math.tan((cam.fov * Math.PI) / 360);
    cam.position.set(0, H * 0.56, dist);
    cam.lookAt(0, H * 0.5, 0);
    cam.updateProjectionMatrix();

    const fullH = R.domElement.height;
    // wipe the whole shared buffer so no edge of a previous (bigger) view leaks in
    R.setScissorTest(false); R.clear(); R.setScissorTest(true);
    R.setViewport(0, 0, w, h); R.setScissor(0, 0, w, h);
    R.render(scene, cam);
    v.ctx.clearRect(0, 0, bw, bh);
    v.ctx.drawImage(R.domElement, 0, fullH - bh, bw, bh, 0, 0, bw, bh);
  }

  // swap the figure shown in a view (used by the unboxing game)
  function set(el, id, mode, opts) {
    const v = attach(el);
    opts = opts || {};
    if (opts.accent) v.accent = opts.accent;
    if (opts.bg && opts.bg !== v.bg) { v.bg = opts.bg; v.pal = null; }
    v.glow = !!opts.glow;
    v.mode = mode || 'white'; el.classList.toggle('is-sil', v.mode === 'sil');
    if (v.id !== id) {
      v.id = id; v.geo = null; el.classList.remove('is-ready');
      v.poster.src = `assets/figures/${id}-poster.png`;
      if (v.visible) show(v);
    } else v.pop = 1;
    v.rot = -0.5;
  }

  function scan(root) { (root || document).querySelectorAll('[data-fig3d]').forEach(attach); }
  // "lights off": every figure on the page shows its glow-in-the-dark edition
  function lights(off) { lightsOff = !!off; views.forEach((v) => { v.pop = 0.6; }); start(); }
  window.Fig3D = { scan, attach, set, lights };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => scan()); else scan();
})();
