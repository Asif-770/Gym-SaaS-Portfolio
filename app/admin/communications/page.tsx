"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Send, AlertCircle, CheckCircle2, Search } from "lucide-react";

export default function CommunicationsPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/members");
      if (res.ok) {
        const data = await res.json();
        setMembers(data.members);
      }
    } catch (error) {
      console.error("Failed to fetch members", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter members who have pending payments
  const pendingMembers = members.filter(m => m.paymentStatus !== "Paid");
  
  // Filter for search bar
  const displayMembers = pendingMembers.filter(member => 
    (member.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
    (member.phone || "").includes(searchQuery)
  );

  // Format phone number for WhatsApp API (remove spaces, ensure country code)
  const formatPhoneNumber = (phone: string) => {
    let cleaned = phone.replace(/\D/g, ''); // Remove all non-numeric characters
    // If it doesn't have a country code (assuming 10 digits), you can prepend one. 
    // We will assume the user entered it correctly for now, or you can hardcode '+91' or '+1' here if needed:
    // if (cleaned.length === 10) cleaned = '91' + cleaned; 
    return cleaned;
  };

  // Generate the dynamic message
  const handleSendWhatsApp = (member: any) => {
    const amount = member.plan?.price || "0";
    const planName = member.plan?.name || "your plan";
    
    const message = `Hi ${member.name}, this is a gentle reminder from the Gym. Your payment of $${amount} for the ${planName} is currently marked as ${member.paymentStatus}. Please let us know if you need assistance! 🏋️‍♂️`;
    
    const encodedMessage = encodeURIComponent(message);
    const formattedPhone = formatPhoneNumber(member.phone);
    
    // Opens WhatsApp Web or the App directly
    window.open(`https://wa.me/${formattedPhone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tight mb-2 flex items-center gap-3">
            <MessageCircle className="h-8 w-8 text-green-500" /> Communications
          </h2>
          <p className="text-gray-400 text-sm">Send automated WhatsApp reminders to your members.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search pending members..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-zinc-800 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-green-500 transition-colors text-sm"
          />
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-zinc-800 bg-[#111111] flex items-center justify-between">
          <h3 className="text-lg font-black text-white italic uppercase flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" /> Payment Reminders
          </h3>
          <span className="bg-red-500/10 text-red-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border border-red-500/20">
            {pendingMembers.length} Pending
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a1a1a] border-b border-zinc-800 text-gray-400 text-xs uppercase tracking-wider font-bold">
                <th className="p-4">Member</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Plan & Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center p-8 text-green-500 font-bold uppercase tracking-wider">Loading Contacts...</td></tr>
              ) : displayMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-12">
                    <CheckCircle2 className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                    <p className="text-white font-bold text-lg mb-1">Zero Pending Payments!</p>
                    <p className="text-gray-500 text-sm">Everyone is fully paid up. Great job.</p>
                  </td>
                </tr>
              ) : (
                displayMembers.map((member) => (
                  <tr key={member.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors group">
                    <td className="p-4 font-bold text-white capitalize">{member.name}</td>
                    <td className="p-4 text-sm text-gray-400">{member.phone}</td>
                    <td className="p-4">
                      <div className="text-sm text-white font-bold">${member.plan?.price}</div>
                      <div className="text-xs text-gray-500">{member.plan?.name}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
                        {member.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleSendWhatsApp(member)}
                        className="bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-[#111111] border border-green-500/20 px-4 py-2 text-xs font-black uppercase tracking-wider transition-all inline-flex items-center gap-2 skew-x-[-12deg]"
                      >
                        <div className="skew-x-[12deg] flex items-center gap-2">
                          <Send className="h-3 w-3" /> WhatsApp
                        </div>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}