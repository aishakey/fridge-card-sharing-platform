import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Card } from "@/models/Card";
import connectToDb from "@/utils/mongodb";

export async function GET(req) {
  await connectToDb();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const count = await Card.countDocuments({
    recipients: userId,
    seenBy: { $ne: userId },
  });
  return NextResponse.json({ count }, { status: 200 });
}
