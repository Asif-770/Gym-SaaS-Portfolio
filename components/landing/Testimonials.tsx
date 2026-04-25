"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "James Doe",
    role: "Businessman",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Ut elit dolor, dictum non libero vitae, vulputate faucibus arcu.",
    image: "/images/user-1.jpg", 
  },
  {
    name: "Sarah Jenkins",
    role: "Graphic Designer",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Ut elit dolor, dictum non libero vitae, vulputate faucibus arcu.",
    image: "/images/user-2.jpg", 
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-[#0a0a0a] py-32 px-6 lg:px-12 pb-40 border-b border-zinc-800 overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-neon-green/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center mb-24"
        >
          <div className="w-2 h-2 bg-neon-green rotate-45 mb-6 shadow-[0_0_10px_rgba(179,230,0,0.8)]"></div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight italic text-center leading-tight">
            See What <span className="text-neon-green drop-shadow-[0_0_15px_rgba(179,230,0,0.3)]">Customers</span> Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-md p-10 relative border border-white/10 border-b-4 border-b-neon-green shadow-[0_20px_50px_rgba(0,0,0,0.3)] group transition-all duration-300"
            >
              {/* Background Quote Watermark */}
              <Quote className="absolute top-8 right-8 w-24 h-24 text-white/5 -z-10 rotate-180 group-hover:text-neon-green/10 transition-colors duration-500" />

              {/* Floating Avatar */}
              <div className="absolute -top-10 left-10 h-20 w-20 rounded-full overflow-hidden border-4 border-[#0a0a0a] bg-zinc-800 shadow-[0_0_20px_rgba(179,230,0,0.2)] group-hover:scale-110 transition-transform duration-500">
                 <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="mt-8 mb-6">
                <h3 className="text-2xl font-black text-white italic uppercase">{item.name}</h3>
                <p className="text-neon-green text-xs tracking-[0.2em] uppercase mb-4 font-bold">{item.role}</p>
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                    >
                      <Star className="h-5 w-5 fill-neon-green text-neon-green drop-shadow-[0_0_5px_rgba(179,230,0,0.5)]" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 text-base leading-relaxed italic relative z-10">
                "{item.text}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Slider Controls */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-6 mt-16"
        >
          <button className="h-14 w-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-neon-green hover:text-[#0a0a0a] transition-all hover:scale-110 group shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(179,230,0,0.4)]">
            <span className="text-2xl font-light transform group-hover:-translate-x-1 transition-transform">←</span>
          </button>
          <button className="h-14 w-14 rounded-full bg-neon-green border border-neon-green text-[#0a0a0a] flex items-center justify-center font-bold transition-all hover:scale-110 group shadow-[0_0_20px_rgba(179,230,0,0.3)]">
            <span className="text-2xl font-light transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}