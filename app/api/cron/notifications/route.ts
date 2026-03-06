import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Basic security so random people don't trigger your APIs
    // const authHeader = req.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return new Response('Unauthorized', { status: 401 });
    // }

    // Find the date exactly 5 days from today
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);
    
    // Set to start and end of that specific day
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    // Query members whose expiry date falls exactly on that day
    const membersToNotify = await prisma.member.findMany({
      where: {
        expiryDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: { plan: true },
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // LOOP THROUGH EXPIRING MEMBERS
    for (const member of membersToNotify) {
      
      // 1. PRIMARY SYSTEM: AUTOMATED EMAIL (FREE & RELIABLE)
      // Only send if they actually have an email address in the database
      if (member.email) {
        const emailSubject = `Action Required: Your Gym Membership is Expiring Soon!`;
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #111; text-transform: uppercase; font-style: italic;">Hey ${member.name},</h2>
            <p style="color: #444; font-size: 16px; line-height: 1.5;">
              This is a friendly reminder that your <strong>${member.plan?.name || "gym"}</strong> membership expires in exactly 5 days.
            </p>
            <p style="color: #444; font-size: 16px; line-height: 1.5;">
              Don't lose your momentum! Please visit the front desk or reply to this email to renew your plan.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
              Let's crush those fitness goals.<br/>- Gym Management
            </p>
          </div>
        `;

        await fetch(`${baseUrl}/api/email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: member.email,
            subject: emailSubject,
            html: emailHtml,
            memberName: member.name
          })
        });
      }

      // =========================================================================
      // 2. PREMIUM UPSELL SYSTEM: AUTOMATED WHATSAPP
      // (Uncomment this block when a client pays for the WhatsApp Business API)
      // =========================================================================
      /*
      if (member.phone) {
        const waMessage = `Hi ${member.name}, friendly reminder from the Gym! Your ${member.plan?.name || "membership"} expires in exactly 5 days. Please renew soon to keep your streak going! 🏋️‍♂️`;
        
        await fetch(`${baseUrl}/api/whatsapp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: member.phone, message: waMessage })
        });
      }
      */
    }

    return NextResponse.json({ 
      message: "Cron executed successfully", 
      emailsSent: membersToNotify.filter(m => m.email).length,
      members: membersToNotify 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Cron error" }, { status: 500 });
  }
}