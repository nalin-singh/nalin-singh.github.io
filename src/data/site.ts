export const site = {
  name: "Nalin Singh",
  title: "Nalin Singh · Software engineer who designs",
  description:
    "Nalin Singh builds agent platforms and the products people use on top of them, and designs them too. Designer first, engineer since.",
  version: "v26.11",
  city: "Bangalore",
  timeZone: "Asia/Kolkata",
  links: {
    linkedin: "https://www.linkedin.com/in/nalinsinghh",
    github: "https://github.com/nalin-singh",
  },
} as const;

export const nav = [
  { href: "/#story", label: "Story" },
  { href: "/#work", label: "Work" },
  { href: "/#writing", label: "Writing" },
  { href: "/#contact", label: "Contact" },
] as const;
