import React, { useState, useEffect, useRef } from "react";
import thinversImg from "./src/assets/paper/thinvers.webp";
import magImg from "./src/assets/paper/mag.webp";
import viewImg from "./src/assets/paper/view.webp";
import resumePdf from "./src/assets/resume.pdf";
import classImg from "./src/assets/paper/class.webp";
import bluebirdImg from "./src/assets/paper/bluebird.webp";
import cardinalImg from "./src/assets/paper/card.webp";
import warblerImg from "./src/assets/paper/warbler.webp";
import { COLORS } from "./src/constants/colors";
import { PAPER_CSS } from "./src/constants/paper";
import { PROJECTS } from "./src/data/projects";
import FlowerSidebar from "./src/components/FlowerSidebar";
import FloatingPetals from "./src/components/FloatingPetals";
import CursorSparkles from "./src/components/CursorSparkles";
import CursorFinger from "./src/components/CursorFinger";
import FlyingBird from "./src/components/FlyingBird";
import PersistentBird from "./src/components/PersistentBird";
import HotAirBalloon from "./src/components/HotAirBalloon";
import Nav from "./src/components/Nav";
import Reveal from "./src/components/Reveal";
import ProjectCard from "./src/components/ProjectCard";
import PdfEmbed from "./src/components/PdfEmbed";
import SidePeek from "./src/components/SidePeek";
import PeopleBookshelf from "./src/components/PeopleBookshelf";
import ImageCredits from "./src/components/ImageCredits";

// a bird perches on every third project card, alternating sides; `faces` is the direction the art faces
const PROJECT_BIRDS = [
  { src: bluebirdImg, faces: "right", width: "4.2rem" },
  { src: cardinalImg, faces: "left", width: "5rem" },
  { src: warblerImg, faces: "left", width: "4.6rem" },
];

function PerchedBird({ index, isWide }) {
  const bird = PROJECT_BIRDS[index % PROJECT_BIRDS.length];
  const side = index % 2 === 0 ? "right" : "left";
  // mirror the art so every bird faces in toward the page
  const flip = bird.faces === side;
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        // half the bird hangs off the card; on narrow screens keep it inside the page gutter
        [side]: isWide ? `calc(${bird.width} / -2)` : "-1.5rem",
        width: bird.width,
        transform: "translateY(-85%)",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <img src={bird.src} alt="" style={{ width: "calc(100% + 24px)", margin: -12, height: "auto", display: "block", transform: flip ? "scaleX(-1)" : "none" }} />
    </div>
  );
}

// components and constants are now split into separate files under src/

