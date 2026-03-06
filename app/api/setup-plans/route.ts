import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const plansCount = await prisma.plan.count();
    if (plansCount > 0) {
      return NextResponse.json({ message: "Plans already exist." });
    }

    // Creating the specific plans you requested
    await prisma.plan.createMany({
      data: [
        { name: "1 Month Basic", duration: 1, price: 19.00, description: "Monthly rolling plan" },
        { name: "3 Months Standard", duration: 3, price: 50.00, description: "Quarterly commitment" },
        { name: "4 Months Flex", duration: 4, price: 65.00, description: "Four month special" },
        { name: "6 Months Pro", duration: 6, price: 90.00, description: "Half-year commitment" },
        { name: "1 Year Ultimate", duration: 12, price: 150.00, description: "Annual VIP plan" },
      ],
    });

    return NextResponse.json({ message: "Plans created successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Error setting up plans" }, { status: 500 });
  }
}