import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await clerkClient.users.updateUser(userId, {
    publicMetadata: { role: "seller" },
  });

  return NextResponse.json({ success: true, message: "You are now a seller!" });
}
