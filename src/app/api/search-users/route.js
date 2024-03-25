import connectToDb from "@/utils/mongodb";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDb();

  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required." },
      { status: 400 }
    );
  }

  try {
    const searchRegex = new RegExp(query, "i");
    const users = await User.find(
      {
        $or: [
          { username: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
        ],
      },
      "username email -_id"
    );

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
