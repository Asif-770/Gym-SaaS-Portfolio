import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "The Ultimate Guide To Proper Nutrition Before Workout",
    category: "Nutrition",
    date: "Oct 20, 2024",
    image: "/images/nut-2.avif",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque."
  },
  {
    title: "How To Stay Motivated During Winter Training",
    category: "Mindset",
    date: "Oct 18, 2024",
    image: "/images/nut-3.avif",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque."
  },
  {
    title: "5 Common Deadlift Mistakes You Need To Avoid",
    category: "Training",
    date: "Oct 15, 2024",
    image: "/images/nut-4.jpg",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque."
  },
  {
    title: "Why Rest Days Are Crucial For Your Fitness Journey",
    category: "Recovery",
    date: "Oct 10, 2024",
    image: "/images/blog-1.avif",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque."
  },
  {
    title: "Top 10 Cardio Exercises To Burn Fat Fast",
    category: "Cardio",
    date: "Oct 05, 2024",
    image: "/images/trainer-1.jpg",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque."
  },
  {
    title: "Mastering The Pull-Up: From Zero To Hero",
    category: "Training",
    date: "Oct 01, 2024",
    image: "/images/trainer-2.jpg",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nam vel cras id neque pellentesque."
  }
];

export default function BlogGrid() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 pb-32 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="w-2 h-2 bg-neon-green rotate-45 mb-4"></div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic">
            RECENT <span className="text-neon-green">POSTS</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="bg-[#1a1a1a] flex flex-col group border border-zinc-800 hover:border-neon-green transition-colors duration-300">
              
              <div className="relative h-[250px] w-full overflow-hidden">
                <Image
                  src={post.image} // Make sure to add 6 placeholder images to your public/images folder
                  alt={post.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-neon-green text-[#111111] px-3 py-1 font-black italic uppercase text-[10px]">
                  {post.category}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-bold text-neon-green uppercase tracking-wider mb-4">
                  <Calendar className="h-3 w-3" />
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-xl font-black text-white italic uppercase mb-4 leading-tight group-hover:text-neon-green transition-colors">
                  <Link href={`/blog/${index}`}>{post.title}</Link>
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${index}`}
                  className="font-black uppercase tracking-wider text-xs flex items-center gap-2 text-white hover:text-neon-green transition-colors mt-auto"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-16 flex justify-center">
          <button className="bg-transparent border-2 border-neon-green text-neon-green px-10 py-4 font-black uppercase tracking-wider text-sm hover:bg-neon-green hover:text-[#111111] transition-colors skew-x-[-12deg]">
            <div className="skew-x-[12deg]">Load More</div>
          </button>
        </div>

      </div>
    </section>
  );
}