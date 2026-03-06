import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Notice the function name is now 'proxy' instead of 'middleware'
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect all /admin routes except the login page itself
  const isProtectedAdminRoute = path.startsWith("/admin") && path !== "/admin/login";
  
  // Get the token from cookies
  const token = request.cookies.get("admin_token")?.value;

  if (isProtectedAdminRoute && !token) {
    // Redirect unauthenticated users to the admin login page
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // If they are on the login page but already have a token, redirect to dashboard
  if (path === "/admin/login" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

// Specify the paths the proxy should run on
export const config = {
  matcher: ["/admin/:path*"],
};