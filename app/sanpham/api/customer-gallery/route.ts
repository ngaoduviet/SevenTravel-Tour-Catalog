import { NextResponse } from "next/server";

const DEFAULT_FOLDER_ID = "1_eapOPZ2PuctPus_XouQvMs7eAxPn9wf";

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
};

export const revalidate = 300;

export async function GET() {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  const folderId = process.env.GOOGLE_DRIVE_CUSTOMER_GALLERY_FOLDER_ID || DEFAULT_FOLDER_ID;

  if (!apiKey) {
    return NextResponse.json(
      { images: [], source: "local-fallback", configured: false },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } },
    );
  }

  const query = `'${folderId}' in parents and trashed = false and mimeType contains 'image/'`;
  const params = new URLSearchParams({
    q: query,
    key: apiKey,
    orderBy: "modifiedTime desc",
    pageSize: "30",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    fields: "files(id,name,mimeType,modifiedTime)",
  });

  try {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
      next: { revalidate },
    });

    if (!response.ok) {
      return NextResponse.json(
        { images: [], source: "local-fallback", configured: true },
        { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" } },
      );
    }

    const data = await response.json() as { files?: DriveFile[] };
    const images = (data.files ?? []).map((file, index) => ({
      id: file.id,
      name: `Khoảnh khắc Cáp Nhĩ Tân ${index + 1}`,
      src: `https://drive.google.com/thumbnail?id=${encodeURIComponent(file.id)}&sz=w1600`,
      alt: `Ảnh khách hàng Seven Travel tại Cáp Nhĩ Tân - ${file.name}`,
    }));

    return NextResponse.json(
      { images, source: "google-drive", configured: true },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } },
    );
  } catch {
    return NextResponse.json(
      { images: [], source: "local-fallback", configured: true },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600" } },
    );
  }
}
