import Image from "next/image";
import DemoForm from "./DemoForm";

export default function Hero() {
  return (
    <section id="agendar-demonstracao" className="relative overflow-hidden bg-grey">
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 35%, rgba(20,20,20,0.55) 65%, rgba(20,20,20,0.75) 100%), radial-gradient(circle at 85% 0%, rgba(28,111,101,0.35), transparent 45%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
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
