import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Provider } from  "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Catsino",
  description: "A casino for cats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
      <body className={inter.className}>
        <Navbar />
        <div className="md:pt-20">
        {children}
        </div>
        <Footer />
      </body>
      </Provider>
    </html>
  );
}
