# Drafting Table

The design system behind this site. Every page is a sheet of rough paper on a charcoal drafting table: printed type, hand-written notes, blueprint drawings and a few labels in coloured ink.

Tokens live in `src/styles/tokens.css`. Change a value there and it changes everywhere.

## Principles

- **Paper first.** Pages are cream paper with ink. Colour is a label stuck on the paper, never the paper itself.
- **Drawn, not screenshotted.** Work is shown as blueprints and sketches. Internal tools stay internal.
- **One hand-written voice.** Patrick Hand is for asides, margin notes and drawings only. Never for body text or buttons.
- **Rough at the edges, crisp in the middle.** Edges and lines wobble. Text stays sharp and readable.
- **Motion explains, then stops.** Lines draw in once, packets show a flow. Nothing loops just to look busy.

## Colour

### Paper and ink

| Token       | Value     | Use                                    |
| ----------- | --------- | -------------------------------------- |
| `--frame`   | `#1f1d1a` | The table around the sheet, the footer |
| `--paper`   | `#e4d9c0` | The sheet                              |
| `--paper-2` | `#d8ccb0` | Inset paper, inline code               |
| `--ink`     | `#211c16` | Text, rules, button shadows            |
| `--soft`    | `#625747` | Secondary text, mono labels            |
| `--rule`    | `#c4b697` | Hairlines and dashed dividers          |

### Blueprint greens

`--bp` is the drawing sheet, `--bp-2` the brighter green for buttons and pills. `--bp-line` draws lines on green, `--bp-dim` writes dimensions and captions on it.

### Label inks

`--orange`, `--mustard`, `--brown`, `--sage`, `--rust`, `--char` and `--tan`. Use them sparingly, one or two per view:

- **Orange**: live things. The clock, nav underline, focus ring, packets.
- **Mustard**: highlights and the TL;DR label.
- **Rust**: numbering, margin notes, list markers.

Design work uses navy (`#1d2640`). Each writing topic has its card colour in `src/data/icons.ts`.

## Type

| Token       | Family       | Use                                                                          |
| ----------- | ------------ | ---------------------------------------------------------------------------- |
| `--display` | Anybody      | Headings, uppercase, condensed (`font-stretch` 60 to 80%), weight 850 to 900 |
| `--body`    | Archivo      | Body copy at 17 to 18px, line height 1.6 to 1.72                             |
| `--mono`    | Martian Mono | Labels, meta, code. Uppercase at 9 to 11px with open tracking                |
| `--hand`    | Patrick Hand | Margin notes, drawing labels, asides                                         |

`.mono` gives the standard label style. `.inked` roughens display type with the `#ink` filter. Keep it on headings, not paragraphs.

## Texture

The page-sized surfaces use baked images, because live filters on them are too expensive (see [performance](./performance.md)).

| Token           | File                      | Use                                                  |
| --------------- | ------------------------- | ---------------------------------------------------- |
| `--paper-edge`  | `textures/paper-edge.svg` | The sheet's rough outline, as a 9-slice border image |
| `--grain-ink`   | `textures/grain-ink.png`  | Paper grain, ink on transparent                      |
| `--frame-grain` | `textures/frame.png`      | The charcoal table's grain                           |
| `--grain`       | `textures/grain.png`      | Grain for small cards, with `multiply`               |
| `--grain-dark`  | `textures/grain-dark.png` | Grain for the dark footer, with `overlay`            |

## Filters

Defined once in `src/components/chrome/svg-filters.astro`, used through `filter: url(#id)`.

| Filter          | Effect                      | Use on                                   |
| --------------- | --------------------------- | ---------------------------------------- |
| `rough-edge`    | Large, soft displacement    | Cards up to a few hundred pixels tall    |
| `rough-edge-sm` | Finer displacement          | Blueprints, spines, buttons, code frames |
| `wobble`        | Slow wave along a line      | SVG strokes in drawings and icons        |
| `rule-rough`    | Breaks up a horizontal rule | Section rules only                       |
| `ink`           | Fine bleed on type          | Display headings via `.inked`            |

## Components

### Chrome

- **Site bar** (`chrome/site-bar.astro`): the stacked name with the version pill, nav, the Bangalore clock, and a menu on phones. A nav item with its own page is underlined while that page is open.
- **Footer** (`chrome/site-footer.astro`): the greeting, LinkedIn and GitHub plates, the index and the outline name, which fills with ink on hover.

### Buttons

`.press` is the only button. A face sits on an ink back plate offset by `--o`. Hovering lifts the face, pressing sinks it.

```html
<a class="press" href="/"><span class="back"></span><span class="face">See the work</span></a>
```

Add `.y` for the paper face. Green is the main action, paper the secondary one.

### Chips

`.rss` and `.tag` are paper pills with an ink outline, a hard 2px shadow and a coloured dot.

### Labels

`ui/label-card.astro` is a matchbox label: a coloured card, a double frame, a two-ink illustration, a title and a footer line. It's used for the story and side projects. The TL;DR in posts uses the same frame in mustard.

### Write cards

`writes/write-card.astro` is a coloured card with the topic, length, a sketched icon, the title, a dek and a Read button. On hover it lifts onto a hard shadow, the title turns mustard and the icon redraws. The home page, the writes index and a post's next read all use it.

### Blueprints

`blueprints/*.astro` draws each project as a system diagram on the green grid. Lines draw themselves in when the drawing scrolls into view, and packets then travel along the paths named in `src/scripts/blueprints.ts`.

## Motion

- Use `ease-out` for 140 to 200ms on hover and press, and a spring (`cubic-bezier(0.3, 1.6, 0.4, 1)`) for playful moves like icons.
- One-shot reveals start on first view through `onVisible`.
- Continuous motion goes through `loop(fn, el)`, which pauses while `el` is off screen.
- Everything respects `prefers-reduced-motion`. Drawings appear finished and loops never start.

## Layout

- The sheet is at most 1360px wide. `.pad` gives the side gutters, `clamp(16px, 4vw, 60px)`.
- The breakpoints are 1100px (post rail collapses), 900px (cards stack) and 600px (phone).
- Sections are separated by a double rule roughened with `rule-rough`.
- Nothing scrolls sideways at 390px except the tracks and the drawings, which scroll on purpose.

## Content rules

- No metrics or numbers about results.
- No GPA or college name.
- Contact is through LinkedIn and GitHub only. No email address on the site.
- Write in plain sentences. Short paragraphs, one idea each.
