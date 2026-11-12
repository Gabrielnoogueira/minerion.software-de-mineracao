import Image from "next/image";
import type { ReactNode } from "react";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-8 w-8 shrink-0 text-lime",
  "aria-hidden": true,
};

const BENEFITS: { label: [string, string]; icon: ReactNode }[] = [
  {
    label: ["Linguagem", "natural"],
    icon: (
      <svg {...iconProps}>
        <path d="M4 5h16v11H9l-5 4V5z" />
      </svg>
    ),
  },
  {
    label: ["Dados", "integrados"],
    icon: (
      <svg {...iconProps}>
        <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
        <path d="M5 5.5v6.5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V5.5" />
        <path d="M5 12v6.5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V12" />
      </svg>
    ),
  },
  {
    label: ["Mais", "agilidade"],
    icon: (
      <svg {...iconProps}>
        <path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12l1-8z" />
      </svg>
    ),
  },
];

/** Banner "Novidade Minerion: IA integrada ao ERP" — versão escura. */
export default function AiBanner() {
  return (
    <section
      aria-labelledby="ai-banner-title"
      className="relative isolate flex flex-col overflow-hidden border-y border-white/10 bg-black xl:block"
    >
      {/* imagem: no desktop ocupa a direita e some no preto à esquerda */}
      <div
        className="relative h-72 sm:h-[26rem] xl:absolute xl:inset-y-0 xl:right-0 xl:h-auto xl:left-[max(40%,calc(50%-6rem))] xl:[mask-image:linear-gradient(to_right,transparent_0%,#000_38%)]"
      >
        <Image
          src="/minerion-ia-chat.png"
          alt="Chat com IA dentro do ERP Minerion criando uma ordem de serviço a partir de uma conversa em linguagem natural"
          fill
          sizes="(min-width: 1280px) 68vw, 100vw"
          className="object-cover object-[35%_center] xl:object-[30%_center]"
        />
        {/* no celular a imagem vem embaixo: funde com o texto acima */}
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-black via-transparent to-transparent xl:hidden" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl max-xl:order-first">
        <div className="px-6 py-16 sm:py-20 xl:w-[50%] xl:max-w-[620px] xl:py-24 xl:pl-6">
          <span className="inline-flex items-center gap-3 rounded-full border border-lime/70 px-5 py-2 text-sm font-bold tracking-wide text-lime uppercase">
            Novidade Minerion
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 3l1.6 4.9L16.5 9.5l-4.9 1.6L10 16l-1.6-4.9L3.5 9.5l4.9-1.6L10 3z" />
              <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14z" />
            </svg>
          </span>

          <h2
            id="ai-banner-title"
            className="mt-6 font-sans text-[2rem] leading-[1.12] font-bold tracking-[-0.02em] sm:text-[2.6rem] xl:text-[2.35rem] 2xl:text-[2.6rem]"
          >
            <span className="block text-white">O ERP da mineração evoluiu.</span>
            <span className="block text-lime">Agora com IA integrada.</span>
          </h2>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">
            Consulte informações da sua operação em linguagem natural,
            diretamente no ERP Minerion. Mais agilidade para acessar dados e
            apoiar suas decisões.
          </p>

          <ul className="mt-8 grid grid-cols-3 sm:flex sm:items-center">
            {BENEFITS.map((b, i) => (
              <li
                key={b.label.join(" ")}
                className={
                  "flex flex-col items-start gap-2 pr-3 sm:flex-row sm:items-center sm:gap-3 sm:pr-7 " +
                  (i > 0 ? "border-l border-white/20 pl-3 sm:pl-7" : "")
                }
              >
                {b.icon}
                <span className="text-sm leading-tight font-semibold text-white sm:text-base">
                  {b.label[0]}
                  <br />
                  {b.label[1]}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#agendar-demonstracao"
            className="btn btn-primary mt-10 rounded-xl px-8 py-4 text-base"
          >
            Conheça a IA integrada
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
