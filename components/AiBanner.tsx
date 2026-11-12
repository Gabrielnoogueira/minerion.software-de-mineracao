import Image from "next/image";
import type { ReactNode } from "react";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-7 w-7",
  "aria-hidden": true,
};

const BENEFITS: { label: [string, string]; icon: ReactNode }[] = [
  {
    label: ["Linguagem", "natural"],
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
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

/** Banner "Novidade Minerion: IA integrada ao ERP". */
export default function AiBanner() {
  return (
    <section
      aria-labelledby="ai-banner-title"
      className="relative isolate overflow-hidden bg-lime text-black"
    >
      {/* textura de pontos no canto inferior esquerdo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-40 w-72 opacity-25"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1.2px)",
          backgroundSize: "14px 14px",
          maskImage: "linear-gradient(to top right, #000, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to top right, #000, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        {/* conteúdo */}
        <div className="relative z-10 px-6 py-16 sm:py-20 xl:w-[44%] xl:max-w-[620px] xl:py-20 xl:pr-0 xl:pl-6">
          <span className="inline-flex items-center gap-3 rounded-full bg-black px-5 py-2.5 text-sm font-bold tracking-wide text-lime uppercase">
            Novidade Minerion
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 3l1.6 4.9L16.5 9.5l-4.9 1.6L10 16l-1.6-4.9L3.5 9.5l4.9-1.6L10 3z" />
              <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14z" />
            </svg>
          </span>

          <h2
            id="ai-banner-title"
            className="mt-7 font-sans text-[2rem] leading-[1.12] tracking-[-0.02em] sm:text-[2.6rem] xl:text-[2.5rem]"
          >
            <span className="block font-bold">O ERP da mineração evoluiu.</span>
            <span className="block font-normal">
              Agora com{" "}
              <span className="rounded-md bg-black/10 px-1.5 font-bold">IA integrada.</span>
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/85">
            Consulte informações da sua operação em linguagem natural,
            diretamente no ERP Minerion. Mais agilidade para acessar dados e
            apoiar suas decisões.
          </p>

          <ul className="mt-9 grid max-w-xl grid-cols-3">
            {BENEFITS.map((b, i) => (
              <li
                key={b.label.join(" ")}
                className={
                  "flex flex-col gap-3 px-3 first:pl-0 sm:px-6 " +
                  (i > 0 ? "border-l border-black/15" : "")
                }
              >
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-black text-lime">
                  {b.icon}
                </span>
                <span className="text-base leading-tight font-bold sm:text-xl">
                  {b.label[0]}
                  <br />
                  {b.label[1]}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#agendar-demonstracao"
            className="group mt-10 inline-flex items-center gap-4 rounded-2xl bg-black px-7 py-5 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 sm:px-10 sm:text-lg"
          >
            Conheça a IA integrada ao Minerion
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-lime transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
        </div>

      </div>

      {/* imagem: no celular abaixo do texto; no desktop presa à direita, larga, com corte diagonal */}
      <div className="relative h-72 [clip-path:polygon(0_14%,100%_0,100%_100%,0_100%)] sm:h-[28rem] lg:h-[34rem] xl:absolute xl:inset-y-0 xl:right-0 xl:h-auto xl:w-[60%] xl:[clip-path:polygon(22%_0,100%_0,100%_100%,5%_100%)]">
        <Image
          src="/minerion-ia-chat.png"
          alt="Chat com IA dentro do ERP Minerion criando uma ordem de serviço a partir de uma conversa em linguagem natural"
          fill
          sizes="(min-width: 1280px) 60vw, 100vw"
          className="object-cover object-[35%_center] xl:object-[30%_center]"
        />
      </div>
    </section>
  );
}
