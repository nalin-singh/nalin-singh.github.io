import { all, calm, one, onVisible } from "./dom";

/** Pull a book off the shelf and the library card fills in, with a fresh stamp. */
export const startShelf = () => {
  const spines = all<HTMLButtonElement>(".spine");
  const title = one("#tk-t");
  const shelf = one("#tk-m");
  const takeaway = one("#tk-k");
  const stamp = one("#tk-stamp");
  if (!spines.length || !title || !shelf || !takeaway) return;

  const pick = (spine: HTMLButtonElement) => {
    if (spine.classList.contains("on")) return;
    for (const each of spines) each.classList.toggle("on", each === spine);
    title.textContent = spine.dataset.t ?? "";
    shelf.textContent = spine.dataset.m ?? "";
    takeaway.textContent = spine.dataset.k ?? "";
    if (stamp && !calm()) {
      stamp.classList.remove("thunk");
      void stamp.offsetWidth;
      stamp.classList.add("thunk");
    }
  };

  for (const spine of spines) {
    spine.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") pick(spine);
    });
    spine.addEventListener("click", () => pick(spine));
    spine.addEventListener("focus", () => pick(spine));
  }
  const first = spines[1] ?? spines[0];
  if (first) pick(first);

  const books = one("#shelf");
  if (books && !calm()) {
    onVisible(
      books,
      () => {
        books.classList.add("nudge");
        setTimeout(() => books.classList.remove("nudge"), 1600);
      },
      0.5,
    );
  }
};
