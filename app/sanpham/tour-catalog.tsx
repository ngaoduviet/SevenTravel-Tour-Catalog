"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Headphones,
  Hotel,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice, type Tour } from "@/data/tours";

const HOTLINE = "0899525777";
const displayHotline = "089 9525 777";

const CATALOG_DESTINATIONS = [
  "Tất cả",
  "Trung Quốc",
  "Hàn Quốc",
  "Nhật Bản",
  "Đông Nam Á",
  "Châu Âu",
  "Châu Úc",
  "Tour trong nước",
] as const;

const CATALOG_ICONS: Record<string, string> = {
  "Tất cả": "/images/catalog/seven-travel-all.png",
  "Trung Quốc": "/images/catalog/china.png",
  "Hàn Quốc": "/images/catalog/korea.png",
  "Nhật Bản": "/images/catalog/japan.png",
  "Đông Nam Á": "/images/catalog/asean.png",
  "Châu Âu": "/images/catalog/europe.png",
  "Châu Úc": "/images/catalog/australia.png",
  "Tour trong nước": "/images/catalog/vietnam.png",
};

const isAvailable = (value: string) => Boolean(value.trim()) && value !== "Đang cập nhật";

function matchesPrice(price: number, bracket: string) {
  if (bracket === "under-10") return price < 10_000_000;
  if (bracket === "10-20") return price >= 10_000_000 && price < 20_000_000;
  if (bracket === "20-30") return price >= 20_000_000 && price < 30_000_000;
  if (bracket === "30-50") return price >= 30_000_000 && price < 50_000_000;
  if (bracket === "over-50") return price >= 50_000_000;
  return true;
}

function matchesTime(tour: Tour, time: string) {
  if (time === "all") return true;
  const scheduleText = tour.departureDates.join(" ").toLocaleLowerCase("vi");
  if (time === "tet") return scheduleText.includes("tết") || scheduleText.includes("01/2027") || scheduleText.includes("02/2027");
  const month = String(Number(time));
  return scheduleText.includes(`tháng ${month}`) || scheduleText.includes(`tháng${month}`) || scheduleText.includes(`/${time}/`);
}

function TourCard({ tour }: { tour: Tour }) {
  const departureSummary = tour.departureDates.slice(0, 2).join(" • ");

  return (
    <article className="tour-card">
      <div className="tour-card-media">
        <img src={tour.imageUrl} alt={`Tour ${tour.tourName}`} loading="lazy" />
        <span className={`tour-badge badge-${tour.badge.toLowerCase().replaceAll(" ", "-")}`}>
          {tour.badge}
        </span>
        {tour.seatsLeft ? <span className="seat-badge">Còn {tour.seatsLeft} chỗ</span> : null}
      </div>
      <div className="tour-card-body">
        <div>
          <p className="tour-code">{tour.tourId}</p>
          <h3>{tour.tourName}</h3>
        </div>
        <div className="tour-facts">
          {isAvailable(tour.duration) ? <span><Clock3 />{tour.duration}</span> : null}
          <span><MapPin />Từ {tour.departureCity}</span>
          <span className="date-fact"><CalendarDays />{departureSummary}</span>
          {isAvailable(tour.airline) ? <span><Plane />{tour.airline}</span> : null}
        </div>
        <div className="price-row">
          <div><small>{tour.priceFrom > 0 ? "Giá từ" : "Giá tour"}</small><strong>{tour.priceFrom > 0 ? formatPrice(tour.priceFrom) : "Liên hệ"}</strong></div>
          {tour.originalPrice ? <del>{formatPrice(tour.originalPrice)}</del> : null}
        </div>
        <div className="service-icons" aria-label="Dịch vụ gồm">
          <span title="Vé máy bay"><Plane /></span>
          <span title="Khách sạn"><Hotel /></span>
          <span title="Ăn uống"><Utensils /></span>
          <span title="Hướng dẫn viên"><Headphones /></span>
        </div>
        <div className="card-actions">
          <Button asChild className="btn-primary"><Link href={`/sanpham/${tour.slug}`}>Xem chương trình</Link></Button>
          <Button asChild className="btn-navy"><a href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer">Nhận tư vấn</a></Button>
        </div>
      </div>
    </article>
  );
}

function BrandHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Trang chủ", "https://www.seventravel.vn/"],
    ["Tour Trung Quốc", "https://www.seventravel.vn/#tours"],
    ["Tour Hội chợ", "https://www.seventravel.vn/cantonfair"],
    ["Sản phẩm HOT", "https://www.seventravel.vn/sanpham"],
    ["Về chúng tôi", "https://www.seventravel.vn/#trust"],
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="https://www.seventravel.vn/" className="brand-link" aria-label="Seven Travel - Trang chủ"><img src="/images/seven-travel-logo.png" alt="Seven Travel" /></a>
        <nav className="desktop-nav" aria-label="Điều hướng chính">{links.map(([label, href]) => <a className={label === "Sản phẩm HOT" ? "active" : undefined} href={href} key={label}>{label}</a>)}</nav>
        <div className="header-actions">
          <a className="hotline" href={`tel:${HOTLINE}`}><Phone /><span><small>HOTLINE</small>{displayHotline}</span></a>
          <Button asChild className="btn-navy header-consult"><a href="#lien-he">Nhận tư vấn</a></Button>
        </div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Mở menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open ? (
        <nav className="mobile-nav" aria-label="Điều hướng di động">
          {links.map(([label, href]) => <a href={href} key={label} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="mobile-hotline" href={`tel:${HOTLINE}`}><Phone />Gọi {displayHotline}</a>
          <a className="mobile-zalo" href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer"><MessageCircle />Chat Zalo</a>
        </nav>
      ) : null}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="lien-he">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/images/seven-travel-logo-white.png" alt="Seven Travel" />
          <h3>CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ NGAO DU VIỆT</h3>
          <p>Khám phá thế giới — Ngao du muôn nơi.</p>
        </div>
        <div><h3>ĐIỀU HƯỚNG</h3><a href="https://www.seventravel.vn/">Trang chủ</a><a href="https://www.seventravel.vn/#tours">Tour Trung Quốc</a><a href="https://www.seventravel.vn/cantonfair">Tour Hội chợ</a><a href="https://www.seventravel.vn/sanpham">Sản phẩm HOT</a></div>
        <div><h3>LIÊN HỆ</h3><a href={`tel:${HOTLINE}`}>Hotline: {displayHotline}</a><a href="mailto:info@seventravel.vn">info@seventravel.vn</a><a href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer">Zalo tư vấn 1:1</a></div>
        <div><h3>KHÁM PHÁ TOUR</h3><a href="#tour-noi-bat">Tour nổi bật</a><a href="#tat-ca-tour">Tất cả tour</a><a href="#lien-he">Nhận tư vấn</a></div>
      </div>
      <div className="copyright">© {new Date().getFullYear()} Seven Travel. All rights reserved.</div>
    </footer>
  );
}

