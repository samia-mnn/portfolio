import React, { useState } from "react";
import { COLORS } from "../constants/colors";
import PaperPopup from "./PaperPopup";
import apuImg from "../assets/paper/apu.webp";
import bluebirdImg from "../assets/paper/bluebird.webp";
import classImg from "../assets/paper/class.webp";
import viewImg from "../assets/paper/view.webp";
import doughtyImg from "../assets/paper/doughty-thumb.webp";
import buttonImg from "../assets/buttons/button.png";

const CREDITS = [
  { label: "Apple", image: apuImg, source: "Illustrated Dictionary of Gardening – A Practical and Scientific Encyclopaedia of Horticulture, edited by George Nicholson", year: "1885" },
  { label: "Birds", image: bluebirdImg, source: "Birds of America, John James Audubon", year: "1838" },
  { label: "Footer", image: classImg, source: "San Francisco Chronicle on Rose O'Halloran", year: "1894" },
  { label: "Woman with Binoculars", image: viewImg, source: "Advertisement for Samuel Levy Watches, Clocks, Etc., Suffolk, VA" },
  { label: "Background", image: doughtyImg, source: "Lake of the Mountains, Thomas Doughty", year: "1826", note: "Currently displayed at the de Young Museum, San Francisco" },
];

function CreditsPopup({ onClose }) {
  return (
    <PaperPopup title="image credits" onClose={onClose}>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {CREDITS.map((c) => (
            <li key={c.label} style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
              <div style={{ flex: "0 0 3.4rem", height: "3.4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={c.image} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
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
    </PaperPopup>
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
