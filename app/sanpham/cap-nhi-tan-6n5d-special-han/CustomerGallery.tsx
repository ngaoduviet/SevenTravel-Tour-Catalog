"use client";

import { useEffect, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Images } from "lucide-react";
import styles from "./page.module.css";

type GalleryImage = {
  id: string;
  name: string;
  src: string;
  alt: string;
};

const fallbackImages: GalleryImage[] = [
  {
    id: "group",
    name: "Hành trình đáng nhớ cùng cả đoàn",
    src: "/sanpham/cap-nhi-tan-6n5d-special-han/images/gallery-group.jpg",
    alt: "Đoàn khách Seven Travel check-in tại Cáp Nhĩ Tân vào mùa đông",
  },
  {
    id: "ice-wheel",
    name: "Check-in giữa thế giới băng tuyết",
    src: "/sanpham/cap-nhi-tan-6n5d-special-han/images/gallery-ice-wheel.jpg",
    alt: "Du khách check-in bên vòng quay và công trình băng tuyết",
  },
  {
    id: "friends",
    name: "Niềm vui được sẻ chia",
    src: "/sanpham/cap-nhi-tan-6n5d-special-han/images/gallery-friends.jpg",
    alt: "Hai du khách lưu lại khoảnh khắc vui vẻ trong tuyết",
  },
  {
    id: "snow-play",
    name: "Thỏa sức vui đùa cùng tuyết",
    src: "/sanpham/cap-nhi-tan-6n5d-special-han/images/gallery-snow-play.jpg",
    alt: "Du khách vui chơi giữa khung cảnh tuyết trắng",
  },
  {
    id: "skiing",
    name: "Trải nghiệm trượt tuyết đầy hứng khởi",
    src: "/sanpham/cap-nhi-tan-6n5d-special-han/images/gallery-tubing.jpg",
    alt: "Du khách trải nghiệm trượt tuyết tại Cáp Nhĩ Tân",
  },
];

export default function CustomerGallery() {
  const [images, setImages] = useState<GalleryImage[]>(fallbackImages);
  const [activeIndex, setActiveIndex] = useState(0);
  const [syncedFromDrive, setSyncedFromDrive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/sanpham/api/customer-gallery", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((data: { images?: GalleryImage[]; source?: string } | null) => {
        if (data?.images?.length) {
          setImages(data.images);
          setActiveIndex(0);
          setSyncedFromDrive(data.source === "google-drive");
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
      });

    return () => controller.abort();
  }, []);

  const activeImage = images[activeIndex] ?? fallbackImages[0];
  const showPrevious = () => setActiveIndex((index) => (index - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % images.length);

  return (
    <section className={styles.customerGallerySection} aria-labelledby="gallery-title">
      <div className={styles.customerGalleryShell}>
        <div className={styles.customerGalleryHeading}>
          <span><Camera aria-hidden="true" /> Khoảnh khắc mùa đông</span>
          <h2 id="gallery-title">Cập nhật ảnh của khách hàng</h2>
          <p>Hình ảnh thật từ những đoàn đã đồng hành cùng Seven Travel tại Cáp Nhĩ Tân.</p>
        </div>

        <div className={styles.customerGalleryViewer}>
          <figure className={styles.customerGalleryMain}>
            <img src={activeImage.src} alt={activeImage.alt} loading="lazy" />
            <figcaption>{activeImage.name}</figcaption>
            {images.length > 1 && (
              <div className={styles.galleryControls} aria-label="Điều khiển thư viện ảnh">
                <button type="button" onClick={showPrevious} aria-label="Xem ảnh trước"><ChevronLeft aria-hidden="true" /></button>
                <button type="button" onClick={showNext} aria-label="Xem ảnh tiếp theo"><ChevronRight aria-hidden="true" /></button>
              </div>
            )}
          </figure>

          <div className={styles.customerGalleryThumbs} aria-label="Danh sách ảnh khách hàng">
            {images.slice(0, 18).map((image, index) => (
              <button
                type="button"
                key={image.id}
                className={index === activeIndex ? styles.activeThumb : undefined}
                onClick={() => setActiveIndex(index)}
                aria-label={`Xem ảnh ${index + 1}: ${image.name}`}
                aria-pressed={index === activeIndex}
              >
                <img src={image.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>

          <div className={styles.gallerySourceNote}>
            <Images aria-hidden="true" />
            <span>{syncedFromDrive ? "Ảnh mới được đồng bộ tự động từ kho Seven Travel." : "Ảnh thật từ kho lưu trữ của Seven Travel."}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
