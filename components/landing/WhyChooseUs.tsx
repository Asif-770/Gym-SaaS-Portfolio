"use client";

import Image from "next/image";
import { ShieldCheck, Dumbbell, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  
  // Stagger variants for the lists
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="relative bg-[#0a0a0a] py-32 px-6 lg:px-12 overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white italic tracking-tight mb-6 uppercase">
            Why <span className="text-neon-green drop-shadow-[0_0_20px_rgba(179,230,0,0.2)]">Choose Us?</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Ut elit dolor, dictum non libero vitae.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column */}
          <div className="flex flex-col gap-12">
            {/* Top Image Parallax Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[450px] w-full bg-[#111111] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
            >
              <Image
                src="/images/trainer-1.jpg" 
                alt="Supportive Environment"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            </motion.div>
            
            {/* Staggered Features List */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-10 pl-6 border-l border-white/10"
            >
              <motion.div variants={itemVariants} className="group cursor-default">
                <div className="bg-white/5 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-neon-green group-hover:bg-neon-green/10 transition-colors">
                  <Dumbbell className="text-neon-green h-8 w-8 drop-shadow-[0_0_10px_rgba(179,230,0,0.5)]" />
                </div>
                <h3 className="text-2xl font-black text-white italic uppercase mb-3">Exclusive Facilities</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="group cursor-default">
                <div className="bg-white/5 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-neon-green group-hover:bg-neon-green/10 transition-colors">
                  <Users className="text-neon-green h-8 w-8 drop-shadow-[0_0_10px_rgba(179,230,0,0.5)]" />
                </div>
                <h3 className="text-2xl font-black text-white italic uppercase mb-3">Personal Training Session</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque.</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-12 lg:pt-32">
            {/* Staggered Features List */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-10 pl-6 border-l border-white/10"
            >
              <motion.div variants={itemVariants} className="group cursor-default">
                <div className="bg-white/5 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-neon-green group-hover:bg-neon-green/10 transition-colors">
                  <ShieldCheck className="text-neon-green h-8 w-8 drop-shadow-[0_0_10px_rgba(179,230,0,0.5)]" />
                </div>
                <h3 className="text-2xl font-black text-white italic uppercase mb-3">Supportive Trainers</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="group cursor-default">
                <div className="bg-white/5 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-neon-green group-hover:bg-neon-green/10 transition-colors">
                  <Award className="text-neon-green h-8 w-8 drop-shadow-[0_0_10px_rgba(179,230,0,0.5)]" />
                </div>
                <h3 className="text-2xl font-black text-white italic uppercase mb-3">10+ Years Experience</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque.</p>
              </motion.div>
            </motion.div>

            {/* Bottom Image Parallax Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[450px] w-full bg-[#111111] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
            >
              <Image
                src="/images/trainer-2.jpg" 
                alt="Premium Equipment"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}