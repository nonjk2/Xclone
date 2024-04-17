import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: authUser & DefaultSession["user"];
    supabaseAccessToken?: string;
  }

  interface DefaultJWT {
    role?: RoleType;
    nickname: string;
  }

  interface User extends DefaultUser {
    role?: RoleType;
  }
  interface DefaultUser extends authUser {}
}

declare module "next-auth/jwt" {
  interface DefaultJWT {
    nickname: string;
  }
}
