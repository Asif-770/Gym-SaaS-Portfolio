"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { UserPlus, Calendar, Phone, Mail, MapPin } from "lucide-react";
import { UserPlus, Calendar, Phone, Mail, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddMemberPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    joiningDate: new Date().toISOString().split("T")[0], // Today's date by default
    planId: "",
    paymentStatus: "Paid",
  });

  // Fetch plans on load so the admin can select them
  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch("/api/plans"); // We will create a quick GET route for this
      if (res.ok) {
        const data = await res.json();
        setPlans(data.plans);
        if (data.plans.length > 0) {
          setFormData((prev) => ({ ...prev, planId: data.plans[0].id }));
        }
      }
    };
    fetchPlans();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/members"); // Redirect back to members list
        router.refresh();
      } else {
        alert("Failed to create member.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="max-w-4xl mx-auto">
        {/* New Back Button */}
      <Link 
        href="/admin/members" 
        className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-green transition-colors mb-6 font-bold text-sm uppercase tracking-wider"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Members
      </Link>

      
      <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-6">
        <div className="h-12 w-12 bg-neon-green/10 rounded-lg flex items-center justify-center border border-neon-green/20">
          <UserPlus className="h-6 w-6 text-neon-green" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tight">Register New Member</h2>
          <p className="text-gray-400 text-sm">Fill in the details to add a member to the database.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-8 border border-zinc-800 rounded-lg shadow-2xl">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          
          {/* Personal Details */}
          <div className="space-y-4">
            <h3 className="text-neon-green font-bold uppercase text-xs tracking-wider mb-4 border-b border-zinc-800 pb-2">Personal Details</h3>
            
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Full Name</label>
              <input type="text" required className="w-full bg-[#111111] border border-zinc-700 text-white p-3 focus:outline-none focus:border-neon-green transition-colors"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input type="text" required className="w-full bg-[#111111] border border-zinc-700 text-white pl-10 p-3 focus:outline-none focus:border-neon-green transition-colors"
                  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address (Optional)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input type="email" className="w-full bg-[#111111] border border-zinc-700 text-white pl-10 p-3 focus:outline-none focus:border-neon-green transition-colors"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <textarea className="w-full bg-[#111111] border border-zinc-700 text-white pl-10 p-3 focus:outline-none focus:border-neon-green transition-colors resize-none"
                  value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} rows={3}></textarea>
              </div>
            </div>
          </div>

          {/* Plan Details */}
          <div className="space-y-4">
            <h3 className="text-neon-green font-bold uppercase text-xs tracking-wider mb-4 border-b border-zinc-800 pb-2">Membership Plan</h3>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Select Plan</label>
              <select required className="w-full bg-[#111111] border border-zinc-700 text-white p-3 focus:outline-none focus:border-neon-green transition-colors"
                value={formData.planId} onChange={(e) => setFormData({...formData, planId: e.target.value})}>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>{plan.name} - ${plan.price}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Joining Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input type="date" required className="w-full bg-[#111111] border border-zinc-700 text-white pl-10 p-3 focus:outline-none focus:border-neon-green transition-colors"
                  value={formData.joiningDate} onChange={(e) => setFormData({...formData, joiningDate: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Initial Payment Status</label>
              <select required className="w-full bg-[#111111] border border-zinc-700 text-white p-3 focus:outline-none focus:border-neon-green transition-colors"
                value={formData.paymentStatus} onChange={(e) => setFormData({...formData, paymentStatus: e.target.value})}>
                <option value="Paid">Paid Fully</option>
                <option value="Pending">Payment Pending</option>
                <option value="Partial">Partial Payment</option>
              </select>
            </div>
          </div>

        </div>

        <div className="flex justify-end pt-6 border-t border-zinc-800">
          <button type="submit" disabled={loading} className="bg-neon-green text-[#111111] px-10 py-4 font-black uppercase tracking-wider text-sm hover:bg-[#b3e600] transition-colors skew-x-[-12deg] disabled:opacity-50">
            <div className="skew-x-[12deg]">{loading ? "Saving Data..." : "Register Member"}</div>
          </button>
        </div>
      </form>
    </div>
  );
}