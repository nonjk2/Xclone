import { SupabaseAdapter } from "@auth/supabase-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { fetchUserFromDatabase } from "./lib/action/auth-server";

export const authOption: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  }) as Adapter,
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error: (err) => console.log(err),
    debug: (err) => console.log(err),
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const userInfo = await fetchUserFromDatabase(user.id);
        if (!userInfo) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account, trigger, profile }) {
      if (user) {
        token.uid = user.id;
      }

      return token;
    },

    async session({ session, token, user }) {
      const [userInfo] = await fetchUserFromDatabase(token.uid as string);
      if (token) {
        session.user.id = userInfo.id;
        session.user.email = userInfo.email;
        session.user.image = userInfo.image;
        session.user.name = userInfo.name;
        session.user.nickname = userInfo.nickname;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  events: {
    signOut(data) {},
    session(data) {},
  },
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { value: "asdfasd@nasdd", type: "email", label: "email" },
    //     password: { value: "12312411", type: "password", label: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     if (!(credentials?.email && credentials.password)) {
    //       return null;
    //     }
    //     const response = await authenticateUser(
    //       credentials.email,
    //       credentials.password
    //     );
    //     return response;
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_ID || "",
    }),
  ],
};
