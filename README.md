# FPV Thüringen e.V. — Website

Quellcode der Vereinswebsite. Alle Inhalte (News, Builds, FAQs, Seiten, Videos) liegen als
Markdown-Dateien in diesem Repository — für eine Änderung an einem Text braucht es kein
Astro-Wissen, nur einen Editor und etwas Markdown.

Technisch ist die Seite komplett statisch gebaut (kein Server, keine Datenbank, kein CMS-Login)
mit [Astro](https://astro.build), auf Basis des Themes
[Sumi](https://github.com/kpab/astro-sumi) (MIT-Lizenz, siehe [LICENSE](./LICENSE)).

## Voraussetzungen

- [Node.js](https://nodejs.org) 22 oder neuer
- [pnpm](https://pnpm.io) als Paketmanager (`corepack enable` aktiviert es meist automatisch;
  alternativ `npm install -g pnpm`)

## Lokal starten

```sh
pnpm install
pnpm dev
```

Der Dev-Server läuft danach unter `http://localhost:4321`. Änderungen an Markdown-Dateien oder
Komponenten aktualisieren die Seite im Browser automatisch.

Vor einem Commit lohnt sich ein Blick auf:

```sh
pnpm run check   # Typprüfung, meldet auch falsch getippte Frontmatter-Felder
pnpm build       # kompletter Produktions-Build nach dist/
```

## Wo die Inhalte liegen

Alles unter [src/content/](src/content/), aufgeteilt in fünf Bereiche:

| Ordner | Erscheint unter | Inhalt |
| --- | --- | --- |
| `src/content/posts/` | `/news` | Blogartikel/News |
| `src/content/builds/` | `/builds` | Drohnen-Builds der Mitglieder |
| `src/content/faqs/` | `/faqs` | Häufig gestellte Fragen |
| `src/content/pages/` | `/verein`, `/community`, `/videos`, `/impressum` | Feste Seiten |
| `src/content/videos/` | `/videos` | Verlinkte YouTube-Videos |

Jede Datei hat einen Frontmatter-Kopf (der Teil zwischen den `---`-Linien) mit den Metadaten, und
darunter den eigentlichen Text als Markdown. Fehlt ein Pflichtfeld oder ist ein Feld falsch
getippt (z. B. ein Datum ohne Anführungszeichen an der falschen Stelle), bricht `pnpm build`
bzw. `pnpm run check` mit einer Fehlermeldung ab — das ist Absicht, damit sich Tippfehler nicht
unbemerkt auf die Live-Seite verirren.

## Neuen Beitrag anlegen (News)

1. Neuen Ordner unter `src/content/posts/` anlegen, z. B. `src/content/posts/mein-beitrag/`.
2. Darin eine `index.md` mit folgendem Kopf anlegen:

   ```yaml
   ---
   title: "Titel des Beitrags"
   date: 2026-10-01
   description: "Ein bis zwei Sätze — erscheinen in der Liste und als Meta-Beschreibung."
   tags: ["Wettbewerb"]   # optional, beliebig viele
   cover: "./bilder/cover.jpg"   # optional
   draft: false           # optional, weglassen heißt "false"
   ---

   Der eigentliche Text in Markdown.
   ```

3. Falls ein Titelbild gewünscht ist: Bild in einen `bilder/`-Unterordner neben die `index.md`
   legen (siehe Beispiele unter `src/content/posts/vereinsmeisterschaft-2026/`) und im
   Frontmatter unter `cover` referenzieren. Weitere Bilder lassen sich ganz normal im
   Markdown-Text mit `![Alt-Text](./bilder/dateiname.jpg)` einbinden.
4. `draft: true` setzen, um einen Beitrag zu schreiben, ohne ihn schon zu veröffentlichen — er
   ist dann nur in `pnpm dev` sichtbar, nicht im Produktions-Build.

## Neuen Build anlegen

Gleiches Prinzip wie bei News: ein Ordner unter `src/content/builds/` mit einer `index.md`.
Alle Felder unter `components` sind einzeln optional — trägt ein Quad keinen separaten
Empfänger, lässt man `receiver` einfach weg, die Zeile erscheint dann nicht in der
Komponentenliste.

```yaml
---
title: "Name des Builds"
date: 2026-10-01
description: "Kurzbeschreibung"
pilot: "Vorname"          # optional
cover: "./bilder/cover.jpg"   # optional
components:
  frame: "..."
  stack: "..."
  receiver: "..."         # weglassen, wenn nicht separat vorhanden
  vtx: "..."
  vtxAntenna: "..."
  motors: "..."
  props: "..."
  cam: "..."
  battery: "..."
extraComponents:           # optional, freie Zusatzangaben
  GPS: "..."
  Buzzer: "..."
weight: 350                # optional, Gramm ohne Akku
weightWithBattery: 420     # optional, Gramm mit Akku
---

Freitext: warum der Build so aussieht, wie er fliegt, was ihr anders machen würdet.
```

Ein vollständiges Beispiel steht unter `src/content/builds/betafpv-twiglet-1s-whoop/`, ein
Beispiel mit bewusst weggelassenen Feldern unter `src/content/builds/5-zoll-freestyle-quad/`.

## FAQ hinzufügen

Eine neue Markdown-Datei unter `src/content/faqs/`, z. B. `src/content/faqs/akkus.md`:

```yaml
---
question: "Welche Akkus dürfen wir am Vereinsgelände laden?"
order: 4          # bestimmt die Reihenfolge auf /faqs — niedrigere Zahl zuerst
category: "Sicherheit"   # optional
---

Die Antwort als Markdown-Text.
```

## Video hinzufügen

Ordner unter `src/content/videos/` mit `index.md` plus einem lokalen Thumbnail in einem
`bilder/`-Unterordner (kein YouTube-Embed, nur ein Vorschaubild und ein Link — dadurch lädt
die Seite keine Tracking-Skripte von YouTube):

```yaml
---
title: "Titel des Videos"
url: "https://www.youtube.com/watch?v=..."
thumbnail: "./bilder/thumbnail.jpg"
date: 2026-10-01
pilot: "Vorname"   # optional
---
```

## Feste Seiten bearbeiten

`/verein`, `/community`, `/videos` (nur der einleitende Text) und `/impressum` sind einfache
Markdown-Dateien unter `src/content/pages/` — dort direkt den Text ändern, keine Frontmatter-
Struktur nötig außer `title` und `description` im Kopf.

**Impressum:** `src/content/pages/impressum.md` enthält bewusst nur Platzhalter
(`{{VEREINSNAME}}`, `{{ANSCHRIFT}}` usw.) und einen ausführlichen Kommentar am Dateianfang, was
der Vorstand noch ergänzen muss — inklusive einer noch fehlenden Datenschutzerklärung. Diese
Seite sollte vor dem Livegang von einer sachkundigen Person geprüft werden.

## Deployment

`pnpm build` erzeugt einen fertigen `dist/`-Ordner (nur statische Dateien). Der Workflow unter
[.github/workflows/build.yml](.github/workflows/build.yml) baut die Seite bei jedem Push auf
`main`, prüft Pull Requests mit (ohne zu veröffentlichen) und deployt danach automatisch auf
**GitHub Pages** unter `https://johae96.github.io/fpv-thueringen-website/`.

Damit das funktioniert, muss GitHub Pages einmalig für dieses Repo aktiviert werden: Repo-
Einstellungen → *Pages* → *Build and deployment* → *Source* auf **GitHub Actions** stellen. Der
Workflow übernimmt danach jeden weiteren Deploy von selbst.

Die Seite läuft unter einem Unterpfad (`/fpv-thueringen-website/`), nicht unter `/` — deshalb
gehen alle internen Links im Code über den Helper `withBase()`/`absoluteUrl()` aus
[src/utils/url.ts](src/utils/url.ts), und handgeschriebene Markdown-Links in den Inhalten
(`[Verein](/verein/)` u. ä.) werden beim Build automatisch über
[src/plugins/remark-base-path.ts](src/plugins/remark-base-path.ts) umgeschrieben. Der Basispfad
ist in [src/config.ts](src/config.ts) als `BASE_PATH` hinterlegt.

`public/_redirects` enthält ein auskommentiertes Beispiel, um alte WordPress-URLs per 301 auf
die neue Struktur umzuleiten, falls das nötig wird.

## Lizenz

Der Code basiert auf dem MIT-lizenzierten Astro-Theme [Sumi](https://github.com/kpab/astro-sumi)
von [kpab](https://github.com/kpab) — siehe [LICENSE](./LICENSE). Die Vereinsinhalte
(Texte, Bilder) unterliegen dem Urheberrecht von FPV Thüringen e.V. bzw. der jeweiligen
Autorin/des jeweiligen Autors.
