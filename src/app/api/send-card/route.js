import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectToDb from "@/utils/mongodb";
import { Card } from "@/models/Card";
import { NextResponse } from "next/server";
import { User } from "@/models/User";

export async function POST(req) {
  await connectToDb();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { image, text, recipients } = await req.json();

  if (!recipients || recipients.length === 0) {
    return NextResponse.json(
      { message: "No recipients found" },
      { status: 400 }
    );
  }

  const recipientIds = await Promise.all(
    recipients.map(async (email) => {
      const user = await User.findOne({ email }).select("_id");
      return user ? user._id : null;
    })
  );

  const validRecipientIds = recipientIds.filter((id) => id !== null);

  if (validRecipientIds.length === 0) {
    return NextResponse.json(
      { message: "No valid recipients specified." },
      { status: 400 }
    );
  }

  try {
    const senderId = session.user.id;

    const newCard = await Card.create({
      sender: senderId,
      recipients: validRecipientIds,
      image,
      text,
    });

    return NextResponse.json(newCard, { status: 201 });
  } catch (error) {
    console.error("Failed to create the card:", error);
    return NextResponse.json(
      { message: "Internal sever error" },
      { status: 500 }
    );
  }
}
