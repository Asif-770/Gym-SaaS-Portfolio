"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, Lock, Mail } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* NEW: BACK TO HOME BUTTON */}
      <Link 
        href="/" 
        className="absolute top-8 left-6 md:left-12 flex items-center gap-2 text-gray-400 hover:text-neon-green font-bold text-sm uppercase tracking-wider transition-colors z-50"
      >
        <ArrowLeft className="h-5 w-5" /> Back to Home
      </Link>
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-green/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#1a1a1a] p-10 border border-zinc-800 relative z-10 shadow-2xl shadow-black/50">
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Dumbbell className="h-8 w-8 text-neon-green" />
            <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
              MY <span className="text-neon-green">FITNESS</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">Admin Portal</h2>
          <p className="text-gray-400 text-sm mt-2">Sign in to manage your gym</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 mb-6 text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#111111] border border-zinc-800 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-neon-green transition-colors font-medium"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#111111] border border-zinc-800 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-neon-green transition-colors font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neon-green text-[#111111] py-4 font-black uppercase tracking-wider text-sm hover:bg-[#b3e600] transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}