import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const steamIdCookie = request.cookies.get("steam-id");

  if (steamIdCookie?.value) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/profile/:path*",
};
