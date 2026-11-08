import React from "react";

// "all" plus each `category` used in data/projects.js
export const PROJECT_TABS = ["all", "publications", "projects", "in progress"];

// paper tabs tucked behind the top of the first project card, right-aligned up against the lady with binoculars
export default function ProjectTabs({ active, onChange }) {
  return (
    <div role="group" aria-label="Filter projects" style={{ position: "relative", display: "flex", justifyContent: "flex-end", gap: "0.5rem", paddingRight: "10.5rem", marginBottom: "-0.7rem" }}>
      {PROJECT_TABS.map((tab) => (
        <button
          key={tab}
          className="paper-sheet project-tab"
          aria-pressed={tab === active}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
