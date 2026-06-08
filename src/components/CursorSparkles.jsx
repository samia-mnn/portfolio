import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../constants/colors";

export default function CursorSparkles() {
  const [sparkles, setSparkles] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    const handleMove = (e) => {
      if (Math.random() > 0.15) return;
      const id = nextId.current++;
      const colors = [COLORS.petal1, COLORS.petal2, COLORS.petal3, COLORS.petal4, COLORS.gold, COLORS.sage];
      setSparkles(prev => [...prev.slice(-20), {
        id, x: e.clientX, y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        type: Math.random() > 0.5 ? "star" : "circle",
      }]);
      setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 900);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 999 }}>
      {sparkles.map(s => (
        <div key={s.id} style={{
          position: "absolute", left: s.x, top: s.y,
          width: s.size, height: s.size,
          background: s.type === "circle" ? s.color : "transparent",
          borderRadius: s.type === "circle" ? "50%" : 0,
          transform: "translate(-50%, -50%)",
          animation: "sparkle-fade 0.9s ease-out forwards",
          fontSize: s.type === "star" ? `${s.size * 1.5}px` : undefined,
          color: s.color,
        }}>
          {s.type === "star" ? "✿" : null}
        </div>
      ))}
    </div>
  );
}
