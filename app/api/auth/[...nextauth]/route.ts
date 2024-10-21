import NextAuth, { NextAuthOptions, Session, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

import { connectToDB } from "@/lib/database";
import User from "@/models/user";

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Missing Google OAuth credentials: GOOGLE_ID or GOOGLE_CLIENT_SECRET."
  );
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      if (!session || !session.user) {
        throw new Error("Session error");
      }

      const sessionUser = await User.findOne({ email: session.user?.email });
      if (!sessionUser) {
        throw new Error("User not found");
      }

      // Updating to know which user is currently online
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }: { profile?: Profile }) {
      try {
        await connectToDB();

        if (!profile?.email) {
          throw new Error("Profile email is missing");
        }

        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email });
        console.log(userExists);

        // If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name?.replace(" ", "").toLowerCase(),
            image: profile.image,
          });
        }

        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
