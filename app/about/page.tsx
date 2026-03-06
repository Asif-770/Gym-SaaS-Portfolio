import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import OurValues from "@/components/about/OurValues";
import Trainers from "@/components/landing/Trainers";
import AboutContact from "@/components/about/AboutContact";

export default function AboutPage() {
  return (
    <div className="w-full">
      <AboutHero />
      <AboutStats />
      <OurValues />
      {/* Reusing the Trainers component from the homepage! */}
      <Trainers />
      <AboutContact />
    </div>
  );
}