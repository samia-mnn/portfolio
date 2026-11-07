import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { COLORS } from "../constants/colors";
import apuImg from "../assets/apu.png";
import bluebirdImg from "../assets/bluebird.webp";
import classImg from "../assets/class.png";
import viewImg from "../assets/view.png";
import doughtyImg from "../assets/doughty.jpeg";
import buttonImg from "../assets/buttons/button.png";

const CREDITS = [
  { label: "Apple", image: apuImg, source: "Illustrated Dictionary of Gardening – A Practical and Scientific Encyclopaedia of Horticulture, edited by George Nicholson", year: "1885" },
  { label: "Birds", image: bluebirdImg, source: "Birds of America, John James Audubon", year: "1838" },
  { label: "Footer", image: classImg, source: "San Francisco Chronicle on Rose O'Halloran", year: "1894" },
  { label: "Woman with Binoculars", image: viewImg, source: "Advertisement for Samuel Levy Watches, Clocks, Etc., Suffolk, VA" },
  { label: "Background", image: doughtyImg, source: "Lake of the Mountains, Thomas Doughty", year: "1826", note: "Currently displayed at the de Young Museum, San Francisco" },
];

function CreditsPopup({ onClose }) {
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
      aria-label="Image credits"
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
          position: "relative",
          width: "100%",
          maxWidth: "26rem",
          maxHeight: "80vh",
          overflowY: "auto",
          background: "#FCF9F2",
          padding: "1.4rem 1.4rem 1.2rem",
          fontFamily: "Averia Serif Libre, Georgia, serif",
          color: COLORS.ink,
          animation: "credits-pop 260ms ease",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: "absolute", top: "0.6rem", right: "0.8rem", background: "transparent", border: "none", fontSize: "1rem", color: "#888", cursor: "pointer" }}
        >
          ✕
        </button>
        <h3 style={{ margin: "0 0 1rem", fontSize: "1.1rem", fontWeight: 600 }}>image credits</h3>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {CREDITS.map((c) => (
            <li key={c.label} style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
              <div style={{ flex: "0 0 3.4rem", height: "3.4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img className="paper-cutout" src={c.image} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
              </div>
              <div style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                <p style={{ fontWeight: 700, color: COLORS.moss }}>{c.label}</p>
                <p style={{ color: "#555" }}>
                  <em>{c.source}</em>{c.year ? ` (${c.year})` : null}
                </p>
                {c.note ? <p style={{ color: "#999", fontSize: "0.68rem" }}>{c.note}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
}

export default function ImageCredits() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span className="link-with-button" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
        <img className="sewing-button" src={buttonImg} alt="" aria-hidden="true" />
        <button
          onClick={() => setOpen(true)}
          style={{
            fontSize: "0.8rem", fontFamily: "inherit", color: COLORS.terracotta,
            background: "transparent", border: "none", padding: 0, cursor: "pointer",
            textDecoration: "underline", textUnderlineOffset: "0.15em",
          }}
        >
          Image credits
        </button>
      </span>
      {open && <CreditsPopup onClose={() => setOpen(false)} />}
    </>
  );
}
