import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Fetch attendance records for a specific date
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");
    
    // Default to today if no date is provided
    let targetDate = new Date();
    if (dateParam) {
      targetDate = new Date(dateParam);
    }
    
    // Set time to beginning and end of the selected day
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const records = await prisma.attendance.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        }
      }
    });

    return NextResponse.json({ records });
  } catch (error) {
    console.error("Attendance GET Error:", error);
    return NextResponse.json({ message: "Error fetching attendance" }, { status: 500 });
  }
}

// POST: Mark or Update attendance for a member
export async function POST(req: Request) {
  try {
    const { memberId, status, date } = await req.json();
    
    const targetDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(new Date(targetDate).setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date(targetDate).setHours(23, 59, 59, 999));

    // Check if the member already has an attendance record for this exact day
    const existingRecord = await prisma.attendance.findFirst({
      where: {
        memberId: memberId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        }
      }
    });

    if (existingRecord) {
      // If record exists, UPDATE it (e.g., changed mind from Absent to Present)
      const updated = await prisma.attendance.update({
        where: { id: existingRecord.id },
        data: { status }
      });
      return NextResponse.json({ message: "Attendance updated", record: updated });
    } else {
      // If no record, CREATE a new one
      const created = await prisma.attendance.create({
        data: {
          memberId,
          status,
          date: targetDate
        }
      });
      return NextResponse.json({ message: "Attendance marked", record: created });
    }
  } catch (error) {
    console.error("Attendance POST Error:", error);
    return NextResponse.json({ message: "Error marking attendance" }, { status: 500 });
  }
}