import React from "react";
import { COLORS } from "../constants/colors";
import { PEOPLE_BOOKS } from "../data/peopleBooks";

export default function PeopleBookshelf() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.2rem",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding: "0.5rem 0",
      }}
    >
      
      {PEOPLE_BOOKS.map((book) => (
        <a
          key={book.title}
          href={book.link}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textDecoration: "none",
            color: COLORS.ink,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            transform: "translateY(0)",
            padding: "0.5rem 0.2rem 0",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = `0 8px 16px ${COLORS.sage}22`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div
            style={{
              width: "5.2rem",
              height: "7rem",
              position: "relative",
              overflow: "hidden",
              border: `2px solid ${COLORS.ink}20`,
              boxShadow: `inset 0 0 0 1px ${COLORS.cream}`,
              background: COLORS.cream,
            }}
          >
            <img
              src={book.image}
              alt={book.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "0.35rem",
                right: "0.35rem",
                top: "0.35rem",
                background: "rgba(255, 255, 255, 0.78)",
                backdropFilter: "blur(4px)",
                padding: "0.3rem 0.35rem",
                textAlign: "center",
                fontSize: "0.58rem",
                lineHeight: 1.2,
                fontWeight: 700,
                color: COLORS.ink,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              }}
            >
              {book.title}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
