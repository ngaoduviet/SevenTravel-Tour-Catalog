import { liveTours as fallbackTours, type Tour, type TourSchedule } from "./tours";

const DEFAULT_SHEET_ID = "1OXapNwR424XgCUg50G4ufCj_XLEyEqWX1JqQ7yXOOas";
const SHEET_ID = process.env.GOOGLE_SHEET_ID?.trim() || DEFAULT_SHEET_ID;
const REVALIDATE_SECONDS = 300;

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
];

type SheetValue = string | number | boolean | null;
type SheetRow = Record<string, SheetValue>;

type GoogleTable = {
  cols?: Array<{ label?: string }>;
  rows?: Array<{ c?: Array<{ v?: SheetValue; f?: string } | null> }>;
};

type GoogleResponse = {
  status?: string;
  table?: GoogleTable;
};

const stringValue = (value: SheetValue | undefined) =>
  value === null || value === undefined ? "" : String(value).trim();

const numberValue = (value: SheetValue | undefined) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const digits = stringValue(value).replace(/[^0-9-]/g, "");
  return digits ? Number(digits) : 0;
};

const booleanValue = (value: SheetValue | undefined) => {
  if (typeof value === "boolean") return value;
  return ["true", "1", "yes", "on", "✔", "✓"].includes(stringValue(value).toLowerCase());
};

const normalizeDuration = (value: SheetValue | undefined) => {
  const raw = stringValue(value);
  const compact = raw.match(/(\d+)\s*n\s*(\d+)\s*[dđ]/i);
  return compact ? `${compact[1]} ngày ${compact[2]} đêm` : raw || "Đang cập nhật";
};

