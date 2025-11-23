import mongoose from "mongoose";
// REMOVED: import { unique } from "next/dist/build/utils";
// This import references internal Next.js build utilities
// and causes dependency conflicts (like the styled-jsx error)
// when bundled for serverless functions.

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    // unique: true is handled by Mongoose/MongoDB, not by the Next.js 'unique' utility.
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    // cartItems uses Object, default: {} for flexibility
    cartItems: { type: Object, default: {} },
  },
  {
    // This setting ensures Mongoose stores empty objects ({}) instead of removing the field.
    minimize: false,
  }
);

// Check if the model already exists to prevent Mongoose overwrite errors
const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
