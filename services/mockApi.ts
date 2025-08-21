// services/mockApi.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

// ---- Types --------------------------------------------------------------

export type ThemeMode = "light" | "dark";

export type Announcement = {
  id: string;
  title: string;
  content: string;
  sender: string;
  date: string; // "YYYY-MM-DD HH:mm" veya ISO
  read: boolean;
};

export type ScheduleItem = {
  id: string;
  day: string;     // Pazartesi, Salı...
  time: string;    // "09:00" veya "10:00 - 11.30"
  title: string;   // Ders adı
};

export type UpcomingLesson = {
  id: string;
  time: string;   // "09:00"
  title: string;  // "Matematik"
  status: "Aktif" | "İptal";
};

export type LessonCatalogItem = {
  id: string;
  name: string;
  teacher: string;
  day: string;
  time: string;
};

export type EnrolledLesson = { id: string; name: string };

export type DebtDetail = { id: string; lesson: string; amount: number };

export type UserSettings = {
  theme: ThemeMode;
  notificationOffsetMinutes: number;
  enableLocalNotifications: boolean;
  lastScheduleViewedAt: string | null; // ISO
  expoPushToken: string | null;
};

export type UserProfile = {
  name: string;
  studentNo: string;
  phone: string;
  totalDebt: number;
};

export type UserModel = {
  id: string;
  profile: UserProfile;
  settings: UserSettings;
  announcements: Announcement[];
  schedule: ScheduleItem[];
  upcomingLessons: UpcomingLesson[];
  lessonCatalog: LessonCatalogItem[];
  enrolledLessons: EnrolledLesson[];
  debtDetails: DebtDetail[];
  pendingLessonRequests: Array<{
    id: string;
    lessonId: string;
    requestedAt: string; // ISO
    status: "beklemede" | "onaylandı" | "reddedildi";
  }>;
};

export type RootDB = {
  users: UserModel[];
};

// ---- Internal utils -----------------------------------------------------

const STORAGE_KEY = "__MOCK_DB_V1__";
const DEFAULT_USER_ID = "u_001";

// RN bundler: db.json'u import edebiliyoruz (read-only)
const seed: RootDB = require("../db.json");

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));
const deepClone = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

async function loadDB(): Promise<RootDB> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as RootDB;
    } catch {
      // bozulmuşsa seed'e dön
    }
  }
  // yoksa seed'i yaz ve dön
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return deepClone(seed);
}

async function saveDB(db: RootDB) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function findUser(db: RootDB, userId = DEFAULT_USER_ID): UserModel {
  const u = db.users.find((x) => x.id === userId);
  if (!u) throw new Error("User not found");
  return u;
}

// ---- Public API ---------------------------------------------------------

/**
 * Gerçek API çağrısı gibi: hepsi Promise döndürür ve küçük bir gecikme ekler.
 * Ekranlarınızda doğrudan bu fonksiyonları kullanın.
 */

export async function getUser(userId = DEFAULT_USER_ID): Promise<UserModel> {
  const db = await loadDB();
  await delay();
  return deepClone(findUser(db, userId));
}

// ---- Profile & Settings ----

export async function getProfile(): Promise<UserProfile> {
  const db = await loadDB();
  await delay();
  return deepClone(findUser(db).profile);
}

export async function getSettings(): Promise<UserSettings> {
  const db = await loadDB();
  await delay();
  return deepClone(findUser(db).settings);
}

export async function updateSettings(partial: Partial<UserSettings>): Promise<UserSettings> {
  const db = await loadDB();
  const user = findUser(db);
  user.settings = { ...user.settings, ...partial };
  await saveDB(db);
  await delay();
  return deepClone(user.settings);
}

// ---- Announcements ----

export async function getAnnouncements(): Promise<Announcement[]> {
  const db = await loadDB();
  await delay();
  // Yeni gelenleri üstte görmek için tarihe göre sıralayalım (desc)
  const list = [...findUser(db).announcements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return deepClone(list);
}

export async function markAnnouncementRead(id: string): Promise<void> {
  const db = await loadDB();
  const anns = findUser(db).announcements;
  const idx = anns.findIndex((a) => a.id === id);
  if (idx !== -1) anns[idx].read = true;
  await saveDB(db);
  await delay(200);
}

export async function addAnnouncement(data: Omit<Announcement, "id" | "read"> & { id?: string; read?: boolean }): Promise<Announcement> {
  const db = await loadDB();
  const u = findUser(db);
  const newAnn: Announcement = {
    id: data.id ?? Date.now().toString(),
    read: data.read ?? false,
    title: data.title,
    content: data.content,
    sender: data.sender,
    date: data.date,
  };
  u.announcements.unshift(newAnn);
  await saveDB(db);
  await delay(200);
  return deepClone(newAnn);
}

// ---- Schedule / Upcoming ----

export async function getSchedule(): Promise<ScheduleItem[]> {
  const db = await loadDB();
  await delay();
  return deepClone(findUser(db).schedule);
}

export async function setLastScheduleViewed(nowISO = new Date().toISOString()): Promise<void> {
  const db = await loadDB();
  const u = findUser(db);
  u.settings.lastScheduleViewedAt = nowISO;
  await saveDB(db);
  await delay(150);
}

export async function getUpcomingLessons(): Promise<UpcomingLesson[]> {
  const db = await loadDB();
  await delay();
  return deepClone(findUser(db).upcomingLessons);
}

// ---- Lesson Catalog / Enrolled ----

export async function getLessonCatalog(): Promise<LessonCatalogItem[]> {
  const db = await loadDB();
  await delay();
  return deepClone(findUser(db).lessonCatalog);
}

export async function getEnrolledLessons(): Promise<EnrolledLesson[]> {
  const db = await loadDB();
  await delay();
  return deepClone(findUser(db).enrolledLessons);
}

export async function postLessonRequest(lessonId: string): Promise<{ id: string; status: "beklemede" }> {
  const db = await loadDB();
  const u = findUser(db);
  const req = {
    id: "lr_" + Date.now().toString(),
    lessonId,
    requestedAt: new Date().toISOString(),
    status: "beklemede" as const,
  };
  u.pendingLessonRequests.unshift(req);
  await saveDB(db);
  await delay(300);
  return { id: req.id, status: req.status };
}

// ---- Debts ----

export async function getDebtDetails(): Promise<DebtDetail[]> {
  const db = await loadDB();
  await delay();
  return deepClone(findUser(db).debtDetails);
}

export async function getTotalDebt(): Promise<number> {
  const db = await loadDB();
  await delay();
  return findUser(db).profile.totalDebt;
}

export async function setTotalDebt(newAmount: number): Promise<number> {
  const db = await loadDB();
  const u = findUser(db);
  u.profile.totalDebt = newAmount;
  await saveDB(db);
  await delay(150);
  return newAmount;
}

// ---- Utils for tests / dev ----

export async function resetMockDB(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
  await loadDB(); // seed'i tekrar yaz
}

export async function __debug__dump(): Promise<RootDB> {
  const db = await loadDB();
  return deepClone(db);
}