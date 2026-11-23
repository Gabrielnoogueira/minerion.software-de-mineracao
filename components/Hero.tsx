import Image from "next/image";
import DemoForm from "./DemoForm";

// pontos de prova reaproveitados do hero e do BigNumbers
const DEMO_POINTS = [
  "+400 operações atendidas em 30 anos de setor mineral",
  "65% da produção nacional de calcário agrícola gerenciada pelo Minerion",
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      {/* foto da mina inteira: faixa no topo no celular, fundo do hero no desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 aspect-[1200/630] lg:aspect-auto lg:h-full"
      >
        <Image
          src="/hero-mina.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        {/* escurece o topo e o lado do texto; funde a base com a seção preta seguinte */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/10 to-transparent lg:from-black/60 lg:via-black/25 lg:to-black/20" />
        <div className="absolute inset-0 hidden bg-linear-to-r from-black/90 via-black/60 via-45% to-black/10 lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-linear-to-t from-black to-transparent lg:h-[18%]" />
      </div>

      {/* primeira dobra: copy + formulário sobre a foto */}
      <div className="flex flex-col lg:justify-center lg:min-h-[max(100svh,700px,52.5vw)]">
        <div className="mx-auto grid w-full max-w-7xl shrink-0 gap-10 min-[100rem]:max-w-[1520px] px-6 pt-[50vw] pb-6 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:gap-12 min-[100rem]:gap-20 lg:pt-20 lg:pb-12">
          {/* copy */}
          <div>
            <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-lime shadow-[0_0_10px_#dcff0a]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-200">
                Minerion ERP<span className="hidden sm:inline"> · Gestão para mineração</span>
              </span>
            </span>

            <h1 className="mt-5 font-mono text-[clamp(2.1rem,6.4vw,3.6rem)] leading-none font-bold tracking-[-0.045em] lg:text-[clamp(2.4rem,4.1vw,4.7rem)]">
              <span className="block bg-linear-to-b from-white from-20% to-[#8c9086] bg-clip-text pb-[0.12em] text-transparent">
                Software completo
              </span>
              <span className="block bg-linear-to-b from-lime from-20% to-[#7c9a00] bg-clip-text pb-[0.16em] text-transparent">
                para mineração.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 xl:text-lg min-[100rem]:mt-6 min-[100rem]:text-xl min-[100rem]:leading-relaxed">
              A operação cresce, mas o controle de gestão nem sempre acompanha o
              mesmo ritmo. O Minerion integra lavra, produção, suprimentos,
              manutenção e administrativo num único sistema — construído para quem
              entende de mineração.
            </p>

            <ul className="mt-6 space-y-3 min-[100rem]:mt-8 min-[100rem]:space-y-4">
              {DEMO_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-white/90 xl:text-base min-[100rem]:text-lg">
                  <span className="grid h-5 w-5 shrink-0 xl:mt-0.5 min-[100rem]:h-6 min-[100rem]:w-6 place-items-center rounded-full bg-lime/15 text-lime">
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3.5 8.5l3 3 6-7" />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* formulário */}
          <div id="agendar-demonstracao" className="relative z-10 scroll-mt-6">
            <h2 className="mb-4 font-mono text-lg font-bold xl:text-xl min-[100rem]:mb-5 min-[100rem]:text-2xl tracking-[-0.02em] text-white">
              Agende uma <span className="text-lime">demonstração</span> do Minerion.
            </h2>
            <DemoForm />
          </div>
        </div>
      </div>
      {/* respiro antes do banner da IA */}
      <div aria-hidden="true" className="h-10" />
    </section>
  );
}