export default function Portfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [birdTrigger, setBirdTrigger] = useState(0);
  const [birdTopRight, setBirdTopRight] = useState(false);
  const [birdMiddleLeft, setBirdMiddleLeft] = useState(false);
  const [birdBottomRight, setBirdBottomRight] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lastScrollRef = useRef(0);
  const [isWide, setIsWide] = useState(typeof window !== "undefined" ? window.innerWidth > 700 : true);

  useEffect(() => {
    // Inject global styles into the document head so portals/modal inherit them
    const styleId = "portfolio-global-style";
    if (!document.getElementById(styleId)) {
      const s = document.createElement("style");
      s.id = styleId;
      s.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        body.portfolio-app { font-family: Averia Serif Libre, Georgia, serif; background: ${COLORS.cream}; min-height: 100vh; color: ${COLORS.ink}; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: ${COLORS.petal2}; color: ${COLORS.ink}; }
        @keyframes sparkle-fade { 0% { opacity: 1; transform: translate(-50%,-50%) scale(1); } 100% { opacity: 0; transform: translate(-50%,-60%) scale(0.3); } }
        @keyframes petal-fall { 0% { transform: translateY(-40px) rotate(0deg); opacity: 0; } 10% { opacity: 0.35; } 90% { opacity: 0.35; } 100% { transform: translateY(105vh) rotate(720deg); opacity: 0; } }
        @keyframes sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        @keyframes float-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .tag:hover { background: ${COLORS.sage} !important; color: white !important; }
        a { cursor: pointer; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.cream}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.sage}; border-radius: 3px; }
        .paper-cutout { filter: url(#paper-cutout); }
${PAPER_CSS}
        .sewing-button { width: 1.35rem; height: 1.35rem; display: block; filter: drop-shadow(0.5px 1.5px 1.5px rgba(60, 40, 20, 0.35)); transition: transform 0.35s ease; }
        .link-with-button:hover .sewing-button { transform: rotate(25deg); }
        @keyframes credits-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes credits-pop { from { opacity: 0; transform: translateY(12px) rotate(-1deg); } to { opacity: 1; transform: none; } }
      `;
      document.head.appendChild(s);
      document.body.classList.add("portfolio-app");
    }
    function onResize() { setIsWide(window.innerWidth > 700); }
    window.addEventListener("resize", onResize);
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const progress = scrollTop / (scrollHeight || 1);
      setScrollProgress(progress);

      // Trigger bird on scroll down past certain points (transient trigger)
      const milestones = [0.2, 0.5, 0.75];
      milestones.forEach((m, i) => {
        if (lastScrollRef.current < m && progress >= m) {
          setBirdTrigger(t => t + 1);
        }
      });

      // Show/hide persistent birds based on current progress so they disappear when scrolling up
      setBirdTopRight(progress >= milestones[0]);
      setBirdMiddleLeft(progress >= milestones[1]);
      setBirdBottomRight(progress >= milestones[2]);
      lastScrollRef.current = progress;

      if (scrollTop < 300) setActiveSection("home");
      else if (scrollTop >= 300 && scrollTop < 1200) setActiveSection("research");
      else if (scrollTop >= 1200 && scrollTop < document.documentElement.scrollHeight - 800) setActiveSection("people");
      else setActiveSection("cv");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div style={{ fontFamily: "Averia Serif Libre, Georgia, serif", background: COLORS.cream, minHeight: "100vh", color: COLORS.ink }}>
      <SidePeek side="left" />
      <SidePeek side="right" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: ${COLORS.petal2}; color: ${COLORS.ink}; }
        @keyframes sparkle-fade { 0% { opacity: 1; transform: translate(-50%,-50%) scale(1); } 100% { opacity: 0; transform: translate(-50%,-60%) scale(0.3); } }
        @keyframes petal-fall { 0% { transform: translateY(-40px) rotate(0deg); opacity: 0; } 10% { opacity: 0.35; } 90% { opacity: 0.35; } 100% { transform: translateY(105vh) rotate(720deg); opacity: 0; } }
        @keyframes sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        @keyframes float-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .tag:hover { background: ${COLORS.sage} !important; color: white !important; }
        a { cursor: pointer; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.cream}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.sage}; border-radius: 3px; }
        @media (max-width: 700px) {
          .hero-row {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.25rem;
          }
          .hero-photo-stack {
            width: 100%;
            max-width: 16rem;
            align-items: center;
          }
          .hero-photo-wrap {
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .hero-photo-wrap img {
            width: calc(min(70vw, 15rem) + 24px);
            max-width: calc(15rem + 24px);
          }
          .hero-text {
            min-width: 0;
            width: 100%;
            text-align: center;
          }
          .hero-text > div:first-child {
            justify-content: center;
          }
          .hero-greeting {
            margin-bottom: 0.75rem;
          }
        }
      `}</style>

      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        {/* cream paper edge traced around the image shape, roughened, with a soft shadow */}
        <filter id="paper-cutout" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="grown" />
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="grown" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" result="edge" />
          <feFlood floodColor="#F6EEDD" />
          <feComposite in2="edge" operator="in" result="paper" />
          <feGaussianBlur in="edge" stdDeviation="2" />
          <feOffset dx="1.5" dy="3" result="shadowShape" />
          <feFlood floodColor="rgb(70, 50, 25)" floodOpacity="0.28" />
          <feComposite in2="shadowShape" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="paper" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

    {/* #<FloatingPetals /> */}
  <CursorFinger />
      {/* <FlowerSidebar scrollProgress={scrollProgress} side="left" />
      <FlowerSidebar scrollProgress={scrollProgress} side="right" /> */}
    {/* {isWide ? <HotAirBalloon /> : null} */}
  {/* Persistent birds for each milestone */}
  {/* {isWide ? <PersistentBird visible={birdTopRight} side="right" top="8vh" emoji="card.webp" /> : null}
  {isWide ? <PersistentBird visible={birdMiddleLeft} side="left" top="45vh" emoji="bluebird.webp" /> : null}
  {isWide ? <PersistentBird visible={birdBottomRight} side="right" top="70vh" emoji="warbler.webp" /> : null} */}
  {/* <FlyingBird trigger={birdTrigger} /> */}
      <Nav activeSection={activeSection} />

      <div style={{ position: "fixed", left: 0, top: 0, width: "3px", height: `${scrollProgress * 100}vh`, background: `linear-gradient(to bottom, ${COLORS.lightSage}, ${COLORS.sage}, ${COLORS.moss})`, zIndex: 200, transition: "height 0.1s", borderBottomRightRadius: 3 }} />

  <main id="top" style={{ maxWidth: 700, margin: "0 auto", padding: "0 2rem 6rem", paddingTop: "6rem", position: "relative", zIndex: 20 }}>

        <section style={{ minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "2rem" }}>
          <Reveal>
            <div className="hero-row" style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                <div className="hero-photo-stack" style={{ position: "relative", width: "12em", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <p className="hero-greeting" style={{ fontSize: "0.9rem", letterSpacing: "0.12em", color: COLORS.sage, marginBottom: "0.9rem", textAlign: "center", width: "100%" }}>
                  </p>
                  <div className="hero-photo-wrap" style={{ position: "relative", width: "12em" }}>
                    <img src={thinversImg} alt="Samia Menon" style={{ width: "calc(12em + 24px)", margin: -12, height: "auto", display: "block", zIndex: 1 }} />
                  </div>
              </div>

              <div className="hero-text" style={{ flex: 1, minWidth: 280 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
                  <h1 style={{  fontSize: "clamp(1.1rem, 5vw, 1.6rem)", fontWeight: 700, lineHeight: 1.15, margin: 0, color: COLORS.ink }}>
                    I'm <span style={{ color: COLORS.moss, display: "inline-block"}}>Samia - </span>
                  </h1>
                </div>
                <p style={{ fontSize: "0.8rem", lineHeight: 1.8, color: "#555", marginBottom: "1.2rem" }}>
                  A second-year PhD student in Computer Science (HCI) at <strong style={{ color: COLORS.ink }}>UC Berkeley</strong>, co-advised by <a href="https://people.eecs.berkeley.edu/~bjoern/" style={{ color: COLORS.moss, textDecoration: "none", borderBottom: `1px dotted ${COLORS.moss}` }}>Bjoern Hartmann</a> and <a href="https://people.ischool.berkeley.edu/~hearst/" style={{ color: COLORS.moss, textDecoration: "none", borderBottom: `1px dotted ${COLORS.moss}` }}>Marti Hearst</a>.
                </p>
                <p style={{ fontSize: "0.7rem", lineHeight: 1.8, color: "#666", marginBottom: "1.5rem" }}>
                  My current research draws on HCI, ML, and computational social science to investigate how AI-mediated environments shape the information we consume and create.
                  Drawing on these findings, I aim to build technologies that enable & support meaningful human expression under these new paradigms.
                </p>
                 {/* <p style={{ fontSize: "0.7rem", lineHeight: 1.8, color: "#666", marginBottom: "1.5rem" }}> */}
                  {/* <p><strong>Let's chat!</strong> Right now, I'm really interested in the following questions:</p>
                    <ul>
                      <li>How are the aesthetics of human creators influenced by the pervasiveness of generative AI content?</li>
                      <li>How can we computationally model the spread of visual culture on modern short-form video platforms?</li>
                      <li>How do we build human-AI co-drawing interactions that preserve human agency and foster creativity?</li>
                    </ul>
                </p> */}
                <p style={{ fontSize: "0.7rem", lineHeight: 1.8, color: "#666", marginBottom: "1.5rem" }}>
                  I am grateful to have been awarded the <span style={{ color: COLORS.moss, fontWeight: 600 }}>NSF CSGrad4US</span> and <span style={{ color: COLORS.moss, fontWeight: 600 }}>Berkeley Chancellor's Fellowship</span> for my research.
                </p>
                
                <p style={{ fontSize: "0.7rem", color: "#888", lineHeight: 1.7 }}>
                  Previously I was SWE at <strong>Squarespace</strong> and worked in the <a href="https://www.cs.columbia.edu/~chilton/" style={{ color: COLORS.moss, textDecoration: "none", fontWeight: 600 }}>Computational Design Lab at Columbia</a> under Prof. Lydia Chilton.
                  I also enjoy ecology, <a href="https://samia-sketchbook.vercel.app" style={{ color: COLORS.terracotta, textDecoration: "none" }}>illustration</a>, archaeology  & data visualization !
                </p>
              </div>
            </div>
          </Reveal>

          {/* <Reveal delay={300}>
            <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", alignItems: "center" }}>
              <a href="#research" style={{ display: "inline-block", padding: "0.7rem 1.8rem", background: COLORS.moss, color: "white", borderRadius: 30, textDecoration: "none", fontSize: "0.88rem", fontWeight: 500, transition: "all 0.25s", letterSpacing: "0.03em" }} onMouseEnter={e => { e.target.style.background = COLORS.darkMoss; e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.target.style.background = COLORS.moss; e.target.style.transform = "none"; }}>
                See my work ↓
              </a>
            </div>
          </Reveal> */}
        </section>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1rem 0 3rem" }}>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${COLORS.sage}40)` }} />
          <img src={magImg} alt="sep" style={{ width: 124, margin: -12, height: "auto", opacity: 0.95 }} />
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${COLORS.sage}40)` }} />
        </div>

        <section id="research">
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 600, color: COLORS.ink, margin: 0 }}>
                selected projects 
              </h2>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#999", marginBottom: "2rem", fontStyle: "italic" }}>
            </p>
          </Reveal>

          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              {i === 0 ? (
                <div style={{ position: "relative" }}>
                  <img
                    src={viewImg}
                    alt="view"
                    style={{
                      position: "absolute",
                      top: -120,
                      right: 0,
                      width: 174,
                      margin: -12,
                      height: "auto",
                      opacity: 0.95,
                      zIndex: 0,
                      pointerEvents: "none",
                    }}
                  />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <ProjectCard {...p} />
                  </div>
                </div>
              ) : i % 3 === 2 ? (
                <div style={{ position: "relative" }}>
                  <PerchedBird index={(i - 2) / 3} isWide={isWide} />
                  <ProjectCard {...p} />
                </div>
              ) : (
                <ProjectCard {...p} />
              )}
            </Reveal>
          ))}

        </section>

        <section id="people" style={{ marginTop: "4rem", paddingTop: "2rem" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 600, color: COLORS.ink, margin: 0 }}>
                people
              </h2>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#999", marginBottom: "2rem", fontStyle: "italic" }}>
              A bookshelf of the mentors and friends who have supported me in my research (and beyond)!
            </p>
          </Reveal>

          <PeopleBookshelf />
        </section>

  <PdfEmbed src={resumePdf} height={520} />

  <footer style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: `1px solid ${COLORS.sage}30`, textAlign: "center" }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" }}>
              <img src={classImg} alt="class" style={{ width: 184, margin: -12, height: "auto", opacity: 0.95 }} />
              <ImageCredits />
            </div>
          </Reveal>
        </footer>
      </main>
    </div>
  );
}