import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactMap from "@/components/contact/ContactMap";

export default function ContactPage() {
  return (
    <div className="w-full">
      <ContactHero />
      <ContactDetails />
      <ContactMap />
    </div>
  );
}