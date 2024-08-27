import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode("SecurityInsure");

export async function middleware(req) {
  const cookie = req.cookies.get("authToken");
  const token = cookie?.value;

  const loginPath = "/auth/login";
  const adminPath = "/admin/dashboard";

  if (!token) {
    if (req.nextUrl.pathname.startsWith(adminPath)) {
      return NextResponse.redirect(new URL(loginPath, req.url));
    }
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (req.nextUrl.pathname === loginPath && payload.role === "admin") {
      return NextResponse.redirect(new URL(adminPath, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);

    return NextResponse.redirect(new URL(loginPath, req.url));
  }
}

export const config = {
  matcher: ["/auth/login", "/admin/:path*"],
};
