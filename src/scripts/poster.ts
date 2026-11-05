import { all, calm } from "./dom";

/** Splits poster lines into letters that narrow as the cursor passes over them. */
export const startPoster = () => {
  for (const poster of all(".poster")) {
    const lines = all(".pl", poster);

    for (const text of all(".fit", poster)) {
      const letters = [...(text.textContent ?? "")].map((char) => {
        const letter = document.createElement("span");
        letter.className = "ch";
        letter.textContent = char === " " ? " " : char;
        return letter;
      });
      text.replaceChildren(...letters);
    }

    poster.addEventListener("pointermove", (event) => {
      if (calm() || event.pointerType !== "mouse") return;
      for (const line of lines) {
        const base = Number.parseFloat(getComputedStyle(line).fontStretch) || 88;
        for (const letter of all(".ch", line)) {
          const box = letter.getBoundingClientRect();
          const distance = Math.hypot(
            event.clientX - (box.left + box.width / 2),
            (event.clientY - (box.top + box.height / 2)) * 1.6,
          );
          const pull = Math.exp(-(distance * distance) / (2 * 110 * 110));
          letter.style.fontStretch = `${base - pull * Math.min(base - 50, 34)}%`;
        }
      }
    });

    poster.addEventListener("pointerleave", () => {
      for (const letter of all(".ch", poster)) letter.style.fontStretch = "";
    });
  }
};
