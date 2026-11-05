import { all, calm, layer, loop, one, onVisible } from "./dom";

/** Packets that travel along named paths once a drawing is on screen. */
const flows: Record<string, { period: number; delay?: number; reply?: boolean }> = {
  "ka-a": { period: 1400 },
  "ka-b": { period: 1400, delay: 700 },
  "ka-1": { period: 1100, delay: 300 },
  "ka-2": { period: 1000, delay: 900 },
  "ka-3": { period: 1100, delay: 1500 },
  "ka-r": { period: 3200, delay: 600, reply: true },
  "fc-1": { period: 700 },
  "fc-2": { period: 700, delay: 400 },
  "fc-3": { period: 700, delay: 800 },
  "fc-back": { period: 1800, delay: 1200, reply: true },
  "fo-1": { period: 700 },
  "fo-2": { period: 700, delay: 350 },
  "fo-3": { period: 700, delay: 700 },
  "fo-retry": { period: 1900, delay: 1000, reply: true },
};

const packets = (drawing: Element) => {
  const svg = one<SVGSVGElement>("svg.dwg", drawing);
  if (!svg) return;
  const twin = layer(svg);
  for (const path of all<SVGPathElement>("path[id]", drawing)) {
    const flow = flows[path.id];
    if (!flow) continue;
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("r", "4");
    dot.setAttribute("class", flow.reply ? "pk r" : "pk");
    twin.append(dot);
    const start = performance.now() + (flow.delay ?? 0) + 1300;
    loop((now) => {
      const t = ((now - start) % (flow.period + 500)) / flow.period;
      if (now < start || t > 1) {
        dot.setAttribute("opacity", "0");
        return;
      }
      const point = path.getPointAtLength(path.getTotalLength() * t);
      dot.setAttribute("cx", String(point.x));
      dot.setAttribute("cy", String(point.y));
      dot.setAttribute("opacity", "1");
    }, drawing);
  }
};

/** Measures each line so it can draw itself in, then starts the packets. */
export const startBlueprints = () => {
  for (const line of all<SVGGeometryElement>(".bp .dwg .ln.draw")) {
    line.style.setProperty("--len", String(Math.ceil(line.getTotalLength()) + 4));
  }
  for (const drawing of all("[data-bp]")) {
    if (calm()) {
      drawing.classList.add("on");
      continue;
    }
    onVisible(drawing, () => {
      drawing.classList.add("on");
      packets(drawing);
    });
  }
};
