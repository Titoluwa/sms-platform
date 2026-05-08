import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create demo user
  const demoUserPassword = await bcrypt.hash('demo123', 10)
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: demoUserPassword,
      firstName: 'Demo',
      lastName: 'User',
      company: 'Demo Company',
      phone: '+1234567890',
      role: 'user',
      status: 'active',
      emailVerified: true,
      phoneVerified: true,
    },
  })

  // Create demo user's wallet
  await prisma.wallet.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      balance: 50,
      totalSpent: 10,
      totalTopups: 60,
      currency: 'USD',
      lowBalanceAlert: true,
    },
  })

  // Create demo user settings
  await prisma.userSettings.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      emailNotifications: true,
      smsNotifications: false,
      lowBalanceAlert: true,
      campaignUpdates: true,
      dataRetention: '30days',
      allowAnalytics: true,
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      theme: 'light',
    },
  })

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      company: 'SMS Platform',
      role: 'admin',
      status: 'active',
      emailVerified: true,
      phoneVerified: true,
    },
  })

  // Create admin wallet
  await prisma.wallet.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      balance: 1000,
      totalSpent: 0,
      totalTopups: 1000,
      currency: 'USD',
      lowBalanceAlert: false,
    },
  })

  // Create sample campaign
  const campaign = await prisma.campaign.create({
    data: {
      userId: demoUser.id,
      name: 'Welcome Campaign',
      message: 'Welcome to our service! Thank you for signing up.',
      type: 'bulk',
      status: 'completed',
      senderName: 'Demo SMS',
      totalRecipients: 2,
      sentCount: 2,
      deliveredCount: 2,
      failedCount: 0,
      totalCost: 0.3,
      completedAt: new Date(),
    },
  })

  // Create sample recipients
  await prisma.recipient.create({
    data: {
      campaignId: campaign.id,
      userId: demoUser.id,
      phoneNumber: '+1234567890',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      status: 'delivered',
      sentAt: new Date(),
      deliveredAt: new Date(),
      messageCost: 0.15,
    },
  })

  await prisma.recipient.create({
    data: {
      campaignId: campaign.id,
      userId: demoUser.id,
      phoneNumber: '+1987654321',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      status: 'delivered',
      sentAt: new Date(),
      deliveredAt: new Date(),
      messageCost: 0.15,
    },
  })

  // Create sample templates
  await prisma.template.create({
    data: {
      name: 'OTP Template',
      category: 'security',
      content: 'Your verification code is {{code}}. Valid for 10 minutes.',
      variables: ['code'],
      description: 'One-time password verification template',
      isPublic: true,
    },
  })

  await prisma.template.create({
    data: {
      name: 'Promotional Template',
      category: 'marketing',
      content: 'Hi {{firstName}}, Check out our latest offer: {{offer}}',
      variables: ['firstName', 'offer'],
      description: 'Generic promotional message template',
      isPublic: true,
    },
  })

  // Create system settings
  await prisma.systemSettings.create({
    data: {
      key: 'sms_rate_per_message',
      value: { rate: 0.15, currency: 'USD' },
      description: 'Cost per SMS message',
    },
  })

  await prisma.systemSettings.create({
    data: {
      key: 'default_sms_validity',
      value: { hours: 24 },
      description: 'Default SMS validity period',
    },
  })

  console.log('Database seed completed successfully!')
  console.log('Demo user: demo@example.com / demo123')
  console.log('Admin user: admin@example.com / admin123')
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
