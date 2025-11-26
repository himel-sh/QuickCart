import connectDB from "@/config/db";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Not logged in" },
        { status: 401 }
      );
    }

    await connectDB();

    // Find orders for the logged-in user
    const orders = await Order.find({ userId })
      .populate("address") // populate address
      .populate({
        path: "items.product",
        model: "product",
        strictPopulate: false, // prevent errors if product deleted
      })
      .lean(); // convert to plain JS objects

    // Transform orders to handle deleted products/addresses
    const transformedOrders = orders.map((order) => ({
      ...order,
      items: order.items.map((item) => ({
        ...item,
        product: item.product
          ? { _id: item.product._id, name: item.product.name }
          : { _id: null, name: "Deleted Product" },
      })),
      address: order.address
        ? order.address
        : {
            _id: null,
            fullName: "Deleted Address",
            area: "",
            city: "",
            division: "",
            phoneNumber: "",
          },
    }));

    return NextResponse.json({ success: true, orders: transformedOrders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
