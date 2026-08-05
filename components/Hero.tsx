import DemoForm from "./DemoForm";

export default function Hero() {
  return (
    <section
      id="agendar-demonstracao"
      className="relative overflow-hidden bg-grey"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(220,255,10,0.12), transparent 45%), radial-gradient(circle at 85% 0%, rgba(28,111,101,0.25), transparent 40%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "auto, auto, 48px 48px, 48px 48px",
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-sm font-semibold tracking-widest text-lime">
            MINERION ERP
          </p>
          <h1 className="mt-4 font-mono text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Software completo para mineração.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            A operação cresce, mas o controle de gestão nem sempre acompanha
            o mesmo ritmo. O Minerion integra lavra, produção, suprimentos,
            manutenção e administrativo num único sistema — construído para
            quem entende de mineração.
          </p>
        </div>

        <DemoForm />
      </div>
    </section>
  );
}
