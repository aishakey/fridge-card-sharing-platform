import dbConnect from "@/lib/utils";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  await dbConnect();

  const { username, email, password } = req.body;

  //Check if user already exists
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create new user
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log("Registration error:", err);
    res.status(500).json({ message: "Error registering new user" });
  }
}
