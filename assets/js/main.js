/* =========================================================
   IONIC ARCHIVE — shared layout, marketplace links, consent, UI
   ========================================================= */
(function () {
  'use strict';
  const D = window.IA, A = window.Art;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  const eur = (v) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v);
  const STATUS = { available: ['Available', 'ok'], reserved: ['Reserved', 'res'], sold: ['Sold', 'sold'] };
  const TYPE = { camcorders: 'Camcorders', compacts: 'Digital compacts', accessories: 'Tapes & accessories' };
  const byId = (id) => D.products.find((p) => p.id === id);

  const statusTag = (p) => { const [l, c] = STATUS[p.status]; return `<span class="tag tag--${c}">${l}</span>`; };
  const vf = (mode) => `<div class="vf" aria-hidden="true"><i class="vf__c tl"></i><i class="vf__c tr"></i><i class="vf__c bl"></i><i class="vf__c br"></i><span class="vf__rec">● REC</span><span class="vf__mode">${mode}</span><span class="vf__bat"></span><span class="vf__tc" data-tc>00:00:00:00</span></div>`;
  const modeOf = (p) => (p.type === 'compacts' ? `${p.art.mp}M` : p.type === 'camcorders' ? 'SP' : 'DV');

  /* Real product photo on its own white studio background */
  function photo(p, i, opts) {
    opts = opts || {};
    const L = (opts.card && p.photos.card) || p.photos.list;
    const [f, label, w, h] = L[i] || p.photos.list[i];
    return `<img class="ph" src="${p.photos.dir}/${f}.jpg" width="${w}" height="${h}" alt="${opts.alt === '' ? '' : `${p.name}, ${label.toLowerCase()}`}" ${opts.eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  }
  // cards use the centred card crops when a piece has them (photos.card), otherwise its first two photos
  const view = (p, v) => (p.photos ? photo(p, v === 'a' ? 0 : 1, { alt: v === 'a' ? undefined : '', card: true }) : A.product(p, v));

  function card(p) {
    const sold = p.status === 'sold';
    const ph = p.photos ? ' shot--photo' : '';
    return `<article class="card${sold ? ' is-sold' : ''}">
<a class="card__link" href="product.html?id=${p.id}" aria-label="${p.name}, ${sold ? 'sold for ' + eur(p.price) : STATUS[p.status][0] + ', ' + eur(p.price)}">
<div class="card__media">
<div class="shot shot--a${ph}">${view(p, 'a')}</div>
<div class="shot shot--b${ph}" aria-hidden="true">${view(p, 'b')}</div>${sold ? `<span class="card__sold">Sold for ${eur(p.price)}</span>` : ''}
</div>
<h3 class="card__name">${p.name}</h3>
${sold ? '' : `<p class="card__price">${eur(p.price)}</p>`}
</a></article>`;
  }

  const LOGO = (label) => `<a class="logo logo--img" href="index.html" aria-label="${label}"><img src="assets/img/brand/logo.png" width="640" height="218" alt="Ionic Archive"></a>`;
  /* ---------- header + footer ---------- */
  const page = document.body.dataset.page;
  const NAV = [['archive.html', 'Archive', 'archive'], ['dropouts.html', 'Dropouts', 'dropouts'], ['manifesto.html', 'Manifesto', 'manifesto'], ['journal.html', 'Journal', 'journal'], ['support.html', 'Support', 'support']];
  const total = D.products.length, avail = D.products.filter((p) => p.status === 'available').length;

  document.body.insertAdjacentHTML('afterbegin', `<a class="skip" href="#main">Skip to content</a>
<div class="strip"><div class="wrap strip__in"><span>${total} pieces catalogued · ${avail} available · Buy safely on eBay &amp; Vinted</span></div></div>
<header class="hdr"><div class="wrap hdr__in">
${LOGO('Ionic Archive, home')}
<nav class="nav" id="nav" aria-label="Main"><ul>${NAV.map(([h, l, k]) => k === 'dropouts'
    ? `<li class="nav__drop-li"><a class="nav__drop" href="${h}"${k === page ? ' aria-current="page"' : ''}><img class="nav__fig" src="assets/img/brand/travis-glow.png" width="170" height="272" alt="" aria-hidden="true"><span class="nav__lbl">${l}</span></a></li>`
    : `<li><a href="${h}"${k === page ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul></nav>
<div class="hdr__tools">
<a class="buyvia hide-sm" href="support.html#buying"><span class="label">Sold via</span> eBay · Vinted</a>
<button class="burger" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
</div></div></header>`);

  const main = $('#main');
  main.insertAdjacentHTML('afterend', `<footer class="ftr"><div class="wrap">
<div class="ftr__brand">${LOGO('Ionic Archive')}
<p>Camcorders and digital cameras.</p>
<p class="ftr__shops">${D.shops ? `<a href="${D.shops.ebay}" target="_blank" rel="noopener">eBay shop ↗</a><a href="${D.shops.vinted}" target="_blank" rel="noopener">Vinted wardrobe ↗</a>` : ''}</p></div>
<div class="ftr__grid">
<div><h4>Archive</h4><ul><li><a href="archive.html?type=camcorders">Camcorders</a></li><li><a href="archive.html?type=compacts">Digital compacts</a></li><li><a href="archive.html?type=accessories">Tapes &amp; accessories</a></li><li><a href="archive.html">Archived pieces</a></li></ul></div>
<div><h4>Ionic Archive</h4><ul><li><a href="dropouts.html">Dropouts</a></li><li><a href="manifesto.html">Manifesto</a></li><li><a href="journal.html">Journal</a></li><li><a href="https://www.instagram.com/ionic.archive" rel="noopener" target="_blank">Instagram</a></li><li><a href="mailto:ionicarchive@gmail.com">Email</a></li></ul></div>
<div><h4>Support</h4><ul><li><a href="support.html#buying">How buying works</a></li><li><a href="support.html#shipping">Shipping</a></li><li><a href="support.html#returns">Returns &amp; warranty</a></li><li><a href="support.html#contact">Contact</a></li></ul></div>
</div>
<div class="ftr__base label"><span>© 2026 Ionic Archive</span><span><a href="legal.html#privacy">Privacy</a> · <a href="legal.html#terms">Terms</a></span></div>
</div></footer>
<div class="toast" role="status" aria-live="polite" data-toast></div>`);

  /* ---------- toast ---------- */
  let tt;
  function toast(msg) {
    const t = $('[data-toast]'); t.textContent = msg; t.classList.add('on');
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2600);
  }

  /* ---------- mobile nav ---------- */
  const burger = $('.burger'), nav = $('#nav');
  burger.addEventListener('click', () => {
    const o = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', o); burger.textContent = o ? 'Close' : 'Menu';
    document.body.style.overflow = o ? 'hidden' : '';
  });

  /* ---------- timecode ---------- */
  const t0 = performance.now();
  const tc = (ms) => { const f = Math.floor(ms / 40); return [Math.floor(f / 90000), Math.floor(f / 1500) % 60, Math.floor(f / 25) % 60, f % 25].map((x) => String(x).padStart(2, '0')).join(':'); };
  setInterval(() => { const s = tc(performance.now() - t0); $$('[data-tc]').forEach((e) => { e.textContent = s; }); }, RM ? 1000 : 120);

  /* ---------- marketplaces: nothing is sold on this site, every piece links out to its eBay / Vinted listing ---------- */
  try { localStorage.removeItem('ia-cart'); } catch (e) { /* old prototype cart */ }
  // a piece's own listing if it has one, otherwise the shop / wardrobe front page
  function buyLinks(p) {
    const L = (p && p.links) || {}, S = D.shops || {};
    return [['ebay', 'eBay', L.ebay || (L.vinted ? '' : S.ebay)], ['vinted', 'Vinted', L.vinted || (L.ebay ? '' : S.vinted)]]
      .filter((x) => x[2]).map(([k, name, url]) => ({ k, name, url }));
  }

  /* no cookies or trackers on this site, so no consent banner (see legal.html#privacy) */
  try { localStorage.removeItem('ia-consent'); } catch (e) { /* storage unavailable */ }

  /* ---------- newsletter ---------- */
  $$('form[data-newsletter]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('input[type=email]', f), ok = $('input[type=checkbox]', f);
    if (!email.value || !email.checkValidity()) { email.focus(); toast('Please enter a valid email address.'); return; }
    if (ok && !ok.checked) { ok.focus(); toast('We need your consent to send you alerts.'); return; }
    f.outerHTML = `<p class="nl-ok" role="status">● Thanks, you're on the list for new arrivals.</p>`;
  }));

  /* ---------- reveal on scroll ---------- */
  function observe() {
    const els = $$('.rv:not(.in)');
    if (RM || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- "LCD power-on" page transition ---------- */
  const lcd = $('.lcd');
  if (lcd) lcd.addEventListener('animationend', (e) => { if (e.target.classList.contains('lcd__t') && !lcd.classList.contains('lcd--out')) lcd.style.visibility = 'hidden'; });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || !lcd || RM || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download') || a.getAttribute('href').startsWith('#')) return;
    const u = new URL(a.href, location.href);
    if (u.protocol !== location.protocol || u.host !== location.host) return;
    if (u.pathname === location.pathname && u.search === location.search) return;
    e.preventDefault();
    lcd.style.visibility = '';
    lcd.classList.add('lcd--out');
    setTimeout(() => { location.href = u.href; }, 300);
  });
  window.addEventListener('pageshow', (e) => { if (e.persisted && lcd) lcd.classList.remove('lcd--out'); });

  window.IAUI = { $, $$, RM, store, eur, card, photo, view, statusTag, vf, modeOf, toast, buyLinks, byId, TYPE, STATUS, observe };
  document.addEventListener('DOMContentLoaded', observe);
  setTimeout(observe, 0);
})();
