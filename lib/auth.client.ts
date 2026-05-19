// Client-safe auth helpers — no server-only imports here
const SESSION_STORAGE_KEY = 'sms_session_token';

export function setSessionToken(token: string): void {
  if (globalThis.window !== undefined) {
    globalThis.window.localStorage.setItem(SESSION_STORAGE_KEY, token);
  }
}

export function getSessionToken(): string | null {
  if (globalThis.window !== undefined) {
    return globalThis.window.localStorage.getItem(SESSION_STORAGE_KEY);
  }
  return null;
}

export function clearSessionToken(): void {
  if (globalThis.window !== undefined) {
    globalThis.window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}
