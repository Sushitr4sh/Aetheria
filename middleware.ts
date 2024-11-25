import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isAuthenticated = !!req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

    // If user is not authenticated and trying to access protected route
    if (!isAuthenticated && !isAuthPage) {
      const signInUrl = new URL("/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // If user is authenticated and trying to access auth page
    if (isAuthenticated && isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

// Protect these routes - only routes that need authentication
export const config = {
  matcher: ["/profile", "/journals/:path*", "/contact"],
};
