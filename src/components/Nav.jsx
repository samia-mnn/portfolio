import React from "react";
import { COLORS } from "../constants/colors";
import apuImg from "../assets/apu.png";

export default function Nav({ activeSection }) {
  const links = ["Home", "Research", "People", "CV"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "center", alignItems: "center",
      padding: "1.2rem 2rem",
      background: `linear-gradient(to bottom, ${COLORS.cream}EE, ${COLORS.cream}00)`,
    }}>
      <style>{`
        @media (max-width: 700px) {
          .nav-shell {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          .nav-title-group {
            justify-content: center;
          }
          .nav-links {
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.8rem 1.1rem;
          }
          .nav-shell-gap { gap: 2.5rem; }
          @media (max-width: 700px) {
            .nav-shell-gap { gap: 1rem !important; }
          }
        }
      `}</style>
      <div className="nav-shell nav-shell-gap" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        <div className="nav-title-group" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img src={apuImg} alt="apple" style={{ width: 50, height: "auto" }} />
          <span style={{ fontSize: "1.1rem", color: COLORS.moss, fontWeight: 700 }}>
            samia menon
          </span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: "2rem" }}>
          {links.map(l => (
            <a key={l} href={l === "Home" ? "#top" : l === "Research" ? "#research" : l === "People" ? "#people" : "#cv"}
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
