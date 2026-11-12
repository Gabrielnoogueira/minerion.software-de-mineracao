import Image from "next/image";
import type { ReactNode } from "react";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
  "aria-hidden": true,
};

const BENEFITS: { label: string; icon: ReactNode }[] = [
  {
    label: "Linguagem natural",
    icon: (
      <svg {...iconProps}>
        <path d="M4 5h16v11H9l-5 4V5z" />
        <path d="M8 9.5h8M8 12.5h5" />
      </svg>
    ),
  },
  {
    label: "Dados integrados",
    icon: (
      <svg {...iconProps}>
        <ellipse cx="12" cy="6" rx="7" ry="2.8" />
        <path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6" />
        <path d="M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" />
      </svg>
    ),
  },
  {
    label: "Mais agilidade",
    icon: (
      <svg {...iconProps}>
        <path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />
      </svg>
    ),
  },
];

/** Destaque da novidade "IA integrada ao ERP", ao lado do formulário de demonstração. */
export default function AiHighlight() {
  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black">
        <span className="h-1.5 w-1.5 rounded-full bg-black" />
        Novidade Minerion
      </span>

      <h2 className="mt-4 font-mono text-2xl font-bold leading-tight tracking-[-0.01em] text-white sm:text-3xl">
        O ERP da mineração evoluiu.{" "}
        <span className="block text-lime">Agora com IA integrada.</span>
      </h2>

      <p className="mt-4 max-w-xl text-muted">
        Consulte informações da sua operação em linguagem natural, diretamente
        no ERP Minerion. Mais agilidade para acessar dados e apoiar suas
        decisões.
      </p>

      <ul className="mt-6 grid grid-cols-3 gap-3">
        {BENEFITS.map((b) => (
          <li
            key={b.label}
            className="flex flex-col items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:flex-row sm:items-center"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-lime/10 text-lime">
              {b.icon}
            </span>
            <span className="font-mono text-xs font-semibold leading-snug text-white sm:text-[13px]">
              {b.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="relative mt-7">
        <div
          aria-hidden="true"
          className="absolute -inset-4 -z-10 rounded-[28px] bg-lime/10 blur-2xl"
        />
        <Image
          src="/minerion-ia-chat.png"
          alt="Chat com IA dentro do ERP Minerion criando uma ordem de serviço a partir de uma conversa em linguagem natural"
          width={1672}
          height={941}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="h-auto w-full rounded-2xl border border-lime/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        />
      </div>
    </div>
  );
}
