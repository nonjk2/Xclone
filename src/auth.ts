import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import cookie from "cookie";
import { SignInOptions } from "next-auth/react";
import { ProviderType } from "next-auth/providers/index";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
}: {
  handlers: any;
  auth: any;
  signIn: (
    provider: ProviderType,
    options: SignInOptions,
    authorizationParams?: Record<string, string>
  ) => void;
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  //   callbacks: {
  //     jwt({ token }) {
  //       console.log("auth.ts jwt", token);
  //       return token;
  //     },
  //     session({ session, newSession, user }) {
  //       console.log("auth.ts session", session, newSession, user);
  //       return session;
  //     },
  //   },
  //   events: {
  //     signOut(data) {
  //       console.log(
  //         "auth.ts events signout",
  //         "session" in data && data.session,
  //         "token" in data && data.token
  //       );
  //       // if ('session' in data) {
  //       //   data.session = null;
  //       // }
  //       // if ('token' in data) {
  //       //   data.token = null;
  //       // }
  //     },
  //     session(data) {
  //       console.log(
  //         "auth.ts events session",
  //         "session" in data && data.session,
  //         "token" in data && data.token
  //       );
  //     },
  //   },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const userResponse = await authResponse.json();
        const user = {
          id: userResponse.id,
          nickname: userResponse.nickname,
          email: userResponse.nickname,
          image: userResponse.image,
        };
        console.log(user);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
});
