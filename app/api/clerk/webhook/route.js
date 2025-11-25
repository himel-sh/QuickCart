import { Webhook } from "svix";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.text();
  const headers = Object.fromEntries(req.headers.entries());

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let event;

  try {
    event = wh.verify(payload, headers);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Only handle new users
  if (event.type === "user.created") {
    const userId = event.data.id;

    try {
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { role: "seller" },
      });
      console.log("Assigned seller role to:", userId);
    } catch (err) {
      console.error("Failed to assign seller role:", err);
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