const normalizeProgramUrl = (value: SheetValue | undefined) => {
  const raw = stringValue(value);
  if (!/^https:\/\//i.test(raw) || raw.includes("drive.google.com/drive/folders/")) return undefined;

  const doc = raw.match(/https:\/\/docs\.google\.com\/document\/d\/([^/?#]+)/i);
  if (doc) return `https://docs.google.com/document/d/${doc[1]}/preview`;

  const driveFile = raw.match(/https:\/\/drive\.google\.com\/file\/d\/([^/?#]+)/i);
  if (driveFile) return `https://drive.google.com/file/d/${driveFile[1]}/preview`;

  const driveOpen = raw.match(/[?&]id=([^&#]+)/i);
  if (raw.includes("drive.google.com/open") && driveOpen) {
    return `https://drive.google.com/file/d/${driveOpen[1]}/preview`;
  }

  return raw;
};

const fallbackImage = (tourId: string, provided: SheetValue | undefined) => {
  const raw = stringValue(provided);
  if (/^https:\/\//i.test(raw)) return raw;
  const numericId = numberValue(tourId);
  return FALLBACK_IMAGES[numericId % FALLBACK_IMAGES.length];
};

const parseGoogleResponse = (payload: string): SheetRow[] => {
  const firstBrace = payload.indexOf("{");
  const lastBrace = payload.lastIndexOf("}");
  if (firstBrace < 0 || lastBrace <= firstBrace) throw new Error("Google Sheets returned an invalid response");

  const parsed = JSON.parse(payload.slice(firstBrace, lastBrace + 1)) as GoogleResponse;
  if (parsed.status && parsed.status !== "ok") throw new Error("Google Sheets query failed");

  const labels = (parsed.table?.cols || []).map((column) => stringValue(column.label));
  return (parsed.table?.rows || []).map((row) => {
    const result: SheetRow = {};
    labels.forEach((label, index) => {
      if (!label) return;
      const cell = row.c?.[index];
      result[label] = cell?.v ?? cell?.f ?? "";
    });
    return result;
  });
};

const fetchSheet = async (sheetName: string) => {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
  const response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!response.ok) throw new Error(`Cannot read ${sheetName}`);
  return parseGoogleResponse(await response.text());
};

const buildSchedules = (rows: SheetRow[]): TourSchedule[] =>
  rows
    .map((row) => ({
      status: stringValue(row.status).toUpperCase() === "ON" ? "ON" as const : "OFF" as const,
      scheduleId: stringValue(row.scheduleId),
      tourId: stringValue(row.tourId),
      departureText: stringValue(row.departureText),
      price: numberValue(row.price),
      originalPrice: numberValue(row.originalPrice) || undefined,
      note: stringValue(row.note) || undefined,
      sortOrder: numberValue(row.sortOrder) || 999,
    }))
    .filter((schedule) =>
      schedule.status === "ON" &&
      Boolean(schedule.scheduleId && schedule.tourId && schedule.departureText) &&
      schedule.departureText.toLocaleUpperCase("vi") !== "LỊCH KHỞI HÀNH"
    )
    .sort((a, b) => a.tourId.localeCompare(b.tourId) || a.sortOrder - b.sortOrder);

const uniqueSlug = (slug: string, tourId: string, duplicateSlugs: Map<string, number>) => {
  if ((duplicateSlugs.get(slug) || 0) <= 1) return slug;
  return `${slug}-${tourId.toLowerCase()}`;
};

const buildTours = (rows: SheetRow[], schedules: TourSchedule[]): Tour[] => {
  const eligibleRows = rows.filter((row) => {
    const status = stringValue(row.status).toUpperCase();
    const tourName = stringValue(row.tourName);
    const tourId = stringValue(row.tourId);
    const slug = stringValue(row.slug);
    return status === "ON" && Boolean(tourId && tourName && slug) && tourName.toLocaleUpperCase("vi") !== "CHƯƠNG TRÌNH";
  });

  const duplicateSlugs = eligibleRows.reduce((map, row) => {
    const slug = stringValue(row.slug);
    map.set(slug, (map.get(slug) || 0) + 1);
    return map;
  }, new Map<string, number>());

  return eligibleRows
    .map((row) => {
      const tourId = stringValue(row.tourId);
      const tourSchedules = schedules.filter((schedule) => schedule.tourId === tourId);
      const prices = tourSchedules.map((schedule) => schedule.price).filter((price) => price > 0);
      const originalPrices = tourSchedules.map((schedule) => schedule.originalPrice || 0).filter((price) => price > 0);
      const priceFrom = prices.length ? Math.min(...prices) : 0;
      const originalPrice = originalPrices.length ? Math.min(...originalPrices) : undefined;
      const rawBadge = stringValue(row.badge);
      const badge = (["TOUR HOT", "BEST SELLER", "TOUR MỚI", "ƯU ĐÃI"].includes(rawBadge) ? rawBadge : "TOUR MỚI") as Tour["badge"];
      const rawSlug = stringValue(row.slug);

      return {
        status: "ON" as const,
        tourId,
        tourName: stringValue(row.tourName),
        slug: uniqueSlug(rawSlug, tourId, duplicateSlugs),
        country: stringValue(row.country) || "Trung Quốc",
        region: stringValue(row.region) || "Trung Quốc",
        destination: stringValue(row.destination) || stringValue(row.tourName),
        duration: normalizeDuration(row.duration),
        departureCity: stringValue(row.departureCity) || "Hà Nội",
        departureDates: tourSchedules.length ? tourSchedules.map((schedule) => schedule.departureText) : ["Đang cập nhật"],
        airline: stringValue(row.airline) || "Đang cập nhật",
        priceFrom,
        originalPrice: originalPrice && originalPrice > priceFrom ? originalPrice : undefined,
        badge,
        featured: booleanValue(row.featured),
        imageUrl: fallbackImage(tourId, row.imageUrl),
        programUrl: normalizeProgramUrl(row.programUrl),
        seatsLeft: numberValue(row.seatsLeft) || undefined,
        sortOrder: numberValue(row.sortOrder) || 999,
        schedules: tourSchedules,
      } satisfies Tour;
    })
    .filter((tour) => tour.schedules?.length)
    .sort((a, b) => a.sortOrder - b.sortOrder);
};

export const getLiveTours = async (): Promise<Tour[]> => {
  try {
    const [tourRows, scheduleRows] = await Promise.all([
      fetchSheet("WEB_TOURS"),
      fetchSheet("WEB_SCHEDULES"),
    ]);
    const schedules = buildSchedules(scheduleRows);
    const tours = buildTours(tourRows, schedules);
    return tours.length ? tours : fallbackTours;
  } catch (error) {
    console.error("Unable to refresh Seven Travel Google Sheets data", error);
    return fallbackTours;
  }
};
