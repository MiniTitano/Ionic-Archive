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
    { id: 'IA-0057', name: 'Sony GV-D900E Video Walkman', brand: 'Sony', type: 'accessories', year: 1997, country: 'Japan', format: 'MiniDV · PAL', sensor: '—', mp: 0, price: 1000, status: 'sold', grade: 'B', added: '2026-11-18',
      links: { ebay: '', vinted: '' },
      art: { kind: 'tape' },
      photos: { dir: 'assets/img/ia-0057', card: [['closed-card', 'Closed', 1000, 1250], ['screen-playback-card', 'Playing back a MiniDV tape', 1000, 1250]], list: [
        ['closed', 'Closed', 1200, 1600], ['screen-playback', 'Playing back a MiniDV tape', 1200, 1600], ['with-charger', 'With its AC-V700 charger', 1600, 1067],
        ['open', 'Open, screen on', 1600, 1065], ['controls', 'Transport controls', 1600, 1065], ['controls-detail', 'Controls close-up', 1600, 1065],
        ['cassette-bay', 'Cassette bay open', 1600, 1065], ['ports', 'S-Video, AV and LANC ports', 1600, 1065], ['rear', 'Rear, battery bay and DV in / out', 1600, 1065],
        ['side-battery', 'Battery door open', 1600, 1065], ['underside', 'Underside, model plate', 1600, 1065], ['with-charger-on', 'Powered from the charger', 1600, 1065],
        ['charger', 'AC-V700 charger', 1600, 1065], ['dc-plug', 'DC power plug', 1600, 1065]
      ] },
      story: 'A MiniDV deck that folds shut like a laptop. Sony\'s first Video Walkman for digital tape: a colour screen, a full transport and a DV port, all in something the size of a hardback book.',
      storySub: 'The GV-D900 was built for people who shot on MiniDV and needed to watch, log and dub tapes away from the camcorder: Play, Slow, Audio Dub, Assemble edit and Title, a 5.5" LCD, S-Video and AV in / out, LANC and a DV in / out for lossless capture to a computer. Made in Japan, and today the easiest way to digitise a box of family MiniDV tapes.',
      notes: ['Screen bright and playing back cleanly (see the playback photo).', 'Light wear and marks around the controls and cassette door.', 'AC-V700 charger shows wear on its base.'],
      box: ['Sony AC-V700 AC adapter / charger', 'DC connecting cord', 'Mains cable'],
      tests: [['Power-on and screen', 'OK'], ['MiniDV playback', 'OK'], ['Recording', 'OK'], ['Rewind / fast forward', 'OK'], ['Slow and pause', 'OK'],
        ['Speaker and headphones', 'OK'], ['DV in / out', 'OK'], ['S-Video and AV out', 'OK'], ['Cassette loading', 'OK'], ['AC-V700 charger', 'OK']],
      specs: [['Format', 'MiniDV · PAL'], ['Type', 'Portable digital video cassette recorder'], ['Screen', 'Fold-up colour LCD'], ['Editing', 'Audio dub · Assemble · Title'],
        ['In / out', 'DV in / out · S-Video · AV · LANC · Laser Link'], ['Power', 'InfoLITHIUM L series · DC 7.2 V'], ['Charger', 'Sony AC-V700'], ['Made in', 'Japan']],
      samples: [] },

    { id: 'IA-0056', name: 'Sony Handycam DCR-TRV140E', brand: 'Sony', type: 'camcorders', year: 2002, country: 'Japan', format: 'Digital8 · PAL', sensor: 'CCD', mp: 0.46, price: 149, status: 'sold', grade: 'B', added: '2026-11-18',
      links: { ebay: '', vinted: '' }, // ← paste this camcorder's eBay / Vinted listing URLs
      art: { kind: 'camcorder', tone: 'silver', fmt: 'D8', zoom: 20, label: 'TRV140E' },
      photos: { dir: 'assets/img/ia-0056', card: [['front-card', 'Front three-quarter', 1000, 1250], ['grip-side-card', 'Grip side and hand strap', 1000, 1250]], list: [
        ['front', 'Front three-quarter', 1200, 1600], ['side-badges', 'Digital8 and Super NightShot badges', 1200, 1600], ['lens', 'Sony video lens 20×, f = 3.6–72 mm 1:1.4', 1200, 1600],
        ['screen-open', 'LCD open, NightShot on', 1200, 1600], ['rear', 'Rear, viewfinder and battery bay', 1200, 1600], ['grip-side', 'Grip side and hand strap', 1200, 1600],
        ['tape-open', 'Tape door open', 1200, 1600], ['viewfinder', 'Through the viewfinder: 279 min, NightShot', 1200, 1600], ['kit', 'With bag, remote, batteries and adapter', 1200, 1600]
      ] },
      story: 'Digital video on cheap 8 mm tapes, plus Super NightShot that sees in total darkness. The Handycam of a thousand 2002 sleepovers.',
      storySub: 'The TRV140E records DV-quality digital video on Hi8 and Digital8 cassettes, and plays back old analogue Video8 and Hi8 family tapes too. A bright 20× Sony lens (F1.4), Colour Slow Shutter, USB streaming and the 0 lux Super NightShot that turns any dark room into green-tinted footage. Through FireWire it captures straight to a computer.',
      notes: ['Hand-strap leather is peeling (see the grip-side photo).', 'Lens glass clear; badges and stickers intact.', 'Tape transport and NightShot working; battery reads 279 minutes in the viewfinder.'],
      box: ['Camera bag', 'Sony RMT-808 remote control', '2 × InfoLITHIUM M-series batteries', 'AC adapter', 'USB Streaming instructions'],
      tests: [['Power-on, camera and player modes', 'OK'], ['Recording SP / LP', 'OK'], ['Playback and search', 'OK'], ['Hi8 / Video8 playback', 'OK'], ['Optical zoom and autofocus', 'OK'],
        ['Super NightShot', 'OK'], ['LCD and viewfinder', 'OK'], ['DV / i.LINK port', 'OK'], ['Remote control', 'OK'], ['Battery runtime', 'OK']],
      specs: [['Format', 'Digital8 · plays Hi8 / Video8 · PAL'], ['Lens', 'Sony video lens 20×, f = 3.6–72 mm, F1.4'], ['Digital zoom', '560×'], ['Night mode', 'Super NightShot 0 lux · Colour Slow Shutter'],
        ['Stabilisation', 'SteadyShot (digital)'], ['Audio', 'Hi-Fi stereo'], ['In / out', 'DV i.LINK · AV · USB streaming'], ['Battery', 'InfoLITHIUM M series']],
      samples: [] },

    { id: 'IA-0055', name: 'Sony Cyber-shot DSC-P32', brand: 'Sony', type: 'compacts', year: 2003, country: 'Japan', format: 'Memory Stick', sensor: 'CCD · 3.2 MP', mp: 3.2, price: 79, status: 'available', grade: 'B', added: '2026-11-18',
      links: { ebay: '', vinted: '' }, // ← paste this camera's eBay / Vinted listing URLs
      art: { kind: 'compact', style: 'compact', tone: 'silver', mp: '3.2', zoom: 1 },
      photos: { dir: 'assets/img/ia-0055', list: [
        ['front', 'Front', 1200, 1600], ['back', 'Back, controls', 1200, 1600], ['back-screen-on', 'Back, screen on', 1200, 1600],
        ['lens-detail', 'Sony lens, f = 5.0 mm 1:2.8', 1200, 1600], ['top', 'Top, MPEG Movie VX', 1200, 1600], ['bottom', 'Underside, model plate', 1200, 1600],
        ['box', 'With its original box', 1200, 1600]
      ] },
      story: 'The no-fuss Cyber-shot: one fixed lens, two AA batteries, and the flat, bright flash look of every 2003 house party.',
      storySub: 'The P32 was Sony\'s simplest pocket camera of its year: a 3.2-megapixel CCD behind a single 5 mm Sony lens, an optical viewfinder, and MPEG Movie VX for long VGA clips with sound. No zoom to wait for, so it is on and shooting almost instantly. It runs on AA cells, so power is never a problem.',
      notes: ['Fixed lens: no optical zoom (W / T is Sony\'s "Smart Zoom" crop).', 'Light wear on the body edges and around the screen.', 'Fitted with a red rope wrist strap; original box (worn top flap) included.'],
      box: ['Original box', 'Red rope wrist strap'],
      tests: [['Power-on and start-up', 'OK'], ['Shutter and autofocus', 'OK'], ['Flash', 'OK'], ['LCD and optical viewfinder', 'OK'], ['Memory Stick read / write', 'OK'],
        ['MPEG Movie VX', 'OK'], ['Buttons and mode dial', 'OK'], ['AA power', 'OK'], ['Smart Zoom', 'OK'], ['Sensor: hot pixels', 'None']],
      specs: [['Sensor', 'CCD · 3.2 MP'], ['Lens', 'Sony lens, f = 5.0 mm fixed'], ['Aperture', 'f/2.8'], ['Focus', 'Multi-point AF'], ['Video', 'MPEG Movie VX'],
        ['Viewfinder', 'Optical + LCD'], ['Media', 'Memory Stick'], ['Power', '2 × AA']],
      samples: [] },

    { id: 'IA-0054', name: 'Panasonic VDR-D160', brand: 'Panasonic', type: 'camcorders', year: 2007, country: 'Japan', format: 'DVD-RAM / DVD-R / DVD-RW', sensor: 'CCD', mp: 0.8, price: 129, status: 'available', grade: 'A', added: '2026-11-18',
      links: { ebay: '', vinted: '' }, // ← paste this camcorder's eBay / Vinted listing URLs
      art: { kind: 'camcorder', tone: 'silver', fmt: 'DVD', zoom: 30, label: 'VDR-D160' },
      photos: { dir: 'assets/img/ia-0054', list: [
        ['side', 'Side, 30× zoom and DVD badges', 1200, 1600], ['front', 'Front, Panasonic video lens', 1200, 1600], ['screen-open', 'Screen open, on', 1200, 1600],
        ['controls', 'Rear, viewfinder and mode dial', 1200, 1600], ['disc-open', 'Disc door open', 1200, 1600], ['grip-side', 'Grip side and hand strap', 1200, 1600],
        ['viewfinder', 'Through the viewfinder', 1200, 1600], ['kit', 'With bag, battery and charger', 1200, 1600]
      ] },
      story: 'The camcorder that burned your holiday straight onto a mini DVD. Close the door, press record, and the disc goes in the living-room player that evening.',
      storySub: 'Panasonic\'s 2007 DVD Handycam rival records to 8 cm DVD-RAM, DVD-R and DVD-RW discs, with a 30× optical zoom, a bright F1.8 lens and Dolby Digital stereo sound from a zoom microphone. Stills go to an SD / SDHC card. The footage is pure late-2000s standard definition: soft, saturated and instantly nostalgic.',
      notes: ['Body clean; badges and lens markings crisp.', 'Lens glass clear, no scratches.', 'Disc drive opens and closes smoothly; laser lens clean.'],
      box: ['Case Logic camera bag', 'Panasonic Li-ion battery', 'Panasonic charger', 'Lens cap', 'Hand strap'],
      tests: [['Power-on and screen', 'OK'], ['DVD recording', 'OK'], ['Playback', 'OK'], ['Optical zoom (30×)', 'OK'], ['Autofocus', 'OK'],
        ['Viewfinder', 'OK'], ['SD stills', 'OK'], ['Disc door and drive', 'OK'], ['Microphone audio', 'OK'], ['Battery and charger', 'OK']],
      specs: [['Format', 'DVD-RAM / DVD-R / DVD-RW (8 cm)'], ['Lens', 'Panasonic video lens, f = 1.9–57.0 mm, F1.8'], ['Optical zoom', '30×'], ['Filter', 'φ 30.5 mm'],
        ['Stills', 'SD / SDHC card'], ['Audio', 'Stereo zoom microphone · Dolby Digital'], ['Screen', 'Swing-out LCD'], ['Battery', 'Panasonic Li-ion']],
      samples: [] },

    { id: 'IA-0053', name: 'Sony Mavica MVC-FD81', brand: 'Sony', type: 'compacts', year: 2000, country: 'Japan', format: '3.5" floppy disk', sensor: 'Progressive CCD · 0.8 MP', mp: 0.8, price: 149, status: 'available', grade: 'B', added: '2026-11-18',
      links: { ebay: '', vinted: '' }, // ← paste this camera's eBay / Vinted listing URLs
      art: { kind: 'compact', style: 'grip', tone: 'silver', mp: '0.8', zoom: 3 },
      photos: { dir: 'assets/img/ia-0053', card: [['front-card', 'Front, lens cap off', 1000, 1250], ['front-cap-card', 'Front, cap on, with strap', 1000, 1250]], list: [
        ['front', 'Front, lens cap off', 1200, 1600], ['front-cap', 'Front, cap on, with strap', 1200, 1600], ['back', 'Back, controls', 1200, 1600],
        ['lens-detail', 'Sony video lens 3× detail', 1200, 1600], ['box', 'With its original box and battery', 1200, 1600]
      ] },
      story: 'A digital camera that saves to a floppy disk. Shoot, eject the 3.5" disk, slide it into any PC from 2000 and your photos are already there.',
      storySub: 'The Mavica FD81 is the camera from the school computer lab: a chunky silver block with a 3× Sony video lens, an 800,000-pixel progressive CCD and a Quick Access 2× floppy drive. It shoots up to XGA (1024×768) stills, short MPEG movies and voice memos. The files are tiny, soft and full of character, exactly what you remember.',
      notes: ['Residue where a sticker was removed from the front panel.', 'Original "Stamina" front sticker intact; lens glass clean.', 'Grip and controls in good order; original box included.'],
      box: ['Original box', 'InfoLITHIUM battery', 'Sony shoulder strap', 'Lens cap'],
      tests: [['Power-on and start-up', 'OK'], ['Floppy drive read / write', 'OK'], ['Shutter and autofocus', 'OK'], ['Flash', 'OK'], ['Optical zoom (3×)', 'OK'],
        ['LCD screen', 'OK'], ['MPEG movie', 'OK'], ['Voice memo', 'OK'], ['Battery', 'OK'], ['Sensor: hot pixels', 'None']],
      specs: [['Sensor', 'Progressive CCD · 800,000 pixels'], ['Lens', 'Sony video lens 3×, f = 5.2–15.6 mm'], ['Aperture', 'f/2.0'], ['Stills', 'up to XGA 1024×768'],
        ['Video', 'MPEG Movie'], ['Media', '3.5" floppy disk · Quick Access 2× drive'], ['Extras', 'Voice memo · e-mail mode · disk copy'], ['Battery', 'InfoLITHIUM']],
      samples: [] },

    { id: 'IA-0052', name: 'Sony Handycam CCD-TRV218E', brand: 'Sony', type: 'camcorders', year: 2003, country: 'Japan', format: 'Hi8', sensor: 'CCD', mp: 0.46, price: 129, status: 'available', grade: 'C', added: '2026-11-18',
      links: { ebay: '', vinted: '' }, // ← paste this camcorder's eBay / Vinted listing URLs
      art: { kind: 'camcorder', tone: 'silver', fmt: 'Hi8', zoom: 20, label: 'TRV218E' },
      photos: { dir: 'assets/img/ia-0052', card: [['side-card', 'Side, NightShot and Hi8 badges', 1000, 1250], ['front-card', 'Front, 20× Sony video lens', 1000, 1250]], list: [
        ['side', 'Side, NightShot and Hi8 badges', 1311, 1600], ['front', 'Front, 20× Sony video lens', 1200, 1600], ['grip-side', 'Grip side and power switch', 1200, 1600],
        ['rear', 'Rear, viewfinder and InfoLITHIUM battery', 1200, 1600], ['screen', 'LCD on, with its worn coating', 1200, 1600], ['screen-angle', 'LCD and tape controls', 1200, 1600],
        ['viewfinder', 'Through the viewfinder: Hi8 SP, clear', 1200, 1600], ['with-box', 'With its box, adapter, AV cable and strap', 1200, 1600]
      ] },
      story: 'The analogue Handycam at its last and best: Hi8 tape, a 20× zoom and NightShot, the infrared mode that turns a dark room into green-tinted footage.',
      storySub: 'Sony sold the TRV218E right as everything else went digital. It records on Hi8 and Video8 cassettes, so it also plays back the family tapes from the nineties. The picture has the soft, warm, slightly smeared colour of real analogue video, and the built-in lamp gives every night shot that harsh home-video glare.',
      notes: ['LCD screen: the anti-glare coating has partly melted and clouds the picture. You can still frame and play back on it; the viewfinder image is clear.', 'Hand-strap leather is peeling.', 'Body, lens glass and tape transport in good order; original box (worn corners) included.'],
      box: ['Original box', 'InfoLITHIUM M-series battery', 'AC adapter', 'AV cable', 'Shoulder strap', 'Lens cap'],
      tests: [['Power-on, camera and player modes', 'OK'], ['Recording SP / LP', 'OK'], ['Playback and search', 'OK'], ['Viewfinder', 'OK'], ['LCD screen', 'Coating worn'],
        ['Optical zoom and autofocus', 'OK'], ['NightShot', 'OK'], ['Video light', 'OK'], ['Battery runtime', 'OK'], ['AV out', 'OK']],
      specs: [['Format', 'Hi8 / Video8 · PAL'], ['Lens', 'Sony video lens 20×, f = 2.5–50 mm, F1.6'], ['Digital zoom', '560×'], ['Screen', '2.5" LCD'], ['Viewfinder', 'Black-and-white'],
        ['Night mode', 'NightShot infrared'], ['Light', 'Built-in video lamp'], ['In / out', 'AV · Easy Dubbing'], ['Battery', 'InfoLITHIUM M series']],
      samples: [] },

    { id: 'IA-0051', name: 'Sony Cyber-shot DSC-W120', brand: 'Sony', type: 'compacts', year: 2008, country: 'Japan', format: 'Memory Stick Duo', sensor: 'CCD 1/2.5" · 7.2 MP', mp: 7.2, price: 119, status: 'sold', grade: 'B', added: '2026-11-18',
      links: { ebay: '', vinted: '' }, // ← paste this camera's eBay / Vinted listing URLs
      art: { kind: 'compact', style: 'slim', tone: 'graphite', mp: '7.2', zoom: 4 },
      photos: { dir: 'assets/img/ia-0051', card: [['lens-out-card', 'Front, lens out', 1000, 1250], ['back-card', 'Back, screen on', 1000, 1250]], list: [
        ['lens-out', 'Front, lens out', 1200, 1600], ['back', 'Back, screen on', 1200, 1600], ['front', 'Front, lens closed', 1200, 1600],
        ['angle', 'Three-quarter view', 1200, 1600], ['kit', 'With battery and charger', 1200, 1600]
      ] },
      story: 'The 2008 party camera in black: a 4× Carl Zeiss zoom, Smile Shutter that fires when people grin, and a flash bright enough to flatten a whole room.',
      storySub: 'The W120 is peak late-2000s Cyber-shot: 7.2 megapixels from a CCD, Super SteadyShot, ISO up to 3200 for grainy night shots, and a real optical viewfinder next to the screen. Files are crisp in daylight and turn gloriously noisy indoors.',
      notes: ['Front feature sticker scuffed across "Smile Shutter"; Zeiss / Full HD sticker has a worn corner.', 'Small marks in two corners of the screen surround, not on the display area.', 'Lens extends and retracts smoothly; glass clean.'],
      box: ['NP-BG1 lithium-ion battery', 'Sony charger'],
      tests: [['Power-on and lens extension', 'OK'], ['Shutter and autofocus', 'OK'], ['Flash', 'OK'], ['Optical zoom 4×', 'OK'], ['Super SteadyShot', 'OK'],
        ['LCD and optical viewfinder', 'OK'], ['Smile Shutter', 'OK'], ['Card read / write', 'OK'], ['Battery and charger', 'OK'], ['Sensor: hot pixels', 'None']],
      specs: [['Sensor', 'CCD 1/2.5" · 7.2 MP'], ['Lens', 'Carl Zeiss Vario-Tessar 4×, 5.35–21.4 mm'], ['Aperture', 'f/2.8–5.8'], ['ISO', 'up to 3200'],
        ['Stabilisation', 'Super SteadyShot (optical)'], ['Viewfinder', 'Optical + LCD'], ['Media', 'Memory Stick Duo / PRO Duo'], ['Battery', 'NP-BG1 lithium-ion']],
      samples: [] },

    { id: 'IA-0050', name: 'Sony Cyber-shot DSC-M2', brand: 'Sony', type: 'compacts', year: 2005, country: 'Japan', format: 'Memory Stick PRO Duo', sensor: 'CCD · 5.1 MP', mp: 5.1, price: 300, status: 'available', grade: 'B', added: '2026-11-18',
      links: { ebay: '', vinted: '' }, // ← paste this camera's eBay / Vinted listing URLs
      art: { kind: 'compact', style: 'slim', tone: 'silver', mp: '5.1', zoom: 3 },
      photos: { dir: 'assets/img/ia-0050', card: [['front-card', 'Front, closed', 1000, 1250], ['back-screen-on-card', 'Back, screen on, in the cradle', 1000, 1250]], list: [
        ['front', 'Front, closed', 1200, 1600], ['back-screen-on', 'Back, screen on, in the cradle', 1200, 1600], ['swivel-open', 'Screen swung open', 1200, 1600],
        ['lens-detail', 'Carl Zeiss Vario-Tessar detail', 1200, 1600], ['controls', 'Jog dial and PHOTO / MOVIE buttons', 1200, 1600], ['back-controls', 'Back, controls', 1200, 1600],
        ['side', 'Side, power and DC in', 1200, 1600], ['underside', 'Underside, serial label', 1200, 1600], ['in-cradle', 'In the cradle', 1200, 1600], ['cradle', 'Cradle', 1200, 1600]
      ] },
      story: 'Half camera, half camcorder, held like a phone. The screen swings out sideways, the lens sits on top, and PHOTO and MOVIE get their own buttons.',
      storySub: 'Sony\'s 2005 answer to "why not both": a 5.1-megapixel Cyber-shot with Carl Zeiss glass, MPEG4 VGA video at 30 fps with stereo sound, and a Hybrid mode that saves the five seconds of video around every photo. A working camera that has been used and carried, with its acrylic dock.',
      notes: ['Scratches on the outside of the swivel screen panel (see the swivel photo).', 'Lens ring markings and glass clean.', 'Clear cradle cover shows light handling marks.'],
      box: ['Docking cradle with clear cover', 'NP-FT1 battery', 'Wrist strap'],
      tests: [['Power-on and swivel screen', 'OK'], ['Shutter and autofocus', 'OK'], ['Flash', 'OK'], ['Optical zoom', 'OK'], ['MPEG4 VGA video', 'OK'],
        ['Hybrid mode', 'OK'], ['Internal memory and card', 'OK'], ['Battery and cradle charging', 'OK'], ['Buttons and jog dial', 'OK'], ['Sensor: hot pixels', 'None']],
      specs: [['Sensor', 'CCD · 5.1 MP'], ['Lens', 'Carl Zeiss Vario-Tessar 3×, 6.33–19.0 mm'], ['Focal length (equiv.)', '38–114 mm'], ['Aperture', 'f/3.5–4.4'],
        ['Design', 'Swivel screen, separate PHOTO / MOVIE buttons'], ['Video', 'MPEG4 VGA · 30 fps · stereo'], ['Memory', 'Internal + Memory Stick PRO Duo'], ['Battery', 'NP-FT1 InfoLITHIUM'], ['Dock', 'Cradle with A/V out, USB, DC in']],
      samples: [] },

    { id: 'IA-0049', name: 'Nikon Coolpix 2500', brand: 'Nikon', type: 'compacts', year: 2002, country: 'Japan', format: 'CompactFlash', sensor: 'CCD · 2 MP', mp: 2, price: 149, status: 'available', grade: 'A', added: '2026-11-18',
      links: { ebay: '', vinted: '' }, // ← paste this camera's eBay / Vinted listing URLs
      art: { kind: 'compact', style: 'compact', tone: 'blue', mp: '2.0', zoom: 3 },
      photos: { dir: 'assets/img/ia-0049', card: [['front-vertical-card', 'Front, lens open', 1000, 1250], ['back-vertical-card', 'Upright, lens turned away', 1000, 1250]], list: [
        // same order as the Coolpix 3500: upright with lens open, upright with lens turned away, back screen on, lens detail, lens swivelled, box
        ['front-vertical', 'Front, lens open', 1200, 1600], ['back-vertical', 'Upright, lens turned away', 1200, 1600], ['back-screen-on', 'Back, start-up screen', 1200, 1600],
        ['lens-detail', 'Zoom-Nikkor detail', 1200, 1600], ['front', 'Lens swivelled', 1200, 1600], ['box', 'Box and accessories', 1200, 1600]
      ] },
      story: 'The swivel Coolpix that started it: lens and flash sit in a blue block that turns inside a silver frame. Point it forward, down at the table or back at yourself.',
      storySub: 'Nikon\'s 2002 pocket camera for people who had never owned a digital one: 2 megapixels, a 3× Zoom-Nikkor and twelve scene modes. Closed, the lens hides inside the body, so nothing sticks out. The files are small, soft and very 2002, with that cool Nikon colour.',
      notes: ['Original "3× Zoom-Nikkor" and "2.0 Megapixels" front stickers intact.', 'Swivel block turns smoothly; lens glass clean.', 'Menu currently set to Russian; any language can be chosen in setup.'],
      box: ['Original box', 'EN-EL2 lithium-ion battery', 'MH-60 charger', '64 MB CompactFlash card', 'Wrist strap'],
      tests: [['Power-on and start-up', 'OK'], ['Lens swivel mechanism', 'OK'], ['Shutter and autofocus', 'OK'], ['Flash', 'OK'], ['Optical zoom', 'OK'],
        ['LCD screen', 'OK'], ['Card read / write', 'OK'], ['Battery and charger', 'OK'], ['Movie mode', 'OK'], ['Sensor: hot pixels', 'None']],
      specs: [['Sensor', 'CCD · 2 MP'], ['Lens', 'Zoom-Nikkor 3×, 5.6–16.8 mm'], ['Focal length (equiv.)', '37–111 mm'], ['Aperture', 'f/2.7–4.8'],
        ['Design', 'Inner-swivel lens and flash block'], ['Modes', '12 scene modes · movie'], ['Media', 'CompactFlash'], ['Battery', 'EN-EL2 lithium-ion']],
      samples: [] },

    { id: 'IA-0048', name: 'Panasonic HC-V110', brand: 'Panasonic', type: 'camcorders', year: 2013, country: 'Japan', format: 'SD · AVCHD', sensor: 'MOS 1/5.8"', mp: 1.5, price: 149, status: 'available', grade: 'A', added: '2026-11-17',
      links: { ebay: '', vinted: '' }, // ← paste this camcorder's eBay / Vinted listing URLs
      art: { kind: 'camcorder', tone: 'black', fmt: 'HD', zoom: 38, label: 'HC-V110' },
      photos: { dir: 'assets/img/ia-0048', card: [['side-card', 'Side, lens and badges', 1000, 1250], ['lens-detail-card', 'Lens, f = 2.35–89.3 mm', 1000, 1250]], list: [
        ['side', 'Side, lens and badges', 1200, 1600], ['lens-detail', 'Lens, f = 2.35–89.3 mm', 1200, 1600], ['screen-open', 'Screen open, ports', 1200, 1600],
        ['grip-side', 'Grip side and strap', 1200, 1600], ['rear', 'Rear, battery and REC', 1200, 1600], ['box', 'Box and battery', 1200, 1600]
      ] },
      story: 'The end of the line: the pocket Full HD camcorder that recorded the last family holidays before phones took over for good.',
      storySub: 'Glossy black, palm-sized, with a 34.4 mm wide-angle lens and a zoom that goes absurdly far. It records 1920×1080 AVCHD to an SD card, so there is no tape to hunt for: a clean, slightly over-sharpened early-HD look, plus an HDMI port to play it straight on a TV.',
      notes: ['Glossy body clean, badges and lens markings crisp.', 'Lens glass clear, no scratches or haze.', 'Hand-strap Velcro shows light fuzz from use.'],
      box: ['Original box', 'Battery', 'Hand strap'],
      tests: [['Power-on and screen', 'OK'], ['Full HD recording', 'OK'], ['Playback', 'OK'], ['Optical zoom (38×)', 'OK'], ['Autofocus', 'OK'],
        ['Optical stabiliser', 'OK'], ['Microphone audio', 'OK'], ['SD card read / write', 'OK'], ['HDMI and AV out', 'OK'], ['Battery runtime', 'OK']],
      specs: [['Sensor', 'MOS 1/5.8"'], ['Lens', 'f = 2.35–89.3 mm, F1.8'], ['Optical zoom', '38× · 72× i.Zoom'], ['Focal length (equiv.)', '34.4 mm wide'],
        ['Video', 'Full HD 1920×1080 · AVCHD'], ['Stills', '8.9 MP (interpolated)'], ['Screen', '2.7" LCD'], ['Media', 'SD / SDHC / SDXC'], ['In / out', 'HDMI · AV · USB']],
      samples: [] },

    { id: 'IA-0047', name: 'Sony Cyber-shot DSC-M2', brand: 'Sony', type: 'compacts', year: 2005, country: 'Japan', format: 'Memory Stick PRO Duo', sensor: 'CCD · 5.1 MP', mp: 5.1, price: 600, status: 'sold', grade: 'A+', added: '2026-11-17',
      links: { ebay: '', vinted: '' }, // ← paste this camera's eBay / Vinted listing URLs
      art: { kind: 'compact', style: 'slim', tone: 'silver', mp: '5.1', zoom: 3 },
      photos: { dir: 'assets/img/ia-0047', card: [['swivel-open-card', 'Screen swung open', 1000, 1250], ['back-screen-on-card', 'Back, screen on', 1000, 1250]], list: [
        ['swivel-open', 'Screen swung open', 1200, 1600], ['back-screen-on', 'Back, screen on', 1200, 1600], ['front-cradle', 'Front, in the cradle', 1200, 1600],
        ['lens-detail', 'Carl Zeiss Vario-Tessar detail', 1200, 1600], ['controls', 'Controls and jog dial', 1200, 1600], ['cradle-front', 'Cradle', 1200, 1600],
        ['cradle-back', 'Cradle ports', 1200, 1600], ['box', 'Box and everything inside', 1200, 1600]
      ] },
      story: 'Half camera, half camcorder, held like a phone. The screen swings out sideways, the lens sits on top, and PHOTO and MOVIE get their own buttons.',
      storySub: 'Sony\'s 2005 answer to "why not both": a 5.1-megapixel Cyber-shot with Carl Zeiss glass, MPEG4 VGA video at 30 fps and a Hybrid mode that saves the five seconds of video around every photo. It docks in a clear acrylic cradle like a piece of hi-fi. This one still wears its shop tag.',
      notes: ['Mint: original "Enhanced Movie Features" film still on the back panel and the shop hang tag attached.', 'Lens ring markings and glass flawless.', 'Cradle with its clear acrylic cover, free of scratches.'],
      box: ['Original box', 'Docking cradle with clear cover', 'AC-LS5 power adaptor', 'USB cable', 'AV cable', 'NP-FT1 battery in its case', 'Wrist strap', 'Original hang tag'],
      tests: [['Power-on and swivel screen', 'OK'], ['Shutter and autofocus', 'OK'], ['Flash', 'OK'], ['Optical zoom', 'OK'], ['MPEG4 VGA video', 'OK'],
        ['Hybrid mode', 'OK'], ['Internal memory and card', 'OK'], ['Battery and cradle charging', 'OK'], ['Buttons and jog dial', 'OK'], ['Sensor: hot pixels', 'None']],
      specs: [['Sensor', 'CCD · 5.1 MP'], ['Lens', 'Carl Zeiss Vario-Tessar 3×, 6.33–19.0 mm'], ['Focal length (equiv.)', '38–114 mm'], ['Aperture', 'f/3.5–4.4'],
        ['Design', 'Swivel screen, separate PHOTO / MOVIE buttons'], ['Video', 'MPEG4 VGA · 30 fps'], ['Memory', 'Internal (≈ 1,100 VGA images) + Memory Stick PRO Duo'], ['Battery', 'NP-FT1 InfoLITHIUM'], ['Dock', 'Cradle with A/V out, USB, DC in']],
      samples: [] },

    { id: 'IA-0046', name: 'Contax i4R', brand: 'Contax', type: 'compacts', year: 2004, country: 'Japan', format: 'SD', sensor: 'CCD 1/2.5" · 4 MP', mp: 4, price: 390, status: 'available', grade: 'B', added: '2026-11-17',
      links: { ebay: '', vinted: '' }, // ← paste this camera's eBay / Vinted listing URLs
      art: { kind: 'compact', style: 'slim', tone: 'silver', mp: '4.0', zoom: 1 },
      photos: { dir: 'assets/img/ia-0046', card: [['front-open-card', 'Front, lens uncovered', 1000, 1250], ['screen-on-card', 'Back, screen on', 1000, 1250]], list: [
        ['front-open', 'Front, lens uncovered', 1200, 1600], ['screen-on', 'Back, screen on', 1200, 1600], ['front-closed', 'Front, flash block closed', 1200, 1600],
        ['back', 'Back, controls', 1200, 1600], ['lens-detail', 'Tessar T* detail', 1200, 1600], ['side', 'Side', 1200, 1600],
        ['underside', 'Underside', 1200, 1600], ['box', 'Box, cradle and accessories', 1242, 1600]
      ] },
      story: 'A Contax you can lose in a shirt pocket. Slide the flash block up and a Carl Zeiss Tessar T* lens appears, set in a red window, on a brushed-metal body barely thicker than a finger.',
      storySub: 'Kyocera built it in 2004 as the jewellery of the Contax digital line: no zoom, one sharp fixed lens of about 39 mm and a 4-megapixel CCD. Files are crisp and contrasty, and the built-in flash gives that flat, bright party look. Closed, it is just a metal bar with a name on it.',
      notes: ['Visible scratch across the lower front panel (see the front photos).', 'Red lens window and Tessar ring clean; lens glass free of marks.', 'Sliding flash block moves smoothly and locks in both positions.'],
      box: ['Original box', 'Docking cradle', 'AC adapter', 'USB and AV cables', 'Lithium-ion battery', 'Quick-start guide (Italian)', 'Wrist strap'],
      tests: [['Power-on with sliding block', 'OK'], ['Shutter and autofocus', 'OK'], ['Flash', 'OK'], ['LCD screen', 'OK'], ['SD card read / write', 'OK'],
        ['VGA video with sound', 'OK'], ['Battery and cradle charging', 'OK'], ['Buttons and controls', 'OK'], ['Scene modes', 'OK'], ['Sensor: hot pixels', 'None']],
      specs: [['Sensor', 'CCD 1/2.5" · 4 MP'], ['Lens', 'Carl Zeiss Tessar T* 6.5 mm, fixed'], ['Focal length (equiv.)', '≈ 39 mm'], ['Aperture', 'f/2.8'],
        ['Design', 'Sliding flash block uncovers the lens'], ['Screen', '1.5" LCD'], ['Video', '640×480 · 30 fps'], ['Media', 'SD'], ['Battery', 'Lithium-ion, charges in the cradle']],
      samples: [] },

    { id: 'IA-0045', name: 'Sony Cyber-shot DSC-T2', brand: 'Sony', type: 'compacts', year: 2008, country: 'Japan', format: 'Memory Stick PRO Duo', sensor: 'CCD 1/2.5" · 8.1 MP', mp: 8.1, price: 169, status: 'available', grade: 'A', added: '2026-11-17',
      links: { ebay: '', vinted: '' }, // ← paste this camera's eBay / Vinted listing URLs
      art: { kind: 'compact', style: 'slim', tone: 'blue', mp: '8.1', zoom: 3 },
      photos: { dir: 'assets/img/ia-0045', list: [
        ['front', 'Front, lens cover closed', 1200, 1600], ['lens-detail', 'Lens cover open', 1200, 1600], ['back', 'Back, touchscreen', 1200, 1600],
        ['screen-on', 'Start-up screen', 1200, 1600], ['kit', 'Charger, battery, card and case', 1200, 1600]
      ] },
      story: 'Lime green, almost no buttons, and a screen you touch. Slide the front panel down and the camera wakes up; the whole back is a 2.7-inch touchscreen.',
      storySub: 'The T2 was Sony\'s 2008 pocket camera for people who wanted a gadget, not a camera: 8.1 megapixels behind Carl Zeiss Vario-Tessar glass, optical stabilisation, and 4 GB of memory built in so it could carry a whole photo album. In this colour it looks like it fell out of a 2008 music video.',
      notes: ['Lime finish bright and even; sliding lens cover free of chips.', 'Touchscreen clean and responsive across the whole panel.', 'Original Sony wrist strap with the touch stylus still attached.'],
      box: ['NP-BD1 lithium-ion battery', 'BC-CSD charger with mains cable', '4 GB Memory Stick PRO Duo Mark2', 'Sony soft case with clip', 'Wrist strap with stylus'],
      tests: [['Power-on with lens cover slide', 'OK'], ['Touchscreen response', 'OK'], ['Shutter and autofocus', 'OK'], ['Flash', 'OK'], ['Optical zoom', 'OK'],
        ['Super SteadyShot', 'OK'], ['Internal memory and card', 'OK'], ['Battery and charger', 'OK'], ['VGA video', 'OK'], ['Sensor: hot pixels', 'None']],
      specs: [['Sensor', 'CCD 1/2.5" · 8.1 MP'], ['Lens', 'Carl Zeiss Vario-Tessar 3×, 6.33–19.0 mm'], ['Focal length (equiv.)', '38–114 mm'], ['Aperture', 'f/3.5–4.3'],
        ['Stabilisation', 'Super SteadyShot (optical)'], ['Screen', '2.7" touchscreen LCD'], ['Memory', '4 GB internal + Memory Stick Duo / PRO Duo'], ['Video', '640×480 · 30 fps'], ['Battery', 'NP-BD1 lithium-ion']],
      samples: [] },

    { id: 'IA-0044', name: 'Nikon Coolpix 3500', brand: 'Nikon', type: 'compacts', year: 2003, country: 'Japan', format: 'CompactFlash', sensor: 'CCD 1/2.7" · 3.2 MP', mp: 3.2, price: 249, status: 'available', grade: 'A', added: '2026-11-17',
      links: { ebay: '', vinted: '' }, // ← paste this camera's eBay / Vinted listing URLs
      art: { kind: 'compact', style: 'compact', tone: 'silver', mp: '3.2', zoom: 3 },
      photos: { dir: 'assets/img/ia-0044', card: [['front-card', 'Front, lens out', 1000, 1250], ['closed-card', 'Closed', 1000, 1250]], list: [
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
    { num: '01', model: 'fig-01', name: 'CODY', role: 'Beanie on, shirt off', tier: 'common', accent: '#FFD83D', rim: '#FF5FA8',
      lore: 'Beanie on, shirt off, camcorder already rolling. Shoots first, gets dressed later.' },
    { num: '02', model: 'fig-02', name: 'KYLE', role: 'Cap and tank top', tier: 'common', accent: '#2F6BFF', rim: '#9FE7FF',
      lore: 'Cap low, tank top, camera at the hip. Never misses a line at the skatepark.' },
    { num: '03', model: 'fig-04', name: 'MEGAN', role: 'Beanie girl', tier: 'uncommon', accent: '#1C1F33', rim: '#8A6BFF',
      lore: 'Knit beanie pulled low, camera always on. Films the people who are filming.' },
    { num: '04', model: 'fig-03', name: 'BRITTANY', role: 'Swimsuit season', tier: 'rare', accent: '#22B5E3', rim: '#FF8AD0',
      lore: 'Swimsuit on, camcorder never far from the water. Every summer of 2004, on tape.' },
    { num: '05', model: 'fig-05', name: 'TRAVIS', role: 'Hood up, REC on', tier: 'mythic', accent: '#FF6FB5', rim: '#FFFFFF',
      lore: 'Hood up, hands steady. Shows up at every gig and never ends up in the shot.' },
    { num: '06', model: 'fig-06', name: 'IONIC', role: 'The original Dropout', tier: 'secret', accent: '#FF8A3C', rim: '#FF8A3C',
      lore: 'The first figure we ever printed. Puffer jacket, camcorder, the archive\'s name. Nobody knows which bag it\'s in.' }
  ];

  const shots = [
    { k: 0, cls: 's1', id: 'IA-0048', cam: 'HC-V110', meta: 'Full HD · sunset', video: true, tc: '0:03:41:12' },
    { k: 1, cls: 's2', id: 'IA-0044', cam: 'Coolpix 3500', meta: 'Flash · ISO 100', stamp: "'03 03 12" },
    { k: 3, cls: 's3', id: 'IA-0046', cam: 'Contax i4R', meta: 'No flash' },
    { k: 2, cls: 's4', id: 'IA-0052', cam: 'CCD-TRV218E', meta: 'Hi8 · SP · skatepark', video: true, tc: '0:00:52:08' },
    { k: 5, cls: 's5', id: 'IA-0045', cam: 'DSC-T2', meta: 'Daylight', stamp: "'08 07 19" },
    { k: 4, cls: 's6', id: 'IA-0049', cam: 'Coolpix 2500', meta: 'Auto · 1/250', stamp: "'02 01 06" },
    { k: 1, cls: 's7', id: 'IA-0050', cam: 'DSC-M2', meta: 'Forced flash', stamp: "'05 12 31" }
  ];

  // Nothing is sold on this site: every piece is listed on eBay and/or Vinted.
  // Put the real shop / wardrobe URLs here, and give each product its own listing
  // links, e.g. links: { ebay: 'https://www.ebay.it/itm/…', vinted: 'https://www.vinted.it/items/…' }.
  // A product with no links falls back to these shop pages.
  const shops = { ebay: 'https://www.ebay.it/usr/ionic_archive', vinted: 'https://www.vinted.com/' };

  window.IA = { products, grades, tiers, figures, shots, glowOdds, shops };
})();
