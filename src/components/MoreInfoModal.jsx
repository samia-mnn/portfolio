import React from "react";
import { createPortal } from "react-dom";
import { COLORS } from "../constants/colors";

export default function MoreInfoModal({ open = false, onClose = () => {}, data = null }) {
  if (!open || !data) return null;

  // create a container appended to body so the modal is outside any stacking context
  const containerRef = React.useRef(null);
  if (!containerRef.current) {
    const el = document.createElement("div");
    containerRef.current = el;
  }

  React.useEffect(() => {
    const el = containerRef.current;
    document.body.appendChild(el);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, []);

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.68)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2147483000, // very high to sit above other overlays
    padding: "2rem",
    animation: "modal-fade 220ms ease",
  };

  // simple keyframe injection for fade-in
  React.useEffect(() => {
    const s = document.createElement("style");
    s.innerHTML = `@keyframes modal-fade { from { opacity: 0 } to { opacity: 1 } }`;
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  const boxStyle = {
    maxWidth: 980,
    width: "100%",
    background: "white",
    borderRadius: 12,
    padding: "1rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.32)",
    // use em-based sizing for responsive height
    maxHeight: "40em",
    height: "auto",
    overflow: "auto",
  };

  const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" };

  const modalContent = (
    <div role="dialog" aria-modal style={overlayStyle} onClick={onClose}>
      <div style={boxStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <div>
            <h3 style={{ margin: 0 }}>{data.title || "More info"}</h3>
            {data.subtitle ? <p style={{ margin: 0, color: COLORS.ink, fontSize: "0.9rem" }}>{data.subtitle}</p> : null}
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", fontSize: "1.3rem", cursor: "pointer" }} aria-label="Close">✕</button>
        </div>

        <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 380px", gap: "1rem", alignItems: "start" }}>
          <div>
            {data.videoSrc ? (
              <video src={data.videoSrc} controls autoPlay muted playsInline style={{ width: "100%", borderRadius: 8, maxHeight: "30em" }} />
            ) : null}

            {data.images && data.images.length ? (
              <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.8rem", flexWrap: "wrap" }}>
                {data.images.map((img, i) => (
                  <img key={i} src={`./src/assets/${img}`} alt={`img-${i}`} style={{ width: 120, height: "auto", borderRadius: 6, boxShadow: "0 6px 18px rgba(0,0,0,0.08)", flex: "0 0 auto" }} />
                ))}
              </div>
            ) : null}
          </div>
          <aside style={{ background: "#fafafa", padding: "0.8rem", borderRadius: 8, display: "flex", flexDirection: "column", gap: "0.6rem", width: "100%", boxSizing: "border-box" }}>
            <div style={{ width: "100%" }}>{data.longText ? <div style={{ color: "#555" }}>{data.longText}</div> : <div style={{ color: "#777" }}>Additional information</div>}</div>
            <div style={{ width: "100%" }}>{data.extra ? <div style={{ color: "#666" }}>{data.extra}</div> : null}</div>
          </aside>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, containerRef.current);
}
