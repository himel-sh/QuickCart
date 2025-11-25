import { Webhook } from "svix";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.text();
  const headers = Object.fromEntries(req.headers);

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let event;

  try {
    event = wh.verify(payload, headers);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // When a new user is created
  if (event.type === "user.created") {
    const userId = event.data.id;

    // Update user with default role
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role: "seller" },
    });

    console.log("Assigned seller role to:", userId);
  }

  return NextResponse.json({ success: true });
}
