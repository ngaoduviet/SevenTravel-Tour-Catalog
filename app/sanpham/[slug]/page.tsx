import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLiveTours } from "@/data/google-sheets";
import { formatPrice } from "@/data/tours";

const HOTLINE = "0899525777";
const displayHotline = "089 9525 777";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tours = await getLiveTours();
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) return { title: "Không tìm thấy tour | Seven Travel" };
  return {
    title: `Tour ${tour.tourName} ${tour.duration.replace(" ngày ", "N").replace(" đêm", "Đ")}`,
    description: `Tour ${tour.tourName} ${tour.duration} cùng Seven Travel. Xem lịch khởi hành, giá tour và chương trình chi tiết.`,
    alternates: {
      canonical: `https://www.seventravel.vn/sanpham/${tour.slug}`,
    },
  };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tours = await getLiveTours();
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) notFound();

  return (
    <div className="detail-page">
      <header className="site-header">
        <div className="header-inner detail-header-inner">
          <a href="https://www.seventravel.vn/" className="brand-link" aria-label="Seven Travel - Trang chủ"><img src="/images/seven-travel-logo.png" alt="Seven Travel" /></a>
          <nav className="detail-nav" aria-label="Điều hướng"><Link href="/sanpham">Danh sách tour</Link><a href="#chuong-trinh">Chương trình</a><a href="#lien-he">Liên hệ</a></nav>
          <a className="hotline" href={`tel:${HOTLINE}`}><Phone /><span><small>HOTLINE</small>{displayHotline}</span></a>
        </div>
      </header>

      <main>
        <div className="detail-shell">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/sanpham">Trang chủ</Link><span>/</span><Link href="/sanpham">Tour</Link><span>/</span><span>{tour.country}</span><span>/</span><strong>{tour.tourName}</strong></nav>
          <section className="detail-hero">
            <div className="detail-image"><img src={tour.imageUrl} alt={`Toàn cảnh hành trình ${tour.tourName}`} /><span className="tour-badge">{tour.badge}</span></div>
            <div className="detail-summary">
              <p className="tour-code">{tour.tourId} • Khởi hành từ {tour.departureCity}</p>
              <h1>{tour.tourName}</h1>
              <p className="detail-lead">Hành trình được Seven Travel chọn lọc với lịch trình rõ ràng, dịch vụ đồng bộ và đội ngũ tư vấn theo sát trước – trong – sau chuyến đi.</p>
              <div className="quick-grid">
                <div><Clock3 /><span><small>Thời lượng</small><strong>{tour.duration}</strong></span></div>
                <div><CalendarDays /><span><small>Khởi hành</small><strong>{tour.departureDates.join(", ")}</strong></span></div>
                <div><Plane /><span><small>Phương tiện</small><strong>{tour.airline}</strong></span></div>
                <div><MapPin /><span><small>Điểm khởi hành</small><strong>{tour.departureCity}</strong></span></div>
              </div>
              <div className="detail-price"><span>Giá tour từ</span><strong>{formatPrice(tour.priceFrom)}</strong>{tour.originalPrice ? <del>{formatPrice(tour.originalPrice)}</del> : null}</div>
              <div className="detail-actions"><Button asChild className="btn-primary"><a href={`tel:${HOTLINE}`}><Phone />Đặt tour ngay</a></Button><Button asChild className="btn-navy"><a href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer"><MessageCircle />Nhận tư vấn</a></Button></div>
              <p className="detail-assurance"><ShieldCheck /> Tư vấn minh bạch · Xác nhận dịch vụ trước khi đặt</p>
            </div>
          </section>

          <section className="program-layout" id="chuong-trinh">
            <article className="program-card">
              <div className="program-heading"><span><FileText /></span><div><p>Hồ sơ hành trình</p><h2>CHƯƠNG TRÌNH CHI TIẾT</h2></div></div>
              {tour.schedules?.length ? (
                <section className="schedule-section" aria-labelledby="schedule-title">
                  <h3 id="schedule-title">Lịch khởi hành và giá tour</h3>
                  <div className="schedule-table-wrap">
                    <table className="schedule-table">
                      <thead><tr><th>Lịch khởi hành</th><th>Giá tour</th><th>Ghi chú</th></tr></thead>
                      <tbody>{tour.schedules.map((schedule) => (
                        <tr key={schedule.scheduleId}>
                          <td>{schedule.departureText}</td>
                          <td><strong>{formatPrice(schedule.price)}</strong>{schedule.originalPrice && schedule.originalPrice > schedule.price ? <del>{formatPrice(schedule.originalPrice)}</del> : null}</td>
                          <td>{schedule.note || "—"}</td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                </section>
              ) : null}
              {tour.programUrl ? (
                <div className="document-frame"><iframe title={`Chương trình ${tour.tourName}`} src={tour.programUrl} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /><Button asChild className="btn-navy"><a href={tour.programUrl} target="_blank" rel="noreferrer">Mở tài liệu toàn màn hình <ExternalLink /></a></Button></div>
              ) : (
                <div className="document-placeholder">
                  <FileText />
                  <h3>Chương trình đang được cập nhật lên thư viện</h3>
                  <p>Nhận ngay file lịch trình, tiêu chuẩn dịch vụ và chính sách tour từ tư vấn viên Seven Travel.</p>
                  <Button asChild className="btn-primary"><a href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer"><MessageCircle />Nhận chương trình tour</a></Button>
                </div>
              )}
            </article>
            <aside className="detail-sidebar">
              <h2>Thông tin tour</h2>
              <ul>
                <li><CheckCircle2 /> Lịch trình: {tour.duration}</li>
                <li><CheckCircle2 /> Khởi hành: {tour.departureDates.join(", ")}</li>
                <li><CheckCircle2 /> Phương tiện: {tour.airline}</li>
                <li><CheckCircle2 /> Tư vấn visa và thủ tục</li>
                <li><CheckCircle2 /> Hướng dẫn viên theo đoàn</li>
              </ul>
              <div className="sidebar-price"><span>Giá từ</span><strong>{formatPrice(tour.priceFrom)}</strong></div>
              <Button asChild className="btn-primary sidebar-button"><a href={`tel:${HOTLINE}`}>Đặt tour ngay</a></Button>
              <Button asChild className="btn-navy sidebar-button"><a href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer">Nhận tư vấn</a></Button>
              <a className="sidebar-phone" href={`tel:${HOTLINE}`}><Phone />Gọi {displayHotline}</a>
            </aside>
          </section>
        </div>

        <section className="consult-banner detail-consult" id="lien-he">
          <div><span>Tư vấn đúng nhu cầu, rõ từng dịch vụ</span><h2>SẴN SÀNG CHO HÀNH TRÌNH TIẾP THEO?</h2><p>Seven Travel đồng hành từ lúc chọn tour đến khi bạn trở về.</p></div>
          <div className="consult-actions"><Button asChild className="btn-orange"><a href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer"><MessageCircle />Nhận tư vấn ngay</a></Button><a href={`tel:${HOTLINE}`}><Phone /> Hotline: {displayHotline}</a></div>
        </section>
      </main>

      <footer className="site-footer compact-footer"><div className="compact-footer-inner"><img src="/images/seven-travel-logo-white.png" alt="Seven Travel" /><p>CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ NGAO DU VIỆT</p><p>© {new Date().getFullYear()} Seven Travel. All rights reserved.</p></div></footer>
      <div className="mobile-bottom-bar"><a href={`tel:${HOTLINE}`}><Phone />Gọi tư vấn</a><a href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer"><MessageCircle />Zalo</a><a href="#chuong-trinh"><FileText />Chương trình</a></div>
    </div>
  );
}
