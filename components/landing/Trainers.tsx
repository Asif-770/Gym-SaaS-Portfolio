"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const trainers = [
  { name: "Ayesha Fatimah", role: "Yoga Instructor", image: "/images/trainer-1.jpg" },
  { name: "Ahmad Evo", role: "Crossfit Trainer", image: "/images/trainer-2.jpg" },
  { name: "John Doe", role: "Fitness Coach", image: "/images/trainer-3.jpg" },
];

export default function Trainers() {
  return (
    <section className="relative bg-[#0a0a0a] py-32 px-6 lg:px-12 border-b border-zinc-800 overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <div className="w-8 h-1 bg-neon-green rounded-full shadow-[0_0_10px_rgba(179,230,0,0.5)] mb-6"></div>
          <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tight uppercase leading-tight">
            Meet Our <br />
            <span className="text-neon-green drop-shadow-[0_0_20px_rgba(179,230,0,0.3)]">Elite Trainers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {trainers.map((trainer, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.7, ease: "easeOut" }}
              whileHover={{ y: -15 }}
              className="group cursor-pointer relative"
            >
              {/* Image Container with 3D Float Effect */}
              <div className="relative h-[550px] w-full bg-[#111111] overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                
                {/* Top Right Hover Arrow */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-3 rounded-full z-10 group-hover:bg-neon-green transition-colors duration-300 border border-white/20 group-hover:border-neon-green shadow-[0_0_20px_rgba(179,230,0,0)] group-hover:shadow-[0_0_20px_rgba(179,230,0,0.5)]"
                >
                  <ArrowUpRight className="h-6 w-6 text-white group-hover:text-[#111111] transition-colors" />
                </motion.div>

                {/* Floating Glassmorphism Nameplate */}
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-lg relative overflow-hidden">
                    {/* Shimmer sweep on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_forwards] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[12deg]"></div>
                    
                    <h3 className="text-3xl font-black text-white italic uppercase mb-1 drop-shadow-lg">
                      {trainer.name}
                    </h3>
                    <p className="text-neon-green font-bold text-xs tracking-[0.2em] uppercase drop-shadow-[0_0_5px_rgba(179,230,0,0.5)]">
                      {trainer.role}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}