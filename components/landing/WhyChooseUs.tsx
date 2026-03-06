import Image from "next/image";
import { ShieldCheck, Dumbbell, Users, Award } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tight mb-6 uppercase">
            Why <span className="text-neon-green">Choose Us?</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Ut elit dolor, dictum non libero vitae.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column */}
          <div className="flex flex-col gap-10">
            {/* Top Image */}
            <div className="relative h-[400px] w-full bg-[#1a1a1a]">
              <Image
                src="/images/trainer-1.jpg" // Add an image of trainers shaking hands
                alt="Supportive Environment"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            {/* Features */}
            <div className="flex flex-col gap-8 pl-4 border-l border-zinc-800">
              <div>
                <Dumbbell className="text-neon-green h-8 w-8 mb-4" />
                <h3 className="text-xl font-black text-white italic uppercase mb-2">Exclusive Facilities</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque.</p>
              </div>
              <div>
                <Users className="text-neon-green h-8 w-8 mb-4" />
                <h3 className="text-xl font-black text-white italic uppercase mb-2">Personal Training Session</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque.</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-10 lg:pt-20">
            {/* Features */}
            <div className="flex flex-col gap-8 pl-4 border-l border-zinc-800">
              <div>
                <ShieldCheck className="text-neon-green h-8 w-8 mb-4" />
                <h3 className="text-xl font-black text-white italic uppercase mb-2">Supportive Trainers</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque.</p>
              </div>
              <div>
                <Award className="text-neon-green h-8 w-8 mb-4" />
                <h3 className="text-xl font-black text-white italic uppercase mb-2">10+ Years Experience</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque.</p>
              </div>
            </div>

            {/* Bottom Image */}
            <div className="relative h-[400px] w-full bg-[#1a1a1a]">
              <Image
                src="/images/trainer-2.jpg" // Add an image of gym equipment (assault bike)
                alt="Premium Equipment"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}