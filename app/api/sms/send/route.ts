import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { mockDataStore, mockSmsGateway } from '@/lib/mockData';

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

    const { phoneNumber, message } = await request.json();

    if (!phoneNumber || !message) {
      return NextResponse.json({ success: false, error: 'Phone and message required' }, { status: 400 });
    }

    // Check wallet balance (assuming $0.10 per SMS)
    const smsCost = 10; // 10 cents in smallest unit
    if (user.walletBalance < smsCost) {
      return NextResponse.json({ success: false, error: 'Insufficient wallet balance' }, { status: 402 });
    }

    // Send SMS
    const smsResult = await mockSmsGateway.sendSms(phoneNumber, message);

    if (smsResult.success) {
      // Deduct from wallet
      mockDataStore.updateUserWallet(user.id, -smsCost);

      // Create transaction record
      const updatedUser = mockDataStore.getUserById(user.id);
      mockDataStore.createTransaction({
        id: `txn_${Date.now()}`,
        userId: user.id,
        type: 'debit',
        amount: smsCost,
        balance: updatedUser?.walletBalance || 0,
        description: `SMS to ${phoneNumber}`,
        reference: smsResult.messageId,
        createdAt: new Date(),
      });
    }

    return NextResponse.json({
      success: smsResult.success,
      messageId: smsResult.messageId,
      cost: smsCost,
      remainingBalance: mockDataStore.getUserById(user.id)?.walletBalance || 0,
    });
  } catch (error) {
    console.error('Send SMS error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send SMS' }, { status: 500 });
  }
}
