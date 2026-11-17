# Ionic Archive — Concept, struttura e copy

> Documento di progetto che accompagna il prototipo del sito (apri `index.html`).
> **Il sito è solo in inglese.** Questo documento resta in italiano, ma tutti i testi del sito (sezione 4) sono in inglese.
> Le parti tra [parentesi quadre] sono decisioni ancora aperte.

---

## 1. Concept visivo

### Idea guida: "Il catalogo di un museo, visto da un mirino"
Ionic Archive non è un negozio: è l'archivio online di un piccolo museo della tecnologia d'immagine 1999–2012.
Il sito alterna due ambienti:

- **Sala espositiva (giorno)** — bianco caldo, luce da studio, molto spazio vuoto. Gli oggetti sono fotografati come reperti: luce morbida dall'alto, ombra corta, fondale senza giunture. Ogni pezzo ha un cartellino in monospace (codice, anno, paese, formato).
- **Sala di proiezione (notte)** — quasi-nero, grana video leggerissima, scanline appena percepibili. Qui vivono le immagini girate con le camere ("Shot on Ionic Archive") e le minifigure.

Il linguaggio del **mirino** (angoli di inquadratura, `● REC`, timecode `00:00:12:04`, `SP / LP`, icona batteria, data in sovrimpressione arancione) è un *accento*: compare in hover, nelle transizioni e in pochi punti chiave, mai come decorazione costante.

### Moodboard descritta
1. Schede di catalogazione di un archivio di design: griglie rigorose, numeri di inventario, fotografie su fondo neutro.
2. Pagine "Specifications" dei manuali originali: tabelle in monospace con puntini di guida, numerazione dei paragrafi (§ 4.2).
3. L'interfaccia LCD di una MiniDV accesa: testo bianco su immagine, REC rosso, timecode che scorre.
4. Plastica argento satinata, alluminio spazzolato, la micro-luce blu di un LED di stato al buio.
5. Packaging blind box giapponese: scatola bianca, fascia scura, grande punto interrogativo, codice a barre, "1 / 12".
6. Il flash diretto delle compatte 2003: ombre dure, occhi lucidi, data arancione nell'angolo.

### Palette

| Ruolo | Nome | HEX | Uso |
|---|---|---|---|
| Base giorno | Carta calda | `#F4F2ED` | sfondo principale |
| Base giorno 2 | Carta ombra | `#EAE7E0` | sezioni alterne, footer |
| Superficie | Bianco studio | `#FBFAF7` | card, fondali |
| Testo | Inchiostro | `#111214` | testo, linee forti, CTA primaria |
| Testo secondario | Grafite | `#3A3D43` / `#6B6F77` | metadati, didascalie |
| Linee | Filo | `#D9D6CE` | griglie, divisori |
| Base notte | Nero nastro | `#0B0C0E` / `#141619` | sezioni "notturne" |
| Secondario | Argento | `#E4E6EA` → `#BFC4CB` → `#8C929B` | gradienti metallici, dettagli |
| **Accento unico** | **Blu ionico** | **`#2F6BFF`** (glow `#5C8BFF`) | CTA d'acquisto, stato "Available", focus, LED |
| Dettaglio | Rosso REC | `#E5322D` | solo `● REC`, pallino di registrazione |
| Dettaglio | Arancio data | `#FF9A3C` | solo data in sovrimpressione nelle foto |

Regola: il blu ionico occupa meno del 5% di ogni schermata. Il rosso REC non supera mai la dimensione di un'etichetta.

### Tipografia
- **Display e testo: Geist** (300–600). Grottesco preciso, quasi ingegneristico, elegante nei titoli grandi con tracking negativo (-0.04em).
- **Tecnico: Geist Mono** (400–500). Codici d'archivio, timecode, specifiche, etichette. Sempre maiuscolo con tracking +0.12em quando è un'etichetta.
- Nessun font pixel. La "digitalità" arriva dal monospace e dai contenuti, non da caratteri caricaturali.
- Scala: H1 44→128px, H2 32→64px, corpo 16–17px, etichette 11px mono.

