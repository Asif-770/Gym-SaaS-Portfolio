import { Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[#111111] overflow-hidden flex flex-col justify-center border-b border-zinc-800 pt-20">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Image 
          src="/images/hero-bg.jpg" 
          alt="Gym background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#111111]/40" />
      </div>

      {/* Massive Faded Background Text */}
      <div className="absolute top-[10%] left-0 w-full z-0 overflow-hidden opacity-[0.05] pointer-events-none flex justify-center">
        <h1 className="text-[14vw] font-black text-white tracking-tighter italic uppercase whitespace-nowrap drop-shadow-2xl">
          MY FITNESS
        </h1>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 w-full grid lg:grid-cols-2 gap-8 items-center h-full">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center mt-10 lg:mt-0">
          <h2 className="text-5xl md:text-6xl lg:text-[76px] font-black text-white leading-[1.1] mb-6 tracking-tight italic">
            We Are The Best Fitness <br />
            Studio In Town
          </h2>

          <p className="text-gray-400 text-sm md:text-base mb-10 max-w-lg leading-relaxed font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/join"
              className="bg-neon-green text-[#111111] px-8 py-4 font-black uppercase tracking-wider text-sm hover:bg-[#b3e600] transition-colors skew-x-[-12deg] inline-block"
            >
              <div className="skew-x-[12deg]">Join Us Now</div>
            </Link>

            <button className="flex items-center gap-4 text-white hover:text-neon-green transition-colors group">
              <div className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-neon-green transition-colors">
                <Play className="h-4 w-4 ml-1 fill-current" />
              </div>
              <span className="font-bold uppercase tracking-wider text-xs">Watch Video</span>
            </button>
          </div>
        </div>

        {/* Right Content - Athlete Image */}
        <div className="relative h-[500px] lg:h-[800px] w-full hidden lg:block">
          <Image
            src="/images/athlete-hero.png" 
            alt="Athlete working out"
            fill
            className="object-contain object-right-top drop-shadow-2xl z-10"
            priority
          />
        </div>
      </div>

      {/* Bottom Neon Banner */}
      <div className="absolute bottom-0 w-full bg-neon-green py-3 hidden lg:block z-20">
        <div className="max-w-[1440px] mx-auto px-12 flex justify-between items-center text-[#111111] font-black uppercase text-xs tracking-wider">
          <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-[#111111] rotate-45"></span> Free Wifi & Parking</div>
          <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-[#111111] rotate-45"></span> 24/7 Premier Service</div>
          <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-[#111111] rotate-45"></span> With VIP Program</div>
          <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-[#111111] rotate-45"></span> Top Premium Equipments</div>
        </div>
      </div>
    </section>
  );
}