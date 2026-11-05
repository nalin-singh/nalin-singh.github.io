import { svgPathProperties } from "svg-path-properties";

/**
 * The hand-made look, computed once at build time.
 *
 * Live SVG filters (feTurbulence + feDisplacementMap) look great but run per pixel on every
 * repaint, and Firefox and Safari do much of that on the CPU. Here the same kind of noise
 * moves the geometry itself, so the browser only ever draws plain shapes.
 */

export type Look = "wobble" | "edge" | "edge-sm";

/** Noise frequency, octaves and reach, matching the filters this replaces. */
const looks: Record<Look, { freq: number; octaves: number; scale: number; step: number }> = {
  wobble: { freq: 0.018, octaves: 2, scale: 4.5, step: 2 },
  edge: { freq: 0.03, octaves: 3, scale: 6.5, step: 2 },
  "edge-sm": { freq: 0.06, octaves: 3, scale: 4.5, step: 1.5 },
};

const hash = (x: number, y: number, seed: number) => {
  let h = (x * 374761393 + y * 668265263 + seed * 2246822519) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};

const ease = (t: number) => t * t * (3 - 2 * t);

const value = (x: number, y: number, seed: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = ease(x - xi);
  const yf = ease(y - yi);
  const a = hash(xi, yi, seed);
  const b = hash(xi + 1, yi, seed);
  const c = hash(xi, yi + 1, seed);
  const d = hash(xi + 1, yi + 1, seed);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
};

/** Fractal value noise in roughly -0.5 to 0.5. */
const noise = (x: number, y: number, freq: number, octaves: number, seed: number) => {
  let sum = 0;
  let amp = 1;
  let norm = 0;
  let f = freq;
  for (let o = 0; o < octaves; o++) {
    sum += amp * value(x * f, y * f, seed + o * 31);
    norm += amp;
    amp /= 2;
    f *= 2;
  }
  return sum / norm - 0.5;
};

/** A stable seed from any string, so the same shape always comes out the same. */
const seedOf = (text: string) => {
  let h = 2166136261;
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (h >>> 0) % 100_000;
};

const num = (attrs: Record<string, string>, key: string) =>
  Number.parseFloat(attrs[key] ?? "0") || 0;

/** Path data for any basic SVG shape. */
const outline = (tag: string, attrs: Record<string, string>) => {
  if (tag === "path") return attrs.d ?? "";
  if (tag === "rect") {
    const [x, y, w, h] = [
      num(attrs, "x"),
      num(attrs, "y"),
      num(attrs, "width"),
      num(attrs, "height"),
    ];
    const rx = Math.min(num(attrs, "rx") || num(attrs, "ry"), w / 2);
    const ry = Math.min(num(attrs, "ry") || rx, h / 2);
    if (!rx) return `M${x} ${y}H${x + w}V${y + h}H${x}Z`;
    return `M${x + rx} ${y}H${x + w - rx}A${rx} ${ry} 0 0 1 ${x + w} ${y + ry}V${y + h - ry}A${rx} ${ry} 0 0 1 ${x + w - rx} ${y + h}H${x + rx}A${rx} ${ry} 0 0 1 ${x} ${y + h - ry}V${y + ry}A${rx} ${ry} 0 0 1 ${x + rx} ${y}Z`;
  }
  if (tag === "circle" || tag === "ellipse") {
    const [cx, cy] = [num(attrs, "cx"), num(attrs, "cy")];
    const rx = tag === "circle" ? num(attrs, "r") : num(attrs, "rx");
    const ry = tag === "circle" ? rx : num(attrs, "ry");
    return `M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}Z`;
  }
  if (tag === "line")
    return `M${num(attrs, "x1")} ${num(attrs, "y1")}L${num(attrs, "x2")} ${num(attrs, "y2")}`;
  const points = (attrs.points ?? "").trim().split(/[\s,]+/);
  const pairs = [];
  for (let i = 0; i + 1 < points.length; i += 2) pairs.push(`${points[i]} ${points[i + 1]}`);
  return `M${pairs.join("L")}${tag === "polygon" ? "Z" : ""}`;
};

/** Redraws path data along the noise field: the shape keeps its route but wobbles like ink. */
export const wobble = (d: string, look: Look = "wobble") => {
  const { freq, octaves, scale, step } = looks[look];
  const seed = seedOf(d);
  const parts = new svgPathProperties(d).getParts();
  const runs: (typeof parts)[] = [];
  for (const part of parts) {
    if (!part.length) continue;
    const last = runs.at(-1)?.at(-1);
    const moved = !last || Math.hypot(last.end.x - part.start.x, last.end.y - part.start.y) > 0.01;
    if (moved) runs.push([part]);
    else runs.at(-1)?.push(part);
  }
  let out = "";
  for (const run of runs) {
    const first = run[0];
    const end = run.at(-1);
    if (!first || !end) continue;
    const closed = Math.hypot(first.start.x - end.end.x, first.start.y - end.end.y) < 0.01;
    const points: { x: number; y: number }[] = [];
    for (const part of run) {
      const count = Math.max(1, Math.ceil(part.length / step));
      for (let i = points.length ? 1 : 0; i <= count; i++)
        points.push(part.getPointAtLength((part.length * i) / count));
    }
    if (closed) points.pop();
    if (points.length < 2) continue;
    out += `M${points
      .map(({ x, y }) => {
        const dx = scale * noise(x, y, freq, octaves, seed);
        const dy = scale * noise(x, y, freq, octaves, seed + 7);
        return `${(x + dx).toFixed(1)} ${(y + dy).toFixed(1)}`;
      })
      .join("L")}${closed ? "Z" : ""}`;
  }
  return out;
};

