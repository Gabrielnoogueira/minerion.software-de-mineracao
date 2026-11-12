/**
 * Ilustração do hero: planta de beneficiamento mineral em wireframe lima.
 * Fluxo: caminhão bascula no britador primário → correia → peneira vibratória
 * (com britador cônico embaixo) → correias → pilhas de produto.
 * Animações em CSS (`.plant` em globals.css), desligadas com prefers-reduced-motion.
 */

const GROUND = 705;
const r1 = (n: number) => Math.round(n * 10) / 10;

type Pt = [number, number];

function Conveyor({ from, to, legs }: { from: Pt; to: Pt; legs: number[] }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const t = 13; // espessura da estrutura
  const ox = (-dy / len) * t;
  const oy = (dx / len) * t;
  const yAt = (x: number) => y1 + ((x - x1) * dy) / dx;

  // treliça em zigue-zague entre a borda de cima e a de baixo
  const n = Math.max(4, Math.round(len / 34));
  let truss = "";
  for (let i = 0; i <= n; i++) {
    const k = i / n;
    const bx = x1 + dx * k + (i % 2 ? ox : 0);
    const by = y1 + dy * k + (i % 2 ? oy : 0);
    truss += `${i === 0 ? "M" : "L"}${r1(bx)} ${r1(by)} `;
  }

  return (
    <g>
      {legs.map((x) => (
        <g key={x}>
          <path className="ln2" d={`M${x} ${r1(yAt(x) + t)} L${x} ${GROUND}`} />
          <path className="ln2" d={`M${x - 14} ${GROUND} L${x + 14} ${GROUND}`} />
        </g>
      ))}
      <path
        className="ln"
        d={`M${x1} ${y1} L${x2} ${y2} L${r1(x2 + ox)} ${r1(y2 + oy)} L${r1(x1 + ox)} ${r1(y1 + oy)} Z`}
      />
      <path className="sl" d={truss} />
      <circle className="ln" cx={r1(x1 + ox / 2)} cy={r1(y1 + oy / 2)} r="9" />
      <circle className="ln" cx={r1(x2 + ox / 2)} cy={r1(y2 + oy / 2)} r="9" />
      {/* material andando na correia */}
      <path className="flow" d={`M${x1 + 10} ${y1 - 5} L${x2 - 8} ${y2 - 5}`} />
    </g>
  );
}

function Falling({ x, y, dist, count = 4 }: { x: number; y: number; dist: number; count?: number }) {
  return (
    <g className="fall" style={{ ["--fd" as string]: `${dist}px` }}>
      {Array.from({ length: count }, (_, i) => (
        <circle
          key={i}
          cx={x + ((i * 7) % 13) - 6}
          cy={y}
          r={i % 2 ? 3.5 : 4.5}
          style={{ animationDelay: `${(i / count).toFixed(2)}s` }}
        />
      ))}
    </g>
  );
}

function Tag({
  x,
  y,
  w,
  title,
  value,
  anchor,
}: {
  x: number;
  y: number;
  w: number;
  title: string;
  value: string;
  anchor: Pt;
}) {
  const [ax, ay] = anchor;
  return (
    <g className="tag">
      <path className="lead" d={`M${ax} ${ay} L${ax} ${y + 72}`} />
      <circle className="np" cx={ax} cy={ay} r="6" />
      <circle className="nd" cx={ax} cy={ay} r="5" />
      <rect x={x} y={y} width={w} height="72" rx="12" />
      <circle className="live" cx={x + 22} cy={y + 24} r="5" />
      <text className="t1" x={x + 38} y={y + 30}>
        {title}
      </text>
      <text className="t2" x={x + 20} y={y + 58}>
        {value}
      </text>
    </g>
  );
}

