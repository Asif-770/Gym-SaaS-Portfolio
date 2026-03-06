import Link from "next/link";
import prisma from "@/lib/prisma";
import { CheckCircle2, Dumbbell } from "lucide-react";

export default async function PricingCards() {
  // Fetch all plans directly from the database, ordered by price (cheapest first)
  const plans = await prisma.plan.findMany({
    orderBy: { price: 'asc' }
  });

  // Fallback UI if there are no plans in the database yet
  if (plans.length === 0) {
    return (
      <div className="text-center py-20 bg-[#111111] rounded-2xl border border-zinc-800 max-w-3xl mx-auto my-12">
        <Dumbbell className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
        <h3 className="text-2xl font-black uppercase italic text-white mb-2">Updating Plans</h3>
        <p className="text-gray-500">We are currently updating our membership tiers. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, index) => {
          // Automatically highlight the middle plan or any plan with "Pro" in the name
          const isPopular = plan.isPopular;

          return (
            <div 
              key={plan.id} 
              className={`relative bg-[#111111] rounded-2xl p-8 border flex flex-col transition-all ${
                isPopular ? "border-neon-green shadow-[0_0_30px_rgba(179,230,0,0.15)] lg:scale-105 z-10" : "border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-green text-[#111111] px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">${plan.price}</span>
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    / {plan.duration} Month{plan.duration > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Plan Description & Perks */}
              <div className="flex-1 mb-8">
                <p className="text-sm text-gray-400 font-medium mb-6 pb-6 border-b border-zinc-800">
                  {plan.description || "Get full access to our gym facilities and standard equipment."}
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-neon-green shrink-0" />
                    <span className="text-sm font-bold text-gray-300">24/7 Gym Access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-neon-green shrink-0" />
                    <span className="text-sm font-bold text-gray-300">Locker Room & Showers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-neon-green shrink-0" />
                    <span className="text-sm font-bold text-gray-300">Free Initial Assessment</span>
                  </li>
                </ul>
              </div>

              <Link 
                href="/contact" 
                className={`block w-full text-center py-4 font-black uppercase tracking-wider text-sm transition-colors skew-x-[-12deg] ${
                  isPopular 
                    ? "bg-neon-green text-[#111111] hover:bg-[#b3e600]" 
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                }`}
              >
                <div className="skew-x-[12deg]">Join Now</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}