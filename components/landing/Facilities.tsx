"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Dumbbell, Activity, Apple, ArrowRight } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    title: "Basic Fitness",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elevate your daily routine with core workouts.",
    icon: Activity,
    isActive: false,
  },
  {
    title: "Body Building",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Push past your limits with heavy lifting.",
    icon: Dumbbell,
    isActive: true, 
  },
  {
    title: "Nutrition",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fuel your body with expert meal planning.",
    icon: Apple,
    isActive: false,
  },
];

// --- ADVANCED SPOTLIGHT CARD COMPONENT ---
function SpotlightCard({ program, index }: { program: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const Icon = program.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group overflow-hidden p-10 flex flex-col items-start transition-transform duration-500 hover:-translate-y-2 border ${
        program.isActive 
          ? "bg-[#111111] border-neon-green/50 shadow-[0_0_30px_rgba(179,230,0,0.15)]" 
          : "bg-white/5 backdrop-blur-md border-white/10"
      }`}
    >
      {/* Dynamic Mouse Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(179, 230, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 w-full">
        {/* Floating Icon */}
        <motion.div 
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 relative inline-block"
        >
          <div className={`absolute inset-0 blur-xl opacity-50 ${program.isActive ? "bg-neon-green" : "bg-white/20"}`}></div>
          <Icon className={`relative z-10 h-12 w-12 ${program.isActive ? "text-neon-green" : "text-white group-hover:text-neon-green"} transition-colors duration-300`} />
        </motion.div>
        
        <h4 className="text-2xl font-black uppercase italic mb-4 text-white group-hover:text-neon-green transition-colors duration-300">
          {program.title}
        </h4>
        
        <p className="mb-10 text-sm leading-relaxed flex-grow text-gray-400">
          {program.description}
        </p>
        
        {/* Animated Arrow Link */}
        <Link
          href="/services"
          className="group/link font-black uppercase tracking-wider text-xs flex items-center gap-2 text-white hover:text-neon-green transition-colors"
        >
          See Details 
          <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Facilities() {
  return (
    <section className="relative bg-[#0a0a0a] py-32 px-6 lg:px-12 border-b border-zinc-800 overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Top Header Row with Scroll Reveal */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-1 bg-neon-green rounded-full shadow-[0_0_10px_rgba(179,230,0,0.5)]"></div>
              <p className="text-neon-green font-bold uppercase tracking-[0.2em] text-sm">Programs You'll Get</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tight leading-[1.1]">
              We Provide The <span className="text-neon-green drop-shadow-[0_0_15px_rgba(179,230,0,0.3)]">Best</span><br/> Facilities & Training
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed font-medium"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Elevate your fitness journey with our world-class ecosystem.
          </motion.p>
        </div>

        {/* Program Spotlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {programs.map((program, index) => (
            <SpotlightCard key={index} program={program} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <Link
            href="/services"
            className="relative overflow-hidden group bg-neon-green text-[#0a0a0a] px-10 py-5 font-black uppercase tracking-wider text-sm skew-x-[-12deg] inline-block shadow-[0_0_20px_rgba(179,230,0,0.2)] hover:scale-105 transition-transform"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_forwards] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[12deg]"></div>
            <div className="skew-x-[12deg]">See All Programs</div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}