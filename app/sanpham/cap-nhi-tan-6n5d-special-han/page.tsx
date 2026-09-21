import type { Metadata } from "next";
import {
  BadgeCheck,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Gift,
  Hotel,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  ShieldCheck,
  MountainSnow,
  Snowflake,
  Sparkles,
  ThermometerSnowflake,
  Utensils,
  X,
} from "lucide-react";
import CustomerGallery from "./CustomerGallery";
import styles from "./page.module.css";

const HOTLINE = "0899525777";
const DISPLAY_HOTLINE = "089 9525 777";
const CANONICAL = "https://www.seventravel.vn/sanpham/cap-nhi-tan-6n5d-special-han";

export const metadata: Metadata = {
  title: "Tour Cáp Nhĩ Tân 6N5Đ Special từ Hà Nội",
  description:
    "Tour Cáp Nhĩ Tân 6 ngày 5 đêm bay thẳng Vietjet, 2 đêm Làng Tuyết Hương, trượt tuyết Yabuli và Đại Thế Giới Băng Tuyết. Giá từ 37.990.000đ.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Cáp Nhĩ Tân 6N5Đ Special | Seven Travel",
    description:
      "Bay thẳng Hà Nội – Cáp Nhĩ Tân, 2 đêm Làng Tuyết Hương và trọn bộ trải nghiệm mùa đông phương Bắc.",
    url: CANONICAL,
    siteName: "Seven Travel",
    locale: "vi_VN",
    type: "website",
  },
};

const highlights = [
  { icon: Plane, title: "Bay thẳng Vietjet", text: "Hà Nội – Cáp Nhĩ Tân, không mất thời gian nối chuyến." },
  { icon: Hotel, title: "02 đêm Làng Tuyết", text: "Một ngày trọn vẹn sống giữa khung cảnh mùa đông cổ tích." },
  { icon: MountainSnow, title: "03 giờ trượt tuyết", text: "Đã gồm giày, gậy và ván tại khu nghỉ dưỡng Yabuli." },
  { icon: Camera, title: "Gói chụp ảnh", text: "01 bộ trang phục và 05 ảnh chỉnh sửa tại Làng Tuyết." },
  { icon: Utensils, title: "Ẩm thực đặc sắc", text: "Bữa nướng, lẩu trong nhà băng và món hầm nồi gang Đông Bắc." },
  { icon: Gift, title: "Quà giữ ấm", text: "Bộ phụ kiện thiết thực cho hành trình băng tuyết." },
];

const schedules = [
  { date: "13/12", adult: "37.990.000đ", child: "36.590.000đ", single: "8.900.000đ" },
  { date: "18/12 · 20/12", adult: "38.990.000đ", child: "37.590.000đ", single: "8.900.000đ" },
  { date: "25/12 · 27/12 · 01/01", adult: "40.990.000đ", child: "39.590.000đ", single: "9.900.000đ", holiday: true },
  { date: "03/01 · 08/01 · 10/01", adult: "38.990.000đ", child: "37.590.000đ", single: "8.900.000đ" },
];

