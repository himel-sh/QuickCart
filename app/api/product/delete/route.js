import connectDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { userId } = getAuth(request);
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Get first 10 products sorted by creation date
    const firstTenProducts = await Product.find({})
      .sort({ date: 1 }) // ascending, oldest first
      .limit(10)
      .select("_id");

    const firstTenIds = firstTenProducts.map((p) => p._id.toString());

    if (firstTenIds.includes(productId)) {
      return NextResponse.json(
        { success: false, message: "Cannot delete first 10 products" },
        { status: 403 }
      );
    }

    // Check if product exists and belongs to the user
    const product = await Product.findOne({ _id: productId, userId });
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found or you are not authorized",
        },
        { status: 404 }
      );
    }

    await Product.deleteOne({ _id: productId });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE product error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
