import { authOption } from "@/auth";
import NextAuth from "next-auth";

const handlers = NextAuth(authOption);

export { handlers as GET, handlers as POST };
