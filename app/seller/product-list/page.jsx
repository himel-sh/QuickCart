"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {
  const { router, getToken, user } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/product/sellerlist", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>

        {/* Desktop Table */}
        <div className="hidden md:flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">
                  Product
                </th>
                <th className="px-4 py-3 font-medium truncate">Category</th>
                <th className="px-4 py-3 font-medium truncate">Price</th>
                <th className="px-4 py-3 font-medium truncate">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="px-4 py-3 flex items-center space-x-3 truncate">
                    <div className="bg-gray-500/10 rounded p-2">
                      <Image
                        src={product.image[0] || "/placeholder.png"}
                        alt={product.name}
                        width={64}
                        height={64}
                      />
                    </div>
                    <span className="truncate w-full">{product.name}</span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">BDT {product.offerPrice}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => router.push(`/product/${product._id}`)}
                      className="flex items-center gap-1 px-3 py-2 bg-orange-600 text-white rounded-md"
                    >
                      <span>Visit</span>
                      <Image
                        className="h-3.5"
                        src={assets.redirect_icon}
                        alt="redirect_icon"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="flex flex-col gap-4 md:hidden mt-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start justify-between bg-white border border-gray-300 rounded-md p-4"
            >
              <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                <Image
                  src={product.image[0] || "/placeholder.png"}
                  alt={product.name}
                  width={64}
                  height={64}
                />
                <div>
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <p className="font-medium">BDT {product.offerPrice}</p>
                <button
                  onClick={() => router.push(`/product/${product._id}`)}
                  className="px-3 py-2 bg-orange-600 text-white rounded-md"
                >
                  Visit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductList;
