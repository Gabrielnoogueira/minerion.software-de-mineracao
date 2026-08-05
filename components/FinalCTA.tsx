import Image from "next/image";

export default function FinalCTA() {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
        <h2 className="font-mono text-2xl font-bold text-white sm:text-3xl">
          Quero mais controle para a minha operação
        </h2>
        <a
          href="#agendar-demonstracao"
          className="mt-8 inline-block rounded-lg bg-lime px-8 py-3 font-mono text-sm font-semibold text-black transition hover:bg-lime/90"
        >
          Agendar demonstração
        </a>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
          <Image
            src="/minerion-logo-footer.png"
            alt="Minerion"
            width={140}
            height={34}
          />

          <div className="grid gap-8 text-center text-sm text-white/60 sm:grid-cols-2 sm:text-left">
            <div>
              <p className="font-mono font-semibold text-white">Arcos/MG</p>
              <p className="mt-1">Arcos, Minas Gerais</p>
            </div>
            <div>
              <p className="font-mono font-semibold text-white">
                Belo Horizonte/MG
              </p>
              <p className="mt-1">Av. Raja Gabaglia, Belo Horizonte, MG</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