### Sistema grafico
- Griglia a 12 colonne, margini 16px mobile → 48px desktop, larghezza massima 1360px.
- Linee da 1px, angoli quasi vivi (3px). Nessuna ombra decorativa: le ombre stanno solo sotto gli oggetti.
- Codice d'archivio `IA-0042` sempre visibile accanto al nome del pezzo.
- Texture: grana statica al 5% su tutto il sito; scanline solo nelle sezioni notte.

### Micro-interazioni
- **Card prodotto (hover/focus):** appare l'overlay del mirino (angoli, `● REC` lampeggiante, `SP`, batteria, timecode che scorre) e l'immagine passa alla seconda inquadratura.
- **Transizione di pagina:** "accensione LCD" — due metà nere si aprono da una linea luminosa centrale (0,5 s); in uscita la schermata si richiude sulla linea (0,3 s).
- **Hero:** l'oggetto alterna lentamente due inquadrature (fronte / display aperto).
- **Minifigure:** scatola che trema, coperchio che si solleva, lampo blu, reveal.
- Tutto si disattiva con `prefers-reduced-motion`.

---

## 2. Sitemap

```
/                          Home
/archive                   Archive (catalogo, filtri via query: ?type=camcorders&brand=Sony)
/archive/{code-model}      Product record (es. /archive/ia-0042-sony-dsc-t1)
/dropouts                  Minifigure: serie, rarità, reveal, collezione, UGC
/manifesto                 Chi siamo
/journal                   Guide (articoli: /journal/{slug})
/support                   FAQ, spedizioni, resi, garanzia, pagamenti, contatti
/account/collection        My collection (utenti registrati)
/privacy  /cookies  /terms
```
Nel prototipo statico le URL sono `archive.html`, `product.html?id=IA-0042`, `dropouts.html`, `support.html` ecc. In produzione (hosting statico, es. GitHub Pages / Netlify) possono diventare le URL leggibili sopra.

---

## 3. Wireframe testuali

### Home
```
[barra di stato mono]  ● ARCHIVE ONLINE · 13 PIECES CATALOGUED · 8 AVAILABLE · 00:01:12:04
[header] ◉ IONIC ARCHIVE      Archive  Dropouts  Manifesto  Journal  Support   Cart(0)
──────────────────────────────────────────────────────────────
HERO (100svh, fondale da studio)
   ┌ angoli mirino ─────────────────────────────┐
   │ ● REC                               SP ▮▮▮ │
   │          [ MiniDV fotografata come reperto ] │
   │ 00:00:12:04                                │
   └────────────────────────────────────────────┘
   H1 "Post-film. Pre-HD."  | Concetto (1 frase) + [Explore the archive] [Meet the Dropouts]
   Cartellino museo: IA-0041 / modello / 2000 / Japan / MiniDV
──────────────────────────────────────────────────────────────
01 NEW IN THE ARCHIVE                 [The full archive →]   4 card (2 col mobile, 4 desktop)
02 CATEGORIE: 3 tessere grandi (MiniDV / Compacts / Accessories & tapes) con conteggio
03 SHOT ON IONIC ARCHIVE (notte)  mosaico; mobile = carosello orizzontale
04 DROPOUTS teaser: blind box + 3 figure + 1 silhouette, CTA
05 FIDUCIA: 3 colonne (Tested / Honest condition / Packaging) + 3 recensioni
06 NEWSLETTER (notte) "Every piece is unique. They go fast." + consenso GDPR
[footer] colonne link, social, note legali
```

### Archive
```
H1 Archive + indice: "8 available · 1 reserved · 4 archived · 13 pieces catalogued"
Toolbar: [Filters (n)] (mobile)   "13 results"   Sort: Newest ▾
Sidebar filtri (desktop) / pannello (mobile):
   Show archived pieces (switch)
   Type · Brand · Year (1999–2002 / 2003–2005 / 2006–2008) · Format / media · Sensor / resolution
   Condition (A+ A B C) · Max price (slider)
Griglia card: foto 4:5 · codice + stato · nome · anno/formato/grado · prezzo
   Pezzi venduti: desaturati, etichetta "Archived", senza prezzo, restano in griglia
Stato vuoto: "Nothing matches. Turn on alerts."
```

