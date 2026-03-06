import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[500px] flex flex-col justify-center items-center overflow-hidden border-b border-zinc-800">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/ideo-thumb.jpg" // Add an image of a gym group sitting on boxes
          alt="About Us"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-[#111111]/40" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        {/* Outline Text Effect */}
        <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black italic tracking-tighter uppercase mb-6 text-transparent" style={{ WebkitTextStroke: '2px white' }}>
          ABOUT US
        </h1>
        
        <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Ut elit dolor, dictum non libero.
        </p>

        {/* Breadcrumbs */}
        <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-neon-green transition-colors">Home</Link>
          <span className="text-neon-green">•</span>
          <span className="text-neon-green">About Us</span>
        </div>
      </div>
    </section>
  );
}