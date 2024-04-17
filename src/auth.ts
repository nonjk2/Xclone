import { SupabaseAdapter } from "@auth/supabase-adapter";
import { NextAuthOptions, User } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import GitHubProvider from "next-auth/providers/github";
import { fetchUserFromDatabase } from "./lib/action/auth-server";
import jwt from "jsonwebtoken";
import { getUser } from "./lib/action/server";

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
    error(code, ...message) {
      console.log(code, message);
    },
    warn(code, ...message) {
      console.log(code, message);
    },
    debug(code, ...message) {
      console.log(code, message.toString());
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // if (account?.provider === "google") {
      //   const userInfo = await fetchUserFromDatabase(user.id);
      //   if (!userInfo) {
      //     return false;
      //   }
      // }
      // if (account?.provider === "kakao") {
      //   const userInfo = await fetchUserFromDatabase(user.id);
      //   if (!userInfo) {
      //     return false;
      //   }
      // }
      return true;
    },

    async jwt({ token, user, account, trigger, profile }) {
      if (user) {
        token.uid = user.id;
        // token.role = user.role;
        // token.email = user.email;
        // token.name = user.name;
        // token.picture = user.image;
      }
      // console.log(token);
      return token;
    },

    async session({ session, token, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        // console.log("userid : ", user.id, "user", user.user_id);
        const newToken = jwt.sign(payload, signingSecret);
        const userInfo = await getUser(newToken);
        session.supabaseAccessToken = newToken;
        session.user.email = userInfo.email;
        session.user.image = userInfo.image;
        session.user.name = userInfo.name;
        session.user.nickname = userInfo.nickname;
      }

      // console.log(session);
      return session;
    },
  },
  session: {
    strategy: "database",

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
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      // profile(profile, tokens) {
      //   return {
      //     id: String(profile.id),
      //     name: profile.kakao_account?.profile?.nickname,
      //     email: profile.kakao_account?.email,
      //     image: profile.kakao_account?.profile?.profile_image_url,
      //   } as User;
      // },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_ID || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
};
