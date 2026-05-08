// Mock data store - in-memory database
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  company: string;
  walletBalance: number;
  apiKey: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Campaign {
  id: string;
  userId: string;
  name: string;
  message: string;
  recipients: string[];
  sentCount: number;
  failedCount: number;
  status: 'draft' | 'sending' | 'completed' | 'failed';
  scheduledFor?: Date;
  cost: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface Message {
  id: string;
  campaignId: string;
  userId: string;
  phoneNumber: string;
  message: string;
  status: 'pending' | 'sent' | 'failed' | 'delivered';
  dlr?: string;
  sentAt: Date;
  deliveredAt?: Date;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  balance: number;
  description: string;
  reference?: string;
  createdAt: Date;
}

export interface PricingPlan {
  id: string;
  name: string;
  credits: number;
  price: number;
  costPerSms: number;
}

// In-memory data stores
class MockDataStore {
  private users: Map<string, User> = new Map();
  private campaigns: Map<string, Campaign> = new Map();
  private messages: Map<string, Message> = new Map();
  private transactions: Map<string, WalletTransaction> = new Map();
  private sessions: Map<string, string> = new Map(); // sessionToken -> userId

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create demo user
    const demoUser: User = {
      id: 'user-demo',
      email: 'demo@example.com',
      password: 'demo123',
      name: 'Demo User',
      phone: '+1234567890',
      company: 'Demo Company',
      walletBalance: 5000,
      apiKey: 'sk_test_' + Math.random().toString(36).substr(2, 32),
      role: 'user',
      createdAt: new Date(),
    };

    // Create admin user
    const adminUser: User = {
      id: 'user-admin',
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User',
      phone: '+9876543210',
      company: 'SMS Platform',
      walletBalance: 0,
      apiKey: 'sk_admin_' + Math.random().toString(36).substr(2, 32),
      role: 'admin',
      createdAt: new Date(),
    };

    this.users.set(demoUser.id, demoUser);
    this.users.set(adminUser.id, adminUser);
  }

  // User methods
  getUserByEmail(email: string): User | undefined {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return undefined;
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  createUser(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  // Campaign methods
  createCampaign(campaign: Campaign): Campaign {
    this.campaigns.set(campaign.id, campaign);
    return campaign;
  }

  getCampaignById(id: string): Campaign | undefined {
    return this.campaigns.get(id);
  }

  getUserCampaigns(userId: string): Campaign[] {
    return Array.from(this.campaigns.values()).filter(c => c.userId === userId);
  }

  getAllCampaigns(): Campaign[] {
    return Array.from(this.campaigns.values());
  }

  updateCampaign(id: string, updates: Partial<Campaign>): Campaign | undefined {
    const campaign = this.campaigns.get(id);
    if (campaign) {
      const updated = { ...campaign, ...updates };
      this.campaigns.set(id, updated);
      return updated;
    }
    return undefined;
  }

  // Message methods
  createMessage(message: Message): Message {
    this.messages.set(message.id, message);
    return message;
  }

  getCampaignMessages(campaignId: string): Message[] {
    return Array.from(this.messages.values()).filter(m => m.campaignId === campaignId);
  }

  updateMessage(id: string, updates: Partial<Message>): Message | undefined {
    const message = this.messages.get(id);
    if (message) {
      const updated = { ...message, ...updates };
      this.messages.set(id, updated);
      return updated;
    }
    return undefined;
  }

  // Transaction methods
  createTransaction(transaction: WalletTransaction): WalletTransaction {
    this.transactions.set(transaction.id, transaction);
    return transaction;
  }

  getUserTransactions(userId: string): WalletTransaction[] {
    return Array.from(this.transactions.values()).filter(t => t.userId === userId);
  }

  // Session methods
  createSession(sessionToken: string, userId: string): void {
    this.sessions.set(sessionToken, userId);
  }

  getSession(sessionToken: string): string | undefined {
    return this.sessions.get(sessionToken);
  }

  deleteSession(sessionToken: string): void {
    this.sessions.delete(sessionToken);
  }

  // Utility methods
  updateUserWallet(userId: string, amount: number): boolean {
    const user = this.users.get(userId);
    if (user) {
      user.walletBalance += amount;
      return true;
    }
    return false;
  }
}

export const mockDataStore = new MockDataStore();

// SMS Gateway mock
export class MockSmsGateway {
  async sendSms(phoneNumber: string, message: string): Promise<{ success: boolean; messageId: string }> {
    // Simulate sending SMS with 95% success rate
    const success = Math.random() > 0.05;
    console.log(`[SMS] ${phoneNumber}: ${message} - ${success ? 'SUCCESS' : 'FAILED'}`);
    return {
      success,
      messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  async sendBulkSms(phoneNumbers: string[], message: string): Promise<{ successCount: number; failedCount: number; messageIds: string[] }> {
    const results = await Promise.all(phoneNumbers.map(phone => this.sendSms(phone, message)));
    const messageIds = results.map(r => r.messageId);
    const successCount = results.filter(r => r.success).length;
    const failedCount = results.filter(r => !r.success).length;
    return { successCount, failedCount, messageIds };
  }
}

export const mockSmsGateway = new MockSmsGateway();

// Pricing plans
export const pricingPlans: PricingPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter',
    credits: 100,
    price: 999, // $9.99
    costPerSms: 0.08,
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    credits: 500,
    price: 3999, // $39.99
    costPerSms: 0.07,
  },
  {
    id: 'plan-business',
    name: 'Business',
    credits: 2000,
    price: 9999, // $99.99
    costPerSms: 0.05,
  },
];
