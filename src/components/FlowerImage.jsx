import React from "react";

export default function FlowerImage({ src, baseSize, x, y, size = 1, progress = 1, rotation = 0 }) {
  const scale = size * progress;
  const dim = baseSize * scale;
  const left = x - dim / 2;
  const top  = y - dim;
  return (
    <img
      src={src}
      alt=""
      style={{
        position: "absolute",
        left,
        top,
        width: dim,
        height: dim,
        opacity: progress,
        transform: `rotate(${rotation}deg) scaleY(${progress < 1 ? 0.6 + 0.4 * progress : 1})`,
        transformOrigin: "bottom center",
        transition: "opacity 0.1s, transform 0.1s",
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}
