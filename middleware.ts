import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import {NextResponse} from "next/server";

const {auth} = NextAuth(authConfig);
export default auth((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const user = req.auth?.user;
  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAPIAuthRoute) {
    return NextResponse.next();
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      if (user?.role === "ADMIN") {
      } else {
        return Response.redirect(new URL("/menu", nextUrl));
      }
    }
    return NextResponse.next();
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
