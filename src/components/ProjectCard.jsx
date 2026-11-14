import React, { useCallback, useState } from "react";
import { COLORS } from "../constants/colors";
import MoreInfoModal from "./MoreInfoModal";
import PaperPopup from "./PaperPopup";
import buttonImg from "../assets/buttons/button.png";
import button2Img from "../assets/buttons/button 2.png";
import button3Img from "../assets/buttons/button 3.png";

// a different sewing button sits beside each link, in order
const SEWING_BUTTONS = [buttonImg, button2Img, button3Img];

function renderHighlightedText(text) {
  if (!text) return null;

  const regex = /\b(samia\s+menon)\b/gi;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <span
        key={`${match.index}-${match[0]}`}
        style={{
          textDecoration: "underline",
          textDecorationColor: COLORS.moss,
          textDecorationStyle: "solid",
          textDecorationThickness: "1px",
          textUnderlineOffset: "0.14em",
        }}
      >
        {match[0]}
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function ProjectCard({ emoji, title, authors, venue, links = [], description, moreInfo, abstract, image, imageAlt }) {
  const [hovered, setHovered] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreData, setMoreData] = useState(null);
  const [abstractOpen, setAbstractOpen] = useState(false);
  const closeAbstract = useCallback(() => setAbstractOpen(false), []);
  // projects with an abstract get a "working abstract" link after their other links
  const allLinks = abstract ? [...links, { label: "Working Abstract", abstract: true }] : links;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="paper-sheet"
      style={{
        padding: 0,
        marginBottom: "1.25rem",
        transition: "all 0.3s ease",
        // transform: hovered ? "translateX(6px)" : "none",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <div
          style={{
            flex: "0 0 clamp(72px, 15%, 104px)",
            width: "clamp(72px, 15%, 104px)",
            maxWidth: 104,
            aspectRatio: "4 / 3",
            position: "relative",
            overflow: "hidden",
            border: "none",
            background: `${COLORS.cream}80`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "none",
            margin: 0,
          }}
        >
          {image ? (
            // pinned to the box so it always fills and crops, even where % heights don't resolve (mobile Safari)
            <img src={image} alt={imageAlt || title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <span style={{ fontSize: "1.3rem" }}>{emoji}</span>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: "1rem 1.1rem 1rem 0.9rem" }}>
          <p style={{ margin: 0,  fontSize: "1rem", fontWeight: 600, color: COLORS.ink, lineHeight: 1.4 }}>
            {renderHighlightedText(title)}
          </p>
          <p style={{ margin: "0.3rem 0 0.2rem", fontSize: "0.82rem", color: "#888", fontStyle: "italic" }}>{renderHighlightedText(authors)}</p>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.82rem", fontWeight: 600, color: COLORS.moss }}>{renderHighlightedText(venue)}</p>
          {allLinks.length > 0 && (
            <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
              {allLinks.map((l, i) => (
                <span key={i} className="link-with-button" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                <img className="sewing-button" src={SEWING_BUTTONS[i % SEWING_BUTTONS.length]} alt="" aria-hidden="true" />
                {l.modal || l.abstract ? (
                  <button onClick={() => { if (l.abstract) { setAbstractOpen(true); } else { setMoreData(moreInfo || null); setMoreOpen(true); } }} style={{
                    fontSize: "0.8rem", fontFamily: "inherit", color: COLORS.terracotta,
                    background: "transparent", border: "none", padding: 0, cursor: "pointer",
                    textDecoration: "underline", textUnderlineOffset: "0.15em",
                  }}>
                    {l.label}
                  </button>
                ) : (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" style={{
                    fontSize: "0.8rem", color: COLORS.terracotta,
                    textDecoration: "underline", textUnderlineOffset: "0.15em",
                  }}>
                    {l.label}
                  </a>
                )}
                </span>
              ))}
            </div>
          )}
          {moreOpen && <MoreInfoModal open={moreOpen} onClose={() => setMoreOpen(false)} data={moreData || null} />}
          {abstractOpen && (
            <PaperPopup title="working abstract" onClose={closeAbstract} maxWidth="34rem">
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: COLORS.moss, lineHeight: 1.4, marginBottom: "0.8rem" }}>{title}</p>
              <p style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.75 }}>{abstract}</p>
            </PaperPopup>
          )}
        </div>
      </div>
    </div>
  );
}
