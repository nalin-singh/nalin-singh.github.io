import { all } from "./dom";

/** Scales the `.fit` text inside every `[data-fit]` box so it fills the box edge to edge. */
const fit = () => {
  for (const box of all("[data-fit]")) {
    const text = box.querySelector<HTMLElement>(".fit");
    if (!text || !box.clientWidth) continue;
    text.style.fontSize = "100px";
    const width = text.getBoundingClientRect().width || 1;
    text.style.fontSize = `${((100 * box.clientWidth) / width) * 0.995}px`;
  }
};

export const startFit = () => {
  fit();
  void document.fonts?.ready.then(fit);
  addEventListener("resize", fit);
};
