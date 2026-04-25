"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play, ArrowRight, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- SLIDER DATA ---
const slides = [
  {
    id: 1,
    title: "We Are The Best Fitness Studio In Town",
    subtitle: "Transform your body and mind with our elite trainers and state-of-the-art facilities. Your journey starts today.",
    image: "/images/hero-bg.jpg", // Make sure this image exists in your public folder!
    ctaText: "Join Us Now",
    ctaLink: "/contact",
  },
  {
    id: 2,
    title: "Push Beyond Your Absolute Limits",
    subtitle: "Experience high-intensity crossfit, advanced bodybuilding, and premium recovery zones.",
    image: "/images/trainer-1.jpg", 
    ctaText: "View Programs",
    ctaLink: "/services",
  },
  {
    id: 3,
    title: "Premium VIP Training Experience",
    subtitle: "Exclusive 1-on-1 coaching, nutrition planning, and 24/7 private facility access.",
    image: "/images/trainer-2.jpg",
    ctaText: "Meet Trainers",
    ctaLink: "/trainers",
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for the background images as you scroll down
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // --- INITIAL LOADER ---
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // --- AUTO SLIDER ---
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000); // Changes slide every 6 seconds
    return () => clearInterval(timer);
  }, [currentSlide]);

  // --- CUSTOM CURSOR TRACKING ---
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1, // Slight zoom out effect on enter
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <>
      {/* --- SMOOTH ENTRY LOADER --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Activity className="w-16 h-16 text-neon-green" />
            </motion.div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-1 bg-neon-green mt-8 rounded-full shadow-[0_0_15px_rgba(179,230,0,0.5)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CUSTOM CURSOR --- */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-neon-green pointer-events-none z-[90] mix-blend-difference hidden md:flex items-center justify-center"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHoveringCTA ? 2.5 : 1,
          backgroundColor: isHoveringCTA ? "rgba(179, 230, 0, 1)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />

      <section ref={containerRef} className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden cursor-none">
        
        {/* --- CINEMATIC SLIDER BACKGROUNDS --- */}
        <motion.div style={{ y: yBg, opacity: opacityBg }} className="absolute inset-0 w-full h-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              {/* Ken Burns Slow Zoom Effect on Background */}
              <motion.div
                animate={{ scale: 1.05 }}
                transition={{ duration: 10, ease: "linear" }}
                className="w-full h-full relative"
              >
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* --- MAIN CONTENT (TEXT & BUTTONS) --- */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full min-h-screen pb-40 flex flex-col justify-center pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl"
            >
              {/* Micro-interaction Subtitle Reveal */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-8 h-1 bg-neon-green rounded-full shadow-[0_0_10px_rgba(179,230,0,0.5)]"></div>
                <p className="text-neon-green font-bold uppercase tracking-[0.2em] text-sm">Elevate Your Fitness</p>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-[84px] font-black text-white leading-[1.05] mb-6 tracking-tight italic drop-shadow-2xl">
                {slides[currentSlide].title}
              </h1>

              <p className="text-gray-300 text-base md:text-lg mb-10 max-w-xl leading-relaxed font-medium">
                {slides[currentSlide].subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-6">
                {/* 3D Magnetic Button Effect */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setIsHoveringCTA(true)}
                  onMouseLeave={() => setIsHoveringCTA(false)}
                >
                  <Link
                    href={slides[currentSlide].ctaLink}
                    className="relative overflow-hidden group bg-neon-green text-[#0a0a0a] px-10 py-5 font-black uppercase tracking-wider text-sm skew-x-[-12deg] inline-flex items-center gap-3 shadow-[0_0_30px_rgba(179,230,0,0.3)]"
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_forwards] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[12deg]"></div>
                    <div className="skew-x-[12deg] flex items-center gap-3 relative z-10">
                      {slides[currentSlide].ctaText} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </Link>
                </motion.div>

                <button 
                  onMouseEnter={() => setIsHoveringCTA(true)}
                  onMouseLeave={() => setIsHoveringCTA(false)}
                  className="flex items-center gap-4 text-white hover:text-neon-green transition-colors group"
                >
                  <div className="h-14 w-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-neon-green bg-white/5 backdrop-blur-sm transition-all group-hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(179,230,0,0.2)]">
                    <Play className="h-5 w-5 ml-1 fill-current" />
                  </div>
                  <span className="font-bold uppercase tracking-wider text-sm">Watch Video</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- GLASSMORPHISM SLIDER CONTROLS --- */}
        <div className="absolute bottom-10 right-6 lg:right-12 z-30 flex items-center gap-6">
          {/* Progress Indicators */}
          <div className="hidden md:flex items-center gap-3 mr-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  currentSlide === index ? "w-12 bg-neon-green shadow-[0_0_10px_rgba(179,230,0,0.8)]" : "w-4 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button 
            onClick={prevSlide}
            onMouseEnter={() => setIsHoveringCTA(true)}
            onMouseLeave={() => setIsHoveringCTA(false)}
            className="h-14 w-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-neon-green hover:text-[#0a0a0a] transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            onMouseEnter={() => setIsHoveringCTA(true)}
            onMouseLeave={() => setIsHoveringCTA(false)}
            className="h-14 w-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-neon-green hover:text-[#0a0a0a] transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* --- BOTTOM GLASS BANNER --- */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-0 w-full bg-black/40 backdrop-blur-xl border-t border-white/5 py-4 hidden lg:block z-20"
        >
          <div className="max-w-[1440px] mx-auto px-12 flex justify-between items-center text-white font-bold uppercase text-xs tracking-[0.15em]">
            <div className="flex items-center gap-3 hover:text-neon-green transition-colors cursor-pointer"><span className="h-2 w-2 bg-neon-green rotate-45 shadow-[0_0_5px_rgba(179,230,0,0.8)]"></span> Free Wifi & Parking</div>
            <div className="flex items-center gap-3 hover:text-neon-green transition-colors cursor-pointer"><span className="h-2 w-2 bg-neon-green rotate-45 shadow-[0_0_5px_rgba(179,230,0,0.8)]"></span> 24/7 Premier Service</div>
            <div className="flex items-center gap-3 hover:text-neon-green transition-colors cursor-pointer"><span className="h-2 w-2 bg-neon-green rotate-45 shadow-[0_0_5px_rgba(179,230,0,0.8)]"></span> With VIP Program</div>
            <div className="flex items-center gap-3 hover:text-neon-green transition-colors cursor-pointer"><span className="h-2 w-2 bg-neon-green rotate-45 shadow-[0_0_5px_rgba(179,230,0,0.8)]"></span> Top Premium Equipments</div>
          </div>
        </motion.div>
      </section>
    </>
  );
}