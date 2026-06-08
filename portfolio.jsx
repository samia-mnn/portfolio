import React, { useState, useEffect, useRef } from "react";
import thinversImg from "./src/assets/thinvers.png";
import magImg from "./src/assets/mag.png";
import viewImg from "./src/assets/view.png";
import resumePdf from "./src/assets/resume.pdf";
import classImg from "./src/assets/class.png";
import { COLORS } from "./src/constants/colors";
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
      else setActiveSection("research");
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
      `}</style>

    {/* #<FloatingPetals /> */}
  <CursorSparkles />
  <CursorFinger />
      {/* <FlowerSidebar scrollProgress={scrollProgress} side="left" />
      <FlowerSidebar scrollProgress={scrollProgress} side="right" /> */}
    {isWide ? <HotAirBalloon /> : null}
  {/* Persistent birds for each milestone */}
  {isWide ? <PersistentBird visible={birdTopRight} side="right" top="8vh" emoji="card.webp" /> : null}
  {isWide ? <PersistentBird visible={birdMiddleLeft} side="left" top="45vh" emoji="bluebird.webp" /> : null}
  {isWide ? <PersistentBird visible={birdBottomRight} side="right" top="70vh" emoji="warbler.webp" /> : null}
  {/* <FlyingBird trigger={birdTrigger} /> */}
      <Nav activeSection={activeSection} />

      <div style={{ position: "fixed", left: 0, top: 0, width: "3px", height: `${scrollProgress * 100}vh`, background: `linear-gradient(to bottom, ${COLORS.lightSage}, ${COLORS.sage}, ${COLORS.moss})`, zIndex: 200, transition: "height 0.1s", borderBottomRightRadius: 3 }} />

  <main id="top" style={{ maxWidth: 700, margin: "0 auto", padding: "0 2rem 6rem", paddingTop: "6rem", position: "relative", zIndex: 20 }}>

        <section style={{ minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "2rem" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                <div style={{ position: "relative", width: "12em", flexShrink: 0 }}>
                <img src={thinversImg} alt="Samia Menon" style={{ width: "12em", height: "auto", display: "block", borderRadius: 8 , zIndex: 1}} />
              </div>

              <div style={{ flex: 1, minWidth: 280 }}>
                <p style={{ fontSize: "0.9rem", letterSpacing: "0.12em", color: COLORS.sage, marginBottom: "0.75rem"}}>
                  <Reveal delay={300}>hello! </Reveal>
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
                  <h1 style={{  fontSize: "clamp(1.1rem, 5vw, 1.6rem)", fontWeight: 700, lineHeight: 1.15, margin: 0, color: COLORS.ink }}>
                    I'm <span style={{ color: COLORS.moss, display: "inline-block"}}>Samia - </span>
                  </h1>
                </div>
                <p style={{ fontSize: "0.8rem", lineHeight: 1.8, color: "#555", marginBottom: "1.2rem" }}>
                  A first-year PhD student in Computer Science (HCI) at <strong style={{ color: COLORS.ink }}>UC Berkeley</strong>, co-advised by <a href="https://people.eecs.berkeley.edu/~bjoern/" style={{ color: COLORS.moss, textDecoration: "none", borderBottom: `1px dotted ${COLORS.moss}` }}>Bjoern Hartmann</a> and <a href="https://people.ischool.berkeley.edu/~hearst/" style={{ color: COLORS.moss, textDecoration: "none", borderBottom: `1px dotted ${COLORS.moss}` }}>Marti Hearst</a>.
                </p>
                <p style={{ fontSize: "0.7rem", lineHeight: 1.8, color: "#666", marginBottom: "1.5rem" }}>
                  My current research leverages techniques in computer vision and machine learning to investigate how AI-mediated environments shape the information we consume and create — from algorithmic media, to news feeds, to art.
                  Along with computational approaches, I believe that any innovation must be grounded in qualitative data that represents human perspectives and needs.
                </p>
                 <p style={{ fontSize: "0.7rem", lineHeight: 1.8, color: "#666", marginBottom: "1.5rem" }}>
                   Drawing on this work, I aim to build systems that enhance human understanding, expression, and connection within these new paradigms.
                </p>
                <p style={{ fontSize: "0.7rem", lineHeight: 1.8, color: "#666", marginBottom: "1.5rem" }}>
                  I am grateful to have been awarded the <span style={{ color: COLORS.moss, fontWeight: 600 }}>NSF CSGrad4US</span> and <span style={{ color: COLORS.moss, fontWeight: 600 }}>Berkeley Chancellor's Fellowship</span> for my research.
                </p>
                
                <p style={{ fontSize: "0.7rem", color: "#888", lineHeight: 1.7 }}>
                  Previously : SWE at <strong>Squarespace</strong> · <a href="https://www.cs.columbia.edu/~chilton/" style={{ color: COLORS.moss, textDecoration: "none", fontWeight: 600 }}>Computational Design Lab at Columbia</a> under Prof. Lydia Chilton<br />
                  <em>I also enjoy:</em> ecology · <a href="https://samia-sketchbook.vercel.app" style={{ color: COLORS.terracotta, textDecoration: "none" }}>illustration</a> · archaeology · data visualization 
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", alignItems: "center" }}>
              <a href="#research" style={{ display: "inline-block", padding: "0.7rem 1.8rem", background: COLORS.moss, color: "white", borderRadius: 30, textDecoration: "none", fontSize: "0.88rem", fontWeight: 500, transition: "all 0.25s", letterSpacing: "0.03em" }} onMouseEnter={e => { e.target.style.background = COLORS.darkMoss; e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.target.style.background = COLORS.moss; e.target.style.transform = "none"; }}>
                See my work ↓
              </a>
            </div>
          </Reveal>
        </section>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1rem 0 3rem" }}>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${COLORS.sage}40)` }} />
          <img src={magImg} alt="sep" style={{ width: 100, height: "auto", opacity: 0.95 }} />
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
                      width: 150,
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
              ) : (
                <ProjectCard {...p} />
              )}
            </Reveal>
          ))}

        </section>

  <PdfEmbed src={resumePdf} height={520} />

  <footer style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: `1px solid ${COLORS.sage}30`, textAlign: "center" }}>
          <Reveal>
            <p style={{ fontSize: "0.5rem", color: "#aaa" }}>
              <img src={classImg} alt="class" style={{ width: 160, height: "auto", opacity: 0.95 }} />
               <br></br>Image credits:  Apple (Illustrated Dictionary of Gardening – A Practical and Scientific Encyclopaedia of Horticulture, edited by George Nicholson - 1885), Birds (Birds of America, John James Audubon - 1838), Footer (San Francisco Chronicle on Rose O'Halloran - 1894), Woman with Binoculars (Advertisment for Samuel Levy Watches, Clocks, ETC, Suffolk, VA), Background (Lake of the Mountains, Thomas Doughty - 1826 - Currently displayed at the de Young Museum, San Francisco)
            </p>
          </Reveal>
        </footer>
      </main>
    </div>
  );
}