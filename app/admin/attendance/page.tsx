"use client";

import { useState, useEffect } from "react";
import { CalendarCheck, Search, Check, X, User, TrendingUp, Activity } from "lucide-react";

export default function AttendancePage() {
  const [members, setMembers] = useState<any[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(true);
  const [statsModalMember, setStatsModalMember] = useState<any>(null);

  // Fetch Members and Attendance when the page loads or date changes
  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all members
      const membersRes = await fetch("/api/members");
      const membersData = await membersRes.json();
      
      // Fetch attendance specifically for the chosen date
      const attendanceRes = await fetch(`/api/attendance?date=${selectedDate}`);
      const attendanceData = await attendanceRes.json();

      setMembers(membersData.members || []);
      setAttendanceRecords(attendanceData.records || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (memberId: string, status: string) => {
    try {
      // Optimistic UI Update (makes the button click feel instant)
      const newRecords = [...attendanceRecords];
      const existingIndex = newRecords.findIndex(r => r.memberId === memberId);
      
      if (existingIndex >= 0) {
        newRecords[existingIndex].status = status;
      } else {
        newRecords.push({ memberId, status, date: selectedDate });
      }
      setAttendanceRecords(newRecords);

      // Send to Database
      await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId, status, date: selectedDate }),
      });
    } catch (error) {
      console.error("Failed to mark attendance", error);
      fetchData(); // Revert to database state if it fails
    }
  };

  const filteredMembers = members.filter(member => 
    (member.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
    (member.phone || "").includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tight mb-2 flex items-center gap-3">
            <CalendarCheck className="h-8 w-8 text-neon-green" /> Attendance Register
          </h2>
          <p className="text-gray-400 text-sm">Mark daily check-ins for your active gym members.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Date Picker */}
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-[#1a1a1a] border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-neon-green transition-colors text-sm font-bold uppercase"
          />

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search Member..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-zinc-800 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-neon-green transition-colors text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-zinc-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#111111] border-b border-zinc-800 text-gray-400 text-xs uppercase tracking-wider font-bold">
                <th className="p-4">Member Info</th>
                <th className="p-4">Contact</th>
                <th className="p-4 text-center">Current Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center p-8 text-gray-500 font-medium">Loading register...</td></tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-12">
                    <User className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">No members found.</p>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => {
                  // Find if this member has an attendance record for the selected date
                  const record = attendanceRecords.find(r => r.memberId === member.id);
                  const status = record ? record.status : "Unmarked";

                  return (
                    <tr key={member.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white capitalize">{member.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{member.plan?.name}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-400">{member.phone}</td>
                      
                      <td className="p-4 text-center">
                        {status === "Present" && <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-green-500/10 text-green-500 border border-green-500/20">Present</span>}
                        {status === "Absent" && <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-red-500/10 text-red-500 border border-red-500/20">Absent</span>}
                        {status === "Unmarked" && <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-zinc-800 text-gray-400 border border-zinc-700">Unmarked</span>}
                      </td>

                      <td className="p-4 text-right space-x-2">
                        {/* Mark Present */}
                        <button 
                          onClick={() => markAttendance(member.id, "Present")}
                          className={`p-2 rounded transition-colors inline-flex items-center justify-center ${
                            status === "Present" ? "bg-green-500 text-[#111111]" : "text-gray-500 hover:text-green-500 hover:bg-green-500/10 border border-transparent hover:border-green-500/20"
                          }`}
                          title="Mark Present"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        
                        {/* Mark Absent */}
                        <button 
                          onClick={() => markAttendance(member.id, "Absent")}
                          className={`p-2 rounded transition-colors inline-flex items-center justify-center ${
                            status === "Absent" ? "bg-red-500 text-white" : "text-gray-500 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
                          }`}
                          title="Mark Absent"
                        >
                          <X className="h-4 w-4" />
                        </button>

                        {/* NEW: Check Total Attendance History */}
                        {/* Check Total Attendance History */}
                        <button 
                          onClick={() => setStatsModalMember(member)}
                          className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-500/10 rounded transition-colors inline-flex items-center justify-center border border-transparent hover:border-blue-500/20"
                          title="View Attendance Stats"
                        >
                          <TrendingUp className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* STATS MODAL POPUP */}
      {statsModalMember && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1a1a1a] border border-zinc-800 rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-black text-white italic uppercase flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" /> Member Stats
              </h3>
              <button 
                onClick={() => setStatsModalMember(null)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="text-center">
                <h4 className="text-2xl font-black text-white capitalize">{statsModalMember.name}</h4>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">{statsModalMember.plan?.name || "No Plan"}</p>
              </div>

              <div className="flex justify-center items-center gap-8 py-4 border-y border-zinc-800/50">
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Present</p>
                  <p className="text-4xl font-black text-blue-500 italic">{statsModalMember._count?.attendance || 0}</p>
                  <p className="text-xs text-gray-400 font-medium mt-1">Days</p>
                </div>
              </div>

              {/* Dynamic Rating Logic */}
              <div className="text-center">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Performance Rating</p>
                {(() => {
                  const presentDays = statsModalMember._count?.attendance || 0;
                  const joinDate = new Date(statsModalMember.joiningDate);
                  const today = new Date();
                  const daysSinceJoined = Math.max(1, Math.ceil((today.getTime() - joinDate.getTime()) / (1000 * 3600 * 24)));
                  const percentage = (presentDays / daysSinceJoined) * 100;

                  if (presentDays === 0) {
                    return <span className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 font-black uppercase tracking-wider text-xs rounded-full">Poor (0 Days)</span>;
                  } else if (percentage >= 75) {
                    return <span className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-500 font-black uppercase tracking-wider text-xs rounded-full">Excellent (Coming Daily)</span>;
                  } else if (percentage >= 40) {
                    return <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 font-black uppercase tracking-wider text-xs rounded-full">Good Consistency</span>;
                  } else {
                    return <span className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-500 font-black uppercase tracking-wider text-xs rounded-full">Poor Attendance</span>;
                  }
                })()}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-zinc-800 bg-[#111111]">
              <button 
                onClick={() => setStatsModalMember(null)}
                className="w-full bg-zinc-800 text-white px-6 py-3 font-black uppercase tracking-wider text-xs hover:bg-zinc-700 transition-colors"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}