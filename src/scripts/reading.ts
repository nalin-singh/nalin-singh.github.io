import { all, one } from "~/scripts/dom";

/** Fills the progress bar as the article scrolls by and marks the contents entry for the section in view. */
export const startReading = () => {
  const bar = one("#prog");
  const article = one(".prose");
  if (!bar || !article) return;
  const links = all<HTMLAnchorElement>("#toc a");
  const heads = links.map((link) => document.getElementById(link.hash.slice(1)));

  const update = () => {
    const box = article.getBoundingClientRect();
    const total = Math.max(1, box.height - innerHeight * 0.6);
    const done = Math.min(1, Math.max(0, -box.top / total));
    bar.style.transform = `scaleX(${done})`;
    let current = 0;
    heads.forEach((head, i) => {
      if (head && head.getBoundingClientRect().top < innerHeight * 0.35) current = i;
    });
    links.forEach((link, i) => link.classList.toggle("on", i === current));
  };

  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
};
