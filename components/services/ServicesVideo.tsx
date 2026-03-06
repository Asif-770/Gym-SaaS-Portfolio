import { Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ServicesVideo() {
  return (
    <section className="relative w-full py-32 px-6 lg:px-12 bg-[#111111] overflow-hidden border-b border-zinc-800">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/services-video-bg.jpg" // Add an image of a guy with battle ropes
          alt="Video Thumbnail"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col lg:flex-row justify-between items-center gap-16">
        
        {/* Text and Button */}
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tight leading-tight mb-6">
            We Provide The Best Services <br /> Program For Your Fit And <br /> Your Health
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque.
          </p>
          <Link
            href="/contact"
            className="bg-neon-green text-[#111111] px-10 py-4 font-black uppercase tracking-wider text-sm hover:bg-[#b3e600] transition-colors skew-x-[-12deg] inline-block"
          >
            <div className="skew-x-[12deg]">Contact Us</div>
          </Link>
        </div>

        {/* Video Play Button Area */}
        <div className="flex flex-col items-center gap-4 cursor-pointer group">
          <div className="h-24 w-24 rounded-full bg-neon-green flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(208,253,62,0.3)]">
            <Play className="h-8 w-8 text-[#111111] ml-2 fill-current" />
          </div>
          <span className="font-bold text-white uppercase tracking-wider text-sm">Watch Our<br/>Services Video</span>
        </div>

      </div>
    </section>
  );
}