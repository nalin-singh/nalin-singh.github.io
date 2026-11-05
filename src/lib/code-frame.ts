import type { ShikiConfig } from "astro";

type Transformer = NonNullable<ShikiConfig["transformers"]>[number];
type Theme = Exclude<ShikiConfig["theme"], string>;

const dot = () => ({ type: "element" as const, tagName: "i", properties: {}, children: [] });

/**
 * Wraps each code block in a dark, rough-edged frame with a title bar.
 * The title comes from the fence meta (```md title="brief.md"), or falls back to the language.
 */
export const frame: Transformer = {
  name: "code-frame",
  root(root) {
    const raw = this.options.meta?.__raw ?? "";
    const title = /title="([^"]+)"/.exec(raw)?.[1] ?? this.options.lang;
    root.children = [
      {
        type: "element",
        tagName: "div",
        properties: { class: "code" },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { class: "tb mono" },
            children: [
              dot(),
              dot(),
              dot(),
              {
                type: "element",
                tagName: "span",
                properties: {},
                children: [{ type: "text", value: title }],
              },
            ],
          },
          ...root.children.filter((node) => node.type !== "doctype"),
        ],
      },
    ];
  },
};

/** Warm ink on a dark sheet: headings and keywords in mustard, strings and bullets in sage. */
export const theme: Theme = {
  name: "drafting-table",
  type: "dark",
  colors: { "editor.background": "#1d1a16", "editor.foreground": "#e8dcc4" },
  tokenColors: [
    { settings: { foreground: "#e8dcc4" } },
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#7d725f" } },
    {
      scope: ["keyword", "storage", "markup.heading", "entity.name.section"],
      settings: { foreground: "#c49a45" },
    },
    {
      scope: ["string", "markup.list", "punctuation.definition.list"],
      settings: { foreground: "#a9c08f" },
    },
    {
      scope: ["entity.name.function", "support.function", "entity.name.tag"],
      settings: { foreground: "#e6c162" },
    },
    { scope: ["constant", "variable.other.constant"], settings: { foreground: "#d98b5f" } },
    { scope: ["markup.bold"], settings: { fontStyle: "bold" } },
  ],
};
