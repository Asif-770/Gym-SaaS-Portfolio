import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const trainers = [
  {
    name: "Ayesha Fatimah",
    role: "Yoga Instructor",
    image: "/images/trainer-1.jpg", // Add a portrait image here
  },
  {
    name: "Ahmad Evo",
    role: "Crossfit Trainer",
    image: "/images/trainer-2.jpg", // Add a portrait image here
  },
  {
    name: "John Doe",
    role: "Fitness Coach",
    image: "/images/trainer-3.jpg", // Add a portrait image here
  },
];

export default function Trainers() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tight uppercase">
            Look At Our <br />
            <span className="text-neon-green">Trainer</span>
          </h2>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative h-[450px] w-full bg-[#1a1a1a] mb-6 overflow-hidden">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                {/* Top Right Green Icon */}
                <div className="absolute top-4 right-4 bg-neon-green p-2 z-10">
                  <ArrowUpRight className="h-6 w-6 text-[#111111]" />
                </div>
              </div>
              
              {/* Text Content */}
              <div className="bg-[#1a1a1a] p-6 border-l-4 border-transparent group-hover:border-neon-green transition-all duration-300">
                <h3 className="text-2xl font-black text-white italic uppercase mb-1">
                  {trainer.name}
                </h3>
                <p className="text-gray-400 text-sm tracking-wider uppercase">
                  {trainer.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}