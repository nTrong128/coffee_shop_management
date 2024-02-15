import credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import type {NextAuthConfig} from "next-auth";
import {LoginSchema} from "@/schemas";
import {getUserByUsername} from "@/data/account";

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const {username, password} = validatedFields.data;
          const user = await getUserByUsername(username);
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
