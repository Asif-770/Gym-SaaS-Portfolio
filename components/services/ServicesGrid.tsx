import { Dumbbell, Activity, Flower2, Scale, HeartPulse, Droplets } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Body Building",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Dumbbell,
    isActive: true,
  },
  {
    title: "Strength Training",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Activity,
    isActive: false,
  },
  {
    title: "Basic Yoga",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Flower2,
    isActive: false,
  },
  {
    title: "Weight Loss",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Scale,
    isActive: false,
  },
  {
    title: "Cardio Exercise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: HeartPulse,
    isActive: false,
  },
  {
    title: "Boxing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Droplets,
    isActive: false,
  },
];

export default function ServicesGrid() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="w-2 h-2 bg-neon-green rotate-45 mb-4"></div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">All Services</p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic">
            WHAT WE CAN DO FOR YOU
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className={`p-10 border border-zinc-800/50 transition-all duration-300 flex flex-col ${
                  service.isActive 
                    ? "bg-neon-green text-[#111111] shadow-2xl scale-[1.02] z-10 border-none" 
                    : "bg-[#1a1a1a] text-white hover:bg-zinc-900"
                }`}
              >
                <div className="mb-6">
                  <Icon className={`h-10 w-10 ${service.isActive ? "text-[#111111]" : "text-neon-green"}`} />
                </div>
                <h3 className="text-2xl font-black italic uppercase mb-4">{service.title}</h3>
                <p className={`text-sm leading-relaxed mb-8 flex-grow ${service.isActive ? "text-zinc-800" : "text-gray-400"}`}>
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className={`font-black uppercase tracking-wider text-xs flex items-center gap-2 ${
                    service.isActive ? "text-[#111111] hover:text-zinc-600" : "text-white hover:text-neon-green"
                  }`}
                >
                  See Details <span className="text-lg">→</span>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}