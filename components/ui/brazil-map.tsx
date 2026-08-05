"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

export type MapPoint = {
  lat: number;
  lng: number;
  label: string;
};

type PointRole = "hub" | "point";
type PinData = { role: PointRole; label: string };

function isPinData(data: unknown): data is PinData {
  return (
    typeof data === "object" &&
    data !== null &&
    "role" in data &&
    "label" in data
  );
}

type BrazilMapProps = {
  hub: MapPoint;
  points: MapPoint[];
  lineColor?: string;
};

export function BrazilMap({ hub, points, lineColor = "#DCFF0A" }: BrazilMapProps) {
  const { backgroundSvg, width, height, hubXY, pointsXY } = useMemo(() => {
    const map = new DottedMap({ height: 100, countries: ["BRA"], grid: "diagonal" });

    map.addPin({
      lat: hub.lat,
      lng: hub.lng,
      svgOptions: { color: lineColor, radius: 0.5 },
      data: { role: "hub", label: hub.label } satisfies PinData,
    });
    points.forEach((point) => {
      map.addPin({
        lat: point.lat,
        lng: point.lng,
        svgOptions: { color: lineColor, radius: 0.4 },
        data: { role: "point", label: point.label } satisfies PinData,
      });
    });

    const backgroundSvg = map.getSVG({
      radius: 0.22,
      color: "#FFFFFF40",
      shape: "circle",
      backgroundColor: "transparent",
    });

    const projected = map
      .getPoints()
      .filter((p): p is typeof p & { data: PinData } => isPinData(p.data));

    const hubXY = projected.find((p) => p.data.role === "hub")!;
    const pointsXY = projected.filter((p) => p.data.role === "point");

    return {
      backgroundSvg,
      width: map.image.width,
      height: map.image.height,
      hubXY,
      pointsXY,
    };
  }, [hub, points, lineColor]);

  function curvedPath(start: { x: number; y: number }, end: { x: number; y: number }) {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - height * 0.12;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }

  return (
    <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
      <div
        className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_8%,white_92%,transparent)]"
        dangerouslySetInnerHTML={{ __html: backgroundSvg }}
      />
      <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="brazil-map-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="50%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {pointsXY.map((point, i) => (
          <motion.path
            key={`path-${point.data.label}`}
            d={curvedPath(hubXY, point)}
            fill="none"
            stroke="url(#brazil-map-gradient)"
            strokeWidth={0.5}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 * i, ease: "easeOut" }}
          />
        ))}

        <circle cx={hubXY.x} cy={hubXY.y} r={1} fill={lineColor} />

        {pointsXY.map((point) => (
          <g key={`point-${point.data.label}`}>
            <circle cx={point.x} cy={point.y} r={0.8} fill={lineColor} />
            <circle cx={point.x} cy={point.y} r={0.8} fill={lineColor} opacity={0.5}>
              <animate
                attributeName="r"
                from="0.8"
                to="3"
                dur="1.8s"
                begin="0s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="1.8s"
                begin="0s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
