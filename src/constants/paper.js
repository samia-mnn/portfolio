// Rough-edged paper for rectangular elements, drawn with a clip-path instead of an SVG filter.
// Filters are expensive on mobile (slow scrolling, layers dropping out), a clip-path is nearly free.

// small seeded random so every page load gets the same edges
function seededRandom(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// polygon that wanders up to `jitter` px in from each edge, with a point every `step` percent
function roughRect({ seed, jitter, step }) {
  const rand = seededRandom(seed);
  let prev = 0.5;
  // smoothed so the edge wobbles rather than zigzags
  const d = () => `${((prev = prev * 0.5 + rand() * 0.5) * jitter).toFixed(2)}px`;
  const pts = [];
  for (let p = 0; p < 100; p += step) pts.push(`${p}% ${d()}`);
  for (let p = 0; p < 100; p += step) pts.push(`calc(100% - ${d()}) ${p}%`);
  for (let p = 100; p > 0; p -= step) pts.push(`${p}% calc(100% - ${d()})`);
  for (let p = 100; p > 0; p -= step) pts.push(`${d()} ${p}%`);
  return `polygon(${pts.join(", ")})`;
}

// `bleed` is how far the paper reaches past the element; the edge wobbles between bleed - jitter and bleed
const PAPERS = {
  "paper-sheet": { color: "#FCF9F2", bleed: 3, shadow: 0.12, shape: roughRect({ seed: 2, jitter: 2.5, step: 2.5 }) },
  "paper-cover": { color: "#F6EEDD", bleed: 5, shadow: 0.22, shape: roughRect({ seed: 4, jitter: 3.5, step: 5 }) },
  "paper-label": { color: "#F6EEDD", bleed: 2.5, shadow: 0.2, shape: roughRect({ seed: 9, jitter: 2, step: 8 }) },
};

export const PAPER_CSS = `
  .paper-sheet, .paper-cover, .paper-label { position: relative; isolation: isolate; }
  .paper-sheet::before, .paper-cover::before, .paper-label::before,
  .paper-sheet::after, .paper-cover::after, .paper-label::after {
    content: ""; position: absolute; inset: calc(var(--paper-bleed) * -1);
    clip-path: var(--paper-shape); pointer-events: none;
  }
  .paper-sheet::before, .paper-cover::before, .paper-label::before { z-index: -1; background: var(--paper-color); }
  .paper-sheet::after, .paper-cover::after, .paper-label::after { z-index: -2; background: rgba(70, 50, 25, var(--paper-shadow)); transform: translate(1px, 2.5px); }
${Object.entries(PAPERS).map(([name, p]) =>
  `  .${name} { --paper-color: ${p.color}; --paper-bleed: ${p.bleed}px; --paper-shadow: ${p.shadow}; --paper-shape: ${p.shape}; }`
).join("\n")}
`;
