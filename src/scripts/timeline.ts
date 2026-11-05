import { all, calm, one } from "./dom";

/** Lets a horizontal track be dragged with a mouse. Wheel and touch scrolling stay native. */
const drag = (track: HTMLElement) => {
  let down = false;
  let startX = 0;
  let startLeft = 0;
  track.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse") return;
    down = true;
    startX = event.clientX;
    startLeft = track.scrollLeft;
    track.classList.add("drag");
  });
  addEventListener("pointermove", (event) => {
    if (down) track.scrollLeft = startLeft - (event.clientX - startX);
  });
  addEventListener("pointerup", () => {
    down = false;
    track.classList.remove("drag");
  });
};

/** The previous and next buttons beside a track, disabled at either end. */
const arrows = (nav: HTMLElement) => {
  const track = one(`#${nav.dataset.for}`);
  const back = one<HTMLButtonElement>(".tprev", nav);
  const next = one<HTMLButtonElement>(".tnext", nav);
  if (!track || !back || !next) return;

  const step = () => {
    const card = one(".label", track);
    return card ? (card.getBoundingClientRect().width + 20) * 2 : 300;
  };
  const update = () => {
    const end = track.scrollWidth - track.clientWidth;
    back.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= end - 2;
  };
  const behavior: ScrollBehavior = calm() ? "auto" : "smooth";

  back.addEventListener("click", () => track.scrollBy({ left: -step(), behavior }));
  next.addEventListener("click", () => track.scrollBy({ left: step(), behavior }));
  track.addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
};

export const startTimeline = () => {
  const track = one("#track");
  const dot = one("#dot");
  if (track && dot) {
    const sync = () => {
      const end = track.scrollWidth - track.clientWidth;
      dot.style.left = `${end > 0 ? (track.scrollLeft / end) * 100 : 0}%`;
    };
    track.addEventListener("scroll", sync, { passive: true });
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") track.scrollBy({ left: 280, behavior: "smooth" });
      if (event.key === "ArrowLeft") track.scrollBy({ left: -280, behavior: "smooth" });
    });
    sync();
  }
  for (const each of all(".track")) drag(each);
  for (const nav of all(".tnav")) arrows(nav);
};
