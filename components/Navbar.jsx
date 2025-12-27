"use client";
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const { isDark, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();

  const linkClasses = (path) =>
    `hover:text-gray-900 dark:hover:text-gray-100 transition ${
      pathname === path ? "text-orange-600 font-semibold" : ""
    }`;

  if (!mounted) return null;

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 dark:bg-gray-800 transition-colors duration-300">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className={linkClasses("/")}>
          Home
        </Link>
        <Link href="/all-products" className={linkClasses("/all-products")}>
          Shop
        </Link>
        <Link href="/about-us" className={linkClasses("/about-us")}>
          About Us
        </Link>
        <Link href="/contact-us" className={linkClasses("/contact-us")}>
          Contact Us
        </Link>

        {user && (
          <button
            onClick={() => router.push("/seller")}
            className={`text-xs border px-4 py-1.5 rounded-full transition ${
              pathname === "/seller"
                ? "border-orange-600 text-orange-600"
                : "dark:border-gray-600"
            }`}
          >
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push("/cart")}
              />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Orders"
                labelIcon={<BagIcon />}
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {user && (
          <button
            onClick={() => router.push("/seller")}
            className={`text-xs border px-4 py-1.5 rounded-full transition ${
              pathname === "/seller"
                ? "border-orange-600 text-orange-600"
                : "dark:border-gray-600"
            }`}
          >
            Seller Dashboard
          </button>
        )}

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Home"
                labelIcon={<HomeIcon />}
                onClick={() => router.push("/")}
              />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Products"
                labelIcon={<BoxIcon />}
                onClick={() => router.push("/all-products")}
              />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action
                label="About Us"
                labelIcon={<BoxIcon />}
                onClick={() => router.push("/about-us")}
              />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Contact Us"
                labelIcon={<BoxIcon />}
                onClick={() => router.push("/contact-us")}
              />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push("/cart")}
              />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Orders"
                labelIcon={<BagIcon />}
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
