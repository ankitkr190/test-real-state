import { NextRequest, NextResponse } from "next/server";

// This function can be marked as `async` if using `await` inside
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies.get("authUser");

  if (cookie && pathname?.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (cookie === undefined && !pathname?.startsWith("/login")) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below
export const config = {
  matcher: ["/login", "/"],
};
