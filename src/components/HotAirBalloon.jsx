import React, { useEffect, useRef, useState } from "react";

// HotAirBalloon: periodically appears at a random horizontal position and
// animates upward across the viewport, then disappears. Uses a simple CSS
// keyframes animation; duration/left are randomized to feel intermittent.
export default function HotAirBalloon({ minInterval = 6000, maxInterval = 14000 }) {
  const [visible, setVisible] = useState(false);
  const [leftPct, setLeftPct] = useState(20);
  const [duration, setDuration] = useState(9000);
  const timerRef = useRef(null);
  const hideRef = useRef(null);
  const styleInjected = useRef(false);

  useEffect(() => {
    // inject keyframes once
    if (!styleInjected.current) {
      const s = document.createElement("style");
      s.innerHTML = `
        @keyframes balloonFloat {
          0% { transform: translateY(0) scale(0.9); opacity: 0; }
          6% { opacity: 1; transform: translateY(-2vh) scale(1); }
          100% { transform: translateY(-120vh) scale(1.02); opacity: 0.9; }
        }
      `;
      document.head.appendChild(s);
      styleInjected.current = true;
    }

    function scheduleNext() {
      const delay = Math.random() * (maxInterval - minInterval) + minInterval;
      timerRef.current = setTimeout(() => {
        const vw = window.innerWidth;
        // bounds in pixels
        const minBoundPx = Math.floor(0.08 * vw);
        const maxBoundPx = Math.floor(0.82 * vw);
        // center excluded region (in px)
        const centerLeftPx = Math.floor((vw - 700) / 2);
        const centerRightPx = Math.floor(centerLeftPx + 700);

        // build valid ranges outside the center 700px
        const ranges = [];
        const leftRangeEnd = Math.min(maxBoundPx, Math.max(minBoundPx, centerLeftPx));
        if (leftRangeEnd - minBoundPx > 8) ranges.push([minBoundPx, leftRangeEnd]);
        const rightRangeStart = Math.max(minBoundPx, Math.min(maxBoundPx, centerRightPx));
        if (maxBoundPx - rightRangeStart > 8) ranges.push([rightRangeStart, maxBoundPx]);

        let xPx;
        if (ranges.length === 0) {
          // fallback to full range
          xPx = minBoundPx + Math.random() * (maxBoundPx - minBoundPx);
        } else {
          const r = ranges[Math.floor(Math.random() * ranges.length)];
          xPx = r[0] + Math.random() * (r[1] - r[0]);
        }

        const lp = (xPx / vw) * 100; // convert to vw %
        const dur = 6000 + Math.random() * 8000; // 6s - 14s
        setLeftPct(lp);
        setDuration(dur);
        setVisible(true);

        // hide after the animation completes
        hideRef.current = setTimeout(() => {
          setVisible(false);
          scheduleNext();
        }, dur + 300);
      }, delay);
    }

    scheduleNext();

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(hideRef.current);
    };
  }, [minInterval, maxInterval]);

  if (!visible) return null;

  const containerStyle = {
    position: "fixed",
    bottom: "-8vh",
    left: `${leftPct}vw`,
    zIndex: 30,
    pointerEvents: "none",
    transform: "translateX(-50%)",
  };

  const imgStyle = {
    width: "5.2rem",
    height: "auto",
    animation: `balloonFloat ${duration}ms linear forwards`,
    willChange: "transform, opacity",
  };

  return (
    <div style={containerStyle} aria-hidden>
      <img src="./src/assets/balloon.png" alt="hot air balloon" style={imgStyle} />
    </div>
  );
}
