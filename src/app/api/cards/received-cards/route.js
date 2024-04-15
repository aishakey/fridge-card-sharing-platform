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

  const userId = session.user.id;
  try {
    const receivedCards = await Card.find({ recipients: userId })
      .populate("sender")
      .exec();

    await Card.updateMany(
      { _id: { $in: receivedCards.map((card) => card._id) } },
      { $addToSet: { seenBy: userId } }
    ).exec();

    return NextResponse.json(receivedCards, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
