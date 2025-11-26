import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
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

    const totalAmount = amount + Math.floor(amount * 0.02);

    // ✅ Save to MongoDB
    const order = await Order.create({
      userId,
      items,
      address: address._id,
      amount: totalAmount,
      date: Date.now(),
    });

    // Optional: trigger Inngest event
    try {
      await inngest.send({
        name: "order/created",
        data: { userId, address, items, amount: totalAmount, date: order.date },
      });
    } catch (error) {
      console.error("Inngest send failed:", error.message);
    }

    // Clear user cart
    const userDoc = await User.findById(userId);
    userDoc.cartItems = {};
    await userDoc.save();

    return NextResponse.json({ success: true, message: "Order Placed", order });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
