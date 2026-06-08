import React from "react";

export default function PdfEmbed({ src, title = "Embedded PDF", height = 600 }) {
  if (!src) {
    return (
      <div style={{ padding: "1rem", background: "#fff7f0", borderRadius: 8, border: "1px solid #eee" }}>
        <p style={{ margin: 0 }}>No PDF source provided. Pass a <code>src</code> prop with a URL or a local path (e.g. <code>/resume.pdf</code>).</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "2rem", borderRadius: 8, overflow: "hidden", border: "1px solid #eee" }}>
      <div style={{ padding: "0.6rem", background: "#fafafa", textAlign: "center", fontSize: "0.9rem", color: "#666" }}>
        View my CV <a href={src} target="_blank" rel="noopener noreferrer">here</a>.
      </div>
    </div>
  );
}
