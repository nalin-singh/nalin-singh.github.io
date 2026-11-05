import type { Art } from "./art";

export interface Chapter {
  top: string;
  art: Art;
  title: string;
  text: string;
  foot: string;
  tone?: string;
  /** A case study on this site, or proof elsewhere (opens in a new tab). */
  href?: string;
  /** Read by screen readers instead of the card title when the card is a link. */
  cta?: string;
}

/** The story so far, oldest first. Years before 2023 are approximate. */
export const chapters: Chapter[] = [
  {
    top: "College · 01",
    art: "browser",
    title: "Freelance websites",
    text: "Self-taught in Figma and Webflow, then sites for small companies.",
    foot: "Web",
    tone: "var(--char)",
  },
  {
    top: "College · 02",
    art: "surf",
    title: "An app for surfers",
    text: "With a Lucknow agency: wireframes, flows and the final prototype.",
    foot: "App UX",
    tone: "var(--bp)",
  },
  {
    top: "College · 03",
    art: "megaphone",
    title: "Design team of one",
    text: "KPI Media, Singapore. I redesigned and built kpimedia.co.",
    foot: "Brand",
    tone: "var(--brown)",
  },
  {
    top: "2023",
    art: "terminal",
    title: "First commit at Koch",
    text: "A full-stack intern who became the go-to for design too.",
    foot: "Engineering",
    tone: "var(--char)",
  },
  {
    top: "2024",
    art: "ledger",
    title: "FAM CIP",
    text: "A finance workflow from whiteboard to production, mentoring two.",
    foot: "Product",
    tone: "var(--bp)",
    href: "/work/fam-cip/",
    cta: "Read the FAM CIP case study",
  },
  {
    top: "2025",
    art: "nodes",
    title: "Agents for KochGPT",
    text: "A gateway for agents and replies that survive a refresh.",
    foot: "Platform",
    tone: "var(--brown)",
    href: "/work/koch-agents/",
    cta: "Read the Koch Agents case study",
  },
  {
    top: "2026",
    art: "scale",
    title: "BlackLine",
    text: "Intercompany finance: audit trails, security, and an agentic resolve flow.",
    foot: "Now",
    tone: "var(--bp)",
  },
];

/** Side projects that branch off the main line. */
export const sides: Chapter[] = [
  {
    top: "Open source",
    art: "brackets",
    title: "OpenCode",
    text: "Merged PRs to an open-source coding agent: language tooling, highlighting and UI fixes.",
    foot: "Open source",
    href: "https://github.com/anomalyco/opencode/pulls?q=is%3Apr+is%3Amerged+author%3Analin-singh",
    cta: "See my merged pull requests to OpenCode on GitHub",
  },
  {
    top: "Open source",
    art: "undo",
    title: "ugit",
    text: "Undo logic for git rm, plus edge cases, in a tool that undoes git mistakes.",
    foot: "Open source",
    href: "https://github.com/Bhupesh-V/ugit/pulls?q=is%3Apr+is%3Amerged+author%3Analin-singh",
    cta: "See my merged pull requests to ugit on GitHub",
  },
  {
    top: "2026 · building",
    art: "school",
    title: "Prangan",
    text: "A school management app of my own. Hono, React and Postgres.",
    foot: "In progress",
  },
  {
    top: "Ongoing",
    art: "gears",
    title: "Automations for others",
    text: "Helping people set up the automations that take busywork off their plate.",
    foot: "Details to add",
  },
  {
    top: "2026 · learning",
    art: "go",
    title: "Learning Go",
    text: "Small programs, a lot of reading, and plenty of if err != nil.",
    foot: "Learning",
  },
];

/** Years along the ruler under the story track. */
export const years = ["2019", "2021", "2023", "2024", "2025", "2026"];
