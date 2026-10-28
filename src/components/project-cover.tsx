import type { Project } from "@/content";

// Illustrated covers for the project cards: abstract UI sketches drawn with the theme
// tokens, so they follow light/dark. They hint at what each app does; they are not screenshots.

const panel = { fill: "var(--card)", stroke: "var(--line-strong)" };
const bar = { fill: "var(--line-strong)" };
const soft = { fill: "var(--subtle)", opacity: 0.45 };
const accent = { fill: "var(--accent)" };

function Billing() {
  const heights = [44, 70, 56, 92, 76, 118];
  return (
    <>
      <rect x="44" y="34" width="232" height="176" rx="12" {...panel} />
      <rect x="62" y="54" width="74" height="8" rx="4" {...soft} />
      <rect x="216" y="52" width="42" height="12" rx="6" {...accent} opacity="0.9" />
      <path d="M62 78h196" stroke="var(--line)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="62" y={92 + i * 20} width={i % 2 ? 72 : 96} height="6" rx="3" {...bar} />
          <rect x="222" y={92 + i * 20} width="36" height="6" rx="3" {...bar} />
        </g>
      ))}
      <path d="M62 176h196" stroke="var(--line)" />
      <rect x="62" y="188" width="44" height="8" rx="4" {...soft} />
      <rect x="198" y="186" width="60" height="12" rx="4" {...accent} />

      <rect x="292" y="34" width="144" height="176" rx="12" {...panel} />
      <rect x="308" y="52" width="48" height="8" rx="4" {...soft} />
      <path d="M308 192h112" stroke="var(--line)" />
      {heights.map((h, i) => (
        <rect
          key={i}
          x={310 + i * 18}
          y={192 - h}
          width="10"
          height={h}
          rx="3"
          {...(i === heights.length - 1 ? accent : bar)}
        />
      ))}
    </>
  );
}

function Finance() {
  return (
    <>
      <rect x="44" y="34" width="392" height="176" rx="12" {...panel} />
      <rect x="62" y="52" width="64" height="8" rx="4" {...soft} />
      <rect x="62" y="68" width="40" height="14" rx="4" {...bar} />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M62 ${118 + i * 28}h220`} stroke="var(--line)" strokeDasharray="3 5" />
      ))}
      <path
        d="M62 176 L98 160 L134 168 L170 132 L206 142 L242 108 L282 96 L282 196 L62 196 Z"
        fill="var(--accent)"
        opacity="0.12"
      />
      <path
        d="M62 176 L98 160 L134 168 L170 132 L206 142 L242 108 L282 96"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="282" cy="96" r="4.5" {...accent} stroke="var(--card)" strokeWidth="2" />

      <path d="M306 52v140" stroke="var(--line)" />
      <circle cx="370" cy="112" r="34" fill="none" stroke="var(--line-strong)" strokeWidth="11" />
      <circle
        cx="370"
        cy="112"
        r="34"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="11"
        strokeDasharray="150 214"
        strokeLinecap="round"
        transform="rotate(-90 370 112)"
      />
      <rect x="334" y="164" width="72" height="6" rx="3" {...bar} />
      <rect x="334" y="178" width="48" height="6" rx="3" {...soft} />
    </>
  );
}

function Marketplace() {
  const portals = ["admin", "seller", "buyer"];
  return (
    <>
      {portals.map((name, i) => {
        const x = 44 + i * 134;
        const y = i === 1 ? 30 : 46;
        return (
          <g key={name}>
            <rect x={x} y={y} width="124" height="166" rx="12" {...panel} />
            <rect
              x={x + 14}
              y={y + 16}
              width="8"
              height="8"
              rx="4"
              {...(i === 1 ? accent : soft)}
            />
            <text
              x={x + 30}
              y={y + 24}
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill="var(--muted)"
            >
              {name}
            </text>
            <path d={`M${x + 14} ${y + 38}h96`} stroke="var(--line)" />
            {i === 0 &&
              [0, 1, 2, 3, 4].map((r) => (
                <g key={r}>
                  <rect
                    x={x + 14}
                    y={y + 52 + r * 20}
                    width={r % 2 ? 50 : 64}
                    height="6"
                    rx="3"
                    {...bar}
                  />
                  <rect x={x + 92} y={y + 51 + r * 20} width="18" height="8" rx="4" {...soft} />
                </g>
              ))}
            {i === 1 && (
              <>
                {[38, 60, 48, 82].map((h, b) => (
                  <rect
                    key={b}
                    x={x + 18 + b * 24}
                    y={y + 140 - h}
                    width="14"
                    height={h}
                    rx="3"
                    {...(b === 3 ? accent : bar)}
                  />
                ))}
                <path d={`M${x + 14} ${y + 146}h96`} stroke="var(--line)" />
              </>
            )}
            {i === 2 &&
              [0, 1, 2, 3].map((c) => (
                <g key={c}>
                  <rect
                    x={x + 14 + (c % 2) * 50}
                    y={y + 50 + Math.floor(c / 2) * 54}
                    width="46"
                    height="34"
                    rx="6"
                    fill="var(--line)"
                  />
                  <rect
                    x={x + 14 + (c % 2) * 50}
                    y={y + 89 + Math.floor(c / 2) * 54}
                    width={c === 1 ? 30 : 38}
                    height="5"
                    rx="2.5"
                    {...(c === 1 ? accent : bar)}
                  />
                </g>
              ))}
          </g>
        );
      })}
    </>
  );
}

const covers = {
  billing: Billing,
  finance: Finance,
  marketplace: Marketplace,
};

export function ProjectCover({ kind }: { kind: Project["cover"] }) {
  const Cover = covers[kind];
  return (
    <svg
      viewBox="0 0 480 240"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="size-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    >
      <Cover />
    </svg>
  );
}
