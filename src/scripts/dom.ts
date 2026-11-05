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

/** Call `fn` on every animation frame until the page is closed. */
export const loop = (fn: (now: number) => void) => {
  const frame = (now: number) => {
    fn(now);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};
