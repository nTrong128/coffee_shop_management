import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import {prisma} from "@/lib/prisma";

import {getUserById} from "@/data/account";

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER";
      image: string;
      id: string;
      name: string;
    };
  }
}

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({token, session}) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        // add user id to session
      }
      if (token.role && session.user) {
        // session.user.role = token.role;
        // add user role to session
        return {
          ...session,
          user: {
            ...session.user,
            role: token.role,
          },
        };
      }

      return session;
    },
    async jwt({token}) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }
      if (existingUser.data && existingUser.data.role) {
        token.role = existingUser.data.role;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  ...authConfig,
});