const itinerary = [
  {
    day: "Ngày 1",
    route: "Hà Nội – Cáp Nhĩ Tân",
    meals: "Suất ăn sân bay",
    image: "/sanpham/cap-nhi-tan-6n5d-special-han/images/day-1-harbin-welcome.jpg",
    content: [
      "15:25, xe và hướng dẫn viên đón đoàn tại điểm hẹn ở Hà Nội, di chuyển ra sân bay Nội Bài.",
      "Đáp chuyến bay thẳng VJ7358 HAN – HRB lúc 19:25–01:00+1. Seven Travel chuẩn bị suất cơm hộp dùng tại sân bay.",
    ],
  },
  {
    day: "Ngày 2",
    route: "Cáp Nhĩ Tân – Yabuli – Làng Tuyết",
    meals: "Sáng · Trưa · Tối",
    image: "/sanpham/cap-nhi-tan-6n5d-special-han/images/day-2-yabuli-ski.jpg",
    content: [
      "Đến Cáp Nhĩ Tân, làm thủ tục nhập cảnh và về khách sạn nghỉ ngơi trước khi bắt đầu hành trình.",
      "Ghé khu chợ gần Nhà thờ Saint Sophia để tham quan và chuẩn bị thêm trang phục giữ ấm.",
      "Trải nghiệm 03 giờ trượt tuyết tại Yabuli, đã bao gồm giày, gậy và ván trượt.",
      "Di chuyển đến Làng Tuyết Hương và nghỉ đêm tại homestay.",
    ],
  },
  {
    day: "Ngày 3",
    route: "Tuyết Hương – Xứ cổ tích giữa đời thực",
    meals: "Sáng · Trưa · Tối",
    image: "/sanpham/cap-nhi-tan-6n5d-special-han/images/snow-village-night.jpg",
    content: [
      "Dành trọn ngày tại Làng Tuyết, không di chuyển đường dài: Đài ngắm cảnh núi Bổng Chùy, Bưu điện Hương Tuyết và Phố Tuyết Vận.",
      "Tặng gói chụp ảnh gồm 01 bộ trang phục và 05 ảnh chỉnh sửa chuyên nghiệp.",
      "Tham gia các hoạt động văn hóa theo lịch địa phương: diễu hành xe hoa, Dương ca và đại nhạc hội ngoài trời.",
      "Buổi tối tự tay làm bánh sủi cảo; nghỉ đêm thứ hai tại Làng Tuyết Hương.",
    ],
  },
  {
    day: "Ngày 4",
    route: "Tuyết Hương – Cáp Nhĩ Tân",
    meals: "Sáng · Trưa · Tối",
    image: "/sanpham/cap-nhi-tan-6n5d-special-han/images/day-4-saint-sophia.jpg",
    content: [
      "Tham quan Thập Lí Hoạ Lang và khu vườn thú trên núi cao giữa cảnh quan băng giá.",
      "Ngắm Cầu sắt Trung Đông và sông băng Tùng Hoa.",
      "Tham quan Quảng trường Nhà thờ Saint Sophia, sau đó dạo bộ trên Phố Trung ương.",
      "Nghỉ đêm tại khách sạn 4 sao ở Cáp Nhĩ Tân.",
    ],
  },
  {
    day: "Ngày 5",
    route: "Volga Manor – Đại Thế Giới Băng Tuyết",
    meals: "Sáng · Trưa · Tối",
    image: "/sanpham/cap-nhi-tan-6n5d-special-han/images/harbin-ice-world.jpg",
    content: [
      "Khám phá Trang viên Volga, thưởng thức đồ ăn nhẹ kiểu Nga và rượu Vodka.",
      "Trải nghiệm trượt phao tuyết từ lâu đài xuống đường tuyết tại Trang viên Volga.",
      "Chiều tham quan Đại Thế Giới Băng Tuyết, chiêm ngưỡng quần thể điêu khắc băng và ánh sáng đặc trưng của Harbin.",
      "Nghỉ đêm tại khách sạn 4 sao ở Cáp Nhĩ Tân.",
    ],
  },
  {
    day: "Ngày 6 + 1",
    route: "Âm vang phương Bắc – Hà Nội",
    meals: "Sáng · Trưa · Tối",
    image: "/sanpham/cap-nhi-tan-6n5d-special-han/images/seven-travel-group.jpg",
    content: [
      "Tham quan Hành lang âm nhạc và Tượng Tuyết nhân khổng lồ khi công trình được hoàn thiện.",
      "Khám phá Phố Trung Hoa Baroque và Bảo tàng Tranh khắc Harbin Pharmaceutical No.6.",
      "Sau bữa tối, ra sân bay đáp chuyến VJ7359 HRB – HAN lúc 02:00–06:15.",
      "06:15 ngày hôm sau, hạ cánh tại Nội Bài; xe đưa đoàn về điểm hẹn và kết thúc hành trình.",
    ],
  },
];

