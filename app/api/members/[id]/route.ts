import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET a single member for the Edit Form & View Page
export async function GET(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const resolvedParams = await context.params; // Safe unwrapping
    const member = await prisma.member.findUnique({
      where: { id: resolvedParams.id },
      include: { plan: true },
    });
    
    if (!member) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ member });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching member" }, { status: 500 });
  }
}

// UPDATE a member
export async function PUT(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const resolvedParams = await context.params;
    const body = await req.json();
    const { name, phone, email, address, joiningDate, paymentStatus, planId } = body;

    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) return NextResponse.json({ message: "Invalid Plan" }, { status: 400 });

    const joinDateObj = new Date(joiningDate);
    const expiryDateObj = new Date(joinDateObj);
    expiryDateObj.setMonth(expiryDateObj.getMonth() + plan.duration);

    const updatedMember = await prisma.member.update({
      where: { id: resolvedParams.id },
      data: {
        name, phone, email, address, paymentStatus, planId,
        joiningDate: joinDateObj,
        expiryDate: expiryDateObj,
      },
    });

    return NextResponse.json({ message: "Member updated", member: updatedMember });
  } catch (error) {
    return NextResponse.json({ message: "Error updating member" }, { status: 500 });
  }
}

// DELETE a member
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const resolvedParams = await context.params;
    await prisma.$transaction([
      prisma.payment.deleteMany({ where: { memberId: resolvedParams.id } }),
      prisma.attendance.deleteMany({ where: { memberId: resolvedParams.id } }),
      prisma.member.delete({ where: { id: resolvedParams.id } })
    ]);
    return NextResponse.json({ message: "Member deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting member" }, { status: 500 });
  }
}