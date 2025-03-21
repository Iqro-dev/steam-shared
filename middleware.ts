import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const steamIdCookie = request.cookies.get("steam-id");

  if (steamIdCookie?.value) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
