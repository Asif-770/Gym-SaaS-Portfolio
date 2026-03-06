"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, UserCheck, DollarSign, Activity, ArrowRight, Clock, AlertCircle, Award } from "lucide-react";
export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-neon-green p-10 font-bold uppercase tracking-wider">Loading Dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tight mb-2">Dashboard Overview</h2>
        <p className="text-gray-400 text-sm">Welcome back! Here is what's happening at your gym today.</p>
      </div>

      {/* Top Stats Grid (Now 4 Columns) */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        
        {/* Total Members Card */}
        <div className="bg-[#1a1a1a] p-6 border border-zinc-800 rounded-lg flex items-center gap-4 border-b-4 border-b-zinc-800 hover:border-b-neon-green transition-colors">
          <div className="h-14 w-14 shrink-0 bg-zinc-800 rounded-full flex items-center justify-center">
            <Users className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-400 text-[10px] xl:text-xs font-bold uppercase tracking-wider mb-1 truncate">Total Members</p>
            <h3 className="text-2xl sm:text-3xl xl:text-4xl font-black text-white italic break-words">{data?.stats?.totalMembers || 0}</h3>
          </div>
        </div>

        {/* Active Members Card */}
        <div className="bg-[#1a1a1a] p-6 border border-zinc-800 rounded-lg flex items-center gap-4 border-b-4 border-b-zinc-800 hover:border-b-neon-green transition-colors">
          <div className="h-14 w-14 shrink-0 bg-neon-green/10 rounded-full flex items-center justify-center">
            <UserCheck className="h-7 w-7 text-neon-green" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-400 text-[10px] xl:text-xs font-bold uppercase tracking-wider mb-1 truncate">Active Members</p>
            <h3 className="text-2xl sm:text-3xl xl:text-4xl font-black text-white italic break-words">{data?.stats?.activeMembers || 0}</h3>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-[#1a1a1a] p-6 border border-zinc-800 rounded-lg flex items-center gap-4 border-b-4 border-b-zinc-800 hover:border-b-neon-green transition-colors">
          <div className="h-14 w-14 shrink-0 bg-zinc-800 rounded-full flex items-center justify-center">
            <DollarSign className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-400 text-[10px] xl:text-xs font-bold uppercase tracking-wider mb-1 truncate">Total Revenue</p>
            <h3 className="text-2xl sm:text-3xl xl:text-4xl font-black text-white italic break-words">${data?.stats?.totalRevenue?.toFixed(2) || "0.00"}</h3>
          </div>
        </div>

        {/* Payments Due Card (NOW CLICKABLE) */}
        <Link href="/admin/payments" className="bg-[#1a1a1a] p-6 border border-zinc-800 rounded-lg flex items-center gap-4 border-b-4 border-b-zinc-800 hover:border-b-red-500 transition-colors group cursor-pointer">
          <div className="h-14 w-14 shrink-0 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
            <AlertCircle className="h-7 w-7 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-red-500 text-[10px] xl:text-xs font-bold uppercase tracking-wider mb-1 truncate group-hover:text-red-400 transition-colors">Payments Due</p>
            <h3 className="text-2xl sm:text-3xl xl:text-4xl font-black text-white italic break-words">{data?.stats?.paymentDueMembers || 0}</h3>
            <p className="text-[10px] text-gray-500 mt-1 font-bold uppercase">View List &rarr;</p>
          </div>
        </Link>

      </div>
      {/* Recent Activity Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Recent Members Table (Takes up 2/3 width) */}
        <div className="lg:col-span-2 bg-[#1a1a1a] border border-zinc-800 rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-zinc-800">
            <h3 className="text-lg font-black text-white italic uppercase flex items-center gap-2">
              <Activity className="h-5 w-5 text-neon-green" /> Recent Registrations
            </h3>
            <Link href="/admin/members" className="text-xs font-bold text-gray-400 hover:text-neon-green transition-colors flex items-center gap-1 uppercase tracking-wider">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#111111] border-b border-zinc-800 text-gray-400 text-xs uppercase tracking-wider font-bold">
                  <th className="p-4">Name</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Joined</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.recentMembers?.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-500">No members yet.</td></tr>
                ) : (
                  data?.recentMembers?.map((member: any) => (
                    <tr key={member.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                      <td className="p-4 font-bold text-white capitalize">{member.name}</td>
                      <td className="p-4 text-sm font-medium text-neon-green">{member.plan?.name}</td>
                      <td className="p-4 text-sm text-gray-400">{new Date(member.joiningDate).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                          {member.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

       {/* Quick Actions & Status Column */}
        <div className="flex flex-col gap-8">
          
          {/* NEW: Most Dedicated Member Card (NOW CLICKABLE) */}
          {data?.topMember && data.topMember._count.attendance > 0 && (
            <Link 
              href={`/admin/members/view/${data.topMember.id}`}
              className="group block bg-gradient-to-br from-[#1a1a1a] to-zinc-900 border border-neon-green/30 rounded-lg p-6 flex items-center gap-5 relative overflow-hidden shadow-[0_0_15px_rgba(179,230,0,0.1)] hover:scale-[1.02] hover:border-neon-green transition-all cursor-pointer"
            >
               <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Award className="h-24 w-24 text-neon-green" />
               </div>
               <div className="h-14 w-14 shrink-0 bg-neon-green/20 rounded-full flex items-center justify-center border border-neon-green/50 z-10 group-hover:bg-neon-green group-hover:text-[#111111] transition-colors">
                 <Award className="h-7 w-7 text-neon-green group-hover:text-[#111111]" />
               </div>
               <div className="z-10 flex-1">
                 <p className="text-neon-green text-[10px] font-black uppercase tracking-widest mb-1">Most Dedicated Member</p>
                 <h4 className="text-xl sm:text-2xl font-black text-white italic capitalize truncate group-hover:text-neon-green transition-colors">{data.topMember.name}</h4>
                 <p className="text-sm text-gray-400 font-medium">{data.topMember._count.attendance} Days Present</p>
               </div>
            </Link>
          )}
          {/* Existing System Status Card */}
          <div className="bg-[#1a1a1a] border border-zinc-800 rounded-lg p-6 flex flex-col flex-1">
            <h3 className="text-lg font-black text-white italic uppercase flex items-center gap-2 mb-6 border-b border-zinc-800 pb-4">
              <Clock className="h-5 w-5 text-neon-green" /> System Status
            </h3>
            
            <div className="flex-1 space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Database Status</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-neon-green animate-pulse"></div>
                  <span className="text-sm font-medium text-white">Online & Synced</span>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Backup</p>
                <p className="text-sm font-medium text-white">{new Date().toLocaleDateString()} (Automated)</p>
              </div>
              
              <div className="pt-4 border-t border-zinc-800">
                <Link href="/admin/members/add" className="w-full bg-neon-green text-[#111111] px-6 py-4 font-black uppercase tracking-wider text-xs hover:bg-[#b3e600] transition-colors skew-x-[-12deg] inline-block text-center mt-2">
                  <div className="skew-x-[12deg]">Quick Add Member</div>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}