const shapeTag =
  /<(path|rect|circle|ellipse|line|polyline|polygon)\b([^>]*?)\s*\/?>(?:\s*<\/\1>)?/g;
const attrPattern = /([\w:-]+)\s*=\s*"([^"]*)"/g;
const geometry = new Set([
  "d",
  "x",
  "y",
  "width",
  "height",
  "rx",
  "ry",
  "cx",
  "cy",
  "r",
  "x1",
  "y1",
  "x2",
  "y2",
  "points",
  "data-rough",
]);

/**
 * Bakes the shapes in a piece of SVG markup.
 *
 * A shape is baked when it carries `data-rough="wobble|edge|edge-sm"`, or when `look` is given
 * and it matches one of the `only` classes (all shapes, if `only` is empty). Anything inside
 * `<defs>` is left alone, because text and motion follow that geometry exactly.
 */
export const roughen = (markup: string, look?: Look, only: string[] = []) =>
  markup
    .split(/(<defs>[\s\S]*?<\/defs>)/)
    .map((chunk) =>
      chunk.startsWith("<defs>")
        ? chunk
        : chunk.replace(shapeTag, (tag, name: string, rest: string) => {
            const attrs: Record<string, string> = {};
            for (const [, key, val] of rest.matchAll(attrPattern)) if (key) attrs[key] = val ?? "";
            const classes = (attrs.class ?? "").split(/\s+/);
            const marked = attrs["data-rough"] as Look | undefined;
            const picked =
              look && (only.length === 0 || only.some((c) => classes.includes(c)))
                ? look
                : undefined;
            const chosen = marked ?? picked;
            if (!chosen || !(chosen in looks)) return tag;
            const d = wobble(outline(name, attrs), chosen);
            if (!d) return tag;
            const kept = Object.entries(attrs)
              .filter(([key]) => !geometry.has(key))
              .map(([key, val]) => ` ${key}="${val}"`)
              .join("");
            return `<path${kept} d="${d}"></path>`;
          }),
    )
    .join("");

/** A jagged inset outline for HTML boxes, as a clip-path that scales with the box. */
const polygon = (seed: number, depth: number) => {
  const sides = 44;
  const jag = (i: number, side: number) => {
    const v =
      Math.sin(i * 0.61 + seed + side) * 0.35 +
      Math.sin(i * 1.73 + seed * 2 + side) * 0.25 +
      Math.sin(i * 4.1 + seed * 3 + side) * 0.15;
    return (depth * (0.5 + v)).toFixed(2);
  };
  const at = (i: number) => ((i / sides) * 100).toFixed(2);
  const points = [];
  for (let i = 0; i < sides; i++) points.push(`${at(i)}% ${jag(i, 0)}px`);
  for (let i = 0; i < sides; i++) points.push(`calc(100% - ${jag(i, 1)}px) ${at(i)}%`);
  for (let i = sides; i > 0; i--) points.push(`${at(i)}% calc(100% - ${jag(i, 2)}px)`);
  for (let i = sides; i > 0; i--) points.push(`${jag(i, 3)}px ${at(i)}%`);
  return `polygon(${points.join(",")})`;
};

/** A dry-brush rule, broken dashes of varying weight, as a repeating background. */
const rule = (double: boolean) => {
  let r = double ? 11 : 23;
  const rand = () => (r = (r * 16807) % 2147483647) / 2147483647;
  const stroke = (y: number, weight: number, dash: [number, number], gap: [number, number]) => {
    let x = 0;
    let out = "";
    while (x < 600) {
      const length = Math.min(dash[0] + rand() * dash[1], 600 - x);
      const h = weight * (0.7 + rand() * 0.6);
      const dy = (rand() - 0.5) * 0.9;
      out += `<rect x='${x.toFixed(1)}' y='${(y - h / 2 + dy).toFixed(2)}' width='${length.toFixed(1)}' height='${h.toFixed(2)}' rx='${(h / 2).toFixed(2)}'/>`;
      if (rand() < 0.35) {
        out += `<rect x='${(x + rand() * length).toFixed(1)}' y='${(y - h + dy).toFixed(2)}' width='${(4 + rand() * 14).toFixed(1)}' height='${(h * 0.5).toFixed(2)}'/>`;
      }
      x += length + gap[0] + rand() * gap[1];
    }
    return out;
  };
  const h = double ? 7 : 3;
  const body = double
    ? stroke(3, 2.2, [30, 90], [0.5, 4]) + stroke(6.2, 1.1, [12, 50], [1, 8])
    : stroke(1.5, 1.5, [20, 80], [1, 8]);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='${h}' fill='%23211c16'>${body}</svg>`;
  return `url("data:image/svg+xml,${svg.replaceAll("<", "%3C").replaceAll(">", "%3E")}") 0 0/600px ${h}px repeat-x`;
};

/** The custom properties behind rough boxes and rules, served once as /rough.css. */
export const roughCss = () => {
  const vars = [0, 1, 2].flatMap((i) => [
    `--rough-l${i}:${polygon(i * 1.7 + 0.3, 3)}`,
    `--rough-s${i}:${polygon(i * 2.3 + 1.1, 2.2)}`,
  ]);
  vars.push(`--rule-double:${rule(true)}`, `--rule-single:${rule(false)}`);
  return `:root{${vars.join(";")}}\n`;
};
