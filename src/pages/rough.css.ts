import type { APIRoute } from "astro";

import { roughCss } from "~/lib/rough";

/** Rough box outlines and dry-brush rules, generated once at build time. */
export const GET: APIRoute = () =>
  new Response(roughCss(), { headers: { "Content-Type": "text/css; charset=utf-8" } });
