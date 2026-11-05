import { all, one } from "./dom";

const popFor = (chip: HTMLElement) => one(`#${chip.dataset.pop}`);

/** The marked words in the hero sentence open small previews on hover, focus or tap. */
export const startPopovers = () => {
  const host = one(".h-combo");
  if (!host) return;
  const chips = all(".chip", host);
  let open: HTMLElement | null = null;
  let timer: number | undefined;

  const close = () => {
    if (!open) return;
    const pop = popFor(open);
    if (pop) pop.hidden = true;
    open.setAttribute("aria-expanded", "false");
    open = null;
  };

  const show = (chip: HTMLElement) => {
    if (open === chip) return;
    close();
    const pop = popFor(chip);
    if (!pop) return;
    const frame = host.getBoundingClientRect();
    const anchor = chip.getBoundingClientRect();
    pop.hidden = false;
    const left = Math.max(8, Math.min(anchor.left - frame.left, frame.width - pop.offsetWidth - 8));
    pop.style.left = `${left}px`;
    pop.style.top = `${anchor.bottom - frame.top + 10}px`;
    chip.setAttribute("aria-expanded", "true");
    open = chip;
  };

  const later = () => {
    clearTimeout(timer);
    timer = window.setTimeout(close, 140);
  };
  const keep = () => clearTimeout(timer);

  for (const chip of chips) {
    chip.addEventListener("pointerenter", (event) => {
      keep();
      if (event.pointerType === "mouse") show(chip);
    });
    chip.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") later();
    });
    chip.addEventListener("click", () => (open === chip ? close() : show(chip)));
    chip.addEventListener("focus", () => show(chip));
    chip.addEventListener("blur", later);
    chip.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  for (const pop of all(".pop", host)) {
    pop.addEventListener("pointerenter", keep);
    pop.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") later();
    });
  }

  host.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") close();
  });
  document.addEventListener("pointerdown", (event) => {
    const target = event.target as Element | null;
    if (open && !target?.closest(".chip, .pop")) close();
  });
};
