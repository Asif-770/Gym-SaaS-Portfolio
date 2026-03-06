import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, html, memberName } = body;

    if (!to || !subject || !html) {
      return NextResponse.json({ success: false, message: "Missing email fields" }, { status: 400 });
    }

    // Strip HTML tags just so it looks clean in your VS Code terminal
    const cleanText = html.replace(/(<([^>]+)>)/gi, "");

    console.log(`\n📧 [EMAIL SERVER API] Background Email Sent!`);
    console.log(`👤 To: ${memberName} <${to}>`);
    console.log(`📝 Subject: ${subject}`);
    console.log(`💻 Body Snippet: "${cleanText.substring(0, 100)}..."\n`); 

    return NextResponse.json({ success: true, message: "Email processed successfully" });
  } catch (error) {
    console.error("Email API Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}