# Hướng dẫn cập nhật trang Sản phẩm HOT

Đây là bộ mã nguồn đã sửa cho project đang phục vụ `www.seventravel.vn/sanpham`.

## Cách cập nhật

1. Sao lưu repository hiện tại.
2. Chép toàn bộ nội dung trong thư mục này vào repository `SevenTravel-Tour-Catalog`.
3. Commit và push lên nhánh Production đang liên kết với Vercel.
4. Chờ Vercel báo Deployment thành công.
5. Mở `https://www.seventravel.vn/sanpham` bằng cửa sổ ẩn danh để kiểm tra.

## Nội dung đã sửa

- Đồng bộ header, màu xanh navy, màu cam và kiểu nút với Seven Travel.
- Sửa icon `Tất cả` bằng logo nền xanh của Seven Travel.
- Sửa icon `Đông Nam Á` bằng biểu trưng ASEAN lưu nội bộ.
- Lưu toàn bộ icon danh mục trong `public/images/catalog/`, không còn phụ thuộc link ảnh ngoài.
- Cân lại logo, bộ lọc, thẻ tour và footer trên máy tính, máy tính bảng và điện thoại.
- Giữ nguyên luồng đọc tour và lịch khởi hành từ Google Sheets.

Không cần tạo lại Google Sheet, Apps Script hay biến môi trường. File `data/google-sheets.ts` được giữ nguyên so với mã nguồn gốc.
