import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Mark as Read
export async function PATCH(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const resolvedParams = await context.params;
    const updatedInquiry = await prisma.inquiry.update({
      where: { id: resolvedParams.id },
      data: { isRead: true }
    });
    return NextResponse.json({ success: true, inquiry: updatedInquiry });
  } catch (error) {
    return NextResponse.json({ message: "Error marking as read" }, { status: 500 });
  }
}

// Delete Message
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const resolvedParams = await context.params;
    await prisma.inquiry.delete({
      where: { id: resolvedParams.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting message" }, { status: 500 });
  }
}