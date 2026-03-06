import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      include: { _count: { select: { members: true } } },
      orderBy: { duration: 'asc' }
    });
    return NextResponse.json({ plans });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching plans" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, duration, price, description, isPopular } = body;

    // If marked as popular, un-mark all the others first
    if (isPopular) {
      await prisma.plan.updateMany({
        data: { isPopular: false }
      });
    }

    const newPlan = await prisma.plan.create({
      data: {
        name,
        duration: Number(duration),
        price: Number(price),
        description,
        isPopular: Boolean(isPopular) // Save to DB
      }
    });
    
    return NextResponse.json({ message: "Plan created successfully", plan: newPlan });
  } catch (error) {
    console.error("Create plan error:", error);
    return NextResponse.json({ message: "Error creating plan" }, { status: 500 });
  }
}