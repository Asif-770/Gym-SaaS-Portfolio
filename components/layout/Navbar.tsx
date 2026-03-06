"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // HIDE NAVBAR IN ADMIN PANEL
  if (pathname.startsWith("/admin")) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#111111]/95 backdrop-blur-md py-4 border-b border-white/10 shadow-lg"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-black text-2xl lg:text-3xl tracking-tighter text-white uppercase italic">
              MY <span className="text-neon-green">FITNESS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-white hover:text-neon-green transition-colors uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6 text-sm font-bold text-white uppercase tracking-wider">
              <Link href="/admin/login" className="hover:text-neon-green transition-colors">
                Sign In
              </Link>
            </div>
            <button className="text-white hover:text-neon-green transition-colors relative group">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-neon-green text-[#111111] text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-neon-green transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#111111] border-b border-white/10 py-4 shadow-2xl"
          >
            <div className="px-4 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-bold text-white hover:text-neon-green block uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10 my-2" />
              <div className="flex flex-col gap-4 pt-2">
                <Link
                  href="/admin/login"
                  className="text-base font-bold text-white hover:text-neon-green block uppercase tracking-wider"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}