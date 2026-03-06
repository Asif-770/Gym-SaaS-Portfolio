import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // Delete the cookie by setting its expiration date to the past
    response.cookies.set({
      name: "admin_token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0), // Expires immediately
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging out" },
      { status: 500 }
    );
  }
}