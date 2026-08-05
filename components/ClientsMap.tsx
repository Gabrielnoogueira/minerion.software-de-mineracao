"use client";

import { motion } from "motion/react";
import { BrazilMap, type MapPoint } from "@/components/ui/brazil-map";

const hub: MapPoint = { lat: -19.9167, lng: -43.9345, label: "Belo Horizonte (sede)" };

const points: MapPoint[] = [
  { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
  { lat: -30.0346, lng: -51.2177, label: "Rio Grande do Sul" },
  { lat: -16.6869, lng: -49.2648, label: "Goiás" },
  { lat: -15.6014, lng: -56.0979, label: "Mato Grosso" },
  { lat: -12.9777, lng: -38.5016, label: "Bahia" },
  { lat: -1.4558, lng: -48.4902, label: "Pará" },
];

const highlightWords = "de norte a sul do Brasil.".split(" ");

export default function ClientsMap() {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-20">
        <p className="font-mono text-sm font-semibold tracking-widest text-lime">
          COBERTURA
        </p>
        <h2 className="mt-4 font-mono text-2xl font-bold text-white sm:text-3xl">
          Mais de 400 operações,{" "}
          <span className="text-lime">
            {highlightWords.map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    className="inline-block"
                    initial={{ y: -6, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: (wordIdx * 10 + charIdx) * 0.02,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordIdx < highlightWords.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Presente nas principais regiões mineradoras do país, do
          centro-oeste ao sul.
        </p>

        <div className="mx-auto mt-12 max-w-2xl">
          <BrazilMap hub={hub} points={points} />
        </div>
      </div>
    </section>
  );
}
