import { mockDataStore, User } from './mockData';

const SESSION_STORAGE_KEY = 'sms_session_token';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

interface AuthSession {
  userId: string;
  user: User;
  token: string;
  expiresAt: number;
}

export class AuthService {
  private static sessions: Map<string, AuthSession> = new Map();

  static generateToken(): string {
    return 'token_' + Math.random().toString(36).substr(2, 32) + '_' + Date.now();
  }

  static async login(email: string, password: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    const user = mockDataStore.getUserByEmail(email);

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Simple password check (in production, use bcrypt)
    if (user.password !== password) {
      return { success: false, error: 'Invalid password' };
    }

    const token = this.generateToken();
    const session: AuthSession = {
      userId: user.id,
      user,
      token,
      expiresAt: Date.now() + SESSION_TIMEOUT,
    };

    this.sessions.set(token, session);
    return { success: true, user, token };
  }

  static async register(email: string, password: string, name: string, company: string, phone: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    const existingUser = mockDataStore.getUserByEmail(email);

    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      email,
      password, // In production, hash this with bcrypt
      name,
      phone,
      company,
      walletBalance: 100, // Sign-up bonus
      apiKey: 'sk_test_' + Math.random().toString(36).substr(2, 32),
      role: 'user',
      createdAt: new Date(),
    };

    mockDataStore.createUser(newUser);

    const token = this.generateToken();
    const session: AuthSession = {
      userId: newUser.id,
      user: newUser,
      token,
      expiresAt: Date.now() + SESSION_TIMEOUT,
    };

    this.sessions.set(token, session);
    return { success: true, user: newUser, token };
  }

  static getSession(token: string): AuthSession | null {
    const session = this.sessions.get(token);

    if (!session) {
      return null;
    }

    // Check if session expired
    if (session.expiresAt < Date.now()) {
      this.sessions.delete(token);
      return null;
    }

    return session;
  }

  static logout(token: string): void {
    this.sessions.delete(token);
  }

  static validateToken(token: string): User | null {
    const session = this.getSession(token);
    return session?.user || null;
  }
}

// Client-side auth helpers
export function setSessionToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_STORAGE_KEY, token);
  }
}

export function getSessionToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(SESSION_STORAGE_KEY);
  }
  return null;
}

export function clearSessionToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}