### Product record
```
Breadcrumb: Home / Archive / IA-0042
[Galleria grande con zoom]                [Scheda d'archivio, sticky]
 Front · Back and screen · Lens ·          IA-0042  ● Available
 Wear detail · In the box                  H1 Sony Cyber-shot DSC-T1
                                           Year · Country · Format · Sensor · Condition
                                           €289   VAT incl. (margin scheme)
                                           [Buy on eBay ↗] [Buy on Vinted ↗]
                                           ┌ Includes 1 mystery minifigure ┐ silhouette + link
                                           Shipping · 14-day returns · Warranty · Payments
§1 The story of the model   §2 Condition (A+ A B C + note)   §3 Tested (checklist con esito)
§4 In the box   §5 Specifications (stile manuale)   §6 Shot on this unit (3 immagini/clip)
More from the archive (4 card)
Mobile: barra d'acquisto fissa in basso (prezzo + CTA)
```

### Dropouts
```
(notte) Kicker SERIES 01 · BLIND BOX · 12 FIGURES
H1 Dropouts + lead + numeri (12 figures · 4 rarity tiers · 1 secret · 0 for sale)
OPEN A BOX: scatola cliccabile → reveal casuale pesato; nota "Just for fun…"
RARITY: Common 70% · Rare 20% · Ultra Rare 8% · Secret 2%
THE SERIES: griglia 12 card (numero, figura o silhouette "?", nome, rarità, lore)
STATEMENT: "Never sold. Only received."
MY COLLECTION: checklist 12 voci + barra di avanzamento
#IONICARCHIVE: galleria UGC + CTA Instagram/TikTok
```

### Manifesto, Journal, Support
- **Manifesto:** pagina editoriale a colonna singola, 5 capitoli numerati, firma.
- **Journal:** griglia articoli (categoria, tempo di lettura, estratto). Ogni articolo: schema `Article` + `HowTo` dove serve.
- **Support:** FAQ ad accordion per gruppi + blocco contatti.

---

## 4. Copy (inglese, come sul sito)

### Home
- **Kicker:** An image archive of the early 2000s
- **H1:** Post-film. Pre-HD. (alternative: "Insert tape. Press REC." · "CCD era, archived." · "Recorded in SP. Still playing.")
- **Concept:** MiniDV camcorders and digital cameras, 1999–2012. Selected, tested piece by piece, catalogued. A mystery minifigure in every order.
- **CTA:** Explore the archive · Meet the Dropouts
- **Strip:** Selected — only models that defined a look. · Tested — twenty-plus checks, report on every record. · + 1 minifigure — a mystery in every order. Never for sale.
- **New in the archive** — One of a kind, quantity one. When a piece leaves, it stays here as a memory.
- **Categories** — Three families, one era.
  - MiniDV camcorders — Tape, CCD, timecode. The soft image of a 2002 summer holiday.
  - Digital compacts — Direct flash, dense colour, the date in the corner.
  - Accessories & tapes — Sealed cassettes, tested batteries, FireWire cables.
- **Shot on Ionic Archive** — This is the look. Just CCD, tape and direct flash. Every image was shot on a piece from the archive.
- **Minifigure teaser** — Someone is waiting in every box. Twelve small keepers of the digital image. One arrives at random with every order. Only one is secret.
- **Trust** — An archive, not a flea market.
  - Tested piece by piece — Over twenty checks on every camera: recording, playback, screen, battery, ports. The report is on the record.
  - Condition, described honestly — An A+ / A / B / C scale and a photo of every mark. What you see is what arrives.
  - Protective packaging — Double box, custom-cut foam, insured and tracked shipping.
- **Newsletter** — Every piece is unique. They go fast. Get new arrivals 24 hours before everyone else. One email, only when something worth it comes in.

