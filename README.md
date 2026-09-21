# Seven Travel — Tour Catalog Online

Website phụ tại route `/sanpham`, được xây dựng theo hướng mobile-first để khách hàng:

1. Tìm và lọc tour theo điểm đến, thời gian, mức giá.
2. Xem nhanh lịch khởi hành, thời lượng, phương tiện và giá.
3. Mở trang chi tiết riêng cho từng tour.
4. Nhận chương trình tour và tư vấn qua điện thoại/Zalo.

## Chạy trên máy cá nhân

```bash
npm install
npx next dev
```

Mở `http://localhost:3000/sanpham`.

## Đưa lên GitHub và Vercel

- Đưa toàn bộ thư mục dự án lên một repository GitHub.
- Trong Vercel, chọn **Add New Project** và import repository đó.
- Framework được nhận diện là **Next.js**; tệp `vercel.json` đã chỉ định lệnh build phù hợp.
- Sau khi Vercel cấp URL, thêm rewrite vào `vercel.json` của website chính để giữ địa chỉ `www.seventravel.vn/sanpham`:

```json
{
  "rewrites": [
    {
      "source": "/sanpham",
      "destination": "https://TEN-DU-AN.vercel.app/sanpham"
    },
    {
      "source": "/sanpham/:path*",
      "destination": "https://TEN-DU-AN.vercel.app/sanpham/:path*"
    }
  ]
}
```

Thay `TEN-DU-AN` bằng URL thật của dự án catalog.

## Cập nhật dữ liệu tour bằng Google Sheets

Website đang đọc dữ liệu từ bảng **SEVEN TRAVEL – WEBSITE DATA**:

`https://docs.google.com/spreadsheets/d/1OXapNwR424XgCUg50G4ufCj_XLEyEqWX1JqQ7yXOOas/edit`

- `WEB_TOURS`: thông tin chung, ảnh và link chương trình của từng tour.
- `WEB_SCHEDULES`: lịch khởi hành và giá, liên kết với tour bằng `tourId`.
- Chỉ các dòng `status = ON` mới được hiển thị.
- Dữ liệu được làm mới tối đa khoảng 5 phút sau khi Google Sheets thay đổi.
- Link Google Docs/Drive tại `programUrl` được chuẩn hóa sang chế độ `/preview` để nhúng vào trang chi tiết.
- `data/tours.ts` là dữ liệu dự phòng khi Google Sheets tạm thời không truy cập được.

Để đổi sang bảng khác, đặt biến `GOOGLE_SHEET_ID` trong Vercel bằng ID của Google Sheets mới. Nếu không đặt, website sử dụng bảng Seven Travel nêu trên.

## Đồng bộ ảnh khách hàng từ Google Drive

Trang Cáp Nhĩ Tân có block **Cập nhật ảnh của khách hàng**. Website luôn giữ sẵn một bộ ảnh dự phòng trong mã nguồn; khi cấu hình Google Drive API, block này sẽ tự lấy tối đa 30 ảnh mới nhất trong thư mục Drive công khai và làm mới danh sách khoảng mỗi 5 phút.

Thư mục mặc định:

`https://drive.google.com/drive/folders/1_eapOPZ2PuctPus_XouQvMs7eAxPn9wf`

Trong Vercel, vào **Project Settings → Environment Variables** và thêm:

- `GOOGLE_DRIVE_API_KEY`: API key của Google Cloud đã bật **Google Drive API**.
- `GOOGLE_DRIVE_CUSTOMER_GALLERY_FOLDER_ID`: không bắt buộc; chỉ cần đặt khi muốn đổi sang thư mục khác.

Sau khi thêm biến môi trường, redeploy project một lần. Từ đó nhân sự chỉ cần tải ảnh vào thư mục Drive và đặt quyền chia sẻ **Anyone with the link / Viewer**; không cần sửa code cho từng ảnh mới.

---

## Thông tin kỹ thuật của starter

A clean full-stack starter running on [vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`
- Linux with `flock`, `curl`, and GNU `timeout`

## Sites Lifecycle

The Sites lifecycle CLI runs the locked dependency install before returning this checkout. Edit the source under `app/`, then checkpoint when a coherent milestone is ready to inspect or share. The remote Sites builder runs `npm run build` against the pushed commit. Do not repeat install or build as a normal pre-checkpoint step.

This starter does not use `wrangler.jsonc`.

`install:ci` is intentionally a single, non-retrying `npm ci`. It refuses a concurrent install for the same project, consumes a matching image-seeded npm cache with `--prefer-offline` while retaining registry fallback for a missing cache object, otherwise downloads and verifies the complete vinext tarball recorded in `package-lock.json`, limits npm to one socket, and terminates a stalled install. `build` applies a short timeout. These helpers target Linux and use GNU `timeout`; they are not native macOS scripts.

Scripts that need writable project-scoped home, npm, XDG, and temporary paths use `scripts/sites-env.sh`. The `dev` and `start` scripts honor the caller's runtime environment and keep Wrangler logs inside the checkout. The generated `.sites-runtime/` directory is disposable and ignored by Git.

## Included Shape

- edit site code under `app/`
- `app/chatgpt-auth.ts` provides optional dispatch-owned ChatGPT sign-in helpers
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/index.ts` reads the D1 binding from the Cloudflare Worker environment
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from `oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive `oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty `name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by `oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send anonymous visitors through Sign in with ChatGPT.
- In a Server Component, start sign-in with `<a href={chatGPTSignInPath(returnTo)} target="_top">`. The auth helper module is server-only; do not import it into a Client Component.
- Do not use `fetch`, XHR, a client-side router, or a framework link that can prefetch the sign-in route. SIWC must start as a top-level navigation.
- Never request the AuthAPI authorization endpoint directly. The dispatch-owned `/signin-with-chatgpt` route must start the SIWC flow.
- Use `chatGPTSignOutPath(returnTo)` for browser sign-out links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the OAuth cookies, and identity header injection. Do not implement app routes for those reserved paths. Routes that do not import and call the helper remain anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the Sites hosting platform's access policy controls for workspace-wide restrictions, or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write actions tied to the current ChatGPT user. Leave public content anonymous.

## Diagnostic Commands

- `npm run install:ci`: perform the one bounded lockfile install
- `npm run dev`: start the Vite/Vinext development server
- `npm run build`: build the deployable Sites artifact
- `npm run start`: start the built Vinext application
- `npm test`: build and verify the rendered development-preview metadata
- `npm run db:generate`: generate Drizzle migrations after schema changes

Use build commands for targeted diagnosis after a remote failure, not as part of the normal checkpoint path.

The timeout defaults can be overridden for a controlled canary with `SITES_INSTALL_TIMEOUT`, `SITES_INSTALL_KILL_AFTER`, `SITES_BUILD_TIMEOUT`, and `SITES_BUILD_KILL_AFTER`. A timeout fails the command; the helpers never retry an unchanged install or build.

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
