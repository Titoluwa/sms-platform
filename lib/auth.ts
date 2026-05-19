import 'server-only';
import prisma from './prisma';
import { User as PrismaUser } from '../generated/prisma/client';

const SESSION_STORAGE_KEY = 'sms_session_token';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

// We extend the Prisma user to match the expected interface in the frontend
export type User = PrismaUser & {
  name: string;
  walletBalance: number;
};

export class AuthService {
  static generateToken(): string {
    return 'token_' + Math.random().toString(36).substring(2, 34) + '_' + Date.now();
  }

  static async login(email: string, password: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { wallet: true }
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Simple password check (in production, use bcrypt)
    if (user.password !== password) {
      return { success: false, error: 'Invalid password' };
    }

    const token = this.generateToken();
    const expiresAt = new Date(Date.now() + SESSION_TIMEOUT);

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
        isActive: true,
      }
    });

    const enrichedUser: User = {
      ...user,
      name: `${user.firstName} ${user.lastName}`.trim(),
      walletBalance: user.wallet?.balance || 0,
    };

    return { success: true, user: enrichedUser, token };
  }

  static async register(email: string, password: string, name: string, company: string, phone: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const newUser = await prisma.user.create({
      data: {
        email,
        password, // In production, hash this with bcrypt
        firstName,
        lastName,
        company,
        phone,
        role: 'user',
        status: 'active',
        wallet: {
          create: {
            balance: 100, // Sign-up bonus
          }
        },
        apiKeys: {
          create: {
            name: 'Default API Key',
            key: 'sk_test_' + Math.random().toString(36).substring(2, 34),
            secret: Math.random().toString(36).substring(2, 34),
          }
        }
      },
      include: { wallet: true }
    });

    const token = this.generateToken();
    const expiresAt = new Date(Date.now() + SESSION_TIMEOUT);

    await prisma.session.create({
      data: {
        userId: newUser.id,
        token,
        expiresAt,
        isActive: true,
      }
    });

    const enrichedUser: User = {
      ...newUser,
      name: `${newUser.firstName} ${newUser.lastName}`.trim(),
      walletBalance: newUser.wallet?.balance || 0,
    };

    return { success: true, user: enrichedUser, token };
  }

  static async getSession(token: string) {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { 
        user: {
          include: { wallet: true }
        }
      }
    });

    if (!session?.isActive) {
      return null;
    }

    // Check if session expired
    if (session.expiresAt.getTime() < Date.now()) {
      await prisma.session.update({
        where: { id: session.id },
        data: { isActive: false }
      });
      return null;
    }

    return session;
  }

  static async logout(token: string): Promise<void> {
    await prisma.session.update({
      where: { token },
      data: { isActive: false }
    }).catch(() => {
      // Ignore if token doesn't exist
    });
  }

  static async validateToken(token: string): Promise<User | null> {
    const session = await this.getSession(token);
    
    if (!session) return null;

    const user = session.user;
    return {
      ...user,
      name: `${user.firstName} ${user.lastName}`.trim(),
      walletBalance: user.wallet?.balance || 0,
    };
  }
}
