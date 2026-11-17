/* =========================================================
   IONIC ARCHIVE — demo data
   Models, years and specs are placeholders: verify them
   against each real unit before publishing.
   ========================================================= */
(function () {
  'use strict';
  const T_VIDEO = [
    ['Recording SP / LP', 'OK'], ['Playback and search', 'OK'], ['LCD and viewfinder', 'OK'],
    ['Optical zoom and autofocus', 'OK'], ['Battery runtime', '72 min'], ['DV / IEEE 1394 port', 'OK'],
    ['AV out', 'OK'], ['Tape transport', 'OK'], ['Head cleaning', 'Done'], ['Microphone audio', 'OK']
  ];
  const T_FOTO = [
    ['Shutter and autofocus', 'OK'], ['Flash', 'OK'], ['LCD screen', 'OK'], ['Optical zoom', 'OK'],
    ['Battery runtime', '210 shots'], ['Card read / write', 'OK'], ['USB port', 'OK'],
    ['Buttons and mode dial', 'OK'], ['Sensor: hot pixels', 'None'], ['VGA video', 'OK']
  ];
  const T_ACC = [['Factory seal', 'Intact'], ['Production date', 'Verified'], ['Storage', 'Dark, 18 °C']];

  const products = [
    { id: 'IA-0044', name: 'Nikon Coolpix 3500', brand: 'Nikon', type: 'compacts', year: 2003, country: 'Japan', format: 'CompactFlash', sensor: 'CCD 1/2.7" · 3.2 MP', mp: 3.2, price: 249, status: 'available', grade: 'A', added: '2026-11-17',
      links: { ebay: '', vinted: '' }, // ← paste this camera's eBay / Vinted listing URLs
      art: { kind: 'compact', style: 'compact', tone: 'silver', mp: '3.2', zoom: 3 },
      photos: { dir: 'assets/img/ia-0044', list: [
        ['front', 'Front, lens out', 1200, 1600], ['closed', 'Closed', 1200, 1600], ['back-open', 'Back, screen on', 1200, 1600],
        ['back-closed', 'Back, closed', 1200, 1600], ['lens-detail', 'Zoom-Nikkor detail', 1200, 1600],
        ['side-open', 'Lens swivelled', 1469, 1600], ['screen-on', 'Start-up screen', 1200, 1600],
        ['box', 'Box and accessories', 1200, 1600]
      ] },
      story: 'Nikon\'s swivel compact. The lens and flash live in a block that turns inside an open metal frame: shoot over a crowd, down at your feet, or back at yourself.',
      storySub: 'Folded shut it is a smooth silver bar with nothing sticking out. The 3.2-megapixel CCD behind Zoom-Nikkor glass gives clean, slightly cool daylight files, and the built-in flash turns skin bright against a black background. Few cameras from 2003 look this much like a piece of industrial design.',
      notes: ['Original "3× Zoom Nikkor" and "3.2 Megapixels" front stickers intact.', 'Swivel instruction label on the back intact.', 'Lens glass clean; screen bright and free of dead pixels.'],
      box: ['Original box', '2 × EN-EL2 battery (one still sealed)', 'MH-60 charger', '1 GB SanDisk Ultra II CompactFlash', 'Wrist strap'],
      tests: [['Power-on and start-up', 'OK'], ['Lens swivel mechanism', 'OK'], ['Shutter and autofocus', 'OK'], ['Flash', 'OK'], ['Optical zoom', 'OK'],
        ['LCD screen', 'OK'], ['Card read / write', 'OK'], ['Battery and charger', 'OK'], ['Buttons and controls', 'OK'], ['Sensor: hot pixels', 'None']],
      specs: [['Sensor', 'CCD 1/2.7" · 3.2 MP'], ['Lens', 'Zoom-Nikkor 3×, 5.6–16.8 mm'], ['Focal length (equiv.)', '≈ 37–111 mm'], ['Aperture', 'f/2.7–4.8'],
        ['Design', 'Swivel lens and flash block'], ['Screen', '1.5" LCD'], ['Media', 'CompactFlash Type I'], ['Battery', 'EN-EL2 lithium-ion']],
      samples: [] },

    { id: 'IA-0043', name: 'Sony DVM60 MiniDV tapes ×3', brand: 'Sony', type: 'accessories', year: 2005, country: 'Japan', format: 'MiniDV tape', sensor: '—', mp: 0, price: 24, status: 'available', grade: 'A+', added: '2026-11-15',
      art: { kind: 'tape' }, story: 'Three 60-minute cassettes, still in cellophane. The format that put digital video in everyone\'s pocket.', storySub: 'Store upright, away from magnets and heat. Compatible with any MiniDV camcorder.',
      notes: ['Cellophane intact, one light crease on a corner of one pack.'], box: ['3 × DVM60 cassettes', 'Original cases'], tests: T_ACC,
      specs: [['Format', 'MiniDV'], ['Length', 'SP 60 min / LP 90 min'], ['Tape', 'Metal evaporated'], ['Quantity', '3 cassettes']], samples: [0, 2, 3] },

    { id: 'IA-0042', name: 'Sony Cyber-shot DSC-T1', brand: 'Sony', type: 'compacts', year: 2004, country: 'Japan', format: 'Memory Stick Duo', sensor: 'CCD 1/2.4" · 5.1 MP', mp: 5.1, price: 289, status: 'available', grade: 'A', added: '2026-11-14',
      art: { kind: 'compact', style: 'slim', tone: 'silver', mp: '5.1', zoom: 3 },
      story: 'In 2004 it was the thinnest camera you could slip into a pocket. The whole zoom lived inside the body, hidden behind a sliding cover.',
      storySub: 'The 5-megapixel CCD gives dense colour; the flash is hard and direct. It is the look people chase in night photos today: glowing skin, a background that falls into black, the orange date in the corner.',
      notes: ['3 mm hairline scratch on the top edge, visible only against the light.', 'Light paint wear on the sliding lens cover.', 'Screen free of scratches, no dead pixels.'],
      box: ['NP-FT1 battery', 'Charger', 'USB/AV cable', '512 MB Memory Stick Duo', 'Wrist strap'], tests: T_FOTO,
      specs: [['Sensor', 'CCD 1/2.4" · 5.1 MP effective'], ['Lens', 'Carl Zeiss Vario-Tessar 3×'], ['Focal length (equiv.)', '38–114 mm'], ['Aperture', 'f/3.5–4.4'], ['ISO', '100–400'], ['Screen', '2.5" LCD'], ['Video', '640×480 · 30 fps'], ['Media', 'Memory Stick Duo'], ['Weight', '≈ 150 g']], samples: [1, 5, 3] },

    { id: 'IA-0041', name: 'Sony Handycam DCR-PC110E', brand: 'Sony', type: 'camcorders', year: 2000, country: 'Japan', format: 'MiniDV', sensor: 'CCD 1/4" · 1.07 MP', mp: 1.07, price: 349, status: 'available', grade: 'A', added: '2026-11-12',
      art: { kind: 'camcorder', tone: 'silver', fmt: 'DV', zoom: 10, label: 'PC110E' },
      story: 'A MiniDV camcorder the size of a paperback. DV tape records a soft image, with highlights that bloom just slightly.',
      storySub: 'That is exactly why it keeps showing up in music videos and skate edits: no surgical sharpness, just an image that already feels like a memory.',
      notes: ['Light wear on the base, where it sits on a tripod.', 'Original lens hood with one small scratch.', 'Heads cleaned, no dropouts on playback.'],
      box: ['NP-FM50 battery', 'AC adapter', 'AV cable', 'DVM60 tape', 'Remote control', 'Strap'], tests: T_VIDEO,
      specs: [['Format', 'MiniDV · SP / LP'], ['Sensor', 'CCD 1/4" · 1.07 MP'], ['Optical zoom', '10×'], ['Screen', '2.5" LCD'], ['Viewfinder', 'Colour'], ['In / out', 'DV IEEE 1394 · AV'], ['Stills', 'Memory Stick · 1152×864'], ['Weight', '≈ 550 g']], samples: [2, 0, 4] },

    { id: 'IA-0040', name: 'Canon PowerShot A70', brand: 'Canon', type: 'compacts', year: 2003, country: 'Japan', format: 'CompactFlash', sensor: 'CCD 1/2.7" · 3.2 MP', mp: 3.2, price: 119, status: 'available', grade: 'B', added: '2026-11-09',
      art: { kind: 'compact', style: 'grip', tone: 'silver', mp: '3.2', zoom: 3 },
      story: 'The compact half the world had at home: plastic body, four AA batteries, a proper mode dial.',
      storySub: 'It has P, A, S and M modes and a 3.2-megapixel CCD that renders reds with an unmistakable saturation.',
      notes: ['Paint worn on the grip.', 'Battery door hinge slightly loose but working.', 'Clean optics, no fungus.'],
      box: ['4 × rechargeable AA', '256 MB CompactFlash', 'USB cable', 'Strap'], tests: T_FOTO,
      specs: [['Sensor', 'CCD 1/2.7" · 3.2 MP'], ['Optical zoom', '3× · 35–105 mm equiv.'], ['Modes', 'P / Av / Tv / M'], ['Screen', '1.5" LCD'], ['Power', '4 × AA'], ['Media', 'CompactFlash'], ['Weight', '≈ 215 g']], samples: [4, 1, 5] },

    { id: 'IA-0039', name: 'Canon Digital IXUS 40', brand: 'Canon', type: 'compacts', year: 2004, country: 'Japan', format: 'SD', sensor: 'CCD 1/2.5" · 4 MP', mp: 4, price: 159, status: 'reserved', grade: 'A', added: '2026-11-07',
      art: { kind: 'compact', style: 'compact', tone: 'champagne', mp: '4.0', zoom: 3 },
      story: 'Steel and aluminium, soft corners: one of the most elegant objects of its generation.',
      storySub: 'It shoots honestly and quietly. The 4-megapixel sensor handles daylight beautifully, and the flash has a soft, almost studio-like character.',
      notes: ['Body in excellent shape, one faint mark near the strap lug.'],
      box: ['NB-4L battery', 'Charger', '512 MB SD card', 'USB cable'], tests: T_FOTO,
      specs: [['Sensor', 'CCD 1/2.5" · 4 MP'], ['Optical zoom', '3× · 35–105 mm equiv.'], ['Screen', '2" LCD'], ['Media', 'SD'], ['Video', '640×480 · 30 fps'], ['Weight', '≈ 130 g']], samples: [5, 2, 0] },

    { id: 'IA-0038', name: 'Panasonic NV-GS11', brand: 'Panasonic', type: 'camcorders', year: 2004, country: 'Japan', format: 'MiniDV', sensor: 'CCD 1/6" · 0.8 MP', mp: .8, price: 179, status: 'available', grade: 'B', added: '2026-11-04',
      art: { kind: 'camcorder', tone: 'graphite', fmt: 'DV', zoom: 24, label: 'NV-GS11' },
      story: 'Light, immediate, built for family holidays. Today it is the ideal first MiniDV.',
      storySub: 'Simple controls and a clean image that gets dirty in exactly the right way when the light drops.',
      notes: ['Surface scratches on the screen side.', 'Viewfinder eyecup replaced with a compatible part.'],
      box: ['Battery', 'AC adapter', 'AV cable', 'DVM60 tape'], tests: T_VIDEO,
      specs: [['Format', 'MiniDV · SP / LP'], ['Sensor', 'CCD 1/6" · 0.8 MP'], ['Optical zoom', '24×'], ['Screen', '2.5" LCD'], ['In / out', 'DV · AV'], ['Weight', '≈ 400 g']], samples: [3, 2, 1] },

    { id: 'IA-0036', name: 'Fujifilm FinePix F10', brand: 'Fujifilm', type: 'compacts', year: 2005, country: 'Japan', format: 'xD-Picture Card', sensor: 'Super CCD HR 1/1.7" · 6.3 MP', mp: 6.3, price: 249, status: 'available', grade: 'A', added: '2026-10-30',
      art: { kind: 'compact', style: 'compact', tone: 'graphite', mp: '6.3', zoom: 3 },
      story: 'Famous for its high-ISO results at a time when other compacts simply gave up.',
      storySub: 'The 6.3-megapixel Super CCD holds night scenes with grain that feels almost like film. One of the most sought-after compacts for shooting at night without flash.',
      notes: ['Small dent on the bottom edge, no effect on use.', 'Screen is perfect.'],
      box: ['NP-120 battery', 'Charger', '512 MB xD-Picture Card', 'USB cable'], tests: T_FOTO,
      specs: [['Sensor', 'Super CCD HR 1/1.7" · 6.3 MP'], ['ISO', '80–1600'], ['Optical zoom', '3× · 36–108 mm equiv.'], ['Screen', '2.5" LCD'], ['Media', 'xD-Picture Card'], ['Weight', '≈ 155 g']], samples: [1, 3, 4] },

    { id: 'IA-0035', name: 'Sony Cyber-shot DSC-P72', brand: 'Sony', type: 'compacts', year: 2003, country: 'Japan', format: 'Memory Stick', sensor: 'CCD 1/2.7" · 3.2 MP', mp: 3.2, price: 99, status: 'available', grade: 'B', added: '2026-10-26',
      art: { kind: 'compact', style: 'grip', tone: 'silver', mp: '3.2', zoom: 3 },
      story: 'The classic two-sided Cyber-shot: a grip full of AA batteries on one side, the lens on the other.',
      storySub: 'Three megapixels and a small, punchy flash. The very sound of a party in 2003.',
      notes: ['Visible wear on the corners.', 'Slight haze on the flash window, no effect on photos.'],
      box: ['2 × rechargeable AA', '128 MB Memory Stick', 'USB cable'], tests: T_FOTO,
      specs: [['Sensor', 'CCD 1/2.7" · 3.2 MP'], ['Optical zoom', '3×'], ['Screen', '1.5" LCD'], ['Power', '2 × AA'], ['Media', 'Memory Stick'], ['Weight', '≈ 200 g']], samples: [1, 0, 5] },

    { id: 'IA-0034', name: 'Olympus μ mini Digital', brand: 'Olympus', type: 'compacts', year: 2004, country: 'Japan', format: 'xD-Picture Card', sensor: 'CCD 1/2.5" · 4 MP', mp: 4, price: 139, status: 'available', grade: 'C', added: '2026-10-21',
      art: { kind: 'compact', style: 'slim', tone: 'blue', mp: '4.0', zoom: 2 },
      story: 'Rounded shapes, a splash-proof body, pastel colours. An object designed to go everywhere.',
      storySub: 'This one really did go everywhere: the marks tell the story. It works perfectly.',
      notes: ['Scratches across front and back.', 'Paint worn on one corner.', 'Fine scratch on the top right of the screen, visible when it is off.'],
      box: ['Battery', 'Charger', '256 MB xD-Picture Card'], tests: T_FOTO,
      specs: [['Sensor', 'CCD 1/2.5" · 4 MP'], ['Optical zoom', '2×'], ['Screen', '1.8" LCD'], ['Body', 'Splash-proof'], ['Media', 'xD-Picture Card'], ['Weight', '≈ 120 g']], samples: [5, 4, 2] },

    { id: 'IA-0037', name: 'Sony Handycam DCR-TRV22E', brand: 'Sony', type: 'camcorders', year: 2002, country: 'Japan', format: 'MiniDV', sensor: 'CCD 1/4" · 0.8 MP', mp: .8, price: 219, status: 'sold', grade: 'A', added: '2026-10-15',
      art: { kind: 'camcorder', tone: 'silver', fmt: 'DV', zoom: 10, label: 'TRV22E' },
      story: 'One of the most common MiniDV camcorders of the early 2000s, with a wide screen and stabilisation that smooths out handheld moves.',
      storySub: 'Gone to a new home. It stays in the archive as a reference.',
      notes: ['Unit in excellent condition.'], box: ['Battery', 'AC adapter', 'AV cable'], tests: T_VIDEO,
      specs: [['Format', 'MiniDV · SP / LP'], ['Optical zoom', '10×'], ['Screen', '2.5" LCD']], samples: [0, 2, 4] },

    { id: 'IA-0033', name: 'Sony Handycam DCR-TRV255E', brand: 'Sony', type: 'camcorders', year: 2002, country: 'Japan', format: 'Digital8', sensor: 'CCD 1/6" · 0.46 MP', mp: .46, price: 129, status: 'sold', grade: 'B', added: '2026-10-08',
      art: { kind: 'camcorder', tone: 'black', fmt: 'D8', zoom: 20, label: 'TRV255E' },
      story: 'A Digital8: it records digitally onto Hi8 tapes and still plays old Video8 and Hi8 cassettes. Perfect for rescuing a family archive.',
      storySub: 'Gone to a new home. It stays in the archive as a reference.',
      notes: ['Moderate signs of use.'], box: ['Battery', 'AC adapter'], tests: T_VIDEO,
      specs: [['Format', 'Digital8 · Hi8 / Video8 playback'], ['Optical zoom', '20×']], samples: [3, 1, 2] },

    { id: 'IA-0032', name: 'Sony Handycam DCR-HC30E', brand: 'Sony', type: 'camcorders', year: 2004, country: 'Japan', format: 'MiniDV', sensor: 'CCD 1/6" · 0.8 MP', mp: .8, price: 169, status: 'sold', grade: 'A', added: '2026-09-30',
      art: { kind: 'camcorder', tone: 'silver', fmt: 'DV', zoom: 20, label: 'HC30E' },
      story: 'Small and light, one of the last MiniDV camcorders before the jump to high definition.',
      storySub: 'Gone to a new home. It stays in the archive as a reference.',
      notes: ['Unit in excellent condition.'], box: ['Battery', 'AC adapter', 'AV cable'], tests: T_VIDEO,
      specs: [['Format', 'MiniDV · SP / LP'], ['Optical zoom', '20×']], samples: [4, 0, 3] },

    { id: 'IA-0031', name: 'Sony Cyber-shot DSC-W5', brand: 'Sony', type: 'compacts', year: 2005, country: 'Japan', format: 'Memory Stick Duo', sensor: 'CCD 1/1.8" · 5.1 MP', mp: 5.1, price: 129, status: 'sold', grade: 'A+', added: '2026-09-22',
      art: { kind: 'compact', style: 'grip', tone: 'silver', mp: '5.1', zoom: 3 },
      story: 'An all-rounder with an optical viewfinder and a large screen. Its 1/1.8" sensor was generous for the class.',
      storySub: 'Gone to a new home. It stays in the archive as a reference.',
      notes: ['As new.'], box: ['2 × AA', 'Memory Stick Duo'], tests: T_FOTO,
      specs: [['Sensor', 'CCD 1/1.8" · 5.1 MP'], ['Optical zoom', '3×']], samples: [5, 1, 0] }
  ];

  const grades = {
    'A+': ['A+', 'Mint',       'No visible marks. Often with original packaging.'],
    'A':  ['A',  'Excellent',  'Hairline marks visible only against the light. Works perfectly.'],
    'B':  ['B',  'Good',       'Signs of use visible to the naked eye. Works perfectly.'],
    'C':  ['C',  'Well-loved', 'Obvious wear or small cosmetic flaws. Works; any limits are described.']
  };

  // Series 01 — the six real figures, 3D printed in a random colour. Names, lore and odds are placeholders.
  const tiers = [
    { id: 'common', label: 'Common', odds: 50, desc: 'Two figures. The ones you\'ll trade with your friends.' },
    { id: 'uncommon', label: 'Uncommon', odds: 22, desc: 'One figure. Shows up about one bag in five.' },
    { id: 'rare', label: 'Rare', odds: 15, desc: 'One figure. You\'ll remember the day you pulled it.' },
    { id: 'mythic', label: 'Mythic', odds: 9, desc: 'One figure. Most collectors only hear about it.' },
    { id: 'secret', label: 'Secret', odds: 4, desc: 'The original. It hides in the dark until you find it.' }
  ];

  // Glow chase: on top of the tier odds, any figure can come out in glow-in-the-dark filament.
  const glowOdds = 5; // percent of bags

  // model: assets/figures/<model>.iam (+ -poster.png / -sil.png), converted from the Bambu Studio 3MF files.
  // Every figure is printed in a random colour, so the 3D viewer cycles through filament colours.
  // accent: card / turntable colour. rim: coloured back-light.
  const figures = [
    { num: '01', model: 'fig-01', name: 'BEANIE', role: 'Beanie on, shirt off', tier: 'common', accent: '#FFD83D', rim: '#FF5FA8',
      lore: 'Beanie on, shirt off, camcorder already rolling. Shoots first, gets dressed later.' },
    { num: '02', model: 'fig-02', name: 'CAP', role: 'Cap and tank top', tier: 'common', accent: '#2F6BFF', rim: '#9FE7FF',
      lore: 'Cap low, tank top, camera at the hip. Never misses a line at the skatepark.' },
    { num: '03', model: 'fig-05', name: 'HOODIE', role: 'Hood up, REC on', tier: 'mythic', accent: '#FF6FB5', rim: '#FFFFFF',
      lore: 'Hood up, hands steady. Shows up at every gig and never ends up in the shot.' },
    { num: '04', model: 'fig-03', name: 'BIKINI', role: 'Swimsuit season', tier: 'rare', accent: '#22B5E3', rim: '#FF8AD0',
      lore: 'Swimsuit on, camcorder never far from the water. Every summer of 2004, on tape.' },
    { num: '05', model: 'fig-04', name: 'KNIT', role: 'Beanie girl', tier: 'uncommon', accent: '#1C1F33', rim: '#8A6BFF',
      lore: 'Knit beanie pulled low, camera always on. Films the people who are filming.' },
    { num: '06', model: 'fig-06', name: 'IONIC 00', role: 'The original Dropout', tier: 'secret', accent: '#FF8A3C', rim: '#FF8A3C',
      lore: 'The first figure we ever printed. Puffer jacket, camcorder, the archive\'s name. Nobody knows which bag it\'s in.' }
  ];

  const shots = [
    { k: 0, cls: 's1', id: 'IA-0041', cam: 'DCR-PC110E', meta: 'MiniDV · SP · sunset', video: true, tc: '0:03:41:12' },
    { k: 1, cls: 's2', id: 'IA-0042', cam: 'DSC-T1', meta: 'Flash · ISO 100', stamp: "'04 03 12" },
    { k: 3, cls: 's3', id: 'IA-0036', cam: 'FinePix F10', meta: 'ISO 1600 · no flash' },
    { k: 2, cls: 's4', id: 'IA-0038', cam: 'NV-GS11', meta: 'MiniDV · LP · skatepark', video: true, tc: '0:00:52:08' },
    { k: 5, cls: 's5', id: 'IA-0039', cam: 'IXUS 40', meta: 'Daylight', stamp: "'04 07 19" },
    { k: 4, cls: 's6', id: 'IA-0040', cam: 'PowerShot A70', meta: 'P mode · 1/250', stamp: "'03 01 06" },
    { k: 1, cls: 's7', id: 'IA-0035', cam: 'DSC-P72', meta: 'Forced flash', stamp: "'03 12 31" }
  ];

  // Nothing is sold on this site: every piece is listed on eBay and/or Vinted.
  // Put the real shop / wardrobe URLs here, and give each product its own listing
  // links, e.g. links: { ebay: 'https://www.ebay.it/itm/…', vinted: 'https://www.vinted.it/items/…' }.
  // A product with no links falls back to these shop pages.
  const shops = { ebay: 'https://www.ebay.com/', vinted: 'https://www.vinted.com/' };

  window.IA = { products, grades, tiers, figures, shots, glowOdds, shops };
})();
