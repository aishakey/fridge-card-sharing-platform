import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectToDb from "@/utils/mongodb";
import { Card } from "@/models/Card";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDb();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const userId = session.user.id;
    const sentCards = await Card.find({ sender: userId })
      .populate("recipients", "username")
      .exec();

    return NextResponse.json(sentCards, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}