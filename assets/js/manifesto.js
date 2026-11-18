(function () {
  'use strict';
  // the tape counter at the top runs with the scroll: timecode + progress + current chapter
  const tc = document.getElementById('mtc'), bar = document.getElementById('mbar'), ch = document.getElementById('mch');
  const secs = [...document.querySelectorAll('.mf2 [data-ch]')];
  const TOTAL = 7 * 60 + 30; // the page "lasts" 7:30 of tape
  const fmt = (s) => { const f = Math.floor((s % 1) * 25); s = Math.floor(s); return `0:${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(f).padStart(2, '0')}`; };
  let ticking = false;
  function update() {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    tc.textContent = fmt(p * TOTAL);
    bar.style.transform = `scaleX(${p.toFixed(4)})`;
    let cur = secs[0];
    for (const s of secs) if (s.getBoundingClientRect().top < innerHeight * 0.45) cur = s;
    if (cur && ch.textContent !== cur.dataset.ch) ch.textContent = cur.dataset.ch;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  update();

  // bench cards: pen sketches of each step, drawn with a slightly wobbly "ink" filter
  const INK = '#23262c', BLUE = '#2F6BFF', RED = '#E5322D';
  document.body.insertAdjacentHTML('beforeend', `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<filter id="pen" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="2.2"/></filter>
<pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><line x1="0" y1="0" x2="0" y2="5" stroke="${INK}" stroke-width="1.1"/></pattern>
<pattern id="hatchB" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><line x1="0" y1="0" x2="0" y2="5" stroke="${BLUE}" stroke-width="1.2" opacity=".7"/></pattern>
</defs></svg>`);
  const g = (inner) => `<svg class="sketch" viewBox="0 0 160 110" aria-hidden="true"><g filter="url(#pen)" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
  const star = (x, y, r) => `<path d="M${x} ${y - r}L${x} ${y + r}M${x - r} ${y}L${x + r} ${y}M${x - r * .6} ${y - r * .6}L${x + r * .6} ${y + r * .6}" stroke-width="1.2"/>`;
  const SKETCH = [
    // 01 clean: camcorder, cleaning cassette going in, air blower aimed at the lens
    g(`<rect x="14" y="46" width="78" height="40" rx="9"/><path d="M92 54h18v24H92"/><ellipse cx="113" cy="66" rx="5" ry="13"/>
       <rect x="70" y="36" width="20" height="10" rx="3"/><path d="M20 86l-4 10M86 86l4 10"/>
       <rect x="32" y="8" width="38" height="22" rx="3" fill="url(#hatch)"/><circle cx="43" cy="19" r="4.5" fill="#fff"/><circle cx="59" cy="19" r="4.5" fill="#fff"/>
       <path d="M51 32v10M46 38l5 5 5-5" stroke="${BLUE}"/>
       <ellipse cx="145" cy="34" rx="9" ry="12"/><path d="M139 43l-14 15M141 46l-13 14"/>
       <path d="M124 64q-4 -3 -8 0M126 70q-5 -4 -10 0" stroke="${BLUE}" stroke-width="1.2"/>${star(130, 82, 4)}${star(104, 30, 3)}`),
    // 02 record then watch: tape -> second deck / monitor with play icon
    g(`<rect x="6" y="40" width="54" height="34" rx="3"/><rect x="12" y="46" width="42" height="14" rx="2"/><circle cx="23" cy="53" r="4"/><circle cx="43" cy="53" r="4"/><path d="M14 66h38" stroke-width="1"/>
       <circle cx="16" cy="32" r="3.5" fill="${RED}" stroke="${RED}"/><path d="M23 33h18" stroke-width="1.2"/>
       <path d="M64 56q14 -18 30 -2" stroke="${BLUE}"/><path d="M89 48l5 6-7 3" stroke="${BLUE}"/>
       <rect x="96" y="28" width="58" height="44" rx="4"/><rect x="102" y="34" width="46" height="30" rx="2" fill="url(#hatchB)" stroke-width="1.2"/>
       <path d="M119 42l12 7-12 7z" fill="#fff"/><path d="M110 72l-4 10M140 72l4 10M100 82h50"/>
       <path d="M10 92h44" stroke-dasharray="3 4" stroke-width="1.2"/><path d="M50 88l6 4-6 4" stroke-width="1.2"/>`),
    // 03 lens cap on, long exposure: capped lens -> black frame with a few hot pixels, under a loupe
    g(`<circle cx="40" cy="56" r="30"/><circle cx="40" cy="56" r="22" fill="url(#hatch)"/><path d="M28 44q12 -8 24 0" stroke-width="1.1"/>
       <path d="M74 56h16M85 51l6 5-6 5" stroke="${BLUE}"/>
       <rect x="96" y="22" width="56" height="44" rx="2" fill="${INK}" stroke="${INK}"/>
       ${['108,34', '137,30', '123,52', '144,58'].map((c) => { const [x, y] = c.split(','); return `<path d="M${x - 2.5} ${y}h5M${x} ${y - 2.5}v5" stroke="#fff" stroke-width="1.3"/>`; }).join('')}
       <circle cx="132" cy="80" r="15" fill="rgba(255,255,255,.55)"/><path d="M121 91l-12 13" stroke-width="3"/>
       <circle cx="132" cy="80" r="3" fill="${RED}" stroke="${RED}"/>`),
    // 04 drain the battery: battery emptying + stopwatch
    g(`<rect x="10" y="34" width="74" height="38" rx="5"/><rect x="84" y="45" width="7" height="16" rx="2"/>
       <rect x="16" y="40" width="16" height="26" fill="url(#hatch)"/><rect x="36" y="40" width="16" height="26" stroke-dasharray="3 3" stroke-width="1.1"/><rect x="56" y="40" width="16" height="26" stroke-dasharray="3 3" stroke-width="1.1"/>
       <path d="M30 84q20 10 46 0" stroke="${BLUE}"/><path d="M70 80l6 4-5 5" stroke="${BLUE}"/>
       <circle cx="126" cy="58" r="24"/><path d="M120 30h12M126 30v4M144 38l4-4"/>
       <path d="M126 58V42M126 58l10 8" stroke-width="2"/><path d="M126 34v4M150 58h-4M126 82v-4M102 58h4" stroke-width="1.2"/>
       <path d="M112 92h28" stroke-width="1.2"/>`),
    // 05 photograph every mark: lamp with raking light across a surface, scratch circled
    g(`<path d="M14 14l26 8-8 18-24-12z"/><path d="M18 30l-4 10" stroke-width="1.2"/>
       ${[0, 1, 2, 3].map((k) => `<path d="M${36 + k * 3} ${36 + k * 4}L${120 + k * 6} ${74 + k * 3}" stroke="${BLUE}" stroke-width="1" stroke-dasharray="5 4"/>`).join('')}
       <path d="M10 88h144" stroke-width="2.2"/><path d="M10 92h144" stroke-width="1" opacity=".6"/>
       <path d="M88 84l6 -4 4 3 6 -5" stroke="${RED}" stroke-width="1.6"/>
       <ellipse cx="96" cy="81" rx="17" ry="10" stroke="${RED}" stroke-dasharray="4 3" stroke-width="1.3"/>
       <rect x="118" y="12" width="34" height="22" rx="4"/><circle cx="135" cy="23" r="7"/><circle cx="135" cy="23" r="3" fill="${INK}"/><rect x="122" y="8" width="8" height="5" rx="1"/>
       <path d="M128 36l-12 30" stroke-width="1" stroke-dasharray="2 3"/>`)
  ];
  document.querySelectorAll('.bcard .bcard__ic').forEach((el, i) => { if (SKETCH[i]) { el.innerHTML = SKETCH[i]; el.classList.add('has-sketch'); } });

  // bench cards: tap / click / Enter flips a card to show what the step really involves
  document.querySelectorAll('.bcard').forEach((b) => b.addEventListener('click', () => {
    b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
  }));
})();

/* swipeable gallery: snap to the middle, the centred photo is in focus */
(function () {
  'use strict';
  const tr = document.getElementById('galTrack');
  if (!tr) return;
  const cards = [...tr.querySelectorAll('.mgal__card')];
  const count = document.getElementById('galCount'), prev = document.getElementById('galPrev'), next = document.getElementById('galNext');
  const pad = (n) => String(n).padStart(2, '0');
  let cur = 0, raf = 0;
  const centre = (el) => el.offsetLeft + el.offsetWidth / 2;
  function update() {
    raf = 0;
    const c = tr.scrollLeft + tr.clientWidth / 2;
    let best = 0, bd = Infinity;
    cards.forEach((el, i) => {
      const off = centre(el) - c, d = off / (el.offsetWidth + 24), a = Math.min(Math.abs(d), 1.4);
      el.style.setProperty('--s', (1 - a * 0.14).toFixed(3));
      el.style.setProperty('--o', (1 - a * 0.5).toFixed(3));
      el.style.setProperty('--c', Math.max(0, 1 - Math.abs(d) * 3).toFixed(2));
      if (Math.abs(off) < bd) { bd = Math.abs(off); best = i; }
    });
    if (best !== cur || !count.dataset.ok) {
      cur = best; count.dataset.ok = 1;
      count.textContent = `${pad(cur + 1)} / ${pad(cards.length)}`;
      cards.forEach((el, i) => el.setAttribute('aria-current', String(i === cur)));
      prev.disabled = cur === 0; next.disabled = cur === cards.length - 1;
    }
  }
  const req = () => { if (!raf) raf = requestAnimationFrame(update); };
  function go(i, smooth = true) {
    i = Math.max(0, Math.min(cards.length - 1, i));
    tr.scrollTo({ left: centre(cards[i]) - tr.clientWidth / 2, behavior: smooth ? 'smooth' : 'auto' });
  }
  tr.addEventListener('scroll', req, { passive: true });
  addEventListener('resize', () => { go(cur, false); req(); });
  prev.addEventListener('click', () => go(cur - 1));
  next.addEventListener('click', () => go(cur + 1));
  tr.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
  // mouse: drag to scroll, click a side photo to bring it to the middle
  let drag = null;
  tr.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; drag = { x: e.clientX, l: tr.scrollLeft, moved: false }; });
  addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 4) { drag.moved = true; tr.classList.add('is-drag'); }
    if (drag.moved) tr.scrollLeft = drag.l - dx;
  });
  addEventListener('pointerup', (e) => {
    if (!drag) return;
    const was = drag.moved; drag = null; tr.classList.remove('is-drag');
    if (was) { update(); go(cur); return; }
    const card = e.target.closest && e.target.closest('.mgal__card');
    if (card) go(cards.indexOf(card));
  });
  go(0, false); update();
  addEventListener('load', () => { go(cur, false); update(); });
})();