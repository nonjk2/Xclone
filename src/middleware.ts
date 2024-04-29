import { NextRequest, NextResponse } from "next/server";

import { updateSession } from "./lib/util/middleware";
export { default } from "next-auth/middleware";
export async function middleware(req: NextRequest) {
  // console.log("middleware");
  return await updateSession(req);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
