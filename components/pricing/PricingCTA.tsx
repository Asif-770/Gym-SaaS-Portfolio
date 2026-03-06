import Image from "next/image";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

export default function PricingCTA() {
  return (
    <section className="relative w-full py-24 px-6 lg:px-12 bg-[#111111] overflow-hidden">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/pricing-cta-bg.jpg" // Add an image of someone tying their shoelaces
          alt="Make an appointment"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
        
        {/* Text Area */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-neon-green rotate-45"></div>
            <p className="text-white text-xs font-bold uppercase tracking-widest italic">Make An Appointment</p>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tight leading-tight">
            Consult About Your Plan <br /> That You Want To Choose
          </h2>
        </div>

        {/* Buttons and Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <Link
            href="/contact"
            className="bg-neon-green text-[#111111] px-10 py-5 font-black uppercase tracking-wider text-sm hover:bg-[#b3e600] transition-colors skew-x-[-12deg] inline-block"
          >
            <div className="skew-x-[12deg]">Make Appointment</div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="p-3 border border-zinc-700 bg-[#1a1a1a]">
               <PhoneCall className="h-6 w-6 text-neon-green" />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Call Us</p>
              <p className="text-xl font-black text-white italic">+62-34578904325</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}