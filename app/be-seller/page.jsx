"use client";

import { useState } from "react";

export default function BeSellerPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function becomeSeller() {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/user/set-seller", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setMessage("You are now a seller! Redirecting...");
      setLoading(false);

      // Reload or redirect user to seller dashboard
      setTimeout(() => {
        window.location.href = "/seller-dashboard"; // change if needed
      }, 1200);
    } catch (err) {
      setMessage("Request failed");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Become a Seller</h1>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        Click the button below to enable your seller account. Once activated,
        you will gain access to the seller dashboard.
      </p>

      <button
        onClick={becomeSeller}
        disabled={loading}
        className={`px-6 py-3 rounded-lg text-white font-semibold ${
          loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading ? "Processing..." : "Become a Seller"}
      </button>

      {message && (
        <p className="mt-4 text-lg font-medium text-green-700">{message}</p>
      )}
    </div>
  );
}
