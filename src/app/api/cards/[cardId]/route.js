import connectToDb from "@/utils/mongodb";
import { Card } from "@/models/Card";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req, { params }) {
  const { cardId } = params;

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDb();

  try {
    const deletionResult = await Card.deleteOne({ _id: cardId });

    if (deletionResult.deletedCount === 0) {
      return NextResponse.json(
        { message: "Card not found or not authorized to delete." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Card deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
