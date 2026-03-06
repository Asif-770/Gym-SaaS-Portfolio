"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  CalendarCheck, 
  MessageSquare, 
  LogOut, 
  Dumbbell 
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show the sidebar on the login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Members", href: "/admin/members", icon: Users },
    { name: "Plans", href: "/admin/plans", icon: CreditCard },
    { name: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  ];

  const handleLogout = async () => {
    // Next.js Route to clear the cookie (we will build this next)
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="fixed inset-0 z-[100] flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] border-r border-zinc-800 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-zinc-800">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-neon-green" />
            <span className="font-black text-xl uppercase italic">
              MY <span className="text-neon-green">ADMIN</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-colors ${
                  isActive 
                    ? "bg-neon-green text-[#111111]" 
                    : "text-gray-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-bold text-sm text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-[#111111] border-b border-zinc-800 flex items-center justify-between px-8">
          <h1 className="text-xl font-black uppercase italic">
            {navItems.find(item => pathname.startsWith(item.href))?.name || "Admin Portal"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
              <span className="font-bold text-sm text-neon-green">SA</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold">Super Admin</p>
              <p className="text-xs text-gray-400">admin@myfitness.com</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>

    </div>
  );
}