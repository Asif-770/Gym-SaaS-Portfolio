"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, CreditCard, Activity } from "lucide-react";

export default function ViewMemberPage() {
  const params = useParams();
  const memberId = params.id as string;
  
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!memberId) return;
    const fetchMember = async () => {
      const res = await fetch(`/api/members/${memberId}`);
      if (res.ok) {
        const data = await res.json();
        setMember(data.member);
      }
      setLoading(false);
    };
    fetchMember();
  }, [memberId]);

  if (loading) return <div className="text-neon-green p-10 font-bold uppercase tracking-wider">Loading Profile...</div>;
  if (!member) return <div className="text-red-500 p-10 font-bold uppercase tracking-wider">Member Not Found</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <Link href="/admin/members" className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-green transition-colors mb-8 font-bold text-sm uppercase tracking-wider">
        <ArrowLeft className="h-4 w-4" /> Back to Members
      </Link>

      {/* Header Profile Card */}
      <div className="bg-[#1a1a1a] border border-zinc-800 rounded-lg p-8 mb-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="h-24 w-24 bg-zinc-800 rounded-full flex items-center justify-center border-2 border-neon-green">
          <User className="h-10 w-10 text-neon-green" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tight mb-2">{member.name}</h1>
          <p className="text-gray-400 font-medium tracking-widest text-sm uppercase">Member ID: {member.id.split('-')[0]}</p>
        </div>
        <div className="text-center md:text-right">
          <span className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full inline-block mb-2 ${
            member.paymentStatus === "Paid" ? "bg-green-500/10 text-green-500 border border-green-500/20" : 
            "bg-red-500/10 text-red-500 border border-red-500/20"
          }`}>
            {member.paymentStatus}
          </span>
          <p className="text-gray-400 text-sm font-bold">Status</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-lg p-8">
          <h3 className="text-neon-green font-bold uppercase text-sm tracking-wider mb-6 border-b border-zinc-800 pb-2 flex items-center gap-2">
            <User className="h-4 w-4" /> Contact Information
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Phone Number</p>
                <p className="text-white font-medium">{member.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Email Address</p>
                <p className="text-white font-medium">{member.email || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Physical Address</p>
                <p className="text-white font-medium leading-relaxed">{member.address || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Details */}
        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-lg p-8">
          <h3 className="text-neon-green font-bold uppercase text-sm tracking-wider mb-6 border-b border-zinc-800 pb-2 flex items-center gap-2">
            <Activity className="h-4 w-4" /> Membership Details
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CreditCard className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Active Plan</p>
                <p className="text-white font-black italic">{member.plan?.name || "Unknown Plan"}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Calendar className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Joining Date</p>
                <p className="text-white font-medium">{new Date(member.joiningDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Calendar className="h-5 w-5 text-neon-green mt-1" />
              <div>
                <p className="text-xs text-neon-green uppercase font-bold tracking-wider mb-1">Expiry Date</p>
                <p className="text-white font-black">{new Date(member.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}