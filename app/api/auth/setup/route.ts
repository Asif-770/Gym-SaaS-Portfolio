import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    // Check if admin already exists to prevent duplicates
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: "admin@myfitness.com" },
    });

    if (existingAdmin) {
      return NextResponse.json({ message: "Admin already exists!" });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create the admin user in Supabase
    const admin = await prisma.admin.create({
      data: {
        email: "admin@myfitness.com",
        password: hashedPassword,
        name: "Super Admin",
      },
    });

    return NextResponse.json({ message: "Admin user created successfully!", admin });
  } catch (error) {
    console.error("Setup Error:", error);
    return NextResponse.json({ message: "Error creating admin" }, { status: 500 });
  }
}