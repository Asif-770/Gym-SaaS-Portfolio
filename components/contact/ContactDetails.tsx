"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactDetails() {
  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  
  // Status to show loading/success to the user
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending...");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus("Message Sent Successfully!");
        // Clear the form
        setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
        
        // Reset the button text after 3 seconds
        setTimeout(() => {
          setStatus("");
        }, 3000);
      } else {
        setStatus("Failed to send. Try again.");
      }
    } catch (error) {
      setStatus("Error occurred. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Side: Contact Info */}
        <div className="flex flex-col gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-neon-green rotate-45"></div>
              <p className="text-white text-xs font-bold uppercase tracking-widest italic">Get In Touch</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tight uppercase mb-6">
              LET'S TALK ABOUT YOUR <span className="text-neon-green">FITNESS</span> GOALS
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Ut elit dolor, dictum non libero.
            </p>
          </div>

          {/* Info Blocks */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-[#1a1a1a] p-6 border-l-4 border-neon-green">
              <MapPin className="h-8 w-8 text-neon-green mb-4" />
              <h3 className="text-lg font-black text-white italic uppercase mb-2">Our Location</h3>
              <p className="text-gray-400 text-sm">123 Fitness Street, Gym City, NY 10001</p>
            </div>
            
            <div className="bg-[#1a1a1a] p-6 border-l-4 border-zinc-800 hover:border-neon-green transition-colors">
              <Phone className="h-8 w-8 text-neon-green mb-4" />
              <h3 className="text-lg font-black text-white italic uppercase mb-2">Call Us</h3>
              <p className="text-gray-400 text-sm">+62-34578904325</p>
            </div>

            <div className="bg-[#1a1a1a] p-6 border-l-4 border-zinc-800 hover:border-neon-green transition-colors">
              <Mail className="h-8 w-8 text-neon-green mb-4" />
              <h3 className="text-lg font-black text-white italic uppercase mb-2">Email Us</h3>
              <p className="text-gray-400 text-sm">support@myfitness.com</p>
            </div>

            <div className="bg-[#1a1a1a] p-6 border-l-4 border-zinc-800 hover:border-neon-green transition-colors">
              <Clock className="h-8 w-8 text-neon-green mb-4" />
              <h3 className="text-lg font-black text-white italic uppercase mb-2">Open Hours</h3>
              <p className="text-gray-400 text-sm">Mon - Sun: 24/7 Hours</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-[#1a1a1a] p-8 md:p-12 border border-zinc-800/50 relative">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-neon-green flex items-center justify-center">
             <div className="w-8 h-8 border-2 border-[#111111]"></div>
          </div>

          <h3 className="text-3xl font-black text-white italic uppercase mb-8">Send Us A Message</h3>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input 
                type="text" 
                required
                placeholder="First Name" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full bg-transparent border-b border-zinc-700 text-white p-4 focus:outline-none focus:border-neon-green transition-colors placeholder:text-gray-600 font-medium" 
              />
              <input 
                type="text" 
                required
                placeholder="Last Name" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full bg-transparent border-b border-zinc-700 text-white p-4 focus:outline-none focus:border-neon-green transition-colors placeholder:text-gray-600 font-medium" 
              />
            </div>
            
            <input 
              type="email" 
              required
              placeholder="Email Address" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-transparent border-b border-zinc-700 text-white p-4 focus:outline-none focus:border-neon-green transition-colors placeholder:text-gray-600 font-medium" 
            />
            
            <input 
              type="text" 
              required
              placeholder="Subject" 
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full bg-transparent border-b border-zinc-700 text-white p-4 focus:outline-none focus:border-neon-green transition-colors placeholder:text-gray-600 font-medium" 
            />

            <textarea 
              required
              placeholder="Write your message here..." 
              rows={5} 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-transparent border-b border-zinc-700 text-white p-4 focus:outline-none focus:border-neon-green transition-colors placeholder:text-gray-600 font-medium resize-none"
            ></textarea>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="self-start bg-neon-green text-[#111111] px-10 py-5 font-black uppercase tracking-wider text-sm hover:bg-[#b3e600] transition-colors skew-x-[-12deg] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="skew-x-[12deg]">{status || "Send Message"}</div>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}