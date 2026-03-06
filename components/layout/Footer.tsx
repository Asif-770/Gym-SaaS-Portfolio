"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // HIDE FOOTER IN ADMIN PANEL
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-neon-green text-[#111111] pt-20 pb-10 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-16 border-b border-[#111111]/10">
          <div>
            <h3 className="text-2xl font-black italic uppercase mb-2">Sign up to our newsletter</h3>
            <p className="text-sm font-medium opacity-80">Stay up to date with the latest news, announcements, and articles.</p>
          </div>
          <div className="flex w-full lg:w-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent border border-[#111111] text-[#111111] placeholder:text-[#111111]/60 px-6 py-3 w-full lg:w-80 focus:outline-none font-medium"
            />
            <button className="bg-[#111111] text-white px-8 py-3 font-bold uppercase tracking-wider text-sm hover:bg-zinc-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-black text-3xl tracking-tighter uppercase italic">
                MY FITNESS
              </span>
            </Link>
            <p className="text-sm font-medium opacity-80 leading-relaxed max-w-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor libero in massa semper.
            </p>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-black uppercase tracking-wider mb-6 italic">Our Services</h4>
            <ul className="space-y-4 text-sm font-bold opacity-80">
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Strength Training</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Body Building</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Basic Yoga</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Weight Loss</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-black uppercase tracking-wider mb-6 italic">Company</h4>
            <ul className="space-y-4 text-sm font-bold opacity-80">
              <li><Link href="#" className="hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Services</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Log In</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Pricing</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-black uppercase tracking-wider mb-6 italic">Legal</h4>
            <ul className="space-y-4 text-sm font-bold opacity-80">
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Return Policy</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#111111]/10 gap-4">
          <p className="text-xs font-bold opacity-80">© 2024 My Fitness. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:scale-110 transition-transform"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="hover:scale-110 transition-transform"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="hover:scale-110 transition-transform"><Instagram className="h-5 w-5" /></Link>
          </div>
        </div>

      </div>
    </footer>
  );
}