const included = [
  "Visa đoàn Trung Quốc 01 lần nhập cảnh.",
  "Vé máy bay khứ hồi bay thẳng Hà Nội – Cáp Nhĩ Tân, 7kg xách tay và 20kg ký gửi.",
  "Khách sạn 4 sao tại Cáp Nhĩ Tân và homestay tại Làng Tuyết, tiêu chuẩn 02 khách/phòng.",
  "Các bữa ăn theo chương trình, mức ăn 60–80–120 tệ.",
  "Xe du lịch tiện nghi, hướng dẫn viên Việt – Trung chuyên tuyến.",
  "Giấy phép vào Làng Tuyết dành cho khách nước ngoài.",
  "Vé tham quan một lần theo chương trình; 03 giờ trượt tuyết Yabuli gồm dụng cụ.",
  "Bảo hiểm du lịch quyền lợi tối đa 500.000.000đ/người/hành trình.",
];

const excluded = [
  "Chi phí làm hộ chiếu và các chi phí cá nhân ngoài chương trình.",
  "Tiền tip hướng dẫn viên và lái xe: 56 USD/khách/hành trình.",
  "Visa tái nhập Việt Nam đối với Việt kiều hoặc khách nước ngoài.",
  "Trang phục chống tuyết, đồ uống trong bữa ăn và dịch vụ tự chọn.",
  "Phụ thu phòng đơn 8.900.000đ; lịch Noel và Tết Dương 9.900.000đ.",
];

