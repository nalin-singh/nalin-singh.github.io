/** The bookshelf. A starter shelf, to be swapped for real reads. */
export const reads = [
  {
    title: "Go",
    shelf: "Learning · 2026",
    takeaway:
      "Small programs first. Errors are values, and I'm slowly making peace with if err != nil.",
    height: "86%",
    width: "46px",
    cover: "#24402f",
    ink: "#efe6d2",
  },
  {
    title: "PostgreSQL internals",
    shelf: "Reading · for Prangan",
    takeaway:
      "Indexes, query plans and what a vacuum actually does, because Prangan runs on Postgres.",
    height: "96%",
    width: "56px",
    cover: "#8e3c22",
    ink: "#efe6d2",
  },
  {
    title: "Resumable streams",
    shelf: "Articles · patterns",
    takeaway:
      "How apps survive a refresh mid-answer. This became the Redis Streams idea on Koch Agents.",
    height: "78%",
    width: "40px",
    cover: "#c49a64",
    ink: "#211c16",
  },
  {
    title: "Context engineering",
    shelf: "Notes · 2026",
    takeaway:
      "Briefing an agent the way you'd brief a person: goal, constraints, examples, and what done looks like.",
    height: "90%",
    width: "50px",
    cover: "#1d2640",
    ink: "#e9ecf4",
  },
] as const;