export default function TourCatalog({ tours }: { tours: Tour[] }) {
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState("Tất cả");
  const [time, setTime] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(8);
  const toursSectionRef = useRef<HTMLElement>(null);
  const consultSectionRef = useRef<HTMLElement>(null);

  const destinations = useMemo(() => Array.from(new Set([
    ...CATALOG_DESTINATIONS,
    ...tours.map((tour) => tour.region).filter(Boolean),
  ])), [tours]);
  const destinationImages = useMemo(() => Object.fromEntries(destinations.map((item) => [
    item,
    CATALOG_ICONS[item] || tours.find((tour) => tour.region === item)?.imageUrl,
  ])), [destinations, tours]);
  const featuredTours = tours.filter((tour) => tour.featured).slice(0, 6);
  const filteredTours = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    const result = tours.filter((tour) => {
      const searchable = `${tour.tourName} ${tour.destination} ${tour.country}`.toLocaleLowerCase("vi");
      const categoryMatch = destination === "Tất cả" || tour.region === destination || tour.country === destination;
      return searchable.includes(normalizedQuery) && categoryMatch && matchesTime(tour, time) && matchesPrice(tour.priceFrom, price);
    });
    return [...result].sort((a, b) => {
      if (sort === "price-asc") return a.priceFrom - b.priceFrom;
      if (sort === "price-desc") return b.priceFrom - a.priceFrom;
      if (sort === "newest") return b.sortOrder - a.sortOrder;
      return Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder;
    });
  }, [destination, price, query, sort, time, tours]);

  const applyFilters = () => {
    setVisibleCount(8);
    document.querySelector("#tat-ca-tour")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectDestination = (item: string) => {
    const hasTourData = item === "Tất cả" || tours.some((tour) => tour.region === item || tour.country === item);
    setDestination(item);
    setQuery("");
    setTime("all");
    setPrice("all");
    setVisibleCount(8);
    window.requestAnimationFrame(() => {
      const target = hasTourData ? toursSectionRef.current : consultSectionRef.current;
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const listingTitle = destination === "Tất cả" ? "TẤT CẢ TOUR" : `TOUR ${destination.toLocaleUpperCase("vi")}`;

  return (
    <div className="catalog-page">
      <BrandHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-kicker"><Sparkles /> Tour Catalog 2026–2027</p>
            <h1 id="hero-title">SẢN PHẨM HOT<br /><em>& LỊCH KHỞI HÀNH</em></h1>
            <p className="hero-sub">Hành trình chọn lọc cùng Seven Travel</p>
            <p>Tìm tour theo điểm đến, thời gian và mức giá chỉ trong vài giây.</p>
            <div className="hero-actions">
              <Button asChild className="btn-primary hero-button"><a href="#tat-ca-tour">Xem tất cả tour</a></Button>
              <Button asChild className="btn-light hero-button"><a href="#lien-he">Nhận tư vấn</a></Button>
            </div>
          </div>
          <div className="hero-trust"><ShieldCheck /> Lịch trình minh bạch <span /> <Headphones /> Tư vấn tận tâm</div>
        </section>

        <section className="search-panel" aria-labelledby="search-title">
          <div className="section-heading compact-heading"><span>Thiết kế cho hành trình của bạn</span><h2 id="search-title">TÌM TOUR PHÙ HỢP</h2></div>
          <form className="filter-grid" onSubmit={(event) => { event.preventDefault(); applyFilters(); }}>
            <label className="search-field"><span className="sr-only">Tìm điểm đến, tên tour</span><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm điểm đến, tên tour..." /></label>
            <Select value={destination} onValueChange={setDestination}><SelectTrigger className="filter-select" aria-label="Điểm đến"><SelectValue placeholder="Điểm đến" /></SelectTrigger><SelectContent>{destinations.map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}</SelectContent></Select>
            <Select value={time} onValueChange={setTime}><SelectTrigger className="filter-select" aria-label="Thời gian"><SelectValue placeholder="Thời gian" /></SelectTrigger><SelectContent><SelectItem value="all">Xem tất cả thời gian</SelectItem><SelectItem value="09">Tháng 9</SelectItem><SelectItem value="10">Tháng 10</SelectItem><SelectItem value="11">Tháng 11</SelectItem><SelectItem value="12">Tháng 12</SelectItem><SelectItem value="tet">Tết 2027</SelectItem></SelectContent></Select>
            <Select value={price} onValueChange={setPrice}><SelectTrigger className="filter-select" aria-label="Khoảng giá"><SelectValue placeholder="Khoảng giá" /></SelectTrigger><SelectContent><SelectItem value="all">Tất cả mức giá</SelectItem><SelectItem value="under-10">Dưới 10 triệu</SelectItem><SelectItem value="10-20">10–20 triệu</SelectItem><SelectItem value="20-30">20–30 triệu</SelectItem><SelectItem value="30-50">30–50 triệu</SelectItem><SelectItem value="over-50">Trên 50 triệu</SelectItem></SelectContent></Select>
            <Button type="submit" className="btn-primary filter-submit"><Search />Tìm tour</Button>
          </form>
        </section>

        <section className="category-section section-shell" aria-labelledby="category-title">
          <div className="section-heading"><span>Đi đâu cùng Seven Travel?</span><h2 id="category-title">DANH MỤC ĐIỂM ĐẾN</h2></div>
          <div className="category-scroller">
            {destinations.map((item) => (
              <button key={item} className={`category-item ${destination === item ? "active" : ""} ${item !== "Tất cả" && !tours.some((tour) => tour.region === item || tour.country === item) ? "unavailable" : ""}`} onClick={() => selectDestination(item)}>
                <span className={`category-image ${item === "Tất cả" ? "category-logo" : item === "Đông Nam Á" ? "category-emblem" : "category-flag"}`}>
                  <img src={destinationImages[item] || "/images/catalog/seven-travel-all.png"} alt={item === "Tất cả" ? "Biểu trưng Seven Travel" : item === "Đông Nam Á" ? "Biểu trưng ASEAN" : `Cờ ${item}`} loading="lazy" />
                </span>
                <span>{item}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="featured-section section-shell" id="tour-noi-bat" aria-labelledby="featured-title">
          <div className="section-heading left-heading"><span>Hành trình được yêu thích</span><h2 id="featured-title">TOUR NỔI BẬT</h2></div>
          <div className="tour-grid featured-grid">{featuredTours.map((tour) => <TourCard tour={tour} key={tour.tourId} />)}</div>
        </section>

        <section className="all-tours-section" id="tat-ca-tour" ref={toursSectionRef} aria-labelledby="all-tours-title">
          <div className="section-shell">
            <div className="listing-header">
              <div className="section-heading left-heading"><span>Toàn bộ hành trình đang mở bán</span><h2 id="all-tours-title">{listingTitle}</h2><p>{filteredTours.length} chương trình phù hợp</p></div>
              <Select value={sort} onValueChange={setSort}><SelectTrigger className="sort-select" aria-label="Sắp xếp tour"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="featured">Nổi bật trước</SelectItem><SelectItem value="price-asc">Giá thấp đến cao</SelectItem><SelectItem value="price-desc">Giá cao đến thấp</SelectItem><SelectItem value="newest">Tour mới nhất</SelectItem></SelectContent></Select>
            </div>
            {filteredTours.length ? (
              <><div className="tour-grid">{filteredTours.slice(0, visibleCount).map((tour) => <TourCard tour={tour} key={tour.tourId} />)}</div>{visibleCount < filteredTours.length ? <Button className="load-more" variant="outline" onClick={() => setVisibleCount((count) => count + 4)}>Xem thêm tour khác <ChevronDown /></Button> : null}</>
            ) : (
              <div className="empty-state"><Search /><h3>Chưa tìm thấy tour phù hợp</h3><p>Hãy thử thay đổi điểm đến, thời gian hoặc khoảng giá.</p><Button className="btn-navy" onClick={() => { setQuery(""); setDestination("Tất cả"); setTime("all"); setPrice("all"); }}>Xóa bộ lọc</Button></div>
            )}
          </div>
        </section>

        <section className="consult-banner" id="tu-van-tour" ref={consultSectionRef}>
          <div><span>Chưa biết nên chọn hành trình nào?</span><h2>BẠN CẦN TƯ VẤN TOUR PHÙ HỢP?</h2><p>Đội ngũ Seven Travel luôn sẵn sàng hỗ trợ bạn.</p></div>
          <div className="consult-actions"><Button asChild className="btn-orange"><a href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer"><MessageCircle />Nhận tư vấn ngay</a></Button><a href={`tel:${HOTLINE}`}><Phone /> Hotline: {displayHotline}</a></div>
        </section>
      </main>
      <Footer />
      <div className="mobile-bottom-bar">
        <a href={`tel:${HOTLINE}`}><Phone />Gọi tư vấn</a>
        <a href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer"><MessageCircle />Zalo</a>
        <a href="#tat-ca-tour"><CalendarDays />Xem lịch tour</a>
      </div>
    </div>
  );
}
