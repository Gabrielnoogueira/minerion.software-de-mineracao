export default function WhyChoose() {
  return (
    <section className="bg-grey">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        <h2 className="font-mono text-2xl font-bold text-white sm:text-3xl">
          Por que escolher o Minerion
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:text-left">
          <div className="rounded-xl border border-white/10 bg-black/30 p-6">
            <p className="font-mono text-sm font-semibold text-lime">
              O esforço de uma migração
            </p>
            <p className="mt-2 text-sm text-white/70">Dura meses.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-6">
            <p className="font-mono text-sm font-semibold text-lime">
              O prejuízo de uma gestão limitada
            </p>
            <p className="mt-2 text-sm text-white/70">Dura décadas.</p>
          </div>
        </div>

        <a
          href="#agendar-demonstracao"
          className="mt-10 inline-block rounded-lg bg-lime px-8 py-3 font-mono text-sm font-semibold text-black transition hover:bg-lime/90"
        >
          Agendar demonstração
        </a>
      </div>
    </section>
  );
}
