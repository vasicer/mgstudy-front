/**
 * 프론트 전용 임시 로그인/기록 저장소 (localStorage 기반).
 * 실제 로그인은 백엔드 API로 구성될 예정 — 이 파일의 함수들을 그 API 호출로
 * 교체하면 페이지 쪽 코드는 그대로 재사용할 수 있도록 함수 시그니처를 맞춰뒀습니다.
 */

const AUTH_KEY = "mgstudy:auth";
const ACCOUNT_KEY = "mgstudy:account";
const HISTORY_KEY = "mgstudy:historyList";

export const AVATAR_OPTIONS = [
  "🦕",
  "🦁",
  "🐼",
  "🦊",
  "🐸",
  "🐰",
  "🐧",
  "🦄",
  "🐬",
  "🌟",
];
export const DEFAULT_AVATAR = AVATAR_OPTIONS[0];

export type Account = {
  name: string;
  email: string;
  nickname?: string;
  avatar?: string;
};
export type HistoryEntry = { question: string; age: string; date: string };

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(AUTH_KEY);
}

export function getCurrentEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_KEY);
}

export function login(email: string) {
  localStorage.setItem(AUTH_KEY, email);
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function signup(account: Account) {
  localStorage.setItem(
    ACCOUNT_KEY,
    JSON.stringify({
      ...account,
      nickname: account.nickname ?? account.name,
      avatar: account.avatar ?? DEFAULT_AVATAR,
    })
  );
  login(account.email);
}

export function getAccount(): Account | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ACCOUNT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Account;
  } catch {
    return null;
  }
}

export function updateProfile(updates: Partial<Pick<Account, "nickname" | "avatar">>) {
  const current = getAccount();
  const merged: Account = {
    name: current?.name ?? "",
    email: current?.email ?? getCurrentEmail() ?? "",
    nickname: current?.nickname ?? current?.name ?? "",
    avatar: current?.avatar ?? DEFAULT_AVATAR,
    ...updates,
  };
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(merged));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

export function addHistoryEntry(entry: HistoryEntry) {
  const list = getHistory();
  list.unshift(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 50)));
}
