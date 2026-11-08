import React, { useEffect, useRef, useState } from "react";

// `immediate` skips the fade-in and shows the content straight away
export default function Reveal({ children, delay = 0, immediate = false }) {
  const ref = useRef();
  const [visible, setVisible] = useState(immediate);
  useEffect(() => {
    if (immediate) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}
