import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectDb } from "@/lib/connectDb";
import User from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDb();
        let userData = await User.findOne({ email: user.email });
        if (!userData) {
          userData = await User.create({
            name: user.name,
            email: user.email,
          });
        }
        user.id = userData._id.toString();
        return true;
      } catch (err) {
        console.error("Error during sign in:", err);
        return false;
      }
    },
    async session({ session, token }) {
      if (session && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth",
  },
});
