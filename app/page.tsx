import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Facilities from "@/components/landing/Facilities";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Stats from "@/components/landing/Stats";
import Trainers from "@/components/landing/Trainers";
import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111] text-white font-sans overflow-x-hidden">
      
      <Hero />
      <Facilities />
      <WhyChooseUs />
      <Stats />
      <Trainers />
      <Testimonials />
      
    </main>
  );
}