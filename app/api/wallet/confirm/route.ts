import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { mockDataStore, pricingPlans } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const user = AuthService.validateToken(token);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    const { planId } = await request.json();

    if (!planId) {
      return NextResponse.json({ success: false, error: 'Plan ID required' }, { status: 400 });
    }

    const plan = pricingPlans.find(p => p.id === planId);

    if (!plan) {
      return NextResponse.json({ success: false, error: 'Plan not found' }, { status: 404 });
    }

    // In production, verify Stripe payment here
    // For now, simulate successful payment

    // Add credits to wallet
    const creditsInCents = plan.credits * 100; // Convert credits to cents (1 credit = 1 cent cost)
    mockDataStore.updateUserWallet(user.id, creditsInCents);

    // Create transaction record
    const updatedUser = mockDataStore.getUserById(user.id);
    mockDataStore.createTransaction({
      id: `txn_${Date.now()}`,
      userId: user.id,
      type: 'credit',
      amount: creditsInCents,
      balance: updatedUser?.walletBalance || 0,
      description: `Purchased ${plan.name} plan - ${plan.credits} credits`,
      reference: `stripe_${Date.now()}`,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Payment confirmed',
      newBalance: (updatedUser?.walletBalance || 0) / 100,
      creditsAdded: plan.credits,
    });
  } catch (error) {
    console.error('Wallet confirmation error:', error);
    return NextResponse.json({ success: false, error: 'Failed to confirm payment' }, { status: 500 });
  }
}
