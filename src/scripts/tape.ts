import { all, calm, loop } from "./dom";

/** The tape bands drift on their own and speed up while the page scrolls. */
export const startTape = () => {
  const runs = all(".run");
  if (!runs.length || calm()) return;
  let position = 0;
  let speed = 0;
  let last = scrollY;

  addEventListener(
    "scroll",
    () => {
      speed += Math.abs(scrollY - last) * 0.06;
      last = scrollY;
    },
    { passive: true },
  );

  loop(
    () => {
      speed *= 0.92;
      position += 0.5 + speed;
      for (const run of runs) {
        const width = run.scrollWidth / 4;
        const offset = position % width;
        run.style.transform = `translateX(${run.dataset.dir === "1" ? -offset : offset - width}px)`;
      }
    },
    runs[0]?.closest(".bands") ?? runs[0],
  );
};
