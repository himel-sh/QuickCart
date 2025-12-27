"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { assets } from "@/assets/assets";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-14">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About QuickCart
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to QuickCart, your ultimate destination for premium
            electronics and gadgets. We're committed to bringing you the latest
            technology at competitive prices with exceptional customer service.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At QuickCart, our mission is to make quality electronics
              accessible to everyone. We believe that technology should be
              affordable, reliable, and easy to purchase. We strive to provide a
              seamless shopping experience with fast delivery and excellent
              customer support.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We envision becoming the most trusted e-commerce platform for
              electronics in the region. Our goal is to empower customers with
              the best products, competitive pricing, and outstanding service
              that exceeds expectations every single time.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Wide Selection
              </h3>
              <p className="text-gray-600">
                Browse through thousands of products from top brands including
                Apple, Samsung, Sony, and more.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Best Prices
              </h3>
              <p className="text-gray-600">
                We offer competitive pricing and regular discounts to ensure you
                get the best value for your money.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Quick and reliable shipping to get your products to you as fast
                as possible.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-orange-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Our Core Values
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold mt-1">✓</span>
              <span>
                <strong>Integrity:</strong> We believe in honest dealings and
                transparent pricing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold mt-1">✓</span>
              <span>
                <strong>Customer First:</strong> Your satisfaction is our top
                priority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold mt-1">✓</span>
              <span>
                <strong>Quality:</strong> We only sell authentic, high-quality
                products.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold mt-1">✓</span>
              <span>
                <strong>Innovation:</strong> We continuously improve our
                platform and services.
              </span>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
