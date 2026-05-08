import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { mockDataStore, mockSmsGateway, Campaign, Message } from '@/lib/mockData';

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

    const { campaignName, message, phoneNumbers } = await request.json();

    if (!campaignName || !message || !phoneNumbers || phoneNumbers.length === 0) {
      return NextResponse.json({ success: false, error: 'Campaign name, message, and phone numbers required' }, { status: 400 });
    }

    // Check wallet balance
    const smsCostPerMessage = 10; // 10 cents
    const totalCost = smsCostPerMessage * phoneNumbers.length;

    if (user.walletBalance < totalCost) {
      return NextResponse.json({
        success: false,
        error: `Insufficient balance. Required: ₦${(totalCost / 100).toFixed(2)}, Available: ₦${(user.walletBalance / 100).toFixed(2)}`,
      }, { status: 402 });
    }

    // Create campaign
    const campaignId = `camp_${Date.now()}`;
    const campaign: Campaign = {
      id: campaignId,
      userId: user.id,
      name: campaignName,
      message,
      recipients: phoneNumbers,
      sentCount: 0,
      failedCount: 0,
      status: 'sending',
      cost: totalCost,
      createdAt: new Date(),
    };

    mockDataStore.createCampaign(campaign);

    // Send bulk SMS
    const smsResult = await mockSmsGateway.sendBulkSms(phoneNumbers, message);

    // Create message records
    phoneNumbers.forEach((phone: string, index: number) => {
      const messageId = smsResult.messageIds[index];
      const messageRecord: Message = {
        id: messageId,
        campaignId,
        userId: user.id,
        phoneNumber: phone,
        message,
        status: 'sent',
        sentAt: new Date(),
      };
      mockDataStore.createMessage(messageRecord);
    });

    // Deduct from wallet
    mockDataStore.updateUserWallet(user.id, -totalCost);

    // Create transaction
    const updatedUser = mockDataStore.getUserById(user.id);
    mockDataStore.createTransaction({
      id: `txn_${Date.now()}`,
      userId: user.id,
      type: 'debit',
      amount: totalCost,
      balance: updatedUser?.walletBalance || 0,
      description: `Bulk SMS campaign: ${campaignName}`,
      reference: campaignId,
      createdAt: new Date(),
    });

    // Update campaign
    mockDataStore.updateCampaign(campaignId, {
      sentCount: smsResult.successCount,
      failedCount: smsResult.failedCount,
      status: 'completed',
      completedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      campaignId,
      sent: smsResult.successCount,
      failed: smsResult.failedCount,
      total: phoneNumbers.length,
      totalCost: totalCost / 100,
      remainingBalance: (updatedUser?.walletBalance || 0) / 100,
    });
  } catch (error) {
    console.error('Bulk SMS error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send bulk SMS' }, { status: 500 });
  }
}
