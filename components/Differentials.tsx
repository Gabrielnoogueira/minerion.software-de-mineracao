const differentials = [
  {
    title: "Especialização exclusiva em mineração",
    description:
      "Um sistema construído para o setor mineral, não adaptado de um ERP genérico.",
  },
  {
    title: "Facilidade de uso",
    description: "Treinamento in company para que o time adote o sistema com rapidez.",
  },
  {
    title: "Implantação completa",
    description: "Cobertura de 100% da operação, da lavra ao administrativo.",
  },
  {
    title: "Suporte especializado",
    description:
      "Equipe que entende as rotinas fiscais e de campo específicas da mineração.",
  },
  {
    title: "Escala junto com você",
    description:
      "Acompanha o crescimento da operação sem exigir ferramentas adicionais.",
  },
];

export default function Differentials() {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="font-mono text-2xl font-bold text-white sm:text-3xl">
          Um ERP que seu time vai querer usar
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item) => (
            <div key={item.title} className="border-l-2 border-lime pl-5">
              <h3 className="font-mono text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
