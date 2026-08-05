import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BigNumbers from "@/components/BigNumbers";
import PainPoints from "@/components/PainPoints";
import Testimonials from "@/components/Testimonials";
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
        <BigNumbers />
        <PainPoints />
        <Testimonials />
        <Modules />
        <Differentials />
        <WhyChoose />
      </main>
      <FinalCTA />
    </>
  );
}
