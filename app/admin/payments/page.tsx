"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle, Search, Edit } from "lucide-react";

export default function PaymentsPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/members");
        if (res.ok) {
          const data = await res.json();
          // Filter ONLY members who have Pending or Partial payments
          const dueMembers = data.members.filter((m: any) => m.paymentStatus !== "Paid");
          setMembers(dueMembers);
        }
      } catch (error) {
        console.error("Failed to fetch payments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member => 
    (member.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
    (member.phone || "").includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tight mb-2 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-red-500" /> Pending Payments
          </h2>
          <p className="text-gray-400 text-sm">Members who have pending or partial payments due.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by Name or Phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-zinc-800 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-red-500 transition-colors text-sm"
          />
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-zinc-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#111111] border-b border-zinc-800 text-gray-400 text-xs uppercase tracking-wider font-bold">
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Plan & Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center p-8 text-gray-500 font-medium">Loading records...</td></tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-12">
                    <CheckCircle className="h-12 w-12 text-green-500/50 mx-auto mb-4" />
                    <p className="text-white font-bold text-lg mb-1">All Clear!</p>
                    <p className="text-gray-500 text-sm">No members currently have pending payments.</p>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-4 font-bold text-white capitalize">{member.name}</td>
                    <td className="p-4 text-sm text-gray-400">{member.phone}</td>
                    <td className="p-4">
                      <div className="text-sm text-white font-bold">${member.plan?.price}</div>
                      <div className="text-xs text-gray-500">{member.plan?.name}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${
                        member.paymentStatus === "Partial" ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" : 
                        "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}>
                        {member.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link 
                        href={`/admin/members/edit/${member.id}`}
                        className="p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded transition-colors inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                      >
                        <Edit className="h-4 w-4" /> Update
                      </Link>
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