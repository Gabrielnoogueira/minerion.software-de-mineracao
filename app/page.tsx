import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AiBanner from "@/components/AiBanner";
import BigNumbers from "@/components/BigNumbers";
import PainPoints from "@/components/PainPoints";
import Testimonials from "@/components/Testimonials";
import ClientsMap from "@/components/ClientsMap";
import Modules from "@/components/Modules";
import Differentials from "@/components/Differentials";
import WhyChoose from "@/components/WhyChoose";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AiBanner />
        <BigNumbers />
        <PainPoints />
        <Testimonials />
        <ClientsMap />
        <Modules />
        <Differentials />
        <WhyChoose />
      </main>
      <FinalCTA />
    </>
  );
}
