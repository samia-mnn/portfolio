import React, { useEffect, useState } from "react";

export default function SidePeek({ side = "left", src = "./src/assets/doughty.jpeg", contentWidth = 1300, minReveal = 10, maxImageWidth = 420 }) {
  const [reveal, setReveal] = useState(minReveal);

  useEffect(() => {
    function update() {
      const vw = window.innerWidth;
      const computed = Math.max(minReveal, Math.floor((vw - contentWidth) / 2) - 8);
      setReveal(Math.min(computed, Math.floor(maxImageWidth * 0.8)));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [contentWidth, minReveal, maxImageWidth]);

  const imgWidth = Math.max(180, Math.min(maxImageWidth, reveal * 6));
  const hiddenPart = imgWidth - reveal;

  const containerStyle = {
    position: "fixed",
    top: 0,
    bottom: 0,
    width: imgWidth,
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
  };

  const imgStyle = {
    height: "110vh",
    width: "auto",
    display: "block",
    transform: side === "right" ? "scaleX(-1)" : "none",
    userSelect: "none",
    willChange: "transform",
  };

  if (side === "left") containerStyle.left = -hiddenPart;
  else containerStyle.right = -hiddenPart;

  return (
    <div aria-hidden style={containerStyle}>
      <img src={src} alt="decor" style={imgStyle} />
    </div>
  );
}
