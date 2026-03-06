import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const resolvedParams = await context.params;
    
    // SAFETY CHECK: Are there any members using this plan?
    const membersCount = await prisma.member.count({
      where: { planId: resolvedParams.id }
    });

    if (membersCount > 0) {
      return NextResponse.json(
        { message: `Cannot delete: ${membersCount} members are currently using this plan.` }, 
        { status: 400 }
      );
    }

    // If safe, delete the plan
    await prisma.plan.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Delete plan error:", error);
    return NextResponse.json({ message: "Error deleting plan" }, { status: 500 });
  }
}