const faqs = [
  {
    q: "Tour có nhận trẻ em dưới 2 tuổi không?",
    a: "Chương trình không nhận trẻ em dưới 2 tuổi. Trẻ từ 2 đến dưới 10 tuổi ngủ chung giường với bố mẹ; nếu cần giường riêng, áp dụng 100% giá người lớn. Trẻ từ 10 tuổi trở lên tính như người lớn.",
  },
  {
    q: "Hồ sơ visa đoàn gồm những gì?",
    a: "Scan mặt hộ chiếu còn hạn trên 6 tháng và ảnh chân dung nền trắng 4x6, không đeo trang sức, tóc gọn gàng. Trẻ dưới 15 tuổi cần bổ sung giấy khai sinh; nếu không đi cùng bố mẹ cần giấy ủy quyền du lịch nước ngoài.",
  },
  {
    q: "Lịch trình có thể thay đổi không?",
    a: "Thứ tự tham quan, khách sạn hoặc đêm lưu trú có thể được điều chỉnh theo cung ứng dịch vụ, thời tiết và quy định địa phương, nhưng vẫn đảm bảo các điểm tham quan và dịch vụ chính trong chương trình.",
  },
  {
    q: "Nếu thời tiết xấu hoặc cao tốc đóng cửa thì sao?",
    a: "Seven Travel sẽ phối hợp điều chỉnh phương án di chuyển để ưu tiên an toàn. Trường hợp chuyển sang tàu hỏa và xe trung chuyển, chi phí phát sinh dự kiến khoảng 150 RMB/khách/lượt sẽ được thông báo theo tình hình thực tế.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Tour Cáp Nhĩ Tân 6N5Đ Special từ Hà Nội",
  description: "Bay thẳng Vietjet, 2 đêm Làng Tuyết Hương, Yabuli và Đại Thế Giới Băng Tuyết.",
  brand: { "@type": "Brand", name: "Seven Travel" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "VND",
    lowPrice: "37990000",
    highPrice: "40990000",
    offerCount: "4",
    availability: "https://schema.org/InStock",
    url: CANONICAL,
  },
};

export default function HarbinSpecialPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className={styles.header}>
        <a href="https://www.seventravel.vn/" className={styles.logo} aria-label="Seven Travel - Trang chủ">
          <img src="/images/seven-travel-logo-white.png" alt="Seven Travel" />
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chương trình">
          <a href="#diem-nhan">Điểm nhấn</a>
          <a href="#lich-trinh">Lịch trình</a>
          <a href="#gia-tour">Giá tour</a>
          <a href="#dich-vu">Dịch vụ</a>
        </nav>
        <a className={styles.headerPhone} href={`tel:${HOTLINE}`}>
          <Phone aria-hidden="true" />
          <span><small>HOTLINE</small>{DISPLAY_HOTLINE}</span>
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}><Snowflake aria-hidden="true" /> TOUR NO SHOPPING · BAY THẲNG</div>
          <h1>Cáp Nhĩ Tân<br /><span>6N5Đ Special</span></h1>
          <p className={styles.heroLead}>Đi ít hơn, ở lâu hơn — dành trọn 02 đêm tại Làng Tuyết Hương và một ngày sống giữa mùa đông phương Bắc.</p>
          <div className={styles.heroFacts}>
            <span><Plane aria-hidden="true" /> Charter Vietjet</span>
            <span><Clock3 aria-hidden="true" /> 6 ngày 5 đêm + 1</span>
            <span><MapPin aria-hidden="true" /> Khởi hành từ Hà Nội</span>
          </div>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#gia-tour">Xem lịch & giá tour</a>
            <a className={styles.ghostButton} href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Nhận tư vấn
            </a>
          </div>
        </div>
        <aside className={styles.heroOffer} aria-label="Giá tour từ">
          <span>Giá trọn gói từ</span>
          <strong>37.990.000đ</strong>
          <p>Visa · Vé máy bay · Khách sạn · Hành lý</p>
          <a href={`tel:${HOTLINE}`}>Giữ chỗ qua hotline <Phone aria-hidden="true" /></a>
        </aside>
        <div className={styles.snowLine} aria-hidden="true" />
      </section>

      <section className={styles.quickBar} aria-label="Thông tin nhanh">
        <div><BadgeCheck aria-hidden="true" /><span><strong>Bay thẳng</strong>Không nối chuyến</span></div>
        <div><Hotel aria-hidden="true" /><span><strong>04 đêm lưu trú</strong>2 đêm Làng Tuyết</span></div>
        <div><ShieldCheck aria-hidden="true" /><span><strong>Bảo hiểm 500 triệu</strong>Theo quyền lợi chương trình</span></div>
        <div><ThermometerSnowflake aria-hidden="true" /><span><strong>Mùa đẹp nhất</strong>Tháng 12 – tháng 01</span></div>
      </section>

      <section className={styles.section} id="diem-nhan">
        <div className={styles.sectionHeading}>
          <span>Trọn bộ trải nghiệm mùa đông</span>
          <h2>Mỗi ngày là một lát cắt khác của xứ sở băng tuyết</h2>
          <p>Từ thể thao ngoài trời đến những đêm yên tĩnh trong làng tuyết, hành trình được thiết kế để bạn có đủ thời gian tận hưởng.</p>
        </div>
        <div className={styles.highlightGrid}>
          {highlights.map(({ icon: Icon, title, text }) => (
            <article className={styles.highlightCard} key={title}>
              <span><Icon aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.storyImage}>
          <img src="/sanpham/cap-nhi-tan-6n5d-special-han/images/snow-village-night.jpg" alt="Làng Tuyết Hương rực sáng trong đêm mùa đông" />
          <span>02 đêm giữa Làng Tuyết Hương</span>
        </div>
        <div className={styles.storyCopy}>
          <span className={styles.kicker}>ĐIỂM KHÁC BIỆT CỦA HÀNH TRÌNH</span>
          <h2>Không ghé qua vội vã. Bạn thực sự sống giữa mùa đông.</h2>
          <p>Hành trình dành trọn một ngày không di chuyển đường dài tại Tuyết Hương. Bạn có thời gian ngắm những mái nhà phủ tuyết, dạo Phố Tuyết Vận, chụp ảnh trong trang phục bản địa và cảm nhận nhịp sống ấm áp giữa cái lạnh phương Bắc.</p>
          <ul>
            <li><Check aria-hidden="true" /> Hỗ trợ kéo vali từ điểm trung chuyển về homestay</li>
            <li><Check aria-hidden="true" /> 01 bộ trang phục và 05 ảnh chỉnh sửa</li>
            <li><Check aria-hidden="true" /> Trải nghiệm làm sủi cảo cùng đoàn</li>
          </ul>
        </div>
      </section>

      <section className={styles.itinerarySection} id="lich-trinh">
        <div className={styles.sectionHeading}>
          <span>Lịch trình chi tiết</span>
          <h2>6 ngày 5 đêm + 1, gọn nhịp di chuyển</h2>
          <p>Mở từng ngày để xem các điểm tham quan và trải nghiệm chính.</p>
        </div>
        <div className={styles.itineraryLayout}>
          <div className={styles.itineraryMain}>
            <div className={styles.itineraryList}>
              {itinerary.map((item, index) => (
                <details className={styles.dayCard} key={item.day} open={index === 0}>
                  <summary>
                    <span className={styles.dayNumber}>{item.day}</span>
                    <span className={styles.dayTitle}><strong>{item.route}</strong><small>{item.meals}</small></span>
                    <ChevronDown className={styles.chevron} aria-hidden="true" />
                  </summary>
                  <div className={styles.dayBody}>
                    <div>
                      {item.content.map((line) => <p key={line}><Check aria-hidden="true" />{line}</p>)}
                    </div>
                    <img src={item.image} alt={`Hình ảnh hành trình ${item.route}`} loading="lazy" />
                  </div>
                </details>
              ))}
            </div>
            <p className={styles.scheduleNote}>Thứ tự tham quan có thể điều chỉnh theo điều kiện thực tế nhưng vẫn đảm bảo các điểm và dịch vụ chính của chương trình.</p>
          </div>

          <aside className={styles.itineraryOffer} aria-label="Giá và đặt tour Cáp Nhĩ Tân">
            <span className={styles.offerBadge}>Tour no shopping · Bay thẳng</span>
            <h3>Cáp Nhĩ Tân 6N5Đ Special</h3>
            <div className={styles.offerPrice}>
              <span>Giá trọn gói từ</span>
              <strong>37.990.000đ</strong>
              <small>/khách</small>
            </div>
            <ul className={styles.offerFacts}>
              <li><Clock3 aria-hidden="true" /><span>Thời gian<strong>6 ngày 5 đêm + 1</strong></span></li>
              <li><MapPin aria-hidden="true" /><span>Khởi hành<strong>Hà Nội</strong></span></li>
              <li><Plane aria-hidden="true" /><span>Di chuyển<strong>Bay thẳng Vietjet</strong></span></li>
              <li><CalendarDays aria-hidden="true" /><span>Lịch gần nhất<strong>13/12 · 18/12 · 20/12</strong></span></li>
            </ul>
            <a className={styles.offerButton} href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" />
              <span><strong>ĐẶT NGAY</strong><small>Giữ chỗ trước — xác nhận sau</small></span>
            </a>
            <a className={styles.offerHotline} href={`tel:${HOTLINE}`}>
              <Phone aria-hidden="true" />
              <span>Hotline tư vấn<strong>{DISPLAY_HOTLINE}</strong></span>
            </a>
          </aside>
        </div>
      </section>

      <section className={styles.priceSection} id="gia-tour">
        <div className={styles.priceIntro}>
          <span className={styles.kicker}>LỊCH KHỞI HÀNH</span>
          <h2>Chọn ngày phù hợp cho mùa tuyết đẹp nhất</h2>
          <p>Giá áp dụng cho đoàn từ 30 khách người lớn. Chỗ và giá được Seven Travel xác nhận lại tại thời điểm đăng ký.</p>
          <div className={styles.priceAssurance}><CircleDollarSign aria-hidden="true" /><span><strong>Giá trọn gói minh bạch</strong>Đã gồm visa đoàn, vé bay thẳng, hành lý và dịch vụ theo chương trình.</span></div>
        </div>
        <div className={styles.priceTableWrap}>
          <table className={styles.priceTable}>
            <caption className="sr-only">Lịch khởi hành và giá tour Cáp Nhĩ Tân</caption>
            <thead><tr><th>Khởi hành</th><th>Người lớn</th><th>Trẻ em</th><th>Phòng đơn</th></tr></thead>
            <tbody>
              {schedules.map((row) => (
                <tr key={row.date} className={row.holiday ? styles.holidayRow : undefined}>
                  <td><CalendarDays aria-hidden="true" /><strong>{row.date}</strong>{row.holiday && <small>Noel · Tết Dương</small>}</td>
                  <td><strong>{row.adult}</strong></td>
                  <td>{row.child}</td>
                  <td>{row.single}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.priceCta}>
            <span>Chọn được ngày phù hợp?</span>
            <a href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Kiểm tra chỗ ngay</a>
          </div>
        </div>
      </section>

      <CustomerGallery />

      <section className={styles.servicesSection} id="dich-vu">
        <div className={styles.sectionHeading}>
          <span>Minh bạch trước khi đặt</span>
          <h2>Giá tour bao gồm những gì?</h2>
        </div>
        <div className={styles.serviceGrid}>
          <article className={styles.includedCard}>
            <h3><BadgeCheck aria-hidden="true" /> Dịch vụ bao gồm</h3>
            <ul>{included.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
          </article>
          <article className={styles.excludedCard}>
            <h3><FileCheck2 aria-hidden="true" /> Dịch vụ chưa bao gồm</h3>
            <ul>{excluded.map((item) => <li key={item}><X aria-hidden="true" />{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className={styles.noticeSection}>
        <div className={styles.noticeIcon}><Snowflake aria-hidden="true" /></div>
        <div>
          <span className={styles.kicker}>LƯU Ý MÙA CAO ĐIỂM</span>
          <h2>Tháng 12 và tháng 01 là mùa đẹp nhất — cũng là mùa đông khách nhất.</h2>
          <p>Cơ sở lưu trú tại Làng Tuyết còn hạn chế. Homestay, khách sạn hoặc thứ tự đêm nghỉ có thể được bố trí linh hoạt để cân bằng chất lượng và khả năng cung ứng. Nếu thời tiết xấu hoặc cao tốc tạm đóng, đoàn có thể chuyển sang tàu hỏa và xe trung chuyển; chi phí phát sinh sẽ được thông báo theo tình hình thực tế.</p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqIntro}>
          <span className={styles.kicker}>CẦN BIẾT TRƯỚC KHI ĐI</span>
          <h2>Visa, trẻ em và thay đổi lịch trình</h2>
          <p>Nếu hồ sơ của bạn có trường hợp đặc biệt, hãy gửi trước cho Seven Travel để được kiểm tra.</p>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <details key={faq.q} open={index === 0}>
              <summary>{faq.q}<ChevronDown aria-hidden="true" /></summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finalCta} id="lien-he">
        <div>
          <span><Sparkles aria-hidden="true" /> MÙA TUYẾT ĐANG CHỜ</span>
          <h2>Giữ chỗ cho hành trình Cáp Nhĩ Tân của bạn</h2>
          <p>Seven Travel kiểm tra ngày khởi hành, chỗ còn lại và hồ sơ visa phù hợp với gia đình bạn.</p>
        </div>
        <div className={styles.finalActions}>
          <a className={styles.primaryButton} href={`tel:${HOTLINE}`}><Phone aria-hidden="true" /> Gọi {DISPLAY_HOTLINE}</a>
          <a className={styles.lightButton} href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Nhắn Zalo</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <img src="/images/seven-travel-logo-white.png" alt="Seven Travel" />
        <div><strong>CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ NGAO DU VIỆT</strong><span>Khám phá thế giới — Ngao du muôn nơi.</span></div>
        <div className={styles.footerContact}><a href={`tel:${HOTLINE}`}>{DISPLAY_HOTLINE}</a><a href="mailto:info@seventravel.vn">info@seventravel.vn</a></div>
      </footer>

      <nav className={styles.mobileBar} aria-label="Liên hệ nhanh">
        <a href={`tel:${HOTLINE}`}><Phone aria-hidden="true" /><span>Gọi tư vấn</span></a>
        <a href="#gia-tour"><CalendarDays aria-hidden="true" /><span>Lịch & giá</span></a>
        <a href={`https://zalo.me/${HOTLINE}`} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /><span>Nhắn Zalo</span></a>
      </nav>
    </main>
  );
}
