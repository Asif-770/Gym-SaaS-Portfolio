import { Play } from "lucide-react";

export default function AboutContact() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="w-2 h-2 bg-neon-green rotate-45 mb-4"></div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic mb-4">
            LET'S TALK ABOUT YOUR NEEDS
          </h2>
          <p className="text-gray-400 text-sm max-w-xl">
            We provide the best program for you, for your health and beauty if you maintain and train. We provide the best gym & fitness facilities for you.
          </p>
        </div>

        {/* Video Thumbnail */}
        <div className="relative w-full h-[400px] md:h-[600px] bg-[#1a1a1a] mb-24 group cursor-pointer overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-700"></div>
           <div className="absolute inset-0 bg-[#111111]/40"></div>
           <button className="relative z-10 h-24 w-24 bg-neon-green rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <Play className="h-8 w-8 text-[#111111] ml-2 fill-current" />
           </button>
        </div>

        {/* Form Layout */}
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tight mb-6">
              Kickstart Your <br /> Awesome Gym Plan <br /> Now!
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              We provide the best program for you, for your health and beauty if you maintain and train. We provide the best gym.
            </p>
          </div>

          <form className="flex flex-col gap-6">
            <input type="text" placeholder="Name" className="w-full bg-transparent border-b border-zinc-800 text-white p-4 focus:outline-none focus:border-neon-green transition-colors" />
            <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-zinc-800 text-white p-4 focus:outline-none focus:border-neon-green transition-colors" />
            <textarea placeholder="Message" rows={4} className="w-full bg-transparent border-b border-zinc-800 text-white p-4 focus:outline-none focus:border-neon-green transition-colors resize-none"></textarea>
            
            <button type="button" className="self-end bg-neon-green text-[#111111] px-10 py-4 font-black uppercase tracking-wider text-sm hover:bg-[#b3e600] transition-colors skew-x-[-12deg] mt-4">
              <div className="skew-x-[12deg]">Send Message</div>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}