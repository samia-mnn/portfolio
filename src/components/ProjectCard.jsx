import React, { useState } from "react";
import { COLORS } from "../constants/colors";
import MoreInfoModal from "./MoreInfoModal";

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

export default function ProjectCard({ emoji, title, authors, venue, links, description, moreInfo, image, imageAlt }) {
  const [hovered, setHovered] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreData, setMoreData] = useState(null);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 0,
        background: COLORS.warmWhite,
        border: `1.5px solid  #E8E2DA`,
        borderRadius: 12,
        marginBottom: "1rem",
        overflow: "hidden",
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
            <img src={image} alt={imageAlt || title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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
          {links && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {links.map((l, i) => (
                l.modal ? (
                  <button key={i} onClick={() => { setMoreData(moreInfo || null); setMoreOpen(true); }} style={{
                    fontSize: "0.78rem", fontFamily: "inherit", color: COLORS.terracotta,
                    background: "transparent", border: `1px solid ${COLORS.terracotta}`,
                    borderRadius: 20, padding: "2px 10px", cursor: "pointer",
                    transition: "all 0.2s",
                  }} onMouseEnter={e => { e.target.style.background = COLORS.terracotta; e.target.style.color = "white"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = COLORS.terracotta; }}>
                    {l.label}
                  </button>
                ) : (
                  <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" style={{
                    fontSize: "0.78rem", color: COLORS.terracotta,
                    textDecoration: "none", border: `1px solid ${COLORS.terracotta}`,
                    borderRadius: 20, padding: "2px 10px",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.target.style.background = COLORS.terracotta; e.target.style.color = "white"; }}
                    onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = COLORS.terracotta; }}
                  >
                    {l.label}
                  </a>
                )
              ))}
            </div>
          )}
          {moreOpen && <MoreInfoModal open={moreOpen} onClose={() => setMoreOpen(false)} data={moreData || null} />}
        </div>
      </div>
    </div>
  );
}
