import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollButton from "@/components/scrollButton";
import QueryProvider from "@/lib/tanstack/QueryProvider";

export const metadata: Metadata = {
  title: "Wibupedia",
  description: "anime list up to date",
  keywords: [
    "anime",
    "wibupedia",
    "myanimelist",
    "anime list",
    "naruto",
    "one piece",
    "jujutsu kaizen",
  ],
  authors: [{ name: "fahmi nurkamil", url: "https://github.com/fahminurk" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "id",
    url: "https://wibupedia.vercel.app",
    title: "Wibupedia",
    description: "anime list up to date",
    images: [
      {
        url: "https://i.imgur.com/CYsg2Gs.png",
      },
    ],
    siteName: "Wibupedia",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <QueryProvider>
          <main>
            <Navbar />
            <ScrollButton />
            {children}
            <Footer />
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
