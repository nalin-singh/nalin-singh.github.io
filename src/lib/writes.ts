import { getCollection } from "astro:content";

/** Every write, in the order set by its `order` field. */
export const ordered = async () =>
  (await getCollection("writes")).toSorted((a, b) => a.data.order - b.data.order);

/** Writes that are ready to be read, newest first. Drafts stay out of the feed. */
export const published = async () =>
  (await getCollection("writes", (post) => !post.data.draft)).toSorted(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
