"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Users, Award, MapPin } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

// Helper for counting numbers
function AnimatedCounter({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Stats() {
  const stats = [
    { icon: Users, label: "Student Taught", val: 4390, suffix: "+" },
    { icon: Award, label: "Expert Trainers", val: 150, suffix: "+" },
    { icon: MapPin, label: "Total Branches", val: 50, suffix: "+" },
  ];

  const skills = [
    { name: "Body Building", percent: 95 },
    { name: "Yoga", percent: 85 },
    { name: "Health Fitness", percent: 90 },
  ];

  return (
    <section className="relative bg-[#0a0a0a] py-32 px-6 lg:px-12 border-b border-zinc-800 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-neon-green/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center mb-16"
        >
          <div className="w-2 h-2 bg-neon-green rotate-45 mb-4 shadow-[0_0_10px_rgba(179,230,0,0.8)]"></div>
          <h2 className="text-white font-black uppercase tracking-widest text-lg italic mb-2">
            What We Have Achieved
          </h2>
        </motion.div>

        {/* --- STAGGERED STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 flex items-center gap-6 hover:border-neon-green/50 transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
            >
              <stat.icon className="text-neon-green h-12 w-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(179,230,0,0.3)]" />
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">{stat.label}</p>
                <h3 className="text-4xl font-black text-white italic">
                  <AnimatedCounter to={stat.val} />{stat.suffix}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- PARALLAX IMAGE --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full rounded-2xl overflow-hidden"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full relative"
            >
              <Image src="/images/trainer-1.jpg" alt="Group Training" fill className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute bottom-8 left-8 bg-neon-green/90 backdrop-blur-md text-[#111111] p-6 max-w-[250px] shadow-[0_0_30px_rgba(179,230,0,0.3)] border border-neon-green skew-x-[-12deg]"
            >
              <p className="font-black italic uppercase leading-tight text-lg skew-x-[12deg]">We Are Giving You The Best Training</p>
            </motion.div>
          </motion.div>

          {/* --- ANIMATED PROGRESS BARS --- */}
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl md:text-5xl font-black text-white italic mb-6 leading-tight">
              We Are Giving You The <br/><span className="text-neon-green drop-shadow-[0_0_15px_rgba(179,230,0,0.2)]">Best Training Ever</span>
            </h3>
            <p className="text-gray-400 text-sm mb-12 leading-relaxed max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Ut elit dolor, dictum non libero.
            </p>

            <div className="space-y-8">
              {skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-white font-bold uppercase text-xs tracking-wider italic mb-3">
                    <span>{skill.name}</span>
                    <span>{skill.percent}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percent}%` }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 1.5, delay: 0.2 + (i * 0.2), ease: "circOut" }}
                      className="bg-neon-green h-full shadow-[0_0_15px_rgba(179,230,0,0.8)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}