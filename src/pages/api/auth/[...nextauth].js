import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import dbConnect from "@/lib/utils";
import { User } from "@/lib/models";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  database: process.env.MONGO_URI,
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
    async signIn(user, account, profile) {
      const { email } = user;
      await dbConnect();

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        //Create new user for OAuth
        const newUser = await User.create({
          email,
          username: profile.email,
        });
        if (newUser) {
          console.log("New OAuth user created:", newUser);
          return true; //sign in successful
        }
        return false; //sign in failed
      }
      return true; //user exists, sign in successful
    },
  },
});
