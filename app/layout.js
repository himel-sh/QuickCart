import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import BackToTop from "@/components/BackToTop";
import "styled-jsx/css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = {
  title: "QuickCart",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} antialiased text-gray-700 dark:text-gray-300 dark:bg-gray-900 transition-colors duration-300`}
        >
          <ThemeProvider>
            <Toaster />
            <AppContextProvider>{children}</AppContextProvider>
            <BackToTop />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
