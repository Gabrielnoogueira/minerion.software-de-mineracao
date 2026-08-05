import { modules } from "@/data/modules";

export default function Modules() {
  return (
    <section className="bg-grey">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="font-mono text-2xl font-bold text-white sm:text-3xl">
          Módulos do sistema
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Do chão da jazida à tela do gestor: um sistema, todos os processos.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <div
              key={module.name}
              className="rounded-xl border border-white/10 bg-black/30 p-6"
            >
              <h3 className="font-mono text-base font-semibold text-lime">
                {module.name}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {module.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#agendar-demonstracao"
            className="inline-block rounded-lg bg-lime px-8 py-3 font-mono text-sm font-semibold text-black transition hover:bg-lime/90"
          >
            Quero conhecer
          </a>
        </div>
      </div>
    </section>
  );
}
