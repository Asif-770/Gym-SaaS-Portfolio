"use client";
import { useState } from "react";
import { Check } from "lucide-react";

const faqs = [
  { question: "How many hours that I can train?" },
  { question: "Do you provide private training services?" },
  { question: "How can I find a service that suits me?" },
  { question: "What facilities do your gym offer?" },
  { question: "Do you provide private training services?" },
  { question: "How can I find a service that suits me?" },
];

export default function ServicesFAQ() {
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="w-2 h-2 bg-neon-green rotate-45 mb-4"></div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic">
            FAQ ABOUT <span className="text-neon-green">SERVICES</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          {/* Left Column (Questions) */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => setActiveFaq(index)}
                className={`text-left p-6 font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeFaq === index 
                    ? "bg-[#1a1a1a] text-neon-green border-l-4 border-neon-green" 
                    : "bg-transparent text-gray-400 border-l-4 border-transparent hover:text-white"
                }`}
              >
                {faq.question}
              </button>
            ))}
          </div>

          {/* Right Column (Answers) */}
          <div className="bg-[#1a1a1a] p-10 border-t-4 border-neon-green h-full">
            <h3 className="text-3xl font-black text-white italic leading-tight mb-4">
              Depend On Services <br /> Choosen
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit dolor, dictum non libero vitae.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="flex items-center gap-2 text-white font-bold text-sm uppercase mb-3">
                  <div className="w-4 h-[2px] bg-neon-green"></div> Body Building
                </h4>
                <ul className="pl-6 space-y-2">
                  <li className="flex items-center gap-2 text-gray-400 text-sm"><Check className="h-4 w-4 text-neon-green" /> 15 hours</li>
                  <li className="flex items-center gap-2 text-gray-400 text-sm"><Check className="h-4 w-4 text-neon-green" /> 12 hours</li>
                </ul>
              </div>
              
              <div>
                <h4 className="flex items-center gap-2 text-white font-bold text-sm uppercase mb-3">
                  <div className="w-4 h-[2px] bg-neon-green"></div> Strength Training
                </h4>
                <ul className="pl-6 space-y-2">
                  <li className="flex items-center gap-2 text-gray-400 text-sm"><Check className="h-4 w-4 text-neon-green" /> 10 hours</li>
                  <li className="flex items-center gap-2 text-gray-400 text-sm"><Check className="h-4 w-4 text-neon-green" /> 8 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}