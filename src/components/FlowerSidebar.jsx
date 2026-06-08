import React from "react";
import FlowerImage from "./FlowerImage";
import { FLOWER_CONFIGS, SIDEBAR_WIDTH } from "../constants/flowers";
import { FLOWER_ASSETS } from "../constants/flowers";

export default function FlowerSidebar({ scrollProgress, side }) {
  const flowers = FLOWER_CONFIGS.filter(f => f.side === side);
  return (
    <div style={{
      position: "fixed",
      top: 0,
      [side]: 0,
      width: SIDEBAR_WIDTH,
      height: "100vh",
      pointerEvents: "none",
      zIndex: 10,
      overflow: "visible",
    }}>
      {flowers.map(f => {
        const progress = Math.max(0, Math.min(1, (scrollProgress - f.triggerPercent) / 0.12));
        if (progress === 0) return null;

        const asset = FLOWER_ASSETS[f.type] ?? FLOWER_ASSETS.daisy;
        const yPos  = f.yOffset * window.innerHeight;
        const xPos  = side === "right" ? SIDEBAR_WIDTH - f.x : f.x;

        return (
          <FlowerImage
            key={f.id}
            src={asset.src}
            baseSize={asset.baseSize}
            x={xPos}
            y={yPos}
            size={f.size}
            progress={progress}
            rotation={f.rotation}
          />
        );
      })}
    </div>
  );
}
