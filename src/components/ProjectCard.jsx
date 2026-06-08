import React, { useState } from "react";
import { COLORS } from "../constants/colors";
import MoreInfoModal from "./MoreInfoModal";

export default function ProjectCard({ emoji, title, authors, venue, links, description, moreInfo }) {
  const [hovered, setHovered] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreData, setMoreData] = useState(null);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.5rem 1.75rem",
        background: hovered ? COLORS.lightSage : COLORS.warmWhite,
        border: `1.5px solid ${hovered ? COLORS.sage : "#E8E2DA"}`,
        borderRadius: 12,
        marginBottom: "1rem",
        transition: "all 0.3s ease",
        transform: hovered ? "translateX(6px)" : "none",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
        <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{emoji}</span>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0,  fontSize: "1rem", fontWeight: 600, color: COLORS.ink, lineHeight: 1.4 }}>
            {title}
          </p>
          <p style={{ margin: "0.3rem 0 0.2rem", fontSize: "0.82rem", color: "#888", fontStyle: "italic" }}>{authors}</p>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.82rem", fontWeight: 600, color: COLORS.moss }}>{venue}</p>
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
