import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

export default function FeaturedPost() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="w-2 h-2 bg-neon-green rotate-45 mb-4"></div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Latest News</p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic">
            FEATURED <span className="text-neon-green">ARTICLE</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center bg-[#1a1a1a] p-6 border border-zinc-800/50 hover:border-neon-green transition-colors duration-500 group">
          {/* Image */}
          <div className="relative h-[400px] w-full overflow-hidden">
            <Image
              src="/images/nut-1.jpg" // Add an image of someone doing deadlifts or running
              alt="Featured Blog Post"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-neon-green text-[#111111] px-4 py-2 font-black italic uppercase text-xs">
              Fitness Tips
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 lg:pr-10">
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-neon-green" />
                <span>Oct 24, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-neon-green" />
                <span>By Admin</span>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-white italic leading-tight group-hover:text-neon-green transition-colors">
              10 ESSENTIAL TIPS TO MAXIMIZE YOUR MUSCLE GROWTH
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Ut elit dolor, dictum non libero vitae, vulputate faucibus arcu. Maecenas at faucibus lectus, a rhoncus nulla.
            </p>

            <Link
              href="/blog/1"
              className="bg-neon-green text-[#111111] px-8 py-4 font-black uppercase tracking-wider text-xs hover:bg-[#b3e600] transition-colors skew-x-[-12deg] inline-block self-start"
            >
              <div className="skew-x-[12deg]">Read Article</div>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}