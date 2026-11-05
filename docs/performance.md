# Performance

The site is static HTML, so it loads fast. The cost to watch is painting: how much work the browser does to turn the page into pixels.

Browsers paint a page in tiles and keep only the tiles near the screen. When a scroll brings new tiles into view, they have to be painted before they can be shown. If painting is slow, or the paint threads are busy with something else, you see blank or white areas during a fast scroll.

## Rules

### No live SVG filters or blend modes

`filter: url(#…)` with `feTurbulence` and `feDisplacementMap` computes noise for every pixel, every time the area is painted. Chrome does much of that on the GPU, but Firefox (and Zen) and Safari do much of it on the CPU, and phones have far more pixels to fill on their dense screens. With 136 of them on the home page, those browsers dropped tiles while scrolling and kept the GPU process busy even at rest.

So the site has none. Roughness is baked at build time (see [Roughness](./design-system.md#roughness)) and grain comes from pre-computed tiles. `drop-shadow()` is fine; it's cheap in every browser.

Mozilla's own tracker confirms the cost: `feDisplacementMap` isn't GPU-accelerated in Firefox, and a page with one on a scrolling area was reported as slow enough to count the frames.

### Keep moving parts on their own layer

Packets and board cursors live on a twin SVG stacked over the drawing (`layer()` in `src/scripts/dom.ts`), with `will-change: transform`. The drawing underneath is painted once.

### Pause what isn't on screen

Pass an element to `loop(fn, el)` and the loop only runs while that element is visible. Every continuous animation should do this.

### Things in the layout stay still

Only a few pieces animate on their own: the tape, the blueprint packets, the board cursors and the footer greeting. Everything else, like cards and the How I work tags, moves on hover or tap and then stops.

### Check before shipping

Scroll the home page fast, top to bottom and back, in Chrome, Firefox and Safari, and once on a phone. Then sit still on the hero and check that the browser's GPU process settles near idle.
