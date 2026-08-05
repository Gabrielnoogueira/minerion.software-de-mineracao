"use client";

import { Carousel, Slider, SliderContainer } from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

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

        <Carousel
          options={{ loop: true, dragFree: true }}
          plugins={[
            AutoScroll({
              speed: 1,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              startDelay: 100,
            }),
          ]}
          className="mt-10"
        >
          <SliderContainer className="gap-6">
            {pains.map((pain) => (
              <Slider key={pain.title} className="w-[280px] sm:w-[340px]">
                <div className="h-full rounded-xl border border-white/10 bg-black/30 p-6">
                  <h3 className="font-mono text-lg font-semibold text-lime">
                    {pain.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    {pain.description}
                  </p>
                </div>
              </Slider>
            ))}
          </SliderContainer>
        </Carousel>
      </div>
    </section>
  );
}
