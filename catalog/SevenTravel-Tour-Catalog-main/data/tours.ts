export type TourSchedule = {
  status: "ON" | "OFF";
  scheduleId: string;
  tourId: string;
  departureText: string;
  price: number;
  originalPrice?: number;
  note?: string;
  sortOrder: number;
};

export type Tour = {
  status: "ON" | "OFF";
  tourId: string;
  tourName: string;
  slug: string;
  country: string;
  region: string;
  destination: string;
  duration: string;
  departureCity: string;
  departureDates: string[];
  airline: string;
  priceFrom: number;
  originalPrice?: number;
  badge: "TOUR HOT" | "BEST SELLER" | "TOUR MỚI" | "ƯU ĐÃI";
  featured: boolean;
  imageUrl: string;
  programUrl?: string;
  seatsLeft?: number;
  sortOrder: number;
  schedules?: TourSchedule[];
};

export const tours: Tour[] = [
  {
    status: "ON",
    tourId: "CN001",
    tourName: "Cáp Nhĩ Tân – Làng Tuyết",
    slug: "cap-nhi-tan-lang-tuyet",
    country: "Trung Quốc",
    region: "Trung Quốc",
    destination: "Cáp Nhĩ Tân, Làng Tuyết",
    duration: "6 ngày 5 đêm",
    departureCity: "Hà Nội",
    departureDates: ["12/12/2026", "19/12/2026", "26/12/2026"],
    airline: "Charter bay thẳng",
    priceFrom: 19990000,
    originalPrice: 21990000,
    badge: "TOUR HOT",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80",
    seatsLeft: 8,
    sortOrder: 1,
  },
  {
    status: "ON",
    tourId: "CN002",
    tourName: "Trương Gia Giới – Phượng Hoàng Cổ Trấn",
    slug: "truong-gia-gioi-phuong-hoang-co-tran",
    country: "Trung Quốc",
    region: "Trung Quốc",
    destination: "Trương Gia Giới, Phượng Hoàng Cổ Trấn",
    duration: "6 ngày 5 đêm",
    departureCity: "Hà Nội",
    departureDates: ["20/10/2026", "03/11/2026", "17/11/2026"],
    airline: "Vietnam Airlines",
    priceFrom: 15990000,
    badge: "BEST SELLER",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
    seatsLeft: 12,
    sortOrder: 2,
  },
  {
    status: "ON",
    tourId: "KR001",
    tourName: "Seoul – Nami – Everland",
    slug: "seoul-nami-everland",
    country: "Hàn Quốc",
    region: "Hàn Quốc",
    destination: "Seoul, đảo Nami, Everland",
    duration: "5 ngày 4 đêm",
    departureCity: "Hà Nội",
    departureDates: ["15/12/2026", "29/12/2026", "11/01/2027"],
    airline: "Vietjet Air",
    priceFrom: 16990000,
    originalPrice: 18490000,
    badge: "ƯU ĐÃI",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 3,
  },
  {
    status: "ON",
    tourId: "JP001",
    tourName: "Tokyo – Fuji – Narita",
    slug: "tokyo-fuji-narita",
    country: "Nhật Bản",
    region: "Nhật Bản",
    destination: "Tokyo, núi Phú Sĩ, Narita",
    duration: "6 ngày 5 đêm",
    departureCity: "Hà Nội",
    departureDates: ["22/10/2026", "05/11/2026", "19/11/2026"],
    airline: "All Nippon Airways",
    priceFrom: 25990000,
    badge: "TOUR MỚI",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80",
    seatsLeft: 6,
    sortOrder: 4,
  },
  {
    status: "ON",
    tourId: "TH001",
    tourName: "Bangkok – Pattaya",
    slug: "bangkok-pattaya",
    country: "Thái Lan",
    region: "Đông Nam Á",
    destination: "Bangkok, Pattaya",
    duration: "5 ngày 4 đêm",
    departureCity: "Hà Nội",
    departureDates: ["Thứ 5 hằng tuần"],
    airline: "Thai Airways",
    priceFrom: 8990000,
    badge: "ƯU ĐÃI",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 5,
  },
  {
    status: "ON",
    tourId: "SG001",
    tourName: "Singapore – Malaysia",
    slug: "singapore-malaysia",
    country: "Singapore",
    region: "Đông Nam Á",
    destination: "Singapore, Kuala Lumpur, Malacca",
    duration: "5 ngày 4 đêm",
    departureCity: "Hà Nội",
    departureDates: ["10/10/2026", "24/10/2026", "07/11/2026"],
    airline: "Singapore Airlines",
    priceFrom: 11990000,
    badge: "BEST SELLER",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 6,
  },
  {
    status: "ON",
    tourId: "EU001",
    tourName: "Pháp – Thụy Sĩ – Ý",
    slug: "phap-thuy-si-y",
    country: "Châu Âu",
    region: "Châu Âu",
    destination: "Paris, Lucerne, Milan, Rome",
    duration: "9 ngày 8 đêm",
    departureCity: "Hà Nội",
    departureDates: ["12/12/2026", "26/11/2026", "10/12/2026"],
    airline: "Qatar Airways",
    priceFrom: 39990000,
    badge: "TOUR MỚI",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 7,
  },
  {
    status: "ON",
    tourId: "AU001",
    tourName: "Úc – Sydney – Melbourne",
    slug: "uc-sydney-melbourne",
    country: "Châu Úc",
    region: "Châu Úc",
    destination: "Sydney, Melbourne",
    duration: "7 ngày 6 đêm",
    departureCity: "Hà Nội",
    departureDates: ["15/11/2026", "28/11/2026", "13/12/2026"],
    airline: "Vietnam Airlines",
    priceFrom: 27990000,
    badge: "TOUR HOT",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 8,
  },
  {
    status: "ON",
    tourId: "VN001",
    tourName: "Hà Giang – Đồng Văn – Mã Pí Lèng",
    slug: "ha-giang-dong-van-ma-pi-leng",
    country: "Việt Nam",
    region: "Tour trong nước",
    destination: "Hà Giang, Đồng Văn, Mã Pí Lèng",
    duration: "3 ngày 2 đêm",
    departureCity: "Hà Nội",
    departureDates: ["Thứ 6 hằng tuần"],
    airline: "Ô tô du lịch",
    priceFrom: 3290000,
    badge: "TOUR HOT",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 9,
  },
  {
    status: "ON",
    tourId: "CN003",
    tourName: "Đại Lý – Lệ Giang – Shangrila",
    slug: "dai-ly-le-giang-shangrila",
    country: "Trung Quốc",
    region: "Trung Quốc",
    destination: "Đại Lý, Lệ Giang, Shangrila",
    duration: "6 ngày 5 đêm",
    departureCity: "Hà Nội",
    departureDates: ["18/10/2026", "08/11/2026", "06/12/2026"],
    airline: "China Eastern Airlines",
    priceFrom: 18990000,
    badge: "TOUR MỚI",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 10,
  },
  {
    status: "ON",
    tourId: "MY001",
    tourName: "Kuala Lumpur – Genting – Malacca",
    slug: "kuala-lumpur-genting-malacca",
    country: "Malaysia",
    region: "Đông Nam Á",
    destination: "Kuala Lumpur, Genting, Malacca",
    duration: "4 ngày 3 đêm",
    departureCity: "Hà Nội",
    departureDates: ["16/10/2026", "30/10/2026", "13/11/2026"],
    airline: "AirAsia",
    priceFrom: 9990000,
    badge: "ƯU ĐÃI",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 11,
  },
  {
    status: "OFF",
    tourId: "DEMO-OFF",
    tourName: "Tour tạm ẩn",
    slug: "tour-tam-an",
    country: "Việt Nam",
    region: "Tour trong nước",
    destination: "Đang cập nhật",
    duration: "3 ngày 2 đêm",
    departureCity: "Hà Nội",
    departureDates: ["Đang cập nhật"],
    airline: "Ô tô du lịch",
    priceFrom: 0,
    badge: "TOUR MỚI",
    featured: false,
    imageUrl: "",
    sortOrder: 99,
  },
];

export const liveTours = tours
  .filter((tour) => tour.status === "ON")
  .sort((a, b) => a.sortOrder - b.sortOrder);

export const formatPrice = (value: number) =>
  value > 0 ? new Intl.NumberFormat("vi-VN").format(value) + "đ" : "Liên hệ";
