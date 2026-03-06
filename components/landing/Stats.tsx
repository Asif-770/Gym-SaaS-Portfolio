import Image from "next/image";
import { Users, Award, MapPin } from "lucide-react";

export default function Stats() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="w-2 h-2 bg-neon-green rotate-45 mb-4"></div>
          <h2 className="text-white font-black uppercase tracking-widest text-lg italic mb-2">
            What We Have Achieved
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="bg-[#1a1a1a] p-8 flex items-center gap-6 border-b-2 border-transparent hover:border-neon-green transition-colors">
            <Users className="text-neon-green h-12 w-12" />
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Student Taught</p>
              <h3 className="text-4xl font-black text-white italic">4390+</h3>
            </div>
          </div>
          <div className="bg-[#1a1a1a] p-8 flex items-center gap-6 border-b-2 border-transparent hover:border-neon-green transition-colors">
            <Award className="text-neon-green h-12 w-12" />
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Expert Trainers</p>
              <h3 className="text-4xl font-black text-white italic">150+</h3>
            </div>
          </div>
          <div className="bg-[#1a1a1a] p-8 flex items-center gap-6 border-b-2 border-transparent hover:border-neon-green transition-colors">
            <MapPin className="text-neon-green h-12 w-12" />
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Total Branches</p>
              <h3 className="text-4xl font-black text-white italic">50+</h3>
            </div>
          </div>
        </div>

        {/* Bottom Section: Image + Progress Bars */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center bg-[#1a1a1a] p-8 lg:p-12">
          
          {/* Image */}
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/trainer-1.jpg" // Add an image of a fitness group
              alt="Group Training"
              fill
              className="object-cover"
            />
            {/* Floating green badge */}
            <div className="absolute -bottom-6 -left-6 bg-neon-green text-[#111111] p-6 max-w-[200px]">
              <p className="font-black italic uppercase leading-tight">We Are Giving You The Best Training</p>
            </div>
          </div>

          {/* Progress Bars */}
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-white italic mb-6">
              We Are Giving You The Best Training Ever
            </h3>
            <p className="text-gray-400 text-sm mb-10 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque. Ut elit dolor, dictum non libero.
            </p>

            <div className="space-y-6">
              {/* Bar 1 */}
              <div>
                <div className="flex justify-between text-white font-bold uppercase text-xs tracking-wider italic mb-2">
                  <span>Body Building</span>
                  <span>95%</span>
                </div>
                <div className="w-full bg-[#111111] h-1.5">
                  <div className="bg-neon-green h-1.5" style={{ width: "95%" }}></div>
                </div>
              </div>
              {/* Bar 2 */}
              <div>
                <div className="flex justify-between text-white font-bold uppercase text-xs tracking-wider italic mb-2">
                  <span>Yoga</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-[#111111] h-1.5">
                  <div className="bg-neon-green h-1.5" style={{ width: "85%" }}></div>
                </div>
              </div>
              {/* Bar 3 */}
              <div>
                <div className="flex justify-between text-white font-bold uppercase text-xs tracking-wider italic mb-2">
                  <span>Health Fitness</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-[#111111] h-1.5">
                  <div className="bg-neon-green h-1.5" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}