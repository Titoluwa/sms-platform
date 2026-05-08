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

    // In production, this would create a Stripe checkout session
    // For now, we'll return a mock checkout URL
    const checkoutId = `stripe_${Date.now()}`;

    return NextResponse.json({
      success: true,
      checkoutId,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price,
      amountFormatted: `₦${(plan.price / 100).toFixed(2)}`,
      credits: plan.credits,
      mockCheckoutUrl: `/dashboard/checkout/${checkoutId}?planId=${planId}`,
    });
  } catch (error) {
    console.error('Wallet top-up error:', error);
    return NextResponse.json({ success: false, error: 'Failed to initiate top-up' }, { status: 500 });
  }
}
