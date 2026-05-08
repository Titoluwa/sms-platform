'use client';

import { useAuth } from '@/lib/authContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BarChart3, MessageSquare, Send, TrendingUp, Wallet, Plus } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total SMS Sent',
      value: '12,450',
      change: '+2.5%',
      icon: Send,
    },
    {
      label: 'Wallet Balance',
      value: `₦${(user?.walletBalance || 0) / 100}`,
      change: 'Add funds',
      icon: Wallet,
    },
    {
      label: 'Campaigns',
      value: '28',
      change: 'Active: 3',
      icon: MessageSquare,
    },
    {
      label: 'Delivery Rate',
      value: '99.8%',
      change: '+0.3%',
      icon: TrendingUp,
    },
  ];

  const recentCampaigns = [
    {
      id: 1,
      name: 'Summer Sale Campaign',
      sent: 5234,
      delivered: 5198,
      failed: 36,
      date: '2024-04-20',
      status: 'completed',
    },
    {
      id: 2,
      name: 'Newsletter - April',
      sent: 3821,
      delivered: 3805,
      failed: 16,
      date: '2024-04-15',
      status: 'completed',
    },
    {
      id: 3,
      name: 'Flash Deal Alert',
      sent: 2156,
      delivered: 2145,
      failed: 11,
      date: '2024-04-10',
      status: 'completed',
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome, {user?.name}!</h1>
          <p className="text-foreground/60 mt-1">Here's your SMS campaign overview</p>
        </div>
        <Link href="/dashboard/send">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Send SMS
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 border border-border hover:border-primary/50 transition">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-6 h-6 text-primary/60" />
                <span className="text-sm text-foreground/60">{stat.change}</span>
              </div>
              <p className="text-foreground/60 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Recent Campaigns */}
      <Card className="border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Campaigns</h2>
            <Link href="/dashboard/campaigns">
              <Button variant="ghost" className="text-primary hover:bg-primary/10">
                View All
              </Button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-secondary/30">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Campaign</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Sent</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Delivered</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Failed</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Rate</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentCampaigns.map((campaign) => {
                const deliveryRate = ((campaign.delivered / campaign.sent) * 100).toFixed(1);
                return (
                  <tr key={campaign.id} className="hover:bg-secondary/30 transition">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{campaign.name}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{campaign.sent}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{campaign.delivered}</td>
                    <td className="px-6 py-4 text-sm text-destructive">{campaign.failed}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{deliveryRate}%</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{campaign.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border border-border hover:border-primary/50 transition cursor-pointer">
          <Link href="/dashboard/send">
            <MessageSquare className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Send Single SMS</h3>
            <p className="text-foreground/60 text-sm">Send an SMS to a single recipient</p>
          </Link>
        </Card>

        <Card className="p-6 border border-border hover:border-primary/50 transition cursor-pointer">
          <Link href="/dashboard/campaigns">
            <BarChart3 className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2">View Campaigns</h3>
            <p className="text-foreground/60 text-sm">Track your SMS campaign performance</p>
          </Link>
        </Card>

        <Card className="p-6 border border-border hover:border-primary/50 transition cursor-pointer">
          <Link href="/dashboard/wallet">
            <Wallet className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Add Funds</h3>
            <p className="text-foreground/60 text-sm">Top up your wallet balance</p>
          </Link>
        </Card>
      </div>
    </div>
  );
}
