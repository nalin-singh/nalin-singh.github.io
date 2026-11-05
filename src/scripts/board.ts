import { all, calm, layer, loop, one, onVisible } from "./dom";

/** The two cursors wander along their paths, like a shared Figma file. */
const cursors = () => {
  const canvas = one<SVGSVGElement>("svg.canvas");
  if (!canvas) return;
  const twin = layer(canvas);
  const pairs: [string, string, number, number][] = [
    ["cur-a", "cursor-a", 14_000, 0],
    ["cur-b", "cursor-b", 17_000, 0.4],
  ];
  for (const [pathId, cursorId, period, offset] of pairs) {
    const path = one<SVGPathElement>(`#${pathId}`);
    const cursor = one<SVGGElement>(`#${cursorId}`);
    if (!path || !cursor) continue;
    twin.append(cursor);
    const length = path.getTotalLength();
    const place = (t: number) => {
      const point = path.getPointAtLength(length * t);
      cursor.setAttribute("transform", `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`);
    };
    place(offset);
    if (calm()) continue;
    const start = performance.now();
    loop((now) => place(((now - start) / period + offset) % 1), twin);
  }
};

/** Switches between the collage and the sketch-to-screen view. */
const views = (board: HTMLElement) => {
  const tabs = all<HTMLButtonElement>(".atoggle button", board);
  const collage = one(".arch-a", board);
  const compare = one(".arch-b", board);
  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      for (const each of tabs) each.setAttribute("aria-selected", String(each === tab));
      if (collage) collage.hidden = tab.dataset.a !== "a";
      if (compare) compare.hidden = tab.dataset.a !== "b";
    });
  }
};

/** Drag, click or use the arrow keys to wipe between the sketch and the screen. */
const slider = (board: HTMLElement) => {
  const frame = one("#s2s", board);
  const handle = one("#s2s-handle", board);
  if (!frame || !handle) return;

  const set = (value: number) => {
    const clamped = Math.max(0, Math.min(100, value));
    frame.style.setProperty("--x", `${clamped}%`);
    handle.setAttribute("aria-valuenow", String(Math.round(clamped)));
  };
  const follow = (event: PointerEvent) => {
    const box = frame.getBoundingClientRect();
    set(((event.clientX - box.left) / box.width) * 100);
  };

  let dragging = false;
  frame.addEventListener("pointerdown", (event) => {
    dragging = true;
    frame.setPointerCapture(event.pointerId);
    follow(event);
  });
  frame.addEventListener("pointermove", (event) => {
    if (dragging || event.pointerType === "mouse") follow(event);
  });
  frame.addEventListener("pointerup", () => (dragging = false));
  frame.addEventListener("pointercancel", () => (dragging = false));
  handle.addEventListener("keydown", (event) => {
    const value = Number(handle.getAttribute("aria-valuenow"));
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      set(value + (event.key === "ArrowLeft" ? -5 : 5));
    }
  });

  const picks = all<HTMLButtonElement>(".s2s-pick button", board);
  for (const pick of picks) {
    pick.addEventListener("click", () => {
      for (const each of picks) each.setAttribute("aria-pressed", String(each === pick));
      for (const item of all("[data-p]", board)) {
        if (item.tagName !== "BUTTON") item.hidden = item.dataset.p !== pick.dataset.p;
      }
    });
  }
  set(50);
};

export const startBoard = () => {
  const board = one("[data-board]");
  if (!board) return;
  views(board);
  slider(board);
  const pin = () => {
    board.classList.add("on");
    cursors();
  };
  if (calm()) pin();
  else onVisible(board, pin);
};
