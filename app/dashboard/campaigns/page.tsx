'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BarChart3, MessageSquare, Calendar, TrendingUp, Filter, Search } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  message: string;
  recipientCount: number;
  sentCount: number;
  failedCount: number;
  status: 'draft' | 'sending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  cost: number;
}

export default function CampaignsPage() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'failed' | 'draft'>('all');

  // Mock data - in production, fetch from API
  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      {
        id: 'camp_1',
        name: 'Summer Sale Campaign',
        message: 'Get 50% off this summer! Limited time only.',
        recipientCount: 5234,
        sentCount: 5234,
        failedCount: 0,
        status: 'completed',
        createdAt: '2024-04-20',
        completedAt: '2024-04-20',
        cost: 523400,
      },
      {
        id: 'camp_2',
        name: 'April Newsletter',
        message: 'Read our latest updates and industry insights.',
        recipientCount: 3821,
        sentCount: 3805,
        failedCount: 16,
        status: 'completed',
        createdAt: '2024-04-15',
        completedAt: '2024-04-15',
        cost: 382100,
      },
      {
        id: 'camp_3',
        name: 'Flash Deal Alert',
        message: 'Flash sale ends in 24 hours. Shop now!',
        recipientCount: 2156,
        sentCount: 2145,
        failedCount: 11,
        status: 'completed',
        createdAt: '2024-04-10',
        completedAt: '2024-04-10',
        cost: 215600,
      },
      {
        id: 'camp_4',
        name: 'Customer Feedback Survey',
        message: 'Help us improve! Complete our quick survey.',
        recipientCount: 1500,
        sentCount: 1489,
        failedCount: 11,
        status: 'completed',
        createdAt: '2024-04-05',
        completedAt: '2024-04-05',
        cost: 150000,
      },
      {
        id: 'camp_5',
        name: 'Event Announcement',
        message: 'Join us for our exclusive webinar tomorrow at 2 PM.',
        recipientCount: 892,
        sentCount: 0,
        failedCount: 0,
        status: 'draft',
        createdAt: '2024-04-22',
        cost: 0,
      },
    ];

    setCampaigns(mockCampaigns);
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: 'Total Campaigns',
      value: campaigns.length,
      icon: MessageSquare,
    },
    {
      label: 'Completed',
      value: campaigns.filter(c => c.status === 'completed').length,
      icon: TrendingUp,
    },
    {
      label: 'Total Recipients',
      value: campaigns.reduce((sum, c) => sum + c.recipientCount, 0),
      icon: BarChart3,
    },
    {
      label: 'Total Cost',
      value: `₦${campaigns.reduce((sum, c) => sum + c.cost, 0) / 100}`,
      icon: Calendar,
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
          <p className="text-foreground/60 mt-1">Manage and track your SMS campaigns</p>
        </div>
        <Link href="/dashboard/send">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            New Campaign
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-6 h-6 text-primary/60" />
              </div>
              <p className="text-foreground/60 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-4 border border-border">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <Filter className="w-4 h-4 text-foreground/60" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.length === 0 ? (
          <Card className="p-12 border border-border text-center">
            <MessageSquare className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No campaigns found</h3>
            <p className="text-foreground/60 mb-6">Start by creating your first SMS campaign</p>
            <Link href="/dashboard/send">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Create Campaign
              </Button>
            </Link>
          </Card>
        ) : (
          filteredCampaigns.map((campaign) => {
            const deliveryRate = campaign.sentCount > 0
              ? ((campaign.sentCount - campaign.failedCount) / campaign.sentCount * 100).toFixed(1)
              : '0';

            const statusColors = {
              draft: 'bg-secondary text-foreground',
              completed: 'bg-green-100 text-green-900',
              sending: 'bg-blue-100 text-blue-900',
              failed: 'bg-red-100 text-red-900',
            };

            return (
              <Card key={campaign.id} className="p-6 border border-border hover:border-primary/50 transition">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground text-lg">{campaign.name}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[campaign.status]}`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-foreground/60 text-sm mb-4">{campaign.message}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-foreground/60 text-xs">Recipients</p>
                        <p className="font-semibold text-foreground">{campaign.recipientCount}</p>
                      </div>
                      <div>
                        <p className="text-foreground/60 text-xs">Sent</p>
                        <p className="font-semibold text-foreground">{campaign.sentCount}</p>
                      </div>
                      <div>
                        <p className="text-foreground/60 text-xs">Failed</p>
                        <p className="font-semibold text-destructive">{campaign.failedCount}</p>
                      </div>
                      <div>
                        <p className="text-foreground/60 text-xs">Rate</p>
                        <p className="font-semibold text-foreground">{deliveryRate}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-foreground/60 text-xs">Created</p>
                      <p className="font-semibold text-foreground">{campaign.createdAt}</p>
                    </div>
                    {campaign.status !== 'draft' && (
                      <Button variant="ghost" className="text-primary hover:bg-primary/10">
                        Details
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
