import React, { useEffect, useRef, useState } from "react";
import foxImg from "../assets/fox-removebg-preview.png";

// Revealing bird that appears at the left or right edge and rotates slightly inward.
// The `trigger` prop is expected to increment. We use its parity to alternate sides:
// odd -> left, even -> right (so sequence: left, right, left, ...).
export default function FlyingBird({ trigger }) {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [side, setSide] = useState("left");
  const showTimer = useRef(null);
  const hideTimer = useRef(null);
  const lastTrigger = useRef(0);

  useEffect(() => {
    // ignore falsy 0 initial trigger
    if (!trigger || trigger === lastTrigger.current) return;
    lastTrigger.current = trigger;

    // determine side: 1 -> left, 2 -> right, 3 -> left, ... (odd=left)
    const nextSide = trigger % 2 === 1 ? "left" : "right";
    setSide(nextSide);
    setActive(true);

    // small delay before showing so the mount can settle
    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => setVisible(true), 60);

    // hide after 1.6s then unmount after 1.8s
    hideTimer.current = setTimeout(() => {
      setVisible(false);
      // unmount shortly after
      setTimeout(() => setActive(false), 200);
    }, 1600);

    return () => {
      clearTimeout(showTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, [trigger]);

  if (!active) return null;

  // Styles: when not visible, start slightly off-screen and rotated outward;
  // when visible, translate slightly inward and rotate toward center.
  // We increase durations and soften the easing for a gentler effect.
  const baseStyle = {
    position: "fixed",
    top: "15vh",
    pointerEvents: "none",
    zIndex: 50,
    fontSize: "2.2rem",
    transition: "transform 640ms cubic-bezier(.22,.9,.3,1), opacity 640ms",
    opacity: visible ? 1 : 0,
  };

  const distance = 14; // px offset for inward reveal (bigger nudge)
  let transform, containerStyle;
  const sideOffset = -30; // px from edge to place bird more at margin
  if (side === "left") {
    containerStyle = { ...baseStyle, left: sideOffset };
    transform = visible
      ? `translateX(${distance}px) rotate(8deg)` // gentler inward rotate
      : `translateX(-${sideOffset}px) rotate(-28deg)`; // start further offscreen
  } else {
    containerStyle = { ...baseStyle, right: sideOffset };
    transform = visible
      ? `translateX(-${distance}px) rotate(-8deg)` // gentler inward rotate
      : `translateX(${sideOffset}px) rotate(28deg)`; // start further offscreen
  }

  return (
    <div style={{ ...containerStyle, transform }} aria-hidden>
      <span style={{ display: "inline-block" }}><img style={{ width: "5em", height: "auto" }} src={foxImg} alt="Flying Bird" /></span>
    </div>
  );
}
