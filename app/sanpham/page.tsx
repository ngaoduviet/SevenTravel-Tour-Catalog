import type { Metadata } from "next";
import TourCatalog from "./tour-catalog";

export const metadata: Metadata = {
  title: "Danh sách tour | Seven Travel",
  description:
    "Khám phá tour trong nước và quốc tế của Seven Travel. Tìm nhanh theo điểm đến, thời gian, mức giá và xem chương trình chi tiết.",
};

export default function ProductsPage() {
  return <TourCatalog />;
}
