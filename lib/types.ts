export interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    name: string;
    phone: string;
    company: string;
    avatar: string;
    role: 'user' | 'admin';
    status: 'active' | 'suspended';
    emailVerified: boolean;
    phoneVerified: boolean;
    walletTransactions: WalletTransaction[];
    sessions: Session[];
    apiKeys: ApiKey[];
    adminLogs: AdminLog[];
    settings: UserSettings;
    wallet: Wallet;
    createdAt: Date;
    updatedAt: Date;
}

export interface Wallet {
    id: string;
    userId: string;
    balance: number;
    totalSpent: number;
    totalTopups: number;
    currency: string;
    lastTopupDate?: Date | null;
    lowBalanceAlert: boolean;
    user: User;
    transactions: WalletTransaction[];
    createdAt: Date;
    updatedAt: Date;
}

export interface WalletTransaction {
    id: string;
    walletId: string;
    userId: string;
    type: string;
    amount: number;
    currency: string;
    description?: string | null;
    stripePaymentId?: string | null;
    stripeInvoiceId?: string | null;
    paymentMethod?: string | null;
    status: string;
    failureReason?: string | null;
    wallet: Wallet;
    user: User;
    createdAt: Date;
}

export interface Session {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
    lastActivity: Date;
    isActive: boolean;
    user: User;
    createdAt: Date;
}

export interface Campaign {
    id: string;
    userId: string;
    name: string;
    message: string;
    type: string;
    status: string;
    scheduledFor?: Date | null;
    startedAt?: Date | null;
    completedAt?: Date | null;
    totalRecipients: number;
    sentCount: number;
    deliveredCount: number;
    failedCount: number;
    totalCost: number;
    senderName: string;
    templateId?: string | null;
    variables?: [string, any][] | null;
    user: User;
    recipients: Recipient[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Recipient {
    id: string;
    campaignId: string;
    userId: string;
    phoneNumber: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    status: string;
    sentAt?: Date | null;
    deliveredAt?: Date | null;
    readAt?: Date | null;
    failureReason?: string | null;
    dlr?: string | null;
    messageCost: number;
    campaign: Campaign;
    user: User;
    message?: Message | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
    id: string;
    recipientId: string;
    campaignId?: string | null;
    phoneNumber: string;
    content: string;
    messageId?: string | null;
    status: string;
    sentAt?: Date | null;
    deliveredAt?: Date | null;
    failedAt?: Date | null;
    failureCode?: string | null;
    cost: number;
    recipient: Recipient;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiKey {
    id: string;
    userId: string;
    name: string;
    key: string;
    secret: string;
    isActive: boolean;
    lastUsedAt?: Date | null;
    permissions: string[];
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

export interface AdminLog {
    id: string;
    adminId: string;
    action: string;
    targetUserId?: string | null;
    targetType?: string | null;
    targetId?: string | null;
    changes?: [string, any][] | null;
    reason?: string | null;
    ipAddress?: string | null;
    admin: User;
    createdAt: Date;
}

export interface UserSettings {
    id: string;
    userId: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
    lowBalanceAlert: boolean;
    campaignUpdates: boolean;
    dataRetention: string;
    allowAnalytics: boolean;
    timezone: string;
    dateFormat: string;
    theme: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

export interface Template {
    id: string;
    name: string;
    category?: string | null;
    content: string;
    variables: string[];
    description?: string | null;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface SystemSettings {
    id: string;
    key: string;
    value: any;
    description?: string | null;
    updatedAt: Date;
    updatedBy?: string | null;
}