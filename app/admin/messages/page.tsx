"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, AlertCircle, Search, Mail, Trash2, CheckCircle2, Zap, Info } from "lucide-react";

export default function MessagesPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'alerts' | 'inquiries'>('alerts');
  
  // NEW: Floating Toast Notification State
  const [toast, setToast] = useState<{message: string, type: 'info' | 'success' | 'error'} | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [membersRes, inquiriesRes] = await Promise.all([
        fetch("/api/members"),
        fetch("/api/contact")
      ]);
      
      if (membersRes.ok) setMembers((await membersRes.json()).members);
      if (inquiriesRes.ok) setInquiries((await inquiriesRes.json()).inquiries);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const pendingMembers = members.filter(m => m.paymentStatus !== "Paid");
  const expiringMembers = members.filter(m => {
    if (!m.expiryDate) return false;
    const diffDays = Math.ceil((new Date(m.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 5;
  });
  const combinedAttentionList = [...new Map([...pendingMembers, ...expiringMembers].map(item => [item.id, item])).values()];
  
  const displayMembers = combinedAttentionList.filter(member => 
    (member.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = inquiries.filter(i => !i.isRead).length;

  // Helper to show the floating notification
  const showToast = (message: string, type: 'info' | 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000); // Hides after 4 seconds
  };

  // ==========================================
  // INDIVIDUAL ONE-CLICK SEND
  // ==========================================
  const handleSendAlert = async (member: any, type: 'payment' | 'expiry' | 'custom') => {
    if (!member.email) {
      showToast(`${member.name} has no email address!`, 'error');
      return;
    }

    let subject = "";
    let htmlContent = "";
    
    if (type === 'custom') {
      const customMsg = prompt(`Type your custom message for ${member.name}:`);
      if (!customMsg) return;
      subject = `Message from Gym Admin`;
      htmlContent = `<p style="font-family: sans-serif; color: #333;">${customMsg}</p>`;
    } else if (type === 'payment') {
      const daysPending = member.createdAt ? Math.max(0, Math.floor((new Date().getTime() - new Date(member.createdAt).getTime()) / (1000 * 60 * 60 * 24))) : 0;
      subject = `Action Required: Pending Payment`;
      htmlContent = `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hi ${member.name},</h2>
          <p>This is a gentle reminder that your payment of <strong>$${member.plan?.price || "0"}</strong> is currently pending for <strong>${daysPending} days</strong>.</p>
          <p>Please clear your dues at the front desk to avoid any interruptions. Let us know if you need help!</p>
        </div>
      `;
    } else {
      const daysLeft = member.expiryDate ? Math.ceil((new Date(member.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
      subject = `Reminder: Membership Expiring Soon`;
      htmlContent = `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hi ${member.name},</h2>
          <p>Your <strong>${member.plan?.name || "gym"}</strong> membership expires in exactly <strong>${daysLeft} days</strong>.</p>
          <p>Renew today to keep your fitness streak alive! 💪</p>
        </div>
      `;
    }
    
    try {
      showToast(`Sending to ${member.name}...`, 'info');
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: member.email, subject, html: htmlContent, memberName: member.name })
      });
      showToast(`Email successfully sent to ${member.name}!`, 'success');
    } catch (error) {
      showToast("Failed to send email.", 'error');
    }
  };

  // ==========================================
  // BULK SEND PENDING 
  // ==========================================
  const handleBulkSendPending = async () => {
    const membersWithEmail = pendingMembers.filter(m => m.email);
    
    if (membersWithEmail.length === 0) {
      showToast("No pending members with valid emails found.", 'error');
      return;
    }

    if (!window.confirm(`Are you sure you want to send bulk emails to ${membersWithEmail.length} pending members?`)) return;

    showToast(`Bulk sending ${membersWithEmail.length} emails...`, 'info');

    for (const member of membersWithEmail) {
      const daysPending = member.createdAt ? Math.max(0, Math.floor((new Date().getTime() - new Date(member.createdAt).getTime()) / (1000 * 60 * 60 * 24))) : 0;
      const subject = `Action Required: Pending Payment`;
      const htmlContent = `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hi ${member.name},</h2>
          <p>This is an automated reminder that your payment of <strong>$${member.plan?.price || "0"}</strong> is pending for <strong>${daysPending} days</strong>.</p>
          <p>Please clear your balance to continue using the gym facilities. Thank you!</p>
        </div>
      `;

      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: member.email, subject, html: htmlContent, memberName: member.name })
      });
    }

    showToast(`Bulk emails sent successfully to ${membersWithEmail.length} members!`, 'success');
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}`, { method: 'PATCH' });
      setInquiries(inquiries.map(i => i.id === id ? { ...i, isRead: true } : i));
    } catch (error) {}
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this message?")) return;
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      setInquiries(inquiries.filter(i => i.id !== id));
    } catch (error) {}
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 relative">
      
      {/* NEW: FLOATING TOAST NOTIFICATION */}
      {toast && (
        <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 ${
          toast.type === 'info' ? 'bg-blue-500/10 border border-blue-500 text-blue-500' : 
          toast.type === 'error' ? 'bg-red-500/10 border border-red-500 text-red-500' : 
          'bg-green-500/10 border border-green-500 text-green-500'
        }`}>
          {toast.type === 'info' && <Info className="h-5 w-5 animate-pulse" />}
          {toast.type === 'error' && <AlertCircle className="h-5 w-5" />}
          {toast.type === 'success' && <CheckCircle2 className="h-5 w-5" />}
          <span className="font-bold text-sm uppercase tracking-wider">{toast.message}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-zinc-800 pb-6">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tight mb-2 flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-green-500" /> Message Center
          </h2>
          <div className="flex gap-4 mt-6">
            <button onClick={() => setActiveTab('alerts')} className={`pb-2 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'alerts' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-500 hover:text-white'}`}>
              Member Alerts ({combinedAttentionList.length})
            </button>
            <button onClick={() => setActiveTab('inquiries')} className={`pb-2 font-bold uppercase tracking-wider text-sm transition-colors flex items-center gap-2 ${activeTab === 'inquiries' ? 'text-neon-green border-b-2 border-neon-green' : 'text-gray-500 hover:text-white'}`}>
              Website Inquiries 
              {unreadCount > 0 && <span className="bg-neon-green text-[#111111] px-2 py-0.5 rounded-full text-[10px]">{unreadCount} New</span>}
            </button>
          </div>
        </div>

        {activeTab === 'alerts' && (
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input type="text" placeholder="Search alerts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-zinc-800 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-green-500 transition-colors text-sm" />
            </div>
            <button 
              onClick={handleBulkSendPending}
              className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 px-4 py-3 text-xs font-black uppercase tracking-wider transition-all inline-flex items-center gap-2 whitespace-nowrap rounded cursor-pointer"
            >
              <Zap className="h-4 w-4" /> Bulk Alert Pending
            </button>
          </div>
        )}
      </div>

      {activeTab === 'alerts' && (
         <div className="bg-[#1a1a1a] border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="bg-[#111111] border-b border-zinc-800 text-gray-400 text-xs uppercase tracking-wider font-bold">
                 <th className="p-4">Member</th>
                 <th className="p-4">Reason</th>
                 <th className="p-4 text-right">Actions (Instant Send)</th>
               </tr>
             </thead>
             <tbody>
               {loading ? <tr><td colSpan={3} className="text-center p-8 text-green-500 font-bold uppercase">Loading...</td></tr> : 
                displayMembers.length === 0 ? <tr><td colSpan={3} className="text-center p-12 text-gray-500">All caught up!</td></tr> : 
                displayMembers.map((member) => {
                   const isPending = member.paymentStatus !== "Paid";
                   
                   let expiryBadgeText = "Expiring Soon";
                   if (member.expiryDate) {
                     const daysLeft = Math.ceil((new Date(member.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                     if (daysLeft === 0) expiryBadgeText = "Expires Today";
                     else if (daysLeft > 0) expiryBadgeText = `Expires in ${daysLeft} Days`;
                     else expiryBadgeText = `Expired ${Math.abs(daysLeft)} Days Ago`;
                   }

                   let pendingBadgeText = "Payment Due";
                   if (isPending && member.createdAt) {
                     const daysPending = Math.max(0, Math.floor((new Date().getTime() - new Date(member.createdAt).getTime()) / (1000 * 60 * 60 * 24)));
                     pendingBadgeText = `${daysPending} Days Pending`;
                   }

                   return (
                     <tr key={member.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                       <td className="p-4">
                         <div className="font-bold text-white capitalize">{member.name}</div>
                         <div className="text-xs text-gray-500">{member.email || "No Email!"}</div>
                       </td>
                       <td className="p-4">
                         {isPending ? (
                           <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-red-500/10 text-red-500 border border-red-500/20">
                             {pendingBadgeText}
                           </span>
                         ) : (
                           <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-orange-500/10 text-orange-500 border border-orange-500/20">
                             {expiryBadgeText}
                           </span>
                         )}
                       </td>
                       <td className="p-4 text-right space-x-2">
                         <button onClick={() => handleSendAlert(member, 'custom')} className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-gray-400 border border-zinc-700 hover:border-white hover:text-white transition-colors rounded cursor-pointer">
                           Custom Msg
                         </button>
                         <button onClick={() => handleSendAlert(member, isPending ? 'payment' : 'expiry')} className="bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-[#111111] border border-green-500/20 px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-colors rounded inline-flex items-center gap-1 cursor-pointer">
                           <Send className="h-3 w-3" /> Auto Email
                         </button>
                       </td>
                     </tr>
                   )
                })}
             </tbody>
           </table>
         </div>
       </div>
      )}

      {/* TAB 2: PUBLIC INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="grid md:grid-cols-2 gap-6">
          {loading ? <div className="text-neon-green font-bold uppercase">Loading...</div> : 
           inquiries.length === 0 ? <div className="text-gray-500 col-span-2 text-center py-10">No public messages yet.</div> :
           inquiries.map((inq) => (
            <div key={inq.id} className={`bg-[#1a1a1a] p-6 border ${inq.isRead ? 'border-zinc-800 opacity-75' : 'border-neon-green shadow-[0_0_15px_rgba(179,230,0,0.1)]'} rounded-lg flex flex-col relative transition-all duration-300`}>
              {!inq.isRead && (
                <div className="absolute top-0 right-0 bg-neon-green text-[#111111] px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-lg rounded-tr-lg">
                  New Message
                </div>
              )}
              <div className="flex justify-between items-start mb-4 border-b border-zinc-800 pb-4 mt-2">
                <div>
                  <h4 className="font-black text-white capitalize text-lg flex items-center gap-2">
                    <Mail className={`h-4 w-4 ${inq.isRead ? 'text-gray-500' : 'text-neon-green'}`} /> {inq.firstName} {inq.lastName}
                  </h4>
                  <p className="text-xs text-gray-400 font-bold">{inq.email}</p>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">
                  {new Date(inq.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-white font-bold mb-2 uppercase tracking-wider">{inq.subject}</p>
              <p className="text-sm text-gray-400 flex-1 leading-relaxed italic">"{inq.message}"</p>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-zinc-800">
                <a href={`mailto:${inq.email}?subject=RE: ${inq.subject}`} className="flex-1 text-center bg-zinc-800 text-white px-4 py-3 font-black uppercase tracking-wider text-xs hover:bg-zinc-700 transition-colors rounded">
                  Reply via Email
                </a>
                {!inq.isRead && (
                  <button onClick={() => handleMarkAsRead(inq.id)} title="Mark as Read" className="bg-zinc-800 text-neon-green p-3 rounded hover:bg-neon-green hover:text-[#111111] transition-colors cursor-pointer">
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                )}
                <button onClick={() => handleDeleteInquiry(inq.id)} title="Delete Message" className="bg-zinc-800 text-red-500 p-3 rounded hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
           ))
          }
        </div>
      )}
    </div>
  );
}