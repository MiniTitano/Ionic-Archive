/* =========================================================
   IONIC ARCHIVE — placeholder SVG illustrations
   (production: replace with real AVIF/WebP photography)
   ========================================================= */
(function () {
  'use strict';
  let n = 0;
  const MONO = "Geist Mono, ui-monospace, monospace";
  const TONES = {
    silver:    ['#F7F8FA', '#CDD1D7', '#8D939C'],
    champagne: ['#F7F1E7', '#DACFBC', '#9C8F7A'],
    graphite:  ['#7B8088', '#44484F', '#1C1E22'],
    black:     ['#5A5D63', '#2B2D31', '#0E0F11'],
    blue:      ['#EEF2F9', '#B9C5D8', '#76849A']
  };

  function defs(i, tone) {
    const [a, b, c] = TONES[tone] || TONES.silver;
    return `<defs>
<linearGradient id="b${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>
<linearGradient id="h${i}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="g${i}" cx=".36" cy=".34" r=".72"><stop offset="0" stop-color="#7F9BFF"/><stop offset=".22" stop-color="#1F2C63"/><stop offset=".62" stop-color="#07080D"/><stop offset="1" stop-color="#000"/></radialGradient>
<linearGradient id="d${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34373D"/><stop offset="1" stop-color="#0B0C0E"/></linearGradient>
<linearGradient id="s${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8DB4F2"/><stop offset=".55" stop-color="#F3C796"/><stop offset="1" stop-color="#2E3B4E"/></linearGradient>
<filter id="f${i}" x="-30%" y="-200%" width="160%" height="500%"><feGaussianBlur stdDeviation="7"/></filter>
</defs>`;
  }
  const svg = (inner, vb, label) =>
    `<svg viewBox="${vb || '0 0 400 300'}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label || ''}" focusable="false">${inner}</svg>`;
  const shadow = (i, cx = 205, cy = 252, rx = 150) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="9" fill="#000" opacity=".26" filter="url(#f${i})"/>`;

  function screen(i, x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#s${i})"/>
<circle cx="${x + w * .7}" cy="${y + h * .5}" r="${h * .12}" fill="#FFF3D8" opacity=".95"/>
<path d="M${x} ${y + h * .68} L${x + w * .28} ${y + h * .57} L${x + w * .52} ${y + h * .66} L${x + w * .8} ${y + h * .55} L${x + w} ${y + h * .6} L${x + w} ${y + h} L${x} ${y + h}Z" fill="#1F2A3B" opacity=".9"/>`;
  }
  function wear(cx, cy) {
    return `<g stroke="#fff" stroke-width=".7" stroke-linecap="round" opacity=".85">
<path d="M${cx - 9} ${cy - 3} l11 -5"/><path d="M${cx - 4} ${cy + 3} l7 -3"/><path d="M${cx + 6} ${cy - 6} l4 -1"/></g>
<circle cx="${cx}" cy="${cy - 2}" r="16" fill="none" stroke="#2F6BFF" stroke-width="1" stroke-dasharray="3 2"/>
<rect x="${cx - 16}" y="${cy + 20}" width="74" height="11" fill="#2F6BFF"/>
<text x="${cx - 13}" y="${cy + 27.5}" font-family="${MONO}" font-size="5.5" fill="#fff" letter-spacing=".5">01 · SCRATCH 3 MM</text>`;
  }

  /* ---------- MiniDV / Digital8 camcorder ---------- */
  function camcorder(p, view, o) {
    const i = n++, a = p.art;
    let s = defs(i, a.tone) + shadow(i);
    s += `<rect x="44" y="110" width="100" height="82" rx="10" fill="url(#d${i})"/>
<rect x="74" y="110" width="5" height="82" fill="#000" opacity=".35"/><rect x="100" y="110" width="3" height="82" fill="#fff" opacity=".08"/>
<ellipse cx="46" cy="151" rx="14" ry="41" fill="#08090B"/><ellipse cx="44" cy="151" rx="9" ry="32" fill="url(#g${i})"/>
<ellipse cx="41.5" cy="137" rx="2" ry="8" fill="#fff" opacity=".6"/>
<rect x="120" y="90" width="214" height="126" rx="30" fill="url(#b${i})"/>
<rect x="134" y="94" width="186" height="10" rx="5" fill="url(#h${i})"/>
<rect x="150" y="76" width="74" height="20" rx="9" fill="url(#b${i})" stroke="#000" stroke-opacity=".12"/>`;
    for (let k = 0; k < 9; k++) s += `<circle cx="${159 + k * 7}" cy="86" r="1.4" fill="#000" opacity=".38"/>`;
    s += `<rect x="282" y="94" width="20" height="8" fill="url(#d${i})"/>
<rect x="270" y="62" width="88" height="36" rx="11" fill="url(#d${i})"/><rect x="278" y="66" width="70" height="4" rx="2" fill="#fff" opacity=".1"/>
<rect x="348" y="57" width="22" height="46" rx="8" fill="#0D0E10"/>
<circle cx="316" cy="190" r="10" fill="#26282C"/><circle cx="316" cy="190" r="4.6" fill="#E5322D"/>
<circle cx="140" cy="200" r="7" fill="#5C8BFF" opacity=".28"/><circle cx="140" cy="200" r="2.4" fill="#9DB8FF"/>`;
    if (view === 'b') {
      s += `<rect x="166" y="114" width="132" height="80" rx="11" fill="#17191D" opacity=".9"/>
<g transform="translate(178 128) skewY(-6)">
<rect x="0" y="0" width="156" height="104" rx="9" fill="url(#d${i})"/><rect x="7" y="7" width="142" height="90" rx="3" fill="#000"/>
${screen(i, 9, 9, 138, 86)}
<text x="16" y="24" font-family="${MONO}" font-size="8" fill="#FF4A3D">● REC</text>
<text x="140" y="24" font-family="${MONO}" font-size="8" fill="#fff" text-anchor="end">SP</text>
<text x="16" y="89" font-family="${MONO}" font-size="8" fill="#fff">0:12:04</text>
<rect x="117" y="82" width="16" height="7" fill="none" stroke="#fff" stroke-width=".8"/><rect x="119" y="84" width="9" height="3" fill="#fff"/></g>`;
    } else {
      s += `<rect x="166" y="114" width="132" height="80" rx="11" fill="url(#b${i})" stroke="#000" stroke-opacity=".16"/>
<rect x="174" y="122" width="116" height="64" rx="7" fill="none" stroke="#fff" stroke-opacity=".55"/>
<text x="184" y="143" font-family="${MONO}" font-size="9" letter-spacing="1.6" fill="#2B2E34">${a.fmt || 'DV'} · ${a.zoom || 10}×</text>
<text x="184" y="176" font-family="${MONO}" font-size="7.5" letter-spacing="1.4" fill="#2B2E34" opacity=".7">${a.label || ''}</text>`;
    }
    if (o.wear) s += wear(o.wc[0], o.wc[1]);
    return svg(s, o.vb, `${p.name}, ${view === 'b' ? 'screen open' : 'side view'}`);
  }

  /* ---------- compact camera ---------- */
  function compact(p, view, o) {
    const i = n++, a = p.art, st = a.style || 'compact';
    const r = st === 'slim' ? 16 : 26;
    let s = defs(i, a.tone) + shadow(i, 200, 254, 140);
    s += `<rect x="268" y="76" width="44" height="13" rx="5" fill="url(#b${i})" stroke="#000" stroke-opacity=".15"/>
<rect x="226" y="80" width="22" height="7" rx="3" fill="#3A3D42"/>
<rect x="58" y="86" width="284" height="156" rx="${r}" fill="url(#b${i})"/>
<rect x="72" y="90" width="256" height="9" rx="4.5" fill="url(#h${i})"/>`;
    if (view === 'b') {
      s += `<rect x="76" y="104" width="180" height="124" rx="7" fill="#0B0C0E"/>${screen(i, 83, 111, 166, 110)}
<text x="91" y="125" font-family="${MONO}" font-size="8" fill="#fff">${a.mp}M</text>
<rect x="222" y="118" width="16" height="7" fill="none" stroke="#fff" stroke-width=".8"/><rect x="224" y="120" width="10" height="3" fill="#fff"/>
<text x="242" y="214" font-family="${MONO}" font-size="11" fill="#FF9A3C" text-anchor="end" letter-spacing=".5">'${String(p.year).slice(2)} 11 16</text>
<rect x="276" y="112" width="44" height="9" rx="4.5" fill="url(#d${i})"/>
<rect x="276" y="130" width="44" height="10" rx="5" fill="#000" opacity=".12"/>
<circle cx="298" cy="174" r="25" fill="url(#b${i})" stroke="#000" stroke-opacity=".22"/><circle cx="298" cy="174" r="9" fill="url(#d${i})"/>
<rect x="279" y="210" width="16" height="9" rx="4" fill="url(#d${i})"/><rect x="301" y="210" width="16" height="9" rx="4" fill="url(#d${i})"/>`;
    } else {
      if (st === 'grip') {
        s += `<rect x="58" y="86" width="70" height="156" rx="26" fill="#000" opacity=".14"/>`;
        for (let k = 0; k < 7; k++) s += `<rect x="70" y="${118 + k * 13}" width="46" height="2" rx="1" fill="#000" opacity=".18"/>`;
      }
      if (st === 'slim') {
        s += `<rect x="250" y="96" width="82" height="136" rx="10" fill="#000" opacity=".06"/>
<circle cx="292" cy="130" r="23" fill="url(#d${i})"/><circle cx="292" cy="130" r="15" fill="url(#g${i})"/><circle cx="287" cy="124" r="3" fill="#fff" opacity=".65"/>
<rect x="86" y="104" width="40" height="16" rx="3" fill="#F3EFE2" stroke="#000" stroke-opacity=".2"/>
<circle cx="140" cy="112" r="4" fill="#C9682C" opacity=".85"/>`;
      } else {
        const lx = st === 'grip' ? 222 : 228, rr = st === 'grip' ? 1 : .82;
        const fx = st === 'grip' ? 142 : 84;
        s += `<circle cx="${lx}" cy="164" r="${62 * rr}" fill="url(#b${i})" stroke="#000" stroke-opacity=".2"/>
<circle cx="${lx}" cy="164" r="${50 * rr}" fill="url(#d${i})"/><circle cx="${lx}" cy="164" r="${35 * rr}" fill="url(#g${i})"/>
<circle cx="${lx}" cy="164" r="${12 * rr}" fill="#000" opacity=".45"/>
<ellipse cx="${lx - 13 * rr}" cy="${150 - 2 * rr}" rx="${5 * rr}" ry="${9 * rr}" fill="#fff" opacity=".5" transform="rotate(35 ${lx - 13 * rr} ${148})"/>
<rect x="${fx}" y="102" width="46" height="20" rx="3" fill="#F3EFE2" stroke="#000" stroke-opacity=".2"/>`;
        for (let k = 1; k < 7; k++) s += `<line x1="${fx + k * 6.5}" y1="104" x2="${fx + k * 6.5}" y2="120" stroke="#000" stroke-opacity=".08"/>`;
        s += `<rect x="${fx + 54}" y="104" width="18" height="13" rx="2" fill="#15171A"/><circle cx="${fx + 82}" cy="111" r="4" fill="#C9682C" opacity=".85"/>`;
      }
      const tx = st === 'grip' ? 142 : 84;
      s += `<text x="${tx}" y="226" font-family="${MONO}" font-size="8.5" letter-spacing="1.4" fill="#2B2E34" opacity=".85">${a.mp} MEGA PIXELS</text>
<text x="${tx}" y="214" font-family="${MONO}" font-size="7" letter-spacing="1.4" fill="#2B2E34" opacity=".55">OPTICAL ${a.zoom || 3}× ZOOM</text>`;
    }
    if (o.wear) s += wear(o.wc[0], o.wc[1]);
    return svg(s, o.vb, `${p.name}, ${view === 'b' ? 'back with screen' : 'front view'}`);
  }

  /* ---------- tapes ---------- */
  function cassette(i, x, y, sc) {
    return `<g transform="translate(${x} ${y}) scale(${sc})">
<rect x="0" y="0" width="216" height="140" rx="9" fill="url(#d${i})"/><rect x="8" y="4" width="200" height="5" rx="2.5" fill="#fff" opacity=".1"/>
<rect x="12" y="12" width="192" height="58" rx="5" fill="#000" opacity=".55"/>
<circle cx="68" cy="41" r="22" fill="#3B2A22"/><circle cx="148" cy="41" r="14" fill="#3B2A22"/>
<circle cx="68" cy="41" r="10" fill="#E8E9EC"/><circle cx="148" cy="41" r="10" fill="#E8E9EC"/>
<circle cx="68" cy="41" r="4" fill="#222"/><circle cx="148" cy="41" r="4" fill="#222"/>
<rect x="12" y="82" width="192" height="46" rx="4" fill="url(#b${i})"/>
<text x="24" y="104" font-family="${MONO}" font-size="13" font-weight="500" letter-spacing="2" fill="#16181B">DVM60</text>
<text x="24" y="119" font-family="${MONO}" font-size="7.5" letter-spacing="1.4" fill="#16181B" opacity=".7">SP 60 MIN · LP 90 MIN</text>
<circle cx="186" cy="105" r="6" fill="#2F6BFF" opacity=".9"/></g>`;
  }
  function tape(p, view, o) {
    const i = n++;
    let s = defs(i, 'silver') + shadow(i, 200, 248, 130);
    if (view === 'b') s += cassette(i, 70, 70, .78) + cassette(i, 120, 100, .78) + cassette(i, 170, 130, .78);
    else s += cassette(i, 92, 88, 1);
    if (o.wear) s += wear(o.wc[0], o.wc[1]);
    return svg(s, o.vb, `${p.name}`);
  }

  const CROPS = {
    camcorder: { lens: '18 92 170 128', detail: '238 132 140 105' },
    compact:   { lens: '150 92 160 120', detail: '220 60 130 98', lensSlim: '232 86 120 90' },
    tape:      { lens: '96 84 210 158', detail: '100 160 200 150' }
  };
  function product(p, view, o) {
    o = o || {};
    const kind = p.art.kind;
    if (o.crop) {
      let key = o.crop;
      if (kind === 'compact' && key === 'lens' && p.art.style === 'slim') key = 'lensSlim';
      o.vb = CROPS[kind][key];
      const v = o.vb.split(' ').map(Number);
      o.wc = [v[0] + v[2] * .5, v[1] + v[3] * .55];
    }
    if (kind === 'camcorder') return camcorder(p, view, o);
    if (kind === 'tape') return tape(p, view, o);
    return compact(p, view, o);
  }

  /* ---------- box contents ---------- */
  function kit(p) {
    const i = n++;
    let s = defs(i, 'graphite') + `<rect x="0" y="0" width="400" height="300" fill="none"/>`;
    const lbl = (x, y, t) => `<text x="${x}" y="${y}" font-family="${MONO}" font-size="7" letter-spacing="1.2" fill="#6B6F77">${t}</text>`;
    s += `<rect x="40" y="60" width="96" height="58" rx="5" fill="url(#b${i})"/><rect x="48" y="68" width="40" height="8" rx="2" fill="#fff" opacity=".2"/><rect x="128" y="76" width="8" height="26" fill="#C9A44A"/>${lbl(40, 134, '01 BATTERY')}`;
    s += `<rect x="172" y="52" width="92" height="72" rx="8" fill="#2A2C31"/><circle cx="250" cy="66" r="3" fill="#7FA3FF"/><rect x="184" y="64" width="50" height="5" rx="2" fill="#fff" opacity=".1"/>${lbl(172, 140, '02 CHARGER')}`;
    s += `<g fill="none" stroke="#1C1E22" stroke-width="4"><circle cx="330" cy="92" r="30"/><circle cx="330" cy="92" r="22"/></g><rect x="352" y="118" width="16" height="10" fill="#1C1E22"/>${lbl(300, 140, '03 AV/USB CABLE')}`;
    if (p.art.kind === 'camcorder') s += cassette(i, 40, 170, .5) + lbl(40, 254, '04 DVM60 TAPE');
    else s += `<rect x="50" y="176" width="60" height="70" rx="4" fill="#2F3440"/><rect x="58" y="184" width="44" height="20" fill="#fff" opacity=".85"/>${lbl(40, 262, '04 MEMORY CARD')}`;
    s += `<path d="M170 210 q40 -50 80 0 t80 0" fill="none" stroke="#1C1E22" stroke-width="6" stroke-linecap="round"/>${lbl(200, 250, '05 STRAP')}`;
    return svg(s, '0 0 400 300', 'Box contents');
  }

  /* ---------- "Shot on" scenes ---------- */
  const SCENES = [
    // 0 sunset over the sea
    (i) => `<linearGradient id="k${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2D2F5E"/><stop offset=".45" stop-color="#E9806A"/><stop offset=".68" stop-color="#FFD39B"/></linearGradient>
<rect width="400" height="300" fill="url(#k${i})"/><circle cx="262" cy="196" r="30" fill="#FFF0CF"/>
<rect y="204" width="400" height="96" fill="#1B2140"/><g fill="#FFD9A0" opacity=".7"><rect x="236" y="212" width="52" height="2"/><rect x="246" y="222" width="34" height="2"/><rect x="252" y="234" width="22" height="2"/></g>
<path d="M0 204 L60 186 L120 204Z" fill="#141831"/>`,
    // 1 night party with flash
    (i) => `<rect width="400" height="300" fill="#0B0C12"/>
<g filter="url(#q${i})"><circle cx="60" cy="70" r="22" fill="#FFB458" opacity=".7"/><circle cx="330" cy="50" r="28" fill="#5C8BFF" opacity=".55"/><circle cx="360" cy="150" r="18" fill="#FF6A8A" opacity=".5"/><circle cx="110" cy="40" r="12" fill="#FFE08A" opacity=".6"/></g>
<filter id="q${i}"><feGaussianBlur stdDeviation="6"/></filter>
<radialGradient id="k${i}" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#F6E6DA"/><stop offset=".7" stop-color="#C9A894"/><stop offset="1" stop-color="#6E5446"/></radialGradient>
<path d="M120 300 Q130 222 200 214 Q270 222 284 300Z" fill="#20232B"/>
<ellipse cx="202" cy="150" rx="46" ry="58" fill="url(#k${i})"/><path d="M152 132 Q160 80 206 84 Q252 86 252 134 Q236 108 204 110 Q172 110 152 132Z" fill="#15100D"/>
<ellipse cx="186" cy="152" rx="4" ry="3" fill="#2A1A14"/><ellipse cx="220" cy="152" rx="4" ry="3" fill="#2A1A14"/><circle cx="187" cy="151" r="1" fill="#fff"/><circle cx="221" cy="151" r="1" fill="#fff"/>`,
    // 2 overcast city / skate
    (i) => `<linearGradient id="k${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFC9D2"/><stop offset="1" stop-color="#E7EAE6"/></linearGradient>
<rect width="400" height="300" fill="url(#k${i})"/><g fill="#8A929B"><rect x="0" y="110" width="60" height="120"/><rect x="66" y="80" width="44" height="150"/><rect x="290" y="96" width="50" height="134"/><rect x="346" y="126" width="54" height="104"/></g>
<rect y="226" width="400" height="74" fill="#6A6E74"/><path d="M120 226 Q200 140 280 226Z" fill="#7C8188"/><rect x="186" y="150" width="28" height="5" rx="2" fill="#1A1B1E" transform="rotate(-12 200 152)"/>
<path d="M196 150 l-6 -30 l8 -16 l10 14 l-4 30Z" fill="#202227"/><circle cx="200" cy="98" r="7" fill="#202227"/>`,
    // 3 concert
    (i) => `<rect width="400" height="300" fill="#100714"/>
<linearGradient id="k${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF3D8B" stop-opacity=".75"/><stop offset="1" stop-color="#FF3D8B" stop-opacity="0"/></linearGradient>
<linearGradient id="m${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4C7BFF" stop-opacity=".8"/><stop offset="1" stop-color="#4C7BFF" stop-opacity="0"/></linearGradient>
<path d="M90 0 L20 300 L170 300Z" fill="url(#k${i})"/><path d="M300 0 L230 300 L390 300Z" fill="url(#m${i})"/><path d="M200 0 L150 300 L250 300Z" fill="url(#k${i})" opacity=".5"/>
<path d="M0 300 L0 250 Q20 230 40 248 Q55 222 78 246 Q100 226 118 250 Q140 224 162 248 Q186 228 206 250 Q228 222 250 246 Q272 230 292 250 Q316 224 336 248 Q360 230 380 248 Q392 236 400 244 L400 300Z" fill="#050307"/>`,
    // 4 snow
    (i) => `<linearGradient id="k${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D5E0EA"/><stop offset="1" stop-color="#F2F5F7"/></linearGradient>
<rect width="400" height="300" fill="url(#k${i})"/><rect y="200" width="400" height="100" fill="#F7F9FB"/>
<g fill="#33413D"><path d="M40 210 l22 -70 l22 70Z"/><path d="M90 206 l16 -52 l16 52Z"/><path d="M300 212 l26 -84 l26 84Z"/><path d="M350 208 l16 -50 l16 50Z"/></g>
<g fill="#2A2C31"><circle cx="190" cy="238" r="5"/><rect x="186" y="243" width="8" height="18" rx="3"/><circle cx="214" cy="242" r="4"/><rect x="211" y="246" width="7" height="14" rx="3" fill="#C2413A"/></g>`,
    // 5 summer pool
    (i) => `<rect width="400" height="300" fill="#8EC6F5"/><rect y="120" width="400" height="180" fill="#2CB0D1"/>
<g fill="none" stroke="#B9F0FF" stroke-width="2" opacity=".7"><path d="M0 160 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0"/><path d="M0 210 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0"/><path d="M0 260 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0"/></g>
<rect y="112" width="400" height="10" fill="#EDE6D8"/><circle cx="320" cy="60" r="22" fill="#FFF6D6"/><path d="M60 120 l0 -60 M60 60 q-30 0 -40 18 M60 60 q30 0 40 18 M60 60 q-14 -18 -36 -16 M60 60 q14 -18 36 -16" stroke="#2C4A3A" stroke-width="4" fill="none"/>`
  ];
  function scene(k, o) {
    o = o || {};
    const i = n++;
    let s = `<defs>${''}</defs>` + SCENES[k % SCENES.length](i);
    if (o.video) {
      s += `<text x="16" y="26" font-family="${MONO}" font-size="12" fill="#fff" letter-spacing="1">● REC</text>
<text x="384" y="26" font-family="${MONO}" font-size="12" fill="#fff" text-anchor="end">SP</text>
<text x="16" y="284" font-family="${MONO}" font-size="12" fill="#fff">${o.tc || '0:00:12:04'}</text>`;
    }
    if (o.stamp) s += `<text x="384" y="284" font-family="${MONO}" font-size="15" font-weight="500" fill="#FF9A3C" text-anchor="end" style="paint-order:stroke" stroke="#7a3a00" stroke-width=".6" stroke-opacity=".4">${o.stamp}</text>`;
    return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.label || 'Sample image'}" focusable="false">${s}</svg>`;
  }

  /* ---------- minifigure ---------- */
  function shade(hex, f) {
    if (!/^#/.test(hex)) return hex;
    const v = parseInt(hex.slice(1), 16);
    const c = (x) => Math.max(0, Math.min(255, Math.round(x * f)));
    return '#' + [(v >> 16) & 255, (v >> 8) & 255, v & 255].map(c).map((x) => x.toString(16).padStart(2, '0')).join('');
  }
  function figure(f, o) {
    o = o || {};
    const i = n++, L = f.look;
    const chrome = L.body === 'chrome';
    const body = chrome ? `url(#cb${i})` : L.body;
    const dark = chrome ? '#8D939C' : shade(L.body, .78);
    const acc = L.accent;
    let d = `<defs>
<linearGradient id="cb${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FDFDFE"/><stop offset=".35" stop-color="#B8BEC6"/><stop offset=".6" stop-color="#F0F2F4"/><stop offset="1" stop-color="#7E848D"/></linearGradient>
<radialGradient id="gl${i}" cx=".36" cy=".34" r=".75"><stop offset="0" stop-color="${L.glass === 'green' ? '#B6FFC8' : L.glass === 'chrome' ? '#fff' : '#9DB5FF'}"/><stop offset=".3" stop-color="${L.glass === 'green' ? '#1E8F45' : L.glass === 'chrome' ? '#9AA1AA' : '#2747B8'}"/><stop offset="1" stop-color="${L.glass === 'green' ? '#03140A' : L.glass === 'chrome' ? '#3D4249' : '#050714'}"/></radialGradient>
<filter id="bl${i}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
<pattern id="zb${i}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="8" fill="#F4F2ED"/></pattern>
</defs>`;
    let s = `<ellipse cx="60" cy="164" rx="32" ry="4.5" fill="#000" opacity=".3"/>`;
    if (L.glow) s += `<rect x="14" y="16" width="92" height="70" rx="14" fill="#2F6BFF" opacity=".9" filter="url(#bl${i})"/>`;
    s += `<rect x="44" y="126" width="14" height="34" rx="5" fill="${dark}"/><rect x="62" y="126" width="14" height="34" rx="5" fill="${dark}"/>
<rect x="43" y="152" width="16" height="9" rx="3.5" fill="#17181B"/><rect x="61" y="152" width="16" height="9" rx="3.5" fill="#17181B"/>
<rect x="25" y="96" width="14" height="34" rx="7" fill="${body}"/><rect x="81" y="96" width="14" height="34" rx="7" fill="${body}"/>
<circle cx="32" cy="131" r="6" fill="${dark}"/><circle cx="88" cy="131" r="6" fill="${dark}"/>
<rect x="52" y="80" width="16" height="12" fill="${dark}"/>
<rect x="36" y="90" width="48" height="44" rx="13" fill="${body}"/><rect x="42" y="93" width="36" height="5" rx="2.5" fill="#fff" opacity=".28"/>
<rect x="48" y="104" width="24" height="13" rx="2" fill="${acc}"/><text x="60" y="113.5" text-anchor="middle" font-family="${MONO}" font-size="7.5" font-weight="500" fill="${L.numInk || '#fff'}">${f.num}</text>`;
    const eyes = (y, c = '#fff', r = 3.6) => `<circle cx="48" cy="${y}" r="${r}" fill="${c}"/><circle cx="72" cy="${y}" r="${r}" fill="${c}"/>`;
    switch (L.head) {
      case 'tape':
        s += `<rect x="18" y="20" width="84" height="62" rx="9" fill="#25272C"/><rect x="22" y="23" width="76" height="5" rx="2.5" fill="#fff" opacity=".1"/>
<rect x="28" y="32" width="64" height="26" rx="5" fill="#0A0B0D"/><circle cx="44" cy="45" r="9.5" fill="#ECECEE"/><circle cx="76" cy="45" r="9.5" fill="#ECECEE"/>
<circle cx="45" cy="46" r="3.8" fill="#111"/><circle cx="77" cy="46" r="3.8" fill="#111"/><rect x="28" y="64" width="64" height="11" rx="2" fill="${acc}"/>`;
        break;
      case 'screen': {
        const frame = chrome ? `url(#cb${i})` : (L.frame || '#C9CDD3');
        s += `<rect x="16" y="18" width="88" height="66" rx="12" fill="${frame}"/><rect x="20" y="21" width="80" height="5" rx="2.5" fill="#fff" opacity=".3"/>`;
        const bg = { tc: '#0D1A3A', zebra: '#3A3D44', date: '#120C08', glitch: '#0B0D12', rec: '#0B2A8C' }[L.screen];
        s += `<rect x="24" y="27" width="72" height="50" rx="5" fill="${bg}"/>`;
        if (L.screen === 'tc') s += `<rect x="40" y="38" width="8" height="12" rx="3" fill="#9CC0FF"/><rect x="72" y="38" width="8" height="12" rx="3" fill="#9CC0FF"/><text x="60" y="69" text-anchor="middle" font-family="${MONO}" font-size="8" fill="#9CC0FF">00:00:00</text>`;
        if (L.screen === 'zebra') s += `<rect x="24" y="27" width="72" height="50" rx="5" fill="url(#zb${i})" opacity=".85"/>${eyes(50, '#111', 4.4)}`;
        if (L.screen === 'date') s += `${eyes(46, '#FF9A3C', 3.6)}<text x="90" y="70" text-anchor="end" font-family="${MONO}" font-size="8.5" fill="#FF9A3C">'03 08 21</text>`;
        if (L.screen === 'glitch') s += `<rect x="24" y="36" width="72" height="4" fill="#2F6BFF" opacity=".8"/><rect x="34" y="55" width="62" height="3" fill="#E5322D" opacity=".7"/><rect x="24" y="64" width="40" height="2" fill="#fff" opacity=".6"/><rect x="40" y="42" width="9" height="11" fill="#fff"/><rect x="74" y="44" width="9" height="11" fill="#fff"/>`;
        if (L.screen === 'rec') s += `<rect x="24" y="27" width="72" height="50" rx="5" fill="#2F6BFF" opacity=".55"/>${eyes(48, '#fff', 4)}<text x="30" y="38" font-family="${MONO}" font-size="6.5" fill="#fff">● REC</text>`;
        break;
      }
      case 'lens': {
        const ring = chrome ? `url(#cb${i})` : (L.frame || '#D3D6DB');
        s += `<circle cx="60" cy="50" r="36" fill="${ring}"/><circle cx="60" cy="50" r="36" fill="none" stroke="#000" stroke-opacity=".15"/>
<circle cx="60" cy="50" r="27" fill="#101114"/><circle cx="60" cy="50" r="19" fill="url(#gl${i})"/><circle cx="53" cy="43" r="5" fill="#fff" opacity=".75"/>`;
        break;
      }
      case 'stick':
        s += `<rect x="38" y="10" width="44" height="76" rx="6" fill="${acc}"/><rect x="42" y="13" width="36" height="4" rx="2" fill="#fff" opacity=".3"/>
<g fill="#D9B45A">${[0, 1, 2, 3, 4, 5].map((k) => `<rect x="${43 + k * 6}" y="74" width="3.5" height="9"/>`).join('')}</g>
<circle cx="51" cy="36" r="5.5" fill="#fff"/><circle cx="69" cy="36" r="5.5" fill="#fff"/><circle cx="52" cy="37" r="2.4" fill="#111"/><circle cx="70" cy="37" r="2.4" fill="#111"/>
<text x="60" y="62" text-anchor="middle" font-family="${MONO}" font-size="7" fill="#fff" opacity=".85">128MB</text>`;
        break;
      case 'battery':
        s += `<rect x="48" y="12" width="24" height="10" rx="2" fill="#6B6F77"/><rect x="20" y="20" width="80" height="62" rx="9" fill="#1D1F23"/><rect x="24" y="23" width="72" height="4" rx="2" fill="#fff" opacity=".1"/>
<rect x="38" y="34" width="9" height="11" rx="2" fill="#fff"/><rect x="73" y="34" width="9" height="11" rx="2" fill="#fff"/>
<rect x="30" y="56" width="18" height="16" rx="2" fill="${acc}"/><rect x="51" y="56" width="18" height="16" rx="2" fill="${acc}" opacity=".7"/><rect x="72" y="56" width="18" height="16" rx="2" fill="${acc}" opacity=".18"/>`;
        break;
      case 'bulb':
        s += `<rect x="18" y="22" width="84" height="58" rx="11" fill="${L.frame || '#D3D6DB'}"/><rect x="24" y="25" width="72" height="4" rx="2" fill="#fff" opacity=".45"/>
<rect x="26" y="32" width="68" height="34" rx="4" fill="#FFF8E2"/>${[1, 2, 3, 4, 5, 6, 7].map((k) => `<line x1="${26 + k * 8.5}" y1="32" x2="${26 + k * 8.5}" y2="66" stroke="#000" stroke-opacity=".06"/>`).join('')}
${eyes(49, '#1A1B1E', 4.4)}<circle cx="88" cy="73" r="3" fill="${acc}"/>`;
        break;
    }
    const svgEl = `<svg class="fig-svg" viewBox="0 0 120 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.silhouette ? 'Figure not yet revealed' : 'Minifigure ' + f.name}" focusable="false">${d}${s}</svg>`;
    return svgEl;
  }

  /* ---------- blind bag: crinkly foil pouch, early-2000s collectible style ---------- */
  function box(o) {
    o = o || {};
    const i = n++;
    const BLUE = '#2F6BFF', YEL = '#FFE14D', PINK = '#FF6FB5', INK = '#111214';
    const FIG = 'assets/figures/';
    // zigzag crimp edge between x0..x1 at y, teeth of size t pointing up (-1) or down (1)
    const zig = (x0, x1, y, t, dir) => { let d = `M${x0} ${y}`; for (let x = x0, k = 0; x < x1; x += t, k++) d += ` L${Math.min(x + t / 2, x1)} ${y + dir * t * .7} L${Math.min(x + t, x1)} ${y}`; return d; };
    const serr = (x0, x1, y0, y1) => { let s = ''; for (let x = x0 + 3; x < x1; x += 3.2) s += `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}"/>`; return s; };
    // sunburst rays behind the mystery figure
    let rays = '';
    for (let k = 0; k < 18; k++) {
      const a0 = (k / 18) * Math.PI * 2, a1 = a0 + Math.PI / 18, R = 150, cx = 110, cy = 146;
      rays += `<path d="M${cx} ${cy} L${(cx + R * Math.cos(a0)).toFixed(1)} ${(cy + R * Math.sin(a0)).toFixed(1)} L${(cx + R * Math.cos(a1)).toFixed(1)} ${(cy + R * Math.sin(a1)).toFixed(1)}Z"/>`;
    }
    // starburst badge
    let star = '';
    for (let k = 0; k < 28; k++) { const a = (k / 28) * Math.PI * 2 - Math.PI / 2, r = k % 2 ? 13 : 18; star += `${(172 + r * Math.cos(a)).toFixed(1)},${(130 + r * Math.sin(a)).toFixed(1)} `; }
    // "collect all 6" lineup
    const line = [1, 2, 5, 3, 4].map((f, k) => `<image href="${FIG}fig-0${f}-sil.png" x="${34 + k * 26}" y="223" width="20" height="26" preserveAspectRatio="xMidYMax meet"/>`).join('') +
      `<rect x="164" y="225" width="20" height="24" rx="3" fill="${INK}"/><text x="174" y="243" text-anchor="middle" font-family="Geist, sans-serif" font-size="17" font-weight="700" fill="${PINK}">?</text>`;
    const crinkle = [[34, 60, 70, 74, 96, 64], [150, 40, 170, 70, 186, 58], [40, 196, 60, 226, 52, 248], [160, 180, 178, 200, 170, 236], [100, 40, 120, 52, 140, 44]]
      .map(([a, b, c, d, e, f]) => `<path d="M${a} ${b} Q${c} ${d} ${e} ${f}"/>`).join('');

    return `<svg viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dropouts blind bag, Series 01: one mystery minifigure inside" focusable="false" overflow="visible">
<defs>
<linearGradient id="fo${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E6EBF2"/><stop offset=".22" stop-color="#FAFBFD"/><stop offset=".4" stop-color="#C9D3E2"/><stop offset=".55" stop-color="#F6DDF0"/><stop offset=".7" stop-color="#D3ECF6"/><stop offset=".85" stop-color="#F4F1DC"/><stop offset="1" stop-color="#C5CDD9"/></linearGradient>
<linearGradient id="pl${i}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".14" stop-color="#000" stop-opacity="0"/><stop offset=".86" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
<linearGradient id="gl${i}" x1="0" y1="0" x2="1" y2="1"><stop offset=".25" stop-color="#fff" stop-opacity="0"/><stop offset=".42" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#fff" stop-opacity=".25"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/></linearGradient>
<pattern id="ht${i}" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r=".9" fill="#fff" opacity=".22"/></pattern>
<clipPath id="pc${i}"><rect x="24" y="48" width="172" height="212" rx="12"/></clipPath>
<filter id="ds${i}" x="-20%" y="-10%" width="140%" height="130%"><feGaussianBlur stdDeviation="6"/></filter>
</defs>
<ellipse cx="110" cy="292" rx="92" ry="7" fill="#000" opacity=".35" filter="url(#ds${i})"/>
<!-- pouch body -->
<path d="M14 38 Q8 160 14 270 L206 270 Q212 160 206 38 Z" fill="url(#fo${i})"/>
<!-- printed front -->
<g clip-path="url(#pc${i})">
  <rect x="24" y="48" width="172" height="212" fill="${BLUE}"/>
  <g fill="${YEL}" opacity=".95">${rays}</g>
  <circle cx="110" cy="146" r="46" fill="${YEL}"/>
  <rect x="24" y="48" width="172" height="212" fill="url(#ht${i})"/>
  <image href="${FIG}fig-06-sil.png" x="76" y="104" width="68" height="96" preserveAspectRatio="xMidYMax meet"/>
  <text x="122" y="160" text-anchor="middle" font-family="Geist, sans-serif" font-size="58" font-weight="700" fill="${PINK}" stroke="${INK}" stroke-width="3.5" paint-order="stroke" transform="rotate(8 122 140)">?</text>
  <rect x="24" y="214" width="172" height="46" fill="${YEL}"/>
  <rect x="24" y="214" width="172" height="2" fill="${INK}"/>
  ${line}
</g>
<rect x="24" y="48" width="172" height="212" rx="12" fill="none" stroke="${INK}" stroke-width="2"/>
<!-- header pill -->
<rect x="36" y="56" width="134" height="12" rx="6" fill="${INK}"/>
<circle cx="44" cy="62" r="2.6" fill="none" stroke="#fff" stroke-width="1"/><circle cx="44" cy="62" r="1.2" fill="${BLUE}"/>
<text x="50" y="64.3" font-family="${MONO}" font-size="5.6" letter-spacing=".6" fill="#fff" textLength="114" lengthAdjust="spacingAndGlyphs">IONIC ARCHIVE · MINIFIGURE</text>
<!-- toy-style logo -->
<g transform="skewX(-9) translate(15 0)">
  <text x="32" y="95" font-family="Geist, sans-serif" font-size="26" font-weight="700" letter-spacing="-.8" fill="${INK}" transform="translate(2.4 2.4)" textLength="128" lengthAdjust="spacingAndGlyphs">DROPOUTS</text>
  <text x="32" y="95" font-family="Geist, sans-serif" font-size="26" font-weight="700" letter-spacing="-.8" fill="#fff" stroke="${INK}" stroke-width="2.8" paint-order="stroke" textLength="128" lengthAdjust="spacingAndGlyphs">DROPOUTS</text>
</g>
<rect x="34" y="103" width="104" height="10" rx="2" fill="${INK}"/>
<text x="38" y="110.2" font-family="${MONO}" font-size="5.4" letter-spacing=".4" fill="${YEL}" textLength="96" lengthAdjust="spacingAndGlyphs">1 MYSTERY FIGURE INSIDE</text>
<!-- starburst -->
<polygon points="${star}" fill="${PINK}" stroke="${INK}" stroke-width="1.6" transform="rotate(12 172 130)"/>
<text x="172" y="127" text-anchor="middle" font-family="${MONO}" font-size="5" font-weight="500" fill="${INK}" transform="rotate(12 172 130)">SERIES</text>
<text x="172" y="137.5" text-anchor="middle" font-family="Geist, sans-serif" font-size="12" font-weight="700" fill="${INK}" transform="rotate(12 172 130)">01</text>
<!-- collect strip label + age warning -->
<text x="34" y="221.5" font-family="${MONO}" font-size="5" letter-spacing=".8" fill="${INK}">COLLECT ALL 6 · 1 SECRET</text>
<path d="M176 206 L186 222 L166 222 Z" fill="${YEL}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
<text x="176" y="219.6" text-anchor="middle" font-family="Geist, sans-serif" font-size="9" font-weight="700" fill="${INK}">!</text>
<text x="161" y="219.6" text-anchor="end" font-family="${MONO}" font-size="5.5" fill="#fff">14+</text>
<!-- foil sheen, pillow shading, crinkles -->
<path d="M14 38 Q8 160 14 270 L206 270 Q212 160 206 38 Z" fill="url(#pl${i})"/>
<path d="M14 38 Q8 160 14 270 L206 270 Q212 160 206 38 Z" fill="url(#gl${i})"/>
<g fill="none" stroke="#fff" stroke-width=".8" opacity=".55">${crinkle}</g>
<!-- bottom crimp -->
<g>
  <rect x="12" y="266" width="196" height="18" fill="url(#fo${i})"/>
  <g stroke="#000" stroke-opacity=".14" stroke-width=".7">${serr(12, 208, 268, 282)}</g>
  <path d="${zig(12, 208, 284, 5, 1)} L208 266 L12 266Z" fill="url(#fo${i})"/>
  <rect x="12" y="266" width="196" height="1.4" fill="#000" opacity=".18"/>
  <g fill="${INK}">${[0, 2, 3, 5, 8, 9, 11, 13, 14, 16, 19, 20, 22, 24, 25].map((x) => `<rect x="${150 + x * 1.6}" y="269" width="${x % 3 ? .9 : 1.5}" height="10"/>`).join('')}</g>
</g>
<!-- top crimp with hang hole and tear notch: this is what tears off when you open it -->
<g class="lid">
  <path fill-rule="evenodd" fill="url(#fo${i})" d="${zig(12, 208, 6, 5, -1)} L208 38 L12 38Z M96 15 h28 a5 5 0 0 1 0 10 h-28 a5 5 0 0 1 0 -10Z"/>
  <g stroke="#000" stroke-opacity=".14" stroke-width=".7">${serr(12, 208, 8, 36)}</g>
  <path d="M96 15 h28 a5 5 0 0 1 0 10 h-28 a5 5 0 0 1 0 -10Z" fill="none" stroke="#000" stroke-opacity=".3" stroke-width=".8"/>
  <rect x="12" y="36.6" width="196" height="1.4" fill="#000" opacity=".18"/>
  <path d="M208 28 l-7 3.5 l7 3.5Z" fill="#fff"/>
  <line x1="150" y1="31.5" x2="198" y2="31.5" stroke="${INK}" stroke-width=".7" stroke-dasharray="2 1.6" opacity=".6"/>
  <text x="148" y="33.3" text-anchor="end" font-family="${MONO}" font-size="5" fill="${INK}" opacity=".7">TEAR HERE ✂</text>
</g>
</svg>`;
  }

  /* ---------- icons ---------- */
  const ICONS = {
    test: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="4" y="9" width="32" height="22" rx="2"/><circle cx="20" cy="20" r="6"/><circle cx="20" cy="20" r="2" fill="#2F6BFF" stroke="none"/><path d="M8 13h3"/><circle cx="31" cy="13" r="1.3" fill="#E5322D" stroke="none"/></svg>',
    grade: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M6 32V8M6 32h28"/><rect x="10" y="22" width="5" height="10"/><rect x="18" y="16" width="5" height="16"/><rect x="26" y="10" width="5" height="22" fill="#2F6BFF" stroke="#2F6BFF"/></svg>',
    pack: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M5 13l15-7 15 7v15l-15 7-15-7z"/><path d="M5 13l15 7 15-7M20 20v15"/><path d="M12.5 9.5l15 7" stroke="#2F6BFF"/></svg>',
    truck: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M1 5h11v9H1zM12 8h4l3 3v3h-7"/><circle cx="5" cy="15" r="1.6"/><circle cx="15" cy="15" r="1.6"/></svg>',
    back: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4 8h9a4 4 0 010 8H8"/><path d="M7 5L4 8l3 3"/></svg>',
    shield: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M10 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5z"/><path d="M7 10l2 2 4-4"/></svg>',
    card: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="4" width="16" height="12" rx="1.5"/><path d="M2 8h16"/></svg>'
  };

  window.Art = { product, kit, scene, figure, box, icon: (k) => ICONS[k] || '' };
})();
