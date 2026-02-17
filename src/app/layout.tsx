import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Z4Truyện - Đọc Truyện Tranh Online Miễn Phí",
  description:
    "Z4Truyện - Website đọc truyện tranh online miễn phí, cập nhật nhanh nhất. Manga, Manhwa, Manhua chất lượng cao.",
  keywords: "truyện tranh, manga, manhwa, manhua, đọc truyện online, z4truyen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
