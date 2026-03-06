export default function AboutStats() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-neon-green rotate-45"></span>
            <span className="text-white font-black uppercase tracking-widest text-sm italic">About My Fitness</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tight mb-8 leading-tight">
            Providing The Best <br />
            Service For Your <br />
            Health And Fitness
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Ut elit dolor, dictum non libero vitae, vulputate faucibus arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit dolor.
          </p>
        </div>

        {/* Right: Grid Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#1a1a1a] p-8 border-l-4 border-neon-green">
            <h3 className="text-4xl font-black text-white italic mb-2">25+</h3>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Years Experience</p>
          </div>
          <div className="bg-[#1a1a1a] p-8 border-l-4 border-zinc-800 hover:border-neon-green transition-colors">
            <h3 className="text-4xl font-black text-white italic mb-2">4K+</h3>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Satisfied Clients</p>
          </div>
          <div className="bg-[#1a1a1a] p-8 border-l-4 border-zinc-800 hover:border-neon-green transition-colors">
            <h3 className="text-4xl font-black text-white italic mb-2">150+</h3>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Awards Winning</p>
          </div>
          <div className="bg-[#1a1a1a] p-8 border-l-4 border-zinc-800 hover:border-neon-green transition-colors">
            <h3 className="text-4xl font-black text-white italic mb-2">50+</h3>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Expert Trainers</p>
          </div>
        </div>

      </div>
    </section>
  );
}