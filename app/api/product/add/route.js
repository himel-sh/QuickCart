import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
// Removed unused/suspicious imports: 'err' from 'inngest/types' and 'connect' from 'mongoose'
import { NextResponse } from "next/server";

// Configure Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    // 1. Authorization Check
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Not authorized to add products." },
        { status: 403 }
      );
    }

    // 2. Extract FormData
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");
    const files = formData.getAll("images");

    // 3. Validation
    if (!name || !description || !price || !category) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required product fields (name, description, category, price).",
        },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No files uploaded.",
        },
        { status: 400 }
      );
    }

    // 4. Cloudinary Upload
    const result = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto", folder: "quickcart_products" }, // Added a folder for organization
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(buffer);
        });
      })
    );

    const image = result.map((result) => result.secure_url);

    // 5. Database Connection and Creation
    await connectDB();
    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image,
      date: Date.now(),
    });

    // 6. Success Response
    return NextResponse.json(
      {
        success: true,
        message: "Product added successfully!",
        newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    // FIX: MUST RETURN NextResponse and specify the 500 status code
    console.error("API Error in /api/product/add:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "An unexpected Internal Server Error occurred.",
      },
      {
        status: 500, // Explicitly set the status code for server errors
      }
    );
  }
}
