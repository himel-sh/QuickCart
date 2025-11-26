"use client";
import Navbar from "@/components/seller/Navbar";
import Sidebar from "@/components/seller/Sidebar";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const Layout = ({ children }) => {
  const { user } = useAppContext();
  const router = useRouter();

  // If user is not logged in, redirect to home or show a sign-in notice
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-gray-700 text-lg">
          You must be signed in to access the Seller Dashboard.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-orange-600 text-white rounded-md"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
