# Writing a post

Posts live in `src/content/writes/` as Markdown (`.md`) or MDX (`.mdx`). The file name becomes the URL: `fail-fast-on-purpose.md` is published at `/writes/fail-fast-on-purpose/`.

## Front matter

```yaml
---
title: Fail fast, on purpose
description: One or two sentences. Shown under the title, on cards and in the feed.
date: 2026-11-05
topic: Process # Context, Backend, Process, Judgement, Design or Agents
minutes: 6 # reading time
icon: branch # brief, stream, branch, scale or nib
order: 3 # position on the home page and the index
draft: false # drafts are built and marked Draft, but left out of the RSS feed
tags: [Process, Agents]
---
```

The home page shows the writes with `order` 1 to 5. The writes index shows them all.

## Structure

- Use `##` for sections. They're numbered automatically and listed in the contents rail.
- The first paragraph after the first section heading gets a drop cap.
- `> quote` becomes a pull quote. Wrap a word in `_underscores_` to colour it green.
- `<mark>word</mark>` highlights a word like a marker pen.

## Components (MDX only)

```mdx
import Side from "~/components/writes/side.astro";
import Sketch from "~/components/writes/sketch.astro";
import Tldr from "~/components/writes/tldr.astro";
```

**Margin note.** Put it at the end of a paragraph. On wide screens it sits in the right margin, on narrow ones it drops below.

```mdx
Agents aren't fluent in your business. <Side>SME first, engineer second</Side>
```

**Figure.** A blueprint-style drawing. Draw on a `viewBox` and use the classes `ln` (line), `dash` (dashed), `hot` (mustard highlight), and `d` or `y` on text. Keep each `<text>` on one line, or MDX wraps its contents in a paragraph.

```mdx
<Sketch caption="Fig. 1 · What the drawing shows">
  <svg viewBox="0 0 640 210" role="img" aria-label="Describe the drawing">
    <rect class="ln" x="20" y="70" width="120" height="50" rx="12" />
    <text x="40" y="100">Understand</text>
  </svg>
</Sketch>
```

**TL;DR.** A matchbox label for the short version. Leave a blank line inside the tags so the list renders as a list.

```mdx
<Tldr>

- Code got cheap. Understanding didn't.
- Fail on purpose, early, and keep the notes.

</Tldr>
```

**Code.** Fenced code blocks get the dark frame automatically. Add a title with `title="…"`, otherwise the language is shown.

````md
```ts title="dom.ts"
export const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
```
````

## Formatting

The formatter doesn't touch `src/content/`, so line breaks and spacing stay exactly as written.
