import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "James Doe",
    role: "Businessman",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Ut elit dolor, dictum non libero vitae, vulputate faucibus arcu.",
    image: "/images/user-1.jpg", // Add a small user avatar image
  },
  {
    name: "Sarah Jenkins",
    role: "Graphic Designer",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Ut elit dolor, dictum non libero vitae, vulputate faucibus arcu.",
    image: "/images/user-2.jpg", // Add a small user avatar image
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 pb-32">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="w-2 h-2 bg-neon-green rotate-45 mb-4"></div>
          <h2 className="text-white font-black uppercase tracking-widest text-lg italic text-center">
            See What <span className="text-neon-green">Customers</span> Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-[#1a1a1a] p-10 relative border-b-4 border-neon-green">
              {/* Avatar - overlaps the top */}
              <div className="absolute -top-8 left-10 h-16 w-16 rounded-full overflow-hidden border-4 border-[#111111] bg-zinc-800">
                 <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="mt-6 mb-6">
                <h3 className="text-xl font-black text-white italic uppercase">{item.name}</h3>
                <p className="text-gray-400 text-xs tracking-wider uppercase mb-3">{item.role}</p>
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-neon-green text-neon-green" />
                  ))}
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed italic">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Slider Controls (Visual only for now) */}
        <div className="flex justify-center gap-4 mt-12">
          <button className="h-10 w-10 bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-zinc-800 transition-colors">←</button>
          <button className="h-10 w-10 bg-neon-green text-[#111111] flex items-center justify-center font-bold transition-colors">→</button>
        </div>

      </div>
    </section>
  );
}