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
            transition: "transform 0.2s ease",
            transform: "translateY(0)",
            padding: "0.5rem 0.2rem 0",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div
            className="paper-cutout"
            style={{
              width: "5.2rem",
              height: "7rem",
              position: "relative",
              overflow: "hidden",
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
              className="paper-label"
              style={{
                position: "absolute",
                left: "0.35rem",
                right: "0.35rem",
                top: "0.35rem",
                background: "#F6EEDD",
                padding: "0.3rem 0.35rem",
                textAlign: "center",
                fontSize: "0.58rem",
                lineHeight: 1.2,
                fontWeight: 700,
                color: COLORS.ink,
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
