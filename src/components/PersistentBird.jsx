import React from "react";
import bluebirdImg from "../assets/bluebird.webp";
import cardImg from "../assets/card.webp";
import warblerImg from "../assets/warbler.webp";

export default function PersistentBird({ visible = false, side = "right", top = "15vh", emoji = "🐦" }) {
  // If `emoji` is a known file name, map to imported asset; otherwise, assume it might be an emoji character
  const IMAGE_MAP = {
    "bluebird.webp": bluebirdImg,
    "card.webp": cardImg,
    "warbler.webp": warblerImg,
  };
  const isImg = typeof emoji === "string" && IMAGE_MAP[emoji];
  const birdSrc = isImg ? IMAGE_MAP[emoji] : null;
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
      <span style={{ display: "inline-block" }}>
        {birdSrc ? (
          <img style={{ width: "3.5em", height: "auto" }} src={birdSrc} alt="Flying Bird" />
        ) : (
          <span style={{ fontSize: "2.2rem" }}>{emoji}</span>
        )}
      </span>
    </div>
  );
}
