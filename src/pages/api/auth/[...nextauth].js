import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import conncectToDb from "@/utils/mongodb";
import { User } from "../../../../models/User";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile }) {
      await conncectToDb();
      if (account.provider === "google") {
        try {
          const existingUser = await User.findOne({ email: profile.email });
          if (!existingUser) {
            // Create new user for OAuth
            const newUser = await User.create({
              email: profile.email,
              name: profile.name,
              image: profile.picture,
            });
            console.log("New OAuth user created:", newUser);
            return true; // Sign in successful
          }
          return true; // User exists, sign in successful
        } catch (error) {
          console.error("Sign-in error:", error);
          return false; // Sign in failed
        }
      }
      return true; // Default to true if not handling other providers
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub; // Use 'sub' claim from JWT as user ID
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id; // Persist user ID in the JWT 'sub' claim
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login", // Specify your custom sign-in page path if necessary
  },
  // Include any additional NextAuth configurations here
});
