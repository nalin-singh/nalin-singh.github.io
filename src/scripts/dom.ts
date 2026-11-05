/** Small typed helpers shared by the interaction scripts. */

export const one = <T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
) => root.querySelector<T>(selector);

export const all = <T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
) => [...root.querySelectorAll<T>(selector)];

/** True when the visitor asked for less motion. */
export const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True on touch-first screens without hover. */
export const touch = () => matchMedia("(hover: none)").matches;

/** Run `fn` once, the first time `el` scrolls into view. */
export const onVisible = (el: Element, fn: () => void, threshold = 0.3) => {
  if (!("IntersectionObserver" in window)) {
    fn();
    return;
  }
  const watcher = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        watcher.disconnect();
        fn();
      }
    },
    { threshold },
  );
  watcher.observe(el);
};

/**
 * Call `fn` on every animation frame. With `el`, it only runs while `el` is on screen,
 * so off-screen animations cost nothing.
 */
export const loop = (fn: (now: number) => void, el?: Element) => {
  let id = 0;
  const frame = (now: number) => {
    fn(now);
    id = requestAnimationFrame(frame);
  };
  if (!el || !("IntersectionObserver" in window)) {
    id = requestAnimationFrame(frame);
    return;
  }
  new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      if (!id) id = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(id);
      id = 0;
    }
  }).observe(el);
};

/**
 * Gives a drawing an empty twin SVG stacked on top, on its own compositor layer.
 * Moving parts go on the twin, so the filtered artwork underneath is painted once and stays cached.
 */
export const layer = (svg: SVGSVGElement) => {
  const box = document.createElement("div");
  box.className = "dwgbox";
  svg.before(box);
  box.append(svg);
  const twin = svg.cloneNode(false) as SVGSVGElement;
  twin.removeAttribute("aria-label");
  twin.setAttribute("aria-hidden", "true");
  twin.classList.add("layer");
  box.append(twin);
  return twin;
};
