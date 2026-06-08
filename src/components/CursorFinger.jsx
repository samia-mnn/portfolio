import React, { useEffect, useRef } from "react";
import fingerImg from "../assets/finger.png";

export default function CursorFinger({ src = fingerImg, size = 48 }) {
  const ref = useRef({ x: 0, y: 0, raf: null });
  const elRef = useRef(null);

  useEffect(() => {
    const state = ref.current;

    const onMove = (e) => {
      state.x = e.clientX;
      state.y = e.clientY;
      if (!state.raf) {
        state.raf = requestAnimationFrame(() => {
          state.raf = null;
          if (elRef.current) {
            elRef.current.style.transform = `translate(${state.x - size / 2}px, ${state.y - size / 2}px)`;
          }
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (state.raf) cancelAnimationFrame(state.raf);
    };
  }, [size]);

  // Hide the native cursor globally by applying a small inline style on the root container
  useEffect(() => {
    const className = "hide-native-cursor";
    const styleId = "hide-native-cursor-style";

    // Inject global style into head if not present
    if (!document.getElementById(styleId)) {
      const s = document.createElement("style");
      s.id = styleId;
      s.innerHTML = `.${className}, .${className} * { cursor: none !important; }`;
      document.head.appendChild(s);
    }

    // add class to body so portal children inherit the rule
    document.body.classList.add(className);
    return () => { document.body.classList.remove(className); };
  }, []);

  return (
    <div ref={elRef} style={{ position: "fixed", left: 0, top: 0, width: size, height: size, pointerEvents: "none", zIndex: 9999, transition: "transform 90ms linear" }}>
      <img src={src} alt="cursor" style={{ width: "100%", height: "100%", display: "block", userSelect: "none", transformOrigin: "center" }} />
    </div>
  );
}
