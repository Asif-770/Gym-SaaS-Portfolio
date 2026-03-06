import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Basic security so random people don't trigger this (we will use this in production)
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    const today = new Date();

    // Find everyone whose expiry date is in the past, AND who are currently marked as "Paid"
    // and automatically update them to "Pending"
    const result = await prisma.member.updateMany({
      where: {
        expiryDate: {
          lt: today, // "lt" means Less Than today (in the past)
        },
        paymentStatus: "Paid", // Only change people who haven't already been marked Pending
      },
      data: {
        paymentStatus: "Pending",
      },
    });

    return NextResponse.json({ 
      message: "Automated status update complete", 
      membersUpdated: result.count 
    });
  } catch (error) {
    console.error("Cron Error:", error);
    return NextResponse.json({ message: "Error updating statuses" }, { status: 500 });
  }
}