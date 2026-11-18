(function () {
  'use strict';
  const D = window.IA, A = window.Art, U = window.IAUI;
  const { $, $$ } = U;
  const id = (new URLSearchParams(location.search).get('id') || 'IA-0044').toUpperCase();
  const p = U.byId(id) || D.products[0];
  const sold = p.status === 'sold', reserved = p.status === 'reserved';
  const pad = (n) => String(n).padStart(2, '0');

  /* meta / SEO */
  document.title = `${p.name} (${p.year}) · ${p.id} — Ionic Archive`;
  $('meta[name="description"]').setAttribute('content', `${p.name}, ${p.year}, ${p.format}. Grade ${p.grade}, tested piece by piece. ${p.story}`);
  const ld = document.createElement('script'); ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Product', name: p.name, sku: p.id, brand: { '@type': 'Brand', name: p.brand },
    description: `${p.story} ${p.storySub}`, productionDate: String(p.year),
    image: p.photos ? p.photos.list.map(([f]) => new URL(`${p.photos.dir}/${f}.jpg`, location.href).href) : [`https://ionicarchive.com/img/${p.id.toLowerCase()}-1.avif`],
    offers: { '@type': 'Offer', price: p.price, priceCurrency: 'EUR', itemCondition: 'https://schema.org/UsedCondition',
      availability: sold ? 'https://schema.org/SoldOut' : reserved ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock',
      url: (p.links && (p.links.ebay || p.links.vinted)) || `https://ionicarchive.com/archive/${p.id.toLowerCase()}` }
  });
  document.head.appendChild(ld);

  /* gallery */
  const second = p.type === 'compacts' ? 'Back and screen' : p.type === 'camcorders' ? 'Screen open' : 'Stack';
  const VIEWS = p.photos
    ? p.photos.list.map(([, l], i) => ({ l, html: (big) => U.photo(p, i, { eager: big && i === 0 }) }))
    : [
      { l: 'Front', html: () => A.product(p, 'a') },
      { l: second, html: () => A.product(p, 'b') },
      { l: p.type === 'accessories' ? 'Label' : 'Lens', html: () => A.product(p, 'a', { crop: 'lens' }) },
      { l: 'Wear detail', html: () => A.product(p, 'a', { crop: 'detail', wear: true }) },
      { l: 'In the box', html: () => A.kit(p) }
    ];
  const real = !!p.photos;

  /* buying: nothing is sold here, each piece links out to its own eBay / Vinted listing */
  const shops = U.buyLinks(p);
  const ext = (s, cls, label) => `<a class="btn ${cls} btn--mkt btn--mkt-${s.k}" href="${s.url}" target="_blank" rel="noopener" data-mkt="${s.k}">${label || `Buy on ${s.name}`} <span class="arr" aria-hidden="true">↗</span><span class="sr"> (opens ${s.name} in a new tab)</span></a>`;
  function cta() {
    if (sold) return `<button class="btn btn--block" disabled>Sold for ${U.eur(p.price)}</button><a class="btn btn--line btn--block" href="index.html#nl-h">Alert me to similar pieces</a>`;
    if (reserved) return `<button class="btn btn--block" disabled>Reserved · sale in progress</button><button class="btn btn--line btn--block" type="button" data-notify>Alert me if it comes back</button>`;
    return `<div class="mkt">${shops.map((s, i) => ext(s, i ? 'btn--line' : 'btn--ion')).join('')}</div>
<p class="fine mkt__note">One of a kind · quantity 1. You'll check out on eBay or Vinted, with their buyer protection. Look for <b class="mono">${p.id}</b> in the listing title.</p>`;
  }
  const g = D.grades[p.grade];
  const tests = p.tests;
  const date = new Date(p.added).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  /* ---------- the free Dropout: live 3D figure, odds, "shake the bag" ---------- */
  const F = D.figures, NF = F.length, shown = F.filter((f) => f.tier !== 'secret');
  const tierOf = (t) => D.tiers.find((x) => x.id === t);
  const chip = (t) => `<span class="chip chip--${t}">${tierOf(t).label}</span>`;
  const glow1in = Math.round(100 / D.glowOdds);
  const f0 = shown[Math.floor(Math.random() * shown.length)];
  const mfx = `<section class="mfx" id="mfx" aria-labelledby="mfx-h" style="--acc:${f0.accent}">
  <div class="mfx__stage">
    <div class="mfx__disc" aria-hidden="true"></div>
    <div class="mfx__fig" id="mfxFig" data-fig3d="${f0.model}" data-bg="${f0.accent}" data-accent="${f0.rim}" data-spin="0.8" tabindex="0" aria-label="3D minifigure, drag to spin"></div>
    <div class="mfx__bag" aria-hidden="true">${A.box()}</div>
    <span class="mfx__free" aria-hidden="true">Free</span>
    <span class="mfx__drag mono" aria-hidden="true">↔ drag</span>
  </div>
  <div class="mfx__body">
    <p class="mfx__k mono"><span class="mfx__plus">+1</span> In the parcel · Series 01</p>
    <h2 class="mfx__h" id="mfx-h">A mystery <em>Dropout</em> minifigure, on us.</h2>
    <p class="mfx__p">A 3D-printed camcorder kid, sealed in a foil blind bag. Random figure, random colour. You find out when you open it.</p>
    <div class="mfx__now" aria-live="polite"><span class="mono mfx__could" id="mfxLbl">Could be</span><b id="mfxName">${f0.name}</b><span id="mfxChip">${chip(f0.tier)}</span></div>
    <div class="mfx__odds" role="img" aria-label="Odds: ${D.tiers.map((t) => `${t.label} ${t.odds}%`).join(', ')}. Glow chase 1 in ${glow1in}.">${D.tiers.map((t) => `<i class="o o--${t.id}" style="flex:${t.odds}" title="${t.label} · ${t.odds}%"></i>`).join('')}</div>
    <div class="mfx__legend mono" aria-hidden="true">${D.tiers.map((t) => `<span><i class="o--${t.id}"></i>${t.label} ${t.odds}%</span>`).join('')}<span class="g"><i></i>Glow 1 in ${glow1in}</span></div>
    <div class="mfx__act"><button class="mfx__shake" type="button" id="mfxShake"><span aria-hidden="true">✦</span> Shake the bag</button><a class="mfx__all" href="dropouts.html">Meet all ${NF} →</a></div>
    <p class="mfx__fine mono" id="mfxFine">Just for fun: the one in your parcel is a real surprise.</p>
  </div>
</section>`;

  /* ---------- plain-English notes for spec jargon ---------- */
  const GLOSS = [
    [/super ccd/i, 'Fujifilm\'s own sensor with octagonal pixels in a honeycomb layout. Famous for clean high-ISO files years before anyone else.'],
    [/ccd/i, 'The sensor type of the era. CCDs read light in one sweep, which gives the punchy colour and slightly "wet" highlights people now chase. Phones use CMOS.'],
    [/minidv/i, 'Digital video on a tiny cassette, 1995–2010s. 25 Mbit/s, 720×576, interlaced: the soft, smeary motion of every 2000s home video.'],
    [/digital8/i, 'Sony\'s bridge format: DV-quality digital video recorded on cheap Hi8 tapes. It can usually play back old analogue 8 mm tapes too.'],
    [/hdmi/i, 'Plug straight into any modern TV with an HDMI cable and play the clips at full resolution, no computer needed.'],
    [/avchd|full hd/i, 'Full HD 1920×1080 in AVCHD, the format of the first consumer HD camcorders. Crisp, a little over-sharpened, unmistakably early-2010s.'],
    [/1394|firewire|dv · av/i,'The DV port (FireWire / i.LINK). Plug it into a computer with a FireWire card and capture the tape losslessly, frame for frame.'],
    [/compactflash/i, 'The chunky memory card of early digicams. Still easy to find; a 1–2 GB card is more than this camera will ever fill.'],
    [/memory stick/i, 'Sony\'s own card format. Use small cards (up to 128 MB on older models, Pro/Duo for later ones): very large cards may not be read.'],
    [/xd-picture/i, 'Olympus and Fujifilm\'s tiny card. Use Type M or H up to 2 GB; check the camera\'s manual for the largest it supports.'],
    [/floppy/i, 'A standard 1.44 MB 3.5" floppy: about 15–40 photos per disk. Blank disks are still sold, and any USB floppy drive reads them on a modern computer.'],
    [/dvd-r/i, 'Records to 8 cm mini DVDs. Finalise the disc in the camera and it plays in most DVD players, or copy the files to a computer with a DVD drive.'],
    [/sdhc|sdxc/i,'Takes ordinary modern SD cards. A 16–32 GB SDHC card holds hours of Full HD footage.'],
    [/^sd$|\bsd\b/i,'Secure Digital: the card format that won. Use a standard SD card up to 2 GB (not SDHC) on cameras from this period.'],
    [/equiv|focal/i, 'The zoom range translated into 35 mm film terms, so you can compare it: ~35 mm is wide, ~105 mm is a portrait crop.'],
    [/aperture|f\//i, 'How wide the lens opens. Lower number = more light and softer background. Wide-open shots are where the flash look comes from.'],
    [/optical zoom|zoom/i, 'Real glass moving inside the lens, not cropping. Image quality holds at the long end, unlike digital zoom.'],
    [/^iso/i, 'Sensitivity to light. Low ISO is clean; the highest settings on 2000s cameras give the grainy, colourful noise people love at night.'],
    [/lcd|screen/i, 'Small and low-resolution by today\'s standards. Frame with it, judge sharpness on a computer.'],
    [/aa\b/i, 'Runs on standard AA batteries: rechargeable NiMH cells work best and you\'ll never be stuck without power.'],
    [/lithium|battery/i, 'Original-type rechargeable pack. Third-party replacements are still made and cheap.'],
    [/video/i, 'VGA video: 640×480. Low-res, but with the exact look of 2000s party clips.']
  ];
  const gloss = (k, v) => { for (const [re, t] of GLOSS) if (re.test(k) || re.test(v)) return t; return ''; };

  /* era: where this piece sits on the archive's timeline (1999 to the newest piece) */
  const Y0 = Math.min(1999, ...D.products.map((x) => x.year)), Y1 = Math.max(2012, ...D.products.map((x) => x.year)), now = new Date().getFullYear();
  const sameYear = D.products.filter((x) => x.year === p.year && x.id !== p.id);
  const era = `<div class="era">
    <div class="era__top"><span class="mono">Made in</span><b>${p.year}</b><span class="mono era__ago">${now - p.year} years ago</span></div>
    <div class="era__track" role="img" aria-label="${p.year} on a timeline from ${Y0} to ${Y1}">${Array.from({ length: Y1 - Y0 + 1 }, (_, i) => { const y = Y0 + i; const n = D.products.filter((x) => x.year === y).length; return `<span class="era__y${y === p.year ? ' on' : ''}"><i style="--n:${Math.min(n, 5)}"></i><em>${y === Y0 || y === Y1 || y === p.year ? `'${String(y).slice(2)}` : ''}</em></span>`; }).join('')}</div>
    ${sameYear.length ? `<p class="era__same"><span class="mono">Also from ${p.year} in the archive</span>${sameYear.slice(0, 4).map((x) => `<a href="product.html?id=${x.id}">${x.name}</a>`).join('')}</p>` : ''}
  </div>`;

  /* loupe: a real close-up photo you can inspect yourself */
  const loupeIdx = real ? Math.max(0, p.photos.list.findIndex(([f]) => /detail|lens/.test(f))) : -1;
  const loupeSrc = real ? `${p.photos.dir}/${p.photos.list[loupeIdx][0]}.jpg` : '';

  const SECS = [['rec-s1', 'Story'], ['rec-s2', 'Condition'], ['rec-s3', 'Tested'], ['rec-s4', 'In the box'], ['rec-s5', 'Specs']].concat(p.samples.length ? [['rec-s6', 'Shot on it']] : []);

  $('#main').innerHTML = `
<div class="wrap"><nav class="crumbs mono" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="archive.html">Archive</a> / <a href="archive.html?type=${p.type}">${U.TYPE[p.type]}</a> / <span aria-current="page">${p.id}</span></nav></div>
<section class="pdp wrap">
  <div class="pdp__gallery">
    <div class="pdp__stage${sold ? ' is-sold' : ''}${real ? ' is-photo' : ''}" id="stage" tabindex="0" role="img" aria-label="${p.name}: ${VIEWS[0].l}. Press Enter to zoom.">
      <div class="art" id="stageArt">${VIEWS[0].html(true)}</div>
      ${U.vf(U.modeOf(p))}
      ${sold ? `<span class="sold-badge" aria-hidden="true">Sold · ${U.eur(p.price)}</span>` : ''}
      <span class="zoom-hint" aria-hidden="true">Tap to zoom</span>
    </div>
    <div class="thumbs" role="tablist" aria-label="Views">${VIEWS.map((v, i) => `<button class="thumb" role="tab" type="button" aria-selected="${i === 0}" data-v="${i}" aria-label="${v.l}">${v.html()}<span>${v.l}</span></button>`).join('')}</div>
    <p class="label gal-note">${real ? `${VIEWS.length} photos of unit ${p.id} · white balance corrected, nothing retouched` : `Views of unit ${p.id} · 5500 K studio light · no retouching`}</p>
  </div>

  <aside class="pdp__info" aria-label="Archive record">
    <div class="pdp__code"><span class="mono">${p.id}</span>${U.statusTag(p)}</div>
    <h1 class="pdp__name">${p.name}</h1>
    <dl class="meta-table">
      <dt>Year</dt><dd>${p.year}</dd>
      <dt>Country</dt><dd>${p.country}</dd>
      <dt>Format</dt><dd>${p.format}</dd>
      ${p.sensor !== '—' ? `<dt>Sensor</dt><dd>${p.sensor}</dd>` : ''}
      <dt>Condition</dt><dd><span class="grade-pill">${g[0]}</span>${g[1]}</dd>
    </dl>
    <p class="price${sold ? ' sold-price' : ''}">${sold ? `<span class="lbl">Sold for</span><s>${U.eur(p.price)}</s>` : U.eur(p.price)}</p>
    ${sold ? `<p class="fine">This piece found a new home. Its record, photos and tests stay here for reference.</p>` : '<p class="fine">Listed price · shipping and the final total are shown on eBay or Vinted</p>'}
    <div class="buy" id="buy">${cta()}</div>
    ${sold ? '' : mfx}
    <ul class="ship">
      <li>${A.icon('shield')}<span><b>Buyer protection</b> · you pay on eBay or Vinted, never on this site.</span></li>
      <li>${A.icon('card')}<span><b>Same unit, same record</b> · the listing shows code ${p.id} and these photos.</span></li>
      <li>${A.icon('truck')}<span><b>Ships in 24–48 h</b>, tracked, with the Dropout in the parcel.</span></li>
      <li>${A.icon('back')}<span><b>Questions first?</b> Message us on either platform or <a href="support.html#contact">here</a>.</span></li>
    </ul>
    <a class="link buyhow" href="support.html#buying">How buying works →</a>
  </aside>
</section>

<nav class="rnav" id="rnav" aria-label="Record sections"><div class="wrap rnav__in">
  <span class="rnav__id mono">${p.id}</span>
  <ol>${SECS.map(([k, l], i) => `<li><a href="#${k}" data-k="${k}"><span class="mono">${pad(i + 1)}</span>${l}</a></li>`).join('')}</ol>
  <span class="rnav__bar" aria-hidden="true"><i id="rnavBar"></i></span>
</div></nav>

<div class="wrap">
  <section class="psec rv" id="rec-s1" aria-labelledby="s1-h"><div class="psec__h"><span class="mono">01</span><h2 id="s1-h">The story of the model</h2></div>
    <div class="storyg"><div><p class="story">${p.story}</p><p class="story-sub">${p.storySub}</p></div>${era}</div></section>

  <section class="psec rv" id="rec-s2" aria-labelledby="s2-h"><div class="psec__h"><span class="mono">02</span><h2 id="s2-h">Condition</h2><p class="fine" style="margin-top:8px">Graded under raking light with a 10× loupe. ${real ? 'Now it\'s your turn.' : ''}</p></div>
    <div>
      <div class="scale" role="list">${Object.values(D.grades).map(([k, n, d]) => `<div role="listitem" class="${k === p.grade ? 'on' : ''}"${k === p.grade ? ' aria-current="true"' : ''}>${k === p.grade ? '<span class="scale__this mono">This unit</span>' : ''}<b>${k}</b><span><strong style="font-weight:500">${n}.</strong> ${d}</span></div>`).join('')}</div>
      <div class="cond${real ? '' : ' cond--nophoto'}">
        ${real ? `<figure class="loupe" id="loupe">
          <img src="${loupeSrc}" alt="${p.name}, close-up for inspection" loading="lazy" decoding="async">
          <span class="loupe__lens" aria-hidden="true" style="background-image:url('${loupeSrc}')"><i class="mono">2.5×</i></span>
          <figcaption class="mono"><span class="loupe__hint">◎ Move over the photo to inspect</span><span>Unretouched · ${p.id}</span></figcaption>
        </figure>` : ''}
        <div class="cond__notes"><p class="label">Inspection notes · ${p.notes.length}</p>
          <ul class="notes">${p.notes.map((x, i) => `<li><span class="mono">${pad(i + 1)}</span><span>${x}</span></li>`).join('')}</ul>
        </div>
      </div>
    </div></section>

  <section class="psec rv" id="rec-s3" aria-labelledby="s3-h"><div class="psec__h"><span class="mono">03</span><h2 id="s3-h">Tested</h2><p class="fine" style="margin-top:8px">${tests.length} checks. Watch the bench run them.</p></div>
    <div>
      <div class="bench2" id="bench" data-state="ready">
        <div class="bench2__head mono"><span><i class="bench2__led"></i>Bench IA-02 · Diagnostic · ${p.id}</span><span id="benchCount">00/${pad(tests.length)}</span></div>
        <ol class="bench2__list">${tests.map(([t, r], i) => `<li><span class="n mono">${pad(i + 1)}</span><span class="t">${t}</span><span class="d" aria-hidden="true"></span><span class="r mono"><em class="wait">···</em><em class="ok">✓ ${r}</em></span></li>`).join('')}</ol>
        <div class="bench2__bar" aria-hidden="true"><i id="benchBar"></i></div>
        <div class="bench2__foot mono"><span id="benchStatus" aria-live="polite">Ready</span><button type="button" id="benchRun">▶ Run again</button></div>
      </div>
      <p class="tested-by">Tested on ${date} · bench IA-02 · printed report included in the box</p>
    </div></section>

  <section class="psec rv" id="rec-s4" aria-labelledby="s4-h"><div class="psec__h"><span class="mono">04</span><h2 id="s4-h">In the box</h2><p class="fine" style="margin-top:8px">Everything that ships with this unit.</p></div>
    <ol class="unbox">${p.box.map((b, i) => `<li style="--i:${i}"><span class="mono">${pad(i + 1)}</span>${b}</li>`).join('')}
      <li style="--i:${p.box.length}" class="unbox__doc"><span class="mono">+</span>Printed test report and archive record</li>
      ${sold ? '' : `<li style="--i:${p.box.length + 1}" class="unbox__mf"><button type="button" id="boxBag"><span class="unbox__bag" aria-hidden="true">${A.box()}</span><span class="unbox__t"><span class="mono">+1 · free</span><b>Mystery Dropout</b><em>Sealed foil bag · tap to shake</em></span></button></li>`}
    </ol></section>

  <section class="psec rv" id="rec-s5" aria-labelledby="s5-h"><div class="psec__h"><span class="mono">05</span><h2 id="s5-h">Specifications</h2><p class="fine" style="margin-top:8px">Tap <b class="gl-dot">?</b> for what a spec means in practice.</p></div>
    <div class="manual"><div class="manual__head"><span>Specifications</span><span>${p.id}</span></div>
    <div class="manual__list">${p.specs.map(([k, v], i) => { const t = gloss(k, v); return `<div class="manual__item">
      <div class="manual__row"><span class="manual__k">${k}${t ? `<button class="gl" type="button" aria-expanded="false" aria-controls="specgl-${i}" aria-label="What does ${k} mean?">?</button>` : ''}</span><i aria-hidden="true"></i><span class="manual__v">${v}</span></div>
      ${t ? `<p class="manual__gl" id="specgl-${i}" hidden>${t}</p>` : ''}</div>`; }).join('')}</div>
    <p class="manual__foot">Manufacturer data. Design and specifications may vary between production batches.</p></div></section>

  ${p.samples.length ? `<section class="psec rv" id="rec-s6" aria-labelledby="s6-h"><div class="psec__h"><span class="mono">06</span><h2 id="s6-h">Shot on this unit</h2><p class="fine" style="margin-top:8px">Original files, no filters.</p></div>
    <div class="samples">${p.samples.map((k, i) => `<figure class="shotf">${A.scene(k, p.type === 'camcorders' ? { video: true, tc: `0:0${i}:1${i}:0${i + 2}`, label: `Frame shot on the ${p.name}` } : { stamp: `'${String(p.year).slice(2)} 0${i + 3} 1${i}`, label: `Photo taken with the ${p.name}` })}<figcaption><span>${p.id} · ${pad(i + 1)}</span><span>${p.type === 'camcorders' ? 'Clip · SP' : 'Original JPEG'}</span></figcaption></figure>`).join('')}</div></section>` : ''}

  <section class="sec--tight" aria-labelledby="rel-h" style="border-top:1px solid var(--ink)">
    <div class="sec-head" style="border:0;padding-top:0"><h2 class="h3" id="rel-h">More from the archive</h2><a class="link" href="archive.html">The full archive →</a></div>
    <div class="grid grid--4" id="related"></div>
  </section>
</div>
<div class="buybar" id="buybar" aria-hidden="true"><div><div class="p">${sold ? `Sold · ${U.eur(p.price)}` : U.eur(p.price)}</div><div class="c">${p.id} · + 1 MINIFIGURE</div></div>${sold || reserved ? '' : `<div class="buybar__mkt">${shops.map((s, i) => ext(s, i ? 'btn--line' : 'btn--ion', s.name).replace('<a ', '<a tabindex="-1" ')).join('')}</div>`}</div>`;

  /* related */
  const rel = D.products.filter((x) => x.id !== p.id && x.status !== 'sold').sort((a, b) => (b.type === p.type) - (a.type === p.type)).slice(0, 4);
  $('#related').innerHTML = rel.map(U.card).join('');

  /* thumbs */
  const stage = $('#stage'), sa = $('#stageArt');
  $$('.thumb').forEach((t) => t.addEventListener('click', () => {
    $$('.thumb').forEach((x) => x.setAttribute('aria-selected', 'false'));
    t.setAttribute('aria-selected', 'true');
    const v = VIEWS[+t.dataset.v];
    sa.innerHTML = v.html(); stage.classList.remove('zoomed');
    stage.setAttribute('aria-label', `${p.name}: ${v.l}. Press Enter to zoom.`);
  }));
  /* zoom */
  const setOrigin = (x, y) => { const r = stage.getBoundingClientRect(); sa.style.transformOrigin = `${((x - r.left) / r.width) * 100}% ${((y - r.top) / r.height) * 100}%`; };
  stage.addEventListener('click', (e) => { setOrigin(e.clientX, e.clientY); stage.classList.toggle('zoomed'); });
  stage.addEventListener('mousemove', (e) => { if (stage.classList.contains('zoomed')) setOrigin(e.clientX, e.clientY); });
  stage.addEventListener('mouseleave', () => stage.classList.remove('zoomed'));
  stage.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sa.style.transformOrigin = '50% 50%'; stage.classList.toggle('zoomed'); } });

  /* notify */
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-notify]')) U.toast('We\'ll let you know if this piece comes back.');
  });

  /* ---------- the Dropout panel ---------- */
  const mfxEl = $('#mfx');
  if (mfxEl) {
    const fig = $('#mfxFig'), nm = $('#mfxName'), ch = $('#mfxChip'), lbl = $('#mfxLbl'), fine = $('#mfxFine');
    let ci = shown.indexOf(f0), hold = 0;
    const show = (f, o) => {
      o = o || {};
      mfxEl.style.setProperty('--acc', f.accent);
      if (window.Fig3D) window.Fig3D.set(fig, f.model, o.sil ? 'sil' : 'white', { bg: f.accent, accent: f.rim, glow: o.glow });
      fig.toggleAttribute('data-peek', !!o.sil);
      nm.textContent = o.sil ? '???' : f.name;
      ch.innerHTML = chip(f.tier) + (o.glow ? '<span class="chip chip--glow">Glow chase</span>' : '');
      mfxEl.classList.toggle('is-glow', !!o.glow);
      mfxEl.classList.toggle('is-secret', !!o.sil);
    };
    // the figure on the turntable keeps changing: any of them could be the one
    if (!U.RM) setInterval(() => {
      if (document.hidden || fig.classList.contains('is-drag') || Date.now() < hold) return;
      ci = (ci + 1) % shown.length; lbl.textContent = 'Could be'; show(shown[ci]);
    }, 3800);
    // shake the bag: a pretend pull with the real odds
    const pull = () => {
      let r = Math.random() * 100, tier = D.tiers[0].id;
      for (const t of D.tiers) { if (r < t.odds) { tier = t.id; break; } r -= t.odds; }
      const pool = F.filter((f) => f.tier === tier);
      return { f: pool[Math.floor(Math.random() * pool.length)] || shown[0], glow: Math.random() * 100 < D.glowOdds };
    };
    let busy = false, pulls = 0;
    const shake = () => {
      if (busy) return; busy = true; pulls++;
      hold = Date.now() + 12000;
      mfxEl.classList.remove('is-pulled'); mfxEl.classList.add('is-shaking');
      lbl.textContent = 'Shaking the bag…'; nm.textContent = '???'; ch.innerHTML = '';
      mfxEl.classList.remove('is-glow', 'is-secret'); fine.textContent = 'A sealed foil bag, same as the one in your parcel. What\'s inside?';
      setTimeout(() => {
        const { f, glow } = pull(), sec = f.tier === 'secret';
        mfxEl.classList.remove('is-shaking'); void mfxEl.offsetWidth; mfxEl.classList.add('is-pulled');
        lbl.textContent = 'Out of the bag';
        show(f, { glow, sil: sec });
        fine.textContent = sec ? 'The secret one. Hold the figure to peek, then imagine it in your parcel.'
          : glow ? `Glow chase! About 1 bag in ${glow1in} lights up in the dark.`
            : pulls > 2 ? 'Keep shaking: the real bag only gets opened once.' : 'Just for fun: the one in your parcel is a real surprise.';
        $('#mfxShake').lastChild.textContent = ' Shake another bag';
        busy = false;
      }, U.RM ? 0 : 1300);
    };
    $('#mfxShake').addEventListener('click', shake);
    const bag = $('#boxBag');
    if (bag) bag.addEventListener('click', () => {
      bag.classList.remove('is-shake'); void bag.offsetWidth; bag.classList.add('is-shake');
      mfxEl.scrollIntoView({ behavior: U.RM ? 'auto' : 'smooth', block: 'center' });
      setTimeout(shake, U.RM ? 0 : 500);
    });
    if (window.Fig3D) window.Fig3D.scan(mfxEl);
  }

  /* ---------- section nav: shows where you are in the record ---------- */
  const rnav = $('#rnav'), links = $$('#rnav a'), secs = SECS.map(([k]) => $('#' + k)), rbar = $('#rnavBar');
  let rt = false;
  const rupd = () => {
    rt = false;
    const top = secs[0].getBoundingClientRect().top + scrollY, last = secs[secs.length - 1], end = last.getBoundingClientRect().bottom + scrollY;
    const y = scrollY + innerHeight * 0.35;
    rnav.classList.toggle('is-on', scrollY + 80 > top - innerHeight * 0.5 && scrollY < end);
    rbar.style.transform = `scaleX(${Math.min(1, Math.max(0, (y - top) / (end - top))).toFixed(3)})`;
    let cur = -1; secs.forEach((s, i) => { if (s.getBoundingClientRect().top + scrollY <= y) cur = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === cur));
    if (cur !== rcur && links[cur]) { const ol = links[cur].closest('ol'); ol.scrollTo({ left: links[cur].parentElement.offsetLeft - ol.offsetLeft - 4, behavior: U.RM ? 'auto' : 'smooth' }); }
    rcur = cur;
  };
  let rcur = -1;
  addEventListener('scroll', () => { if (!rt) { rt = true; requestAnimationFrame(rupd); } }, { passive: true });
  addEventListener('resize', rupd); rupd();

  /* ---------- loupe ---------- */
  const lp = $('#loupe');
  if (lp) {
    const lens = $('.loupe__lens', lp), img = $('img', lp), Z = 2.5;
    const move = (e) => {
      const r = img.getBoundingClientRect();
      const x = Math.min(r.width, Math.max(0, e.clientX - r.left)), y = Math.min(r.height, Math.max(0, e.clientY - r.top));
      lens.style.transform = `translate(${x}px,${y}px)`;
      lens.style.backgroundSize = `${r.width * Z}px ${r.height * Z}px`;
      lens.style.backgroundPosition = `${-(x * Z) + lens.offsetWidth / 2}px ${-(y * Z) + lens.offsetHeight / 2}px`;
      lp.classList.add('is-on', 'was-used');
    };
    lp.addEventListener('pointermove', move);
    lp.addEventListener('pointerdown', (e) => { move(e); if (e.pointerType !== 'mouse') lp.setPointerCapture(e.pointerId); });
    lp.addEventListener('pointerleave', () => lp.classList.remove('is-on'));
    lp.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') lp.classList.remove('is-on'); });
  }

  /* ---------- bench: the tests run when you scroll to them ---------- */
  const bench = $('#bench'), rows = $$('.bench2__list li', bench), bc = $('#benchCount'), bb = $('#benchBar'), bs = $('#benchStatus');
  let timer = null;
  const run = () => {
    clearTimeout(timer);
    rows.forEach((r) => r.classList.remove('is-run', 'is-ok'));
    bench.dataset.state = 'running';
    let i = 0;
    const step = () => {
      if (i > 0) rows[i - 1].classList.replace('is-run', 'is-ok');
      bc.textContent = `${pad(i)}/${pad(rows.length)}`;
      bb.style.transform = `scaleX(${i / rows.length})`;
      if (i === rows.length) { bench.dataset.state = 'done'; bs.textContent = `All ${rows.length} checks passed`; return; }
      rows[i].classList.add('is-run'); bs.textContent = `Testing: ${rows[i].querySelector('.t').textContent}`;
      i++; timer = setTimeout(step, 230 + Math.random() * 260);
    };
    step();
  };
  if (U.RM || !('IntersectionObserver' in window)) { rows.forEach((r) => r.classList.add('is-ok')); bc.textContent = `${pad(rows.length)}/${pad(rows.length)}`; bb.style.transform = 'scaleX(1)'; bench.dataset.state = 'done'; bs.textContent = `All ${rows.length} checks passed`; }
  else new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { o.disconnect(); run(); } }, { threshold: 0.35 }).observe(bench);
  $('#benchRun').addEventListener('click', run);

  /* ---------- spec glossary ---------- */
  $$('.gl').forEach((b) => b.addEventListener('click', () => {
    const o = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(o));
    document.getElementById(b.getAttribute('aria-controls')).hidden = !o;
  }));

  /* mobile buy bar */
  const bar = $('#buybar');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => { const on = !en.isIntersecting && en.boundingClientRect.top < 0; bar.classList.toggle('on', on); bar.setAttribute('aria-hidden', !on); bar.querySelectorAll('a').forEach((b) => { b.tabIndex = on ? 0 : -1; }); }).observe($('#buy'));
  }
  U.observe();
})();