export default function PlantScene() {
  return (
    <svg viewBox="0 120 2000 620" aria-hidden="true" role="presentation">
      <defs>
        <radialGradient id="plant-ga" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#DCFF0A" stopOpacity=".2" />
          <stop offset=".25" stopColor="#DCFF0A" stopOpacity=".12" />
          <stop offset=".5" stopColor="#DCFF0A" stopOpacity=".06" />
          <stop offset=".75" stopColor="#DCFF0A" stopOpacity=".02" />
          <stop offset="1" stopColor="#DCFF0A" stopOpacity="0" />
        </radialGradient>
        <filter id="plant-gbl" x="-40%" y="-80%" width="180%" height="260%">
          <feGaussianBlur stdDeviation="90" />
        </filter>
        <filter id="plant-sbl" x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* ===== Plataforma ===== */}
      <ellipse cx="1000" cy="620" rx="1000" ry="420" fill="url(#plant-ga)" />
      <ellipse cx="1000" cy="690" rx="700" ry="140" fill="#DCFF0A" fillOpacity=".14" filter="url(#plant-gbl)" />
      {[
        [940, 120],
        [780, 100],
        [620, 80],
        [460, 60],
        [300, 40],
      ].map(([rx, ry]) => (
        <ellipse key={rx} className="bn" cx="1000" cy={GROUND} rx={rx} ry={ry} />
      ))}
      <path className="rim" d={`M60 ${GROUND} A940 120 0 0 1 1940 ${GROUND}`} />
      <ellipse cx="1000" cy="714" rx="780" ry="24" fill="#000" fillOpacity=".55" filter="url(#plant-sbl)" />

      {/* ===== Correia 3 (fundo): peneira → pilha 2 ===== */}
      <Conveyor from={[1258, 386]} to={[1800, 300]} legs={[1430, 1640]} />

      {/* ===== Torre de peneiramento ===== */}
      <g>
        <path className="ln2" d={`M1010 414 L1010 ${GROUND} M1260 414 L1260 ${GROUND}`} />
        <path className="dot" d="M1010 420 L1260 560 M1260 420 L1010 560 M1010 560 L1260 700 M1260 560 L1010 700" />
        <path className="sl" d="M990 376 L1280 376 M990 400 L990 376 M1062 400 L1062 376 M1208 400 L1208 376 M1280 400 L1280 376" />
        <path className="ln" d="M990 400 L1280 400 L1280 414 L990 414 Z" />
        <path className="dot" d="M1135 414 L1135 538" />
        <path className="ln2" d="M1040 346 L1040 400 M1230 388 L1230 400" />
        {/* peneira vibratória */}
        <g className="shake">
          <path className="ln" d="M1020 300 L1250 352 L1250 392 L1020 340 Z" />
          <path className="dot" d="M1036 316 L1240 362 M1036 328 L1240 374" />
          <path className="ln2" d="M1250 352 L1266 356 L1266 396 L1250 392" />
          <circle className="ln2" cx="1135" cy="344" r="10" />
        </g>
        {/* britador cônico (secundário) */}
        <path className="ln" d="M1095 540 L1175 540 L1168 556 L1102 556 Z" />
        <path className="ln" d="M1102 556 L1168 556 L1190 640 L1080 640 Z" />
        <path className="sl" d="M1114 572 L1156 572 M1108 594 L1162 594 M1102 616 L1168 616" />
        <path className="ln" d="M1070 640 L1200 640 L1200 668 L1070 668 Z" />
        <path className="ln2" d="M1204 604 L1244 604 L1244 640 L1204 640 Z" />
        <path className="sl" d="M1204 616 L1190 616 M1204 628 L1194 628" />
      </g>

      {/* ===== Pilha 2 ===== */}
      <path className="pile" d="M1664 712 Q1744 560 1797 360 Q1812 344 1827 360 Q1880 560 1960 712 Z" />
      <Falling x={1806} y={312} dist={40} />

      {/* ===== Correia 2: britador cônico → pilha 1 ===== */}
      <Conveyor from={[1180, 684]} to={[1500, 430]} legs={[1320, 1430]} />

      {/* ===== Pilha 1 ===== */}
      <path className="pile" d="M1370 712 Q1440 600 1497 486 Q1512 470 1527 486 Q1584 600 1654 712 Z" />
      <Falling x={1506} y={440} dist={34} />

      {/* ===== Correia 1: britador primário → peneira ===== */}
      <Conveyor from={[618, 680]} to={[1040, 336]} legs={[760, 900]} />

      {/* ===== Britador primário (mandíbulas) ===== */}
      <g>
        <path className="ln2" d={`M560 640 L560 ${GROUND} M664 640 L664 ${GROUND}`} />
        <path className="dot" d="M560 650 L664 700 M664 650 L560 700" />
        <path className="ln" d="M548 545 L672 545 L672 640 L548 640 Z" />
        <path className="sl" d="M566 554 L598 632 M654 554 L622 632" />
        <g className="spin">
          <circle className="ln" cx="700" cy="592" r="34" />
          <path className="sl" d="M700 562 L700 622 M670 592 L730 592 M679 571 L721 613 M721 571 L679 613" />
          <circle className="ln2" cx="700" cy="592" r="7" />
        </g>
        {/* moega */}
        <path className="ln" d="M500 468 L724 468 L676 545 L544 545 Z" />
        <path className="gl" d="M540 530 Q610 494 680 530 L672 540 L548 540 Z" />
        <path className="sl" d="M500 450 L724 450 M520 468 L520 450 M612 468 L612 450 M704 468 L704 450" />
      </g>

      {/* ===== Rampa de descarga ===== */}
      <path className="ln" d={`M40 ${GROUND} L170 560 L505 560 L505 ${GROUND} Z`} />
      <path className="dot" d="M190 600 L490 600 M150 640 L490 640 M112 680 L490 680" />

      {/* ===== Caminhão fora de estrada ===== */}
      <g>
        <path className="ln" d="M130 476 L470 476 L470 492 L130 492 Z" />
        <path className="ln" d="M138 476 L138 392 Q138 382 148 382 L214 382 L236 414 L236 476 Z" />
        <path className="gl" d="M150 394 L208 394 L224 418 L150 418 Z" />
        <path className="ln" d="M118 452 L138 452 L138 492 L118 492 Z" />
        <path className="sl" d="M122 462 L134 462 M122 472 L134 472 M122 482 L134 482" />
        <circle className="beacon" cx="186" cy="376" r="5" />
        {/* caçamba basculante */}
        <g className="bed">
          <path className="ln" d="M240 360 L132 366 L132 378 L242 376 Z" />
          <path className="heap" d="M262 362 Q370 300 494 372 Z" />
          <path className="ln" d="M250 470 L480 470 L502 370 L240 360 Z" />
          <path className="sl" d="M310 470 L304 364 M370 470 L368 366 M430 470 L432 368" />
        </g>
        {/* rodas */}
        {[180, 390].map((cx) => (
          <g key={cx}>
            <path
              className="ln"
              d={`M${cx - 56} 518 A56 56 0 0 1 ${cx + 56} 518 L${cx + 44} 518 A44 44 0 0 0 ${cx - 44} 518 Z`}
            />
            <circle className="tire" cx={cx} cy="518" r="42" />
            <circle className="dot" cx={cx} cy="518" r="34" />
            <circle className="ln2" cx={cx} cy="518" r="22" />
            <circle className="ln2" cx={cx} cy="518" r="7" />
          </g>
        ))}
      </g>
      <g className="dump-fall">
        <Falling x={528} y={420} dist={70} count={6} />
      </g>

      {/* ===== Etiquetas de telemetria ===== */}
      <Tag x={560} y={238} w={290} title="BRITAGEM PRIMÁRIA" value="420 t/h" anchor={[612, 468]} />
      <Tag x={1000} y={140} w={320} title="PENEIRAMENTO" value="98,2% eficiência" anchor={[1135, 318]} />
      <Tag x={1610} y={150} w={300} title="PILHA · BRITA 1" value="12.480 t" anchor={[1760, 520]} />
    </svg>
  );
}
