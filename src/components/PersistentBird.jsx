import React from "react";

export default function PersistentBird({ visible = false, side = "right", top = "15vh", emoji = "🐦" }) {
  const baseStyle = {
    position: "fixed",
    top,
    pointerEvents: "none",
    zIndex: 60,
    fontSize: "2.2rem",
    transition: "transform 700ms cubic-bezier(.22,.9,.3,1), opacity 700ms",
    opacity: visible ? 1 : 0,
  };

  const distance = 14;
  const sideOffset = -30;
  let transform, containerStyle;
  if (side === "left") {
    containerStyle = { ...baseStyle, left: sideOffset };
    transform = visible ? `translateX(${distance}px) rotate(6deg)` : `translateX(-${sideOffset}px) rotate(-26deg)`;
  } else {
    containerStyle = { ...baseStyle, right: sideOffset };
    transform = visible ? `translateX(-${distance}px) rotate(-6deg)` : `translateX(${sideOffset}px) rotate(26deg)`;
  }

  return (
    <div style={{ ...containerStyle, transform }} aria-hidden>
            <span style={{ display: "inline-block" }}><img style={{ width: "3.5em", height: "auto" }} src={`./src/assets/${emoji}`} alt="Flying Bird" /></span>
    </div>
  );
}
