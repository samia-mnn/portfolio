import React from "react";
import { COLORS } from "../constants/colors";

export default function Nav({ activeSection }) {
  const links = ["Home", "Research", "CV"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "center", alignItems: "center",
      padding: "1.2rem 2rem",
      background: `linear-gradient(to bottom, ${COLORS.cream}EE, ${COLORS.cream}00)`,
    }}>
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img src="./src/assets/apu.png" alt="apple" style={{ width: 50, height: "auto" }} />
          <span style={{  fontSize: "1.1rem", color: COLORS.moss, fontWeight: 700 }}>
            samia menon 
          </span>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          {links.map(l => (
            <a key={l} href={l === "Home" ? "#top" : l === "Research" ? "#research" : "#cv"}
              onClick={e => {
                if (l === "CV") {
                  e.preventDefault();
                  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
                }
              }}
              style={{
                textDecoration: "none", fontSize: "0.88rem", color: COLORS.ink,
                letterSpacing: "0.04em", fontWeight: 500, position: "relative",
                paddingBottom: "2px",
              }}
              onMouseEnter={e => { e.target.style.color = COLORS.moss; }}
              onMouseLeave={e => { e.target.style.color = COLORS.ink; }}
            >
              {l}
              <span style={{
                position: "absolute", bottom: 0, left: 0,
                height: "1.5px", background: COLORS.sage,
                width: activeSection === l.toLowerCase() ? "100%" : "0%",
                transition: "width 0.3s ease",
              }} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
