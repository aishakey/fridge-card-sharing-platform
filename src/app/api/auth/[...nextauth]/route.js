import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDb from "@/utils/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDb();
        console.log("Authenticating:", credentials.email);

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          console.log("No user found with the email", credentials.email);
          throw new Error("No user found with the email");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          console.log("Password is incorrect for user", credentials.email);
          throw new Error("Password is incorrect");
        }
        console.log("Authentication successful for user", credentials.email);
        return {
          id: user.id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider == "credentials") {
        return true;
      }

      await connectToDb();

      if (account.provider === "google") {
        const userEmail = user.email;
        let existingUser = await User.findOne({ email: userEmail });

        if (!existingUser) {
          const usernameFromEmail = profile.email.split("@")[0];

          existingUser = await User.create({
            email: userEmail,
            username: usernameFromEmail,
            provider: "google",
          });
          console.log("New Google user created:", existingUser);
        } else {
          console.log("Existing Google user found:", existingUser);
        }

        user.id = existingUser._id;

        return true;
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
