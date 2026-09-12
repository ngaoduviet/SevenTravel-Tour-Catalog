import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.seventravel.vn"),
  title: {
    default: "Seven Travel | Khám phá thế giới – Ngao du muôn nơi",
    template: "%s | Seven Travel",
  },
  description: "Danh mục tour trong nước và quốc tế của Seven Travel.",
  icons: {
    icon: "/images/catalog/seven-travel-all.png",
    shortcut: "/images/catalog/seven-travel-all.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
