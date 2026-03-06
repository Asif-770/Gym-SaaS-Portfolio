import { Target, Activity, Stethoscope, Ruler } from "lucide-react";

const features = [
  {
    title: "1x Yoga Session",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, nam eget tristique ligula, sit amet euismod ligula.",
    icon: Target,
  },
  {
    title: "BMI Index Measurement",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, nam eget tristique ligula, sit amet euismod ligula.",
    icon: Activity,
  },
  {
    title: "Health Check Tools",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, nam eget tristique ligula, sit amet euismod ligula.",
    icon: Stethoscope,
  },
  {
    title: "BMI Index Measurement", // Replicated text from Figma
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, nam eget tristique ligula, sit amet euismod ligula.",
    icon: Ruler,
  },
];

export default function PricingFeatures() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col items-center justify-center mb-20 text-center">
          <div className="w-2 h-2 bg-neon-green rotate-45 mb-4"></div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">You Will Get</p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic">
            ALL PRICING PLANS INCLUDE
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start gap-6">
                <div className="shrink-0 p-4 border border-zinc-800 bg-[#1a1a1a]">
                  <Icon className="h-8 w-8 text-neon-green" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white italic uppercase mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Decorative graphic at the bottom (approximated with CSS) */}
        <div className="mt-24 flex justify-center opacity-20">
            <div className="flex items-end gap-2 h-24">
               {[10, 20, 30, 40, 50, 60, 50, 40, 30, 20, 10].map((h, i) => (
                   <div key={i} className="w-1 bg-white rounded-full" style={{ height: `${h}%` }}></div>
               ))}
            </div>
        </div>

      </div>
    </section>
  );
}