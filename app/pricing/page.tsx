import PricingHero from "@/components/pricing/PricingHero";
import PricingCards from "@/components/pricing/PricingCards";
import PricingFeatures from "@/components/pricing/PricingFeatures";
import PricingCTA from "@/components/pricing/PricingCTA";

export default function PricingPage() {
  return (
    <div className="w-full">
      <PricingHero />
      <PricingCards />
      <PricingFeatures />
      <PricingCTA />
    </div>
  );
}