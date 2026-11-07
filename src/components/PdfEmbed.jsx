import React from "react";
import { COLORS } from "../constants/colors";
import button2Img from "../assets/buttons/button 2.png";

export default function PdfEmbed({ src, title = "Embedded PDF", height = 600 }) {
  if (!src) {
    return (
      <div style={{ padding: "1rem", background: "#fff7f0", borderRadius: 8, border: "1px solid #eee" }}>
        <p style={{ margin: 0 }}>No PDF source provided. Pass a <code>src</code> prop with a URL or a local path (e.g. <code>/resume.pdf</code>).</p>
      </div>
    );
  }

  return (
    <div className="paper-sheet" style={{ marginTop: "2rem", padding: "0.8rem", background: "#FCF9F2", textAlign: "center", fontSize: "0.9rem", color: "#666" }}>
      View my CV{" "}
      <span className="link-with-button" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", verticalAlign: "middle" }}>
        <img className="sewing-button" src={button2Img} alt="" aria-hidden="true" />
        <a href={src} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.terracotta, textDecoration: "underline", textUnderlineOffset: "0.15em" }}>here</a>
      </span>
      .
    </div>
  );
}
