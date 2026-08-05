const pains = [
  {
    title: "Dados espalhados",
    description:
      "Planilhas e sistemas que não conversam entre si, sem uma fonte única de verdade para a gestão.",
  },
  {
    title: "Visibilidade limitada",
    description:
      "Falta de dados em tempo real sobre produção, estoque e custos para decidir com segurança.",
  },
  {
    title: "Retrabalho no campo",
    description:
      "Processos manuais que geram erros e atrasos na operação, da lavra à expedição.",
  },
  {
    title: "Sistemas genéricos",
    description:
      "Ferramentas que não entendem as particularidades da lavra, do beneficiamento e da logística de mineração.",
  },
];

export default function PainPoints() {
  return (
    <section className="bg-grey">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="font-mono text-2xl font-bold text-white sm:text-3xl">
          Dores que resolvemos
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Problemas comuns em mineradoras que ainda gerem a operação sem um
          sistema especializado.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {pains.map((pain) => (
            <div
              key={pain.title}
              className="rounded-xl border border-white/10 bg-black/30 p-6"
            >
              <h3 className="font-mono text-lg font-semibold text-lime">
                {pain.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">{pain.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
