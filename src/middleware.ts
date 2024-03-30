import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "./auth";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";
const secret = process.env.NEXTAUTH_SECRET;
// export { auth as middleware } from "./auth";
export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret });
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
};
