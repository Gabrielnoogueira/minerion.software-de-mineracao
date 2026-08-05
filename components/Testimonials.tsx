"use client";

import { useRef } from "react";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 320) + 24;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section className="bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-mono text-2xl font-bold text-white sm:text-3xl">
            O que falam sobre o Minerion?
          </h2>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Depoimento anterior"
              className="rounded-full border border-white/20 p-2 text-white/70 transition hover:border-lime hover:text-lime"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Próximo depoimento"
              className="rounded-full border border-white/20 p-2 text-white/70 transition hover:border-lime hover:text-lime"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              data-card
              className="w-[85%] shrink-0 snap-start rounded-2xl border border-white/10 bg-grey/60 p-6 sm:w-[360px]"
            >
              <p className="text-sm leading-relaxed text-white/80">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-lime/40 object-cover"
                />
                <div>
                  <p className="font-mono text-sm font-semibold text-lime">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-white/60">
                    {testimonial.role} — {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
