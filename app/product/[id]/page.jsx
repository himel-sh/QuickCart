"use client";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { useClerk, useUser } from "@clerk/nextjs";

const Product = () => {
  const { id } = useParams();
  const router = useRouter();
  const { products, addToCart } = useAppContext();
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser(); // reactive auth state

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  // Open SignIn modal if user is not signed in
  useEffect(() => {
    if (!isSignedIn) {
      openSignIn();
    }
  }, [isSignedIn, openSignIn]);

  // Redirect to home if user is definitely not signed in
  useEffect(() => {
    if (isSignedIn === false && !user) {
      // Clerk tells us user is signed out
      router.push("/");
    }
  }, [isSignedIn, user, router]);

  // Fetch product data after user signs in
  useEffect(() => {
    if (user) {
      const product = products.find((product) => product._id === id);
      setProductData(product);
    }
  }, [id, products, user]);

  if (!user) return <Loading />;

  return productData ? (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        {/* Product images and details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                src={mainImage || productData.image[0]}
                alt={productData.name}
                className="w-full h-auto object-cover mix-blend-multiply"
                width={1280}
                height={720}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    src={image}
                    alt={`${productData.name} ${index + 1}`}
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={1280}
                    height={720}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>
            <p className="text-gray-600 mt-3">{productData.description}</p>
            <p className="text-3xl font-medium mt-6">
              BDT {productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                BDT {productData.price}
              </span>
            </p>
            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(productData._id);
                  router.push("/cart");
                }}
                className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* Featured products */}
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Product;
