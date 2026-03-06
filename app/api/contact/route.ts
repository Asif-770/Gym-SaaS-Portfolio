import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, subject, message } = body;

    const newInquiry = await prisma.inquiry.create({
      data: { firstName, lastName, email, subject, message }
    });

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ success: false, message: "Error sending message" }, { status: 500 });
  }
}

// GET route for the Admin Panel to read the messages
export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ inquiries });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching inquiries" }, { status: 500 });
  }
}