import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const {
    url,
    nextUrl: { pathname },
  } = request;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/requirements", url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
