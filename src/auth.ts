import { SupabaseAdapter } from "@auth/supabase-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // console.log("user : ", user, "token : ", token, "account : ", account);
        token.uid = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      // console.log("token : ", token);
      return token;
    },
    async session({ session, token, user }) {
      if (token.uid) {
        session.user.id = token.uid as string;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.nickname = token.name;
        session.user.role = token.role;
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
