# Performance

The site is static HTML, so it loads fast. The cost to watch is painting: SVG filters and blend modes are expensive for the browser to turn into pixels, and the textures here use plenty of both.

Browsers paint a page in tiles and keep only the tiles near the screen. When a scroll brings new tiles into view, they have to be painted before they can be shown. If painting is slow, or the paint threads are busy with something else, you see blank or white areas during a fast scroll.

## Rules

### No live filters or blend modes on large surfaces

A filter on a large element costs the whole element. Safari will not paint a filtered layer taller than its texture limit at all, which is why the sheet once rendered grey on iPhone.

- The sheet's rough edge is `--paper-edge`, a 9-slice SVG border image.
- The paper grain is `--grain-ink`, ink on transparent, with no blend mode. A grey grain at opacity `o` multiplied over paper is the same as black at alpha `o × (1 − grey)`, so the baked image matches exactly.
- The table grain is `--frame-grain`, pre-blended onto the frame colour.

Keep `filter` and `mix-blend-mode` to elements no taller than about a screen.

### Keep moving parts off filtered layers

If something moves inside a filtered element, the browser re-runs that filter every frame.

- Packets and board cursors live on a twin SVG stacked over the drawing (`layer()` in `src/scripts/dom.ts`). The twin has `will-change: transform`, so it gets its own layer and the drawing underneath is painted once.
- The tape's rough strip is a static `::before` backing. The moving text sits above it, unfiltered.

### Pause what isn't on screen

Pass an element to `loop(fn, el)` and the loop only runs while that element is visible. Every continuous animation should do this.

### Check before shipping

Scroll the home page on a phone and a laptop, fast, from top to bottom and back. If any area paints late, find the filtered or blended element behind it.
