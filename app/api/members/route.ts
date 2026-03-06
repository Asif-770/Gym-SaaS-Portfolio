import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET ALL MEMBERS (For the table & search)
// GET ALL MEMBERS (For the table & search)
export async function GET() {
  try {
    const members = await prisma.member.findMany({
      include: {
        plan: true,
        // NEW: This tells Prisma to count exactly how many "Present" days they have
        _count: {
          select: {
            attendance: {
              where: { status: "Present" }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json({ members });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json({ message: "Error fetching members" }, { status: 500 });
  }
}

// ADD NEW MEMBER (From the Add page)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, address, joiningDate, paymentStatus, planId } = body;

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ message: "Invalid Plan Selected" }, { status: 400 });
    }

    const joinDateObj = new Date(joiningDate);
    const expiryDateObj = new Date(joinDateObj);
    expiryDateObj.setMonth(expiryDateObj.getMonth() + plan.duration);

    const newMember = await prisma.$transaction(async (tx) => {
      const member = await tx.member.create({
        data: {
          name,
          phone,
          email,
          address,
          joiningDate: joinDateObj,
          expiryDate: expiryDateObj,
          paymentStatus,
          planId,
        },
      });

      await tx.payment.create({
        data: {
          memberId: member.id,
          amount: plan.price,
          date: joinDateObj,
          status: paymentStatus,
        },
      });

      return member;
    });

    return NextResponse.json({ message: "Member created successfully", member: newMember });
  } catch (error) {
    console.error("Error creating member:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}