import { Dumbbell, Activity, Apple } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    title: "Basic Fitness",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Activity,
    isActive: false,
  },
  {
    title: "Body Building",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Dumbbell,
    isActive: true, // Highlights this card in Neon Green
  },
  {
    title: "Nutrition",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Apple,
    isActive: false,
  },
];

export default function Facilities() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tight max-w-xl">
            We Provide The <span className="text-neon-green">Best</span> Facilities & Training Solution
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque.
          </p>
        </div>

        {/* Section Subtitle */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="w-2 h-2 bg-neon-green rotate-45 mb-4"></div>
          <h3 className="text-white font-black uppercase tracking-widest text-lg italic">
            Programs You'll Get
          </h3>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className={`p-10 flex flex-col items-start transition-all duration-300 ${
                  program.isActive
                    ? "bg-neon-green text-[#111111]"
                    : "bg-[#1a1a1a] text-white"
                }`}
              >
                <div className="mb-6">
                  <Icon className={`h-10 w-10 ${program.isActive ? "text-[#111111]" : "text-neon-green"}`} />
                </div>
                
                <h4 className="text-2xl font-black uppercase italic mb-4">
                  {program.title}
                </h4>
                
                <p className={`mb-8 text-sm leading-relaxed flex-grow ${program.isActive ? "text-zinc-800" : "text-gray-400"}`}>
                  {program.description}
                </p>
                
                <Link
                  href="/services"
                  className={`font-black uppercase tracking-wider text-xs flex items-center gap-2 ${
                    program.isActive ? "text-[#111111] hover:text-zinc-600" : "text-white hover:text-neon-green"
                  }`}
                >
                  See Details <span className="text-lg">→</span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            href="/services"
            className="bg-neon-green text-[#111111] px-8 py-4 font-black uppercase tracking-wider text-sm hover:bg-[#b3e600] transition-colors skew-x-[-12deg] inline-block"
          >
            <div className="skew-x-[12deg]">See All Program</div>
          </Link>
        </div>

      </div>
    </section>
  );
}