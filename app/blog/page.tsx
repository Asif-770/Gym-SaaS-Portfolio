import BlogHero from "@/components/blog/BlogHero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogGrid from "@/components/blog/BlogGrid";
import PricingCTA from "@/components/pricing/PricingCTA";

export default function BlogPage() {
  return (
    <div className="w-full">
      <BlogHero />
      <FeaturedPost />
      <BlogGrid />
      <PricingCTA />
    </div>
  );
}