import { NextResponse } from "next/server";
import connectToDb from "@/utils/mongodb"; // Adjust import paths as needed
import { User } from "@/models/User"; // Adjust import paths as needed
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectToDb();
    const { username, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