### Dropouts
- **Kicker:** Series 01 · Blind box · 12 figures
- **H1:** Dropouts
- **Lead:** Twelve keepers of the early-2000s digital image. Each one is born from a piece of a camera: a tape, a flash, a timecode. You won't know who's coming until you open the box.
- **Open a box** — Tap. Shake. Reveal. Get a taste of the unboxing. It's just for fun: your real figure ships with your order.
- **Rarity** — Four tiers of rarity. Common 70% · Rare 20% · Ultra Rare 8% · Secret 2% (indicative odds per box).
- **The series** — Twelve keepers. The Commons show their faces. The rest stay in the shadows until someone finds them in a box.
- **Statement:** Never sold. Only received. — Every Ionic Archive order includes one figure from the current series. There is no other way to get one: no shop, no drop, no auction.
- **My collection** — Tick off the ones you have. When the series is complete, the archive notices.
- **UGC** — Show us yours. Shoot your figure with the camera it arrived with and tag #ionicarchive.
- **Le 12 figure:** vedi `assets/js/data.js` (nome, ruolo, lore). Es. *REEL — The Rewinder:* "Can't stand endings. Rewinds every tape back to the first frame, just in case."
- **Nome serie:** *Dropouts* (il "dropout" è il salto del nastro DV, e i dropouts sono i ragazzi che mollano la scuola). Singolare: "a Dropout".

### Manifesto
Testo completo in `manifesto.html`. Struttura: 01 Why an archive · 02 How we choose · 03 How we test · 04 Who's behind it · 05 A second life.
Apertura: *"Between 1999 and 2008, images went digital but not yet perfect. Small sensors, magnetic tape, flashes that flattened everything. It was an honest imperfection. We keep it."*

---

## 5. Note tecniche per la produzione

- **Vendita: niente checkout sul sito.** Il sito è vetrina e archivio; ogni pezzo si compra su **eBay** o **Vinted**. Evita i costi e la complessità di un e-commerce (pagamenti, IVA, resi gestiti dalle piattaforme, con la loro protezione acquirenti).
  - Link per pezzo in `data.js`: `links: { ebay: 'https://…', vinted: 'https://…' }`. La scheda prodotto mostra "Buy on eBay ↗" / "Buy on Vinted ↗" (nuova scheda). Se un pezzo non ha link, i pulsanti puntano alle pagine del negozio in `shops` (in fondo a `data.js`): sostituire i segnaposto con l'URL reale del negozio eBay e del guardaroba Vinted.
  - Ogni annuncio deve riportare nel titolo il codice d'archivio (es. `IA-0044`) e le stesse foto, così chi arriva dal sito riconosce il pezzo.
  - Quando un pezzo si vende: impostare `status: 'reserved'` durante la trattativa, poi `'sold'` (resta nel "vault" dell'archivio, senza pulsanti) e chiudere l'annuncio sull'altra piattaforma.
  - Minifigure: va nel pacco di ogni vendita; citarla nella descrizione dell'annuncio.
  - My collection: salvata solo sul dispositivo (localStorage).- **Newsletter:** Klaviyo (o altro servizio; flusso "New arrival" + "Back in archive" per i riservati). Doppio opt-in.
- **Immagini:** sostituire le illustrazioni SVG con foto reali in AVIF/WebP via `srcset`, `loading="lazy"` tranne l'hero (`fetchpriority="high"`).
- **SEO:** dati strutturati `Product` + `Offer` (`itemCondition: UsedCondition`) già generati nella scheda; aggiungere `Organization`, `BreadcrumbList`, `Article` per il Journal.
- **GDPR:** banner già nel prototipo con "Reject" allo stesso livello di "Accept"; in produzione usare una CMP certificata e bloccare pixel Meta/TikTok fino al consenso.
- **Lingua:** sito solo in inglese (`lang="en"`), prezzi in euro formattati `€289`. Nessun selettore lingua.
- **Minifigure 3D:** i file Bambu Studio `.3mf` vengono convertiti in `assets/figures/fig-XX.iam` (mesh binaria compatta "IAM2": il corpo della figure + i volumi negativi di Bambu, cioè le scritte "IONIC"/"archive", che il viewer incide nel corpo in tempo reale con lo stencil buffer) + `fig-XX-poster.png` (anteprima di Bambu, usata durante il caricamento o senza WebGL). Le mostra `assets/js/fig3d.js` (three.js r128 da cdnjs, un solo renderer condiviso per tutta la pagina, materiale PLA bianco satinato, luce di contorno nel colore della figure). Per aggiungere una figure: convertire il 3MF con lo stesso script e aggiungere una riga in `figures` di `data.js` con `model`, nome, rarità e colore.
- **Dati del catalogo nel prototipo:** modelli, anni e specifiche sono **dimostrativi** e vanno verificati su ogni esemplare reale. Recensioni e immagini UGC sono segnaposto.
