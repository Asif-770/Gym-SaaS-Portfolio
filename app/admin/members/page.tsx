"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, UserPlus, Trash2, Edit, Dumbbell, Eye } from "lucide-react";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all members when the page loads
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
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

  // Delete Member Function
  const handleDelete = async (id: string, name: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete ${name}?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/members/${id}`, { method: "DELETE" });
      if (res.ok) {
        // Remove the deleted member from the UI immediately without reloading
        setMembers(members.filter(member => member.id !== id));
      } else {
        alert("Failed to delete member.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Live Search Filter (Checks Name or Phone)
  // Safe Live Search Filter
  const filteredMembers = (members || []).filter(member => {
    // Safely handle potentially null/undefined fields
    const safeName = member.name || "";
    const safePhone = member.phone || "";
    const query = searchQuery.toLowerCase().trim();

    return (
      safeName.toLowerCase().includes(query) || 
      safePhone.includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tight mb-2">Member Directory</h2>
          <p className="text-gray-400 text-sm">Manage, search, and edit your gym members here.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by Name or Phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-zinc-800 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-neon-green transition-colors text-sm"
            />
          </div>

          {/* Add Member Button */}
          <Link 
            href="/admin/members/add" 
            className="bg-neon-green text-[#111111] px-6 py-3 font-black uppercase tracking-wider text-xs hover:bg-[#b3e600] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <UserPlus className="h-4 w-4" /> Add Member
          </Link>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-[#1a1a1a] border border-zinc-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#111111] border-b border-zinc-800 text-gray-400 text-xs uppercase tracking-wider font-bold">
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-gray-500 font-medium">Loading members...</td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8">
                    <Dumbbell className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">No members found.</p>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors group">
                    <td className="p-4 font-bold text-white capitalize">{member.name}</td>
                    <td className="p-4">
                      <div className="text-sm text-gray-300">{member.phone}</div>
                      {member.email && <div className="text-xs text-gray-500 mt-1">{member.email}</div>}
                    </td>
                    <td className="p-4 text-sm font-medium text-neon-green">{member.plan?.name || "N/A"}</td>
                    <td className="p-4 text-sm text-gray-300">
                      {new Date(member.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${
                        member.paymentStatus === "Paid" ? "bg-green-500/10 text-green-500 border border-green-500/20" : 
                        "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}>
                        {member.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {/* See Details Button */}
                      <Link 
                        href={`/admin/members/view/${member.id}`}
                        className="p-2 text-gray-500 hover:text-neon-green hover:bg-neon-green/10 rounded transition-colors inline-flex"
                        title="See Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      {/* Edit Button (We will build the edit page next if you want) */}
                      <Link 
                        href={`/admin/members/edit/${member.id}`}
                        className="p-2 text-gray-500 hover:text-white hover:bg-zinc-800 rounded transition-colors inline-flex"
                        >
                        <Edit className="h-4 w-4" />
                        </Link>
                      {/* Delete Button */}
                      <button 
                        onClick={() => handleDelete(member.id, member.name)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors inline-flex"
                      >
                        <Trash2 className="h-4 w-4" />
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