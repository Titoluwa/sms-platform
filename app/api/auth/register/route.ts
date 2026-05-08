import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, company, phone } = await request.json();

    if (!email || !password || !name || !company || !phone) {
      return NextResponse.json({ success: false, error: 'All fields required' }, { status: 400 });
    }

    const result = await AuthService.register(email, password, name, company, phone);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      token: result.token,
      user: {
        id: result.user!.id,
        email: result.user!.email,
        name: result.user!.name,
        role: result.user!.role,
        walletBalance: result.user!.walletBalance,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
  }
}
