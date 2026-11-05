import { site } from "~/data/site";

import { all } from "./dom";

/** Keeps every `.clk` element showing the time in Bangalore. */
export const startClock = () => {
  const faces = all(".clk");
  if (!faces.length) return;
  const format = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: site.timeZone,
  });
  const tick = () => {
    const time = format.format(new Date());
    for (const face of faces) face.textContent = time;
  };
  tick();
  setInterval(tick, 20_000);
};
