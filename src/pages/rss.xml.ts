import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

import { site } from "~/data/site";
import { published } from "~/lib/writes";

export const GET: APIRoute = async (context) =>
  rss({
    title: `${site.name} · Writes`,
    description: "Notes on agents, backends, process and design.",
    site: context.site ?? site.links.github,
    items: (await published()).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: [post.data.topic, ...post.data.tags],
      link: `/writes/${post.id}/`,
    })),
  });
