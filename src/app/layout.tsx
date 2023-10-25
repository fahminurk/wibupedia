import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollButton from "@/components/scrollButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wibupedia",
  description: "anime list up to date",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <main>
          <Navbar />
          <ScrollButton />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
