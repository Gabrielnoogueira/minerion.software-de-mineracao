const stats = [
  { value: "+400", label: "operações atendidas" },
  { value: "30 anos", label: "de atuação no setor mineral" },
  { value: "65%", label: "da produção nacional de calcário agrícola gerenciada pelo Minerion" },
];

export default function BigNumbers() {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="mx-auto max-w-3xl text-center text-lg text-white/75">
          Sistemas genéricos não foram feitos para mineração. O Minerion é o
          sistema de gestão mais completo do setor — dados que os números
          confirmam.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-4xl font-bold text-lime sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
