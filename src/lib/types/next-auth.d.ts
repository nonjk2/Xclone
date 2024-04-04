import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: authUser;
  }

  interface DefaultJWT {
    role?: RoleType;
  }

  interface User extends DefaultUser {
    role?: RoleType;
  }
}

declare module "next-auth/jwt" {
  interface DefaultJWT {
    role?: RoleType;
  }
}
