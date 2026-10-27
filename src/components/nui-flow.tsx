import { experience } from "@/content";

// Diagram of how one FiveM feature spans the in-game UI, the client script and the server
// script, with the native calls that connect each layer. Packets animate along the lines.

const layers = [
  {
    tech: "React · Svelte",
    name: "In-game UI",
    note: "The screens players see and click",
  },
  {
    tech: "Lua",
    name: "Client script",
    note: "Runs inside each player's game",
  },
  {
    tech: "Lua",
    name: "Server script",
    note: "One instance shared by everyone online",
  },
];

const links = [
  { forward: "RegisterNUICallback", back: "SendNUIMessage" },
  { forward: "TriggerServerEvent", back: "TriggerClientEvent" },
];

function Packet({ dir, delay = 0 }: { dir: "r" | "l" | "d" | "u"; delay?: number }) {
  const animation = {
    r: "animate-flow-r",
    l: "animate-flow-l",
    d: "animate-flow-d",
    u: "animate-flow-u",
  }[dir];
  const position = {
    r: "right-0 top-0",
    l: "left-0 top-0",
    d: "bottom-0 left-0",
    u: "left-0 top-0",
  }[dir];
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-0 motion-reduce:hidden ${animation}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span
        className={`absolute size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)] ${position}`}
      />
    </span>
  );
}

function HLine({ label, dir, delay }: { label: string; dir: "r" | "l"; delay?: number }) {
  return (
    <div>
      <p className="mb-1.5 text-center font-mono text-[10px] text-subtle">
        {dir === "l" && "← "}
        {label}
        {dir === "r" && " →"}
      </p>
      <div className="relative h-1.5 overflow-hidden">
        <span className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
        <Packet dir={dir} delay={delay} />
      </div>
    </div>
  );
}

// Mobile: one vertical line carrying packets both ways, with both calls labelled beside it.
function VLink({ forward, back, delay }: { forward: string; back: string; delay: number }) {
  return (
    <div className="flex h-20 gap-4 pl-6 lg:hidden">
      <div className="relative w-1.5 overflow-hidden">
        <span className="absolute inset-y-0 left-1/2 w-px bg-line-strong" />
        <Packet dir="d" delay={delay} />
        <Packet dir="u" delay={delay + 1.4} />
      </div>
      <div className="flex flex-col justify-center gap-1.5 font-mono text-[10px] text-subtle">
        <p>↓ {forward}</p>
        <p>↑ {back}</p>
      </div>
    </div>
  );
}

export function NuiFlow() {
  const where = experience
    .filter((e) => e.current)
    .map((e) => `${e.company} (${e.region})`)
    .join(" · ");

  return (
    <figure className="rounded-2xl border border-line bg-card/50 p-6 sm:p-8">
      <figcaption>
        <p className="font-mono text-xs text-subtle">
          <span className="text-accent">fivem</span> / how a feature ships
        </p>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
          Every in-game feature I build touches three layers: the interface players use, the client
          script running in their game, and the server script everyone shares. Live today on {where}
          .
        </p>
      </figcaption>

      <div className="mt-8 flex flex-col lg:flex-row lg:items-center">
        {layers.map((layer, i) => (
          <div key={layer.name} className="contents">
            <div className="rounded-xl border border-line-strong bg-bg px-4 py-4 lg:w-48 lg:shrink-0">
              <p className="font-mono text-[11px] text-accent">{layer.tech}</p>
              <p className="mt-1.5 font-medium tracking-tight text-fg">{layer.name}</p>
              <p className="mt-1 text-[13px] leading-snug text-subtle">{layer.note}</p>
            </div>

            {links[i] && (
              <>
                <div className="hidden min-w-0 flex-1 flex-col gap-3 px-3 lg:flex">
                  <HLine label={links[i].forward} dir="r" delay={i * 0.7} />
                  <HLine label={links[i].back} dir="l" delay={1.4 + i * 0.7} />
                </div>
                <VLink forward={links[i].forward} back={links[i].back} delay={i * 0.7} />
              </>
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}
