import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { COLORS } from "../constants/colors";

// a sheet of paper that pops up over a dimmed page; closes on ✕, Escape, or clicking outside
export default function PaperPopup({ title, onClose, maxWidth = "26rem", children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal
      aria-label={title}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(42, 42, 36, 0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        zIndex: 2147483000,
        animation: "credits-fade 220ms ease",
      }}
    >
      <div
        className="paper-sheet"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth,
          fontFamily: "Averia Serif Libre, Georgia, serif",
          color: COLORS.ink,
          animation: "credits-pop 260ms ease",
        }}
      >
        {/* scroll inside the sheet so the paper edge isn't clipped */}
        <div style={{ position: "relative", maxHeight: "80vh", overflowY: "auto", padding: "1.4rem 1.4rem 1.2rem" }}>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ position: "absolute", top: "0.6rem", right: "0.8rem", background: "transparent", border: "none", fontSize: "1rem", color: "#888", cursor: "pointer" }}
          >
            ✕
          </button>
          <h3 style={{ margin: "0 0 1rem", fontSize: "1.1rem", fontWeight: 600 }}>{title}</h3>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
