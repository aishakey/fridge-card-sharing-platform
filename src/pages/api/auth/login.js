import conncectToDb from "@/utils/mongodb";
import { User } from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;
  await conncectToDb();

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ message: "User not found, login attempt failed" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "Wrong credentials, login attempt failed" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  res.status(200).json({ token });
}
