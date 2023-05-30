import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const pathname = req.nextUrl.pathname;
    const isAuthPage =
      pathname.startsWith(`/login`) || pathname.startsWith(`/registration`);
    const isAuth = !!token;

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL(`/`, req.url));
      }
      return null;
    }
    if (!isAuth) {
      let callbackUrl = pathname;

      if (req.nextUrl.search) {
        callbackUrl += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(
          `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
          req.url
        )
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/login", "/registration", "/"],
};
