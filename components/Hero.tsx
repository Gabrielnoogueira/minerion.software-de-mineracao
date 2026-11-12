import DemoForm from "./DemoForm";
import PlantScene from "./ui/PlantScene";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      {/* feixes de luz */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[10%] -left-[8%] -z-10 h-[80%] w-[40%] opacity-55 blur-[18px]"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,.2) 45%, transparent 60%)",
          transform: "skewX(-8deg)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[10%] -right-[8%] -z-10 h-[80%] w-[40%] opacity-55 blur-[18px]"
        style={{
          background:
            "linear-gradient(65deg, transparent 30%, rgba(255,255,255,.18) 45%, transparent 60%)",
          transform: "skewX(8deg)",
        }}
      />
      {/* grid que some nas bordas */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          maskImage: "radial-gradient(ellipse at 50% 30%, #000, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, #000, transparent 70%)",
        }}
      />
      <div aria-hidden="true" className="aurora-blob -z-10 -top-40 -left-20 h-[500px] w-[500px] animate-aurora bg-lime/15" />

      {/* título */}
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-16 text-center sm:pt-24">
        <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-lime shadow-[0_0_10px_#dcff0a]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-200">
            Minerion ERP<span className="hidden sm:inline"> · Gestão para mineração</span>
          </span>
        </span>

        <h1 className="mt-8 font-mono font-bold leading-[0.95] tracking-[-0.045em] text-balance text-[clamp(2.5rem,8vw,6.5rem)]">
          <span className="block bg-linear-to-b from-white from-20% to-[#8c9086] bg-clip-text text-transparent">
            Software completo
          </span>
          <span className="block bg-linear-to-b from-lime from-20% to-[#7c9a00] bg-clip-text text-transparent">
            para mineração.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          A operação cresce, mas o controle de gestão nem sempre acompanha o
          mesmo ritmo. O Minerion integra lavra, produção, suprimentos,
          manutenção e administrativo num único sistema — construído para quem
          entende de mineração.
        </p>

        <div className="mt-9">
          <a href="#agendar-demonstracao" className="btn btn-primary">
            Agendar demonstração <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* planta de beneficiamento */}
      <div
        className="plant relative -mt-2 w-[210%] max-w-none -ml-[55%] sm:mt-0 sm:w-[125%] sm:-ml-[12.5%] lg:mx-auto lg:w-full lg:max-w-[1500px]"
        style={{
          maskImage: "linear-gradient(#000 78%, transparent)",
          WebkitMaskImage: "linear-gradient(#000 78%, transparent)",
        }}
      >
        <PlantScene />
      </div>

      {/* formulário */}
      <div
        id="agendar-demonstracao"
        className="mx-auto grid max-w-6xl scroll-mt-24 gap-10 px-6 pt-6 pb-20 sm:pb-28 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16"
      >
        <div>
          <span className="section-label">Demonstração</span>
          <h2 className="mt-3 font-mono text-2xl font-bold tracking-[-0.01em] text-white sm:text-3xl">
            Agende uma demonstração do Minerion.
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Preencha seus dados e nossa equipe entra em contato para marcar o
            melhor horário.
          </p>
        </div>
        <DemoForm />
      </div>
    </section>
  );
}
