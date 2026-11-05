import { one } from "./dom";

/** The phone menu: opens from the bar, closes on a link, Escape or a tap outside. */
export const startMenu = () => {
  const button = one<HTMLButtonElement>("#menubtn");
  const panel = one("#mnav");
  if (!button || !panel) return;

  const set = (open: boolean) => {
    panel.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
  };

  button.addEventListener("click", () => set(panel.hidden !== false));
  for (const link of panel.querySelectorAll("a")) link.addEventListener("click", () => set(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      set(false);
      button.focus();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    const target = event.target as Element | null;
    if (!panel.hidden && !target?.closest("#mnav, #menubtn")) set(false);
  });
};
