import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServicesVideo from "@/components/services/ServicesVideo";
import ServicesFAQ from "@/components/services/ServicesFAQ";
import ServicesSchedule from "@/components/services/ServicesSchedule";
import PricingCTA from "@/components/pricing/PricingCTA";

export default function ServicesPage() {
  return (
    <div className="w-full">
      <ServicesHero />
      <ServicesGrid />
      <ServicesVideo />
      <ServicesFAQ />
      <ServicesSchedule />
      <PricingCTA />
    </div>
  );
}