"use client";

import { useState, useEffect } from "react";
import { CreditCard, Trash2, PlusCircle, Users, AlertCircle } from "lucide-react";

export default function PlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Added isPopular to the form state
  const [formData, setFormData] = useState({
    name: "",
    duration: 1,
    price: "",
    description: "",
    isPopular: false
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/plans");
      if (res.ok) {
        const data = await res.json();
        setPlans(data.plans);
      }
    } catch (error) {
      console.error("Failed to fetch plans", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Reset form completely on success
        setFormData({ name: "", duration: 1, price: "", description: "", isPopular: false });
        fetchPlans();
      } else {
        alert("Failed to create plan.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePlan = async (id: string, name: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the ${name} plan?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/plans/${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (res.ok) {
        setPlans(plans.filter(plan => plan.id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tight mb-2 flex items-center gap-3">
          <CreditCard className="h-8 w-8 text-neon-green" /> Membership Plans
        </h2>
        <p className="text-gray-400 text-sm">Create and manage the pricing tiers for your gym.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start relative">
        
        {/* LEFT SIDE: Create Plan Form */}
        <div className="lg:col-span-1 sticky top-8">
          <div className="bg-[#1a1a1a] border border-zinc-800 rounded-lg p-6 shadow-2xl">
            <h3 className="text-lg font-black text-white italic uppercase flex items-center gap-2 mb-6 border-b border-zinc-800 pb-4">
              <PlusCircle className="h-5 w-5 text-neon-green" /> Add New Plan
            </h3>

            <form onSubmit={handleCreatePlan} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Plan Name</label>
                <input type="text" required placeholder="e.g. Summer Special" className="w-full bg-[#111111] border border-zinc-700 text-white p-3 focus:outline-none focus:border-neon-green text-sm"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Duration (Months)</label>
                  <input type="number" required min="1" className="w-full bg-[#111111] border border-zinc-700 text-white p-3 focus:outline-none focus:border-neon-green text-sm"
                    value={formData.duration} onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Price ($)</label>
                  <input type="number" required min="0" step="0.01" className="w-full bg-[#111111] border border-zinc-700 text-white p-3 focus:outline-none focus:border-neon-green text-sm"
                    value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Description / Perks</label>
                <textarea rows={3} placeholder="What is included?" className="w-full bg-[#111111] border border-zinc-700 text-white p-3 focus:outline-none focus:border-neon-green text-sm resize-none"
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
              </div>

              {/* NEW CHECKBOX FOR MOST POPULAR */}
              <div className="flex items-center gap-3 py-2 border-t border-zinc-800 mt-2 pt-4">
                <input 
                  type="checkbox" 
                  id="isPopular"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({...formData, isPopular: e.target.checked})}
                  className="w-4 h-4 accent-neon-green cursor-pointer"
                />
                <label htmlFor="isPopular" className="text-[10px] font-bold text-neon-green uppercase tracking-wider cursor-pointer">
                  Tag as "Most Popular" Plan
                </label>
              </div>

              <button type="submit" disabled={submitting} className="w-full bg-neon-green text-[#111111] px-6 py-4 font-black uppercase tracking-wider text-xs hover:bg-[#b3e600] transition-colors skew-x-[-12deg] mt-4 disabled:opacity-50">
                <div className="skew-x-[12deg]">{submitting ? "Creating..." : "Create Plan"}</div>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: Existing Plans Grid */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-neon-green p-10 font-bold uppercase tracking-wider text-center">Loading Plans...</div>
          ) : plans.length === 0 ? (
            <div className="text-center p-12 bg-[#1a1a1a] border border-zinc-800 rounded-lg">
              <AlertCircle className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-white font-bold text-lg mb-1">No Plans Yet</p>
              <p className="text-gray-500 text-sm">Use the form to create your first membership plan.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <div key={plan.id} className={`bg-[#1a1a1a] border ${plan.isPopular ? 'border-neon-green shadow-[0_0_15px_rgba(179,230,0,0.1)]' : 'border-zinc-800'} rounded-lg p-6 flex flex-col hover:border-neon-green/50 transition-colors group relative overflow-hidden`}>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute -right-6 -top-6 h-16 w-16 bg-neon-green/10 rotate-45 group-hover:bg-neon-green/20 transition-colors"></div>

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h4 className="text-xl font-black text-white italic uppercase tracking-tight flex items-center gap-2">
                        {plan.name}
                      </h4>
                      {/* NEW BADGE SHOWING POPULAR STATUS */}
                      {plan.isPopular && (
                        <span className="inline-block mt-1 bg-neon-green text-[#111111] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded">
                          Most Popular
                        </span>
                      )}
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">{plan.duration} Month{plan.duration > 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-white">${plan.price}</p>
                    </div>
                  </div>

                  <div className="flex-1 mb-6 relative z-10 mt-2">
                    <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">{plan.description || "No description provided."}</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-zinc-800 relative z-10">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <Users className="h-4 w-4" /> 
                      {plan._count?.members || 0} Members
                    </div>
                    
                    <button 
                      onClick={() => handleDeletePlan(plan.id, plan.name)}
                      className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 p-2 rounded transition-colors relative z-20 cursor-pointer"
                      title="Delete Plan"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}