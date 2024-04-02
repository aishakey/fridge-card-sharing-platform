import { NextResponse } from "next/server";
import connectToDb from "@/utils/mongodb";
import { Card } from "@/models/Card";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  await connectToDb();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user.id;
    const unviewedCount = await Card.countDocuments({
      recipients: userId,
      viewed: false,
    });
    return NextResponse.json({ count: unviewedCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
