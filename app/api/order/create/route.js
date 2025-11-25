import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { err } from "inngest/types";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || items.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Please provide address and items",
      });
    }

    // Calculation

    // NEW - for..of loop (works correctly)
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json({
          success: false,
          message: `Product with ID ${item.product} not found`,
        });
      }
      amount += product.offerPrice * item.quantity;
    }

    try {
      await inngest.send({
        name: "order/created",
        data: {
          userId,
          address,
          items,
          amount: amount + Math.floor(amount * 0.02),
          date: Date.now(),
        },
      });
    } catch (error) {
      console.error("Inngest send failed:", error.message);
    }

    // create user cart

    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextResponse.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
