import React, { useRef, useEffect, useState } from "react";

const polarToCartesian = (cx, cy, r, angleDeg) => {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
};

const describeArc = (cx, cy, r, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", r, r, 0, largeArcFlag, 0, end.x, end.y].join(" ");
};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const SemiCircularProgress = ({ current = 0, goal = 1, size = 220, stroke = 14, arcSpan = 220 }) => {
  const percent = clamp(Math.round((current / Math.max(1, goal)) * 100), 0, 100);
  const half = size / 2;
  const radius = half - stroke / 2 - 4;
  const startAngle = -arcSpan / 2;
  const endAngle = arcSpan / 2;

  const bgPath = describeArc(half, half, radius, startAngle, endAngle);
  const fgPath = describeArc(half, half, radius, startAngle, startAngle + ((endAngle - startAngle) * percent) / 100);

  const fgRef = useRef(null);
  const bgRef = useRef(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (fgRef.current) {
      try {
        const L = fgRef.current.getTotalLength();
        setLength(L);
      } catch (e) {
        setLength(0);
      }
    }
  }, [percent, size, stroke]);

  return (
    <div style={{ width: size, height: size / 1.1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size / 1.1} viewBox={`0 0 ${size} ${size / 1.1}`}>
        <path d={bgPath} fill="none" stroke="#E6EEF0" strokeWidth={stroke} strokeLinecap="round" ref={bgRef} />

        <path d={fgPath} fill="none" stroke="#72e3ad" strokeWidth={stroke} strokeLinecap="round" ref={fgRef} style={{ transition: "stroke-dashoffset 600ms ease, stroke 300ms" }} />

        <foreignObject x={size * 0.15} y={size * 0.18} width={size * 0.7} height={size * 0.7}>
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>{`${percent}%`}</div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>of goal</div>
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default SemiCircularProgress;
