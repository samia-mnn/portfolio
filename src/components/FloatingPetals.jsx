import React, { useState } from "react";

export default function FloatingPetals() {
  const [petals] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      dur: 6 + Math.random() * 8,
      size: 8 + Math.random() * 14,
      char: ["🌸", "🌺", "🌼", "✿", "❀"][Math.floor(Math.random() * 5)],
    }))
  );
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 5, overflow: "hidden" }}>
      {petals.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}vw`,
          top: "-40px",
          fontSize: p.size,
          animation: `petal-fall ${p.dur}s ${p.delay}s infinite linear`,
          opacity: 0.35,
        }}>
          {p.char}
        </div>
      ))}
    </div>
  );
}
