import Image from "next/image";
import { CheckSquare } from "lucide-react";

export default function OurValues() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tight uppercase mb-6">
            OUR <span className="text-neon-green">VALUES</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            We provide the best program for you, for your health and beauty if you maintain and train. We provide the best gym & fitness facilities for you.
          </p>
        </div>

        {/* Vision & Mission Layout */}
        <div className="relative grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2">
            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-3 h-3 bg-neon-green rotate-45"></div>
            <div className="absolute top-[75%] left-1/2 -translate-x-1/2 w-3 h-3 bg-neon-green rotate-45"></div>
          </div>

          {/* Left Column (Vision) */}
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="text-3xl font-black text-white italic uppercase mb-4">Our Vision</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white text-sm font-bold"><CheckSquare className="text-neon-green h-5 w-5" /> Best Fitness Training & Expert</li>
                <li className="flex items-center gap-3 text-white text-sm font-bold"><CheckSquare className="text-neon-green h-5 w-5" /> Modern Facility</li>
                <li className="flex items-center gap-3 text-white text-sm font-bold"><CheckSquare className="text-neon-green h-5 w-5" /> Support 24/7</li>
              </ul>
            </div>
            <div className="relative h-[300px] w-full lg:w-[90%] bg-[#1a1a1a]">
               <Image src="/images/why-choose-us.jpg" alt="Gym Vision" fill className="object-cover" />
               <div className="absolute -bottom-6 -right-6 bg-neon-green p-4"><div className="w-8 h-8 border-2 border-[#111111]"></div></div>
            </div>
          </div>

          {/* Right Column (Mission) */}
          <div className="flex flex-col gap-12 lg:pt-32">
            <div className="relative h-[300px] w-full lg:w-[90%] lg:ml-auto bg-[#1a1a1a]">
               <Image src="/images/trainer-1.jpg" alt="Gym Mission" fill className="object-cover" />
               <div className="absolute -top-6 -right-6 bg-[#1a1a1a] p-4 border border-zinc-800"><CheckSquare className="text-white h-8 w-8" /></div>
            </div>
            <div className="lg:pl-10">
              <h3 className="text-3xl font-black text-white italic uppercase mb-4">Our Mission</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white text-sm font-bold"><CheckSquare className="text-neon-green h-5 w-5" /> Best Fitness Training & Expert</li>
                <li className="flex items-center gap-3 text-white text-sm font-bold"><CheckSquare className="text-neon-green h-5 w-5" /> Modern Facility</li>
                <li className="flex items-center gap-3 text-white text-sm font-bold"><CheckSquare className="text-neon-green h-5 w-5" /> Support 24/7</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}