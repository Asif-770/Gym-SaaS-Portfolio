export default function ContactMap() {
  return (
    <section className="w-full h-[500px] bg-[#1a1a1a] relative grayscale hover:grayscale-0 transition-all duration-700">
      {/* HOW TO ADD YOUR EXACT GYM LOCATION:
        1. Go to Google Maps (maps.google.com) and search for your specific gym address.
        2. Click the "Share" button.
        3. Click the "Embed a map" tab.
        4. Click "Copy HTML".
        5. Extract ONLY the URL inside the src="..." attribute and paste it below.
      */}
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117075.52358434682!2d87.23438404313264!3d23.51179667793139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7710b47a75561%3A0x6bd7fc36d97ab5d!2sDurgapur%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
}