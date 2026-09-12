import type { Metadata } from "next";
import { getLiveTours } from "@/data/google-sheets";
import TourCatalog from "./tour-catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Sản phẩm HOT & Lịch khởi hành",
  description:
    "Khám phá tour trong nước và quốc tế của Seven Travel. Tìm nhanh theo điểm đến, thời gian, mức giá và xem chương trình chi tiết.",
  alternates: {
    canonical: "https://www.seventravel.vn/sanpham",
  },
  openGraph: {
    title: "Sản phẩm HOT & Lịch khởi hành | Seven Travel",
    description:
      "Khám phá tour trong nước và quốc tế của Seven Travel theo điểm đến, thời gian và mức giá.",
    url: "https://www.seventravel.vn/sanpham",
    siteName: "Seven Travel",
    locale: "vi_VN",
    type: "website",
  },
};

export default async function ProductsPage() {
  const tours = await getLiveTours();
  return <TourCatalog tours={tours} />;
}
