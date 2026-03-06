import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, message } = body;

    if (!phone || !message) {
      return NextResponse.json({ success: false, message: "Phone and message are required" }, { status: 400 });
    }

    // Format phone number (remove +, spaces, dashes to ensure it's clean for APIs)
    const formattedPhone = phone.replace(/\D/g, '');

    // ============================================================================
    // FUTURE WHATSAPP PROVIDER LOGIC GOES HERE (Twilio, Meta, UltraMsg, etc.)
    // Example: await axios.post('https://api.whatsapp-provider.com/send', { to: formattedPhone, body: message })
    // ============================================================================

    // For now, we simulate a successful background send so your Cron job doesn't break
    console.log(`\n🟢 [WHATSAPP SERVER API] Background Message Sent!`);
    console.log(`📱 To: ${formattedPhone}`);
    console.log(`💬 Message: ${message}\n`);

    return NextResponse.json({ success: true, message: "Message processed successfully" });
  } catch (error) {
    console.error("WhatsApp API Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}