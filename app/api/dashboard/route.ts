import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();

    const totalMembers = await prisma.member.count();
    const activeMembers = await prisma.member.count({
      where: { expiryDate: { gt: today } },
    });

    const paidMembers = await prisma.member.findMany({
      where: { paymentStatus: "Paid" },
      include: { plan: true }
    });
    
    const totalRevenue = paidMembers.reduce((sum, member) => sum + (member.plan?.price || 0), 0);

    const paymentDueMembers = await prisma.member.count({
      where: { paymentStatus: { in: ["Pending", "Partial"] } }
    });

    const recentMembers = await prisma.member.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { plan: true }
    });

    // NEW: Fetch all members with their attendance counts to find the #1 most active
    const membersWithStats = await prisma.member.findMany({
      include: {
        _count: { select: { attendance: { where: { status: "Present" } } } }
      }
    });

    // Sort them from highest attendance to lowest, and grab the top 1
    let topMember = null;
    if (membersWithStats.length > 0) {
      topMember = membersWithStats.sort((a, b) => b._count.attendance - a._count.attendance)[0];
    }

    return NextResponse.json({
      stats: { totalMembers, activeMembers, totalRevenue, paymentDueMembers },
      recentMembers,
      topMember // Added to response!
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ message: "Error fetching dashboard data" }, { status: 500 });
  }
}