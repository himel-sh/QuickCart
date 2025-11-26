import connectDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");
    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Get first 10 products globally (not user-specific)
    const firstTenProducts = await Product.find({})
      .sort({ date: 1 })
      .limit(10)
      .select("_id");

    const firstTenIds = firstTenProducts.map((p) => p._id.toString());

    if (firstTenIds.includes(productId)) {
      return NextResponse.json(
        { success: false, message: "Cannot delete first 10 products" },
        { status: 403 }
      );
    }

    // Only delete if the product belongs to this user
    const product = await Product.findOne({ _id: productId, userId });
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found or not authorized" },
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
