/** Sketched card icons on a 64 × 64 grid, drawn with a single stroke. */
export const icons = {
  brief: '<path d="M14 6 H40 L50 16 V58 H14 Z M40 6 V16 H50 M22 28 H42 M22 36 H42 M22 44 H34"/>',
  stream:
    '<path d="M6 18 H58 M6 32 H58 M6 46 H58"/><circle cx="18" cy="18" r="3.5"/><circle cx="34" cy="32" r="3.5"/><circle cx="48" cy="46" r="3.5"/>',
  branch:
    '<path d="M16 8 V56 M16 22 C16 34 44 30 44 42 V56"/><circle cx="16" cy="8" r="4"/><circle cx="44" cy="56" r="4"/><path d="M38 14 L50 26 M50 14 L38 26"/>',
  scale: '<path d="M32 8 V54 M12 18 H52 M12 18 L4 38 H20 Z M52 18 L44 38 H60 Z M22 56 H42"/>',
  nib: '<path d="M32 6 L48 34 L40 54 H24 L16 34 Z M32 6 V34"/><circle cx="32" cy="38" r="4"/>',
} as const;

/** Card colour for each topic. */
export const tones = {
  Context: "#1d2640",
  Backend: "#24402f",
  Process: "#8e3c22",
  Judgement: "#5f4029",
  Design: "#2f2c28",
  Agents: "#1d2640",
} as const;
