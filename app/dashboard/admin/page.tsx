'use client';

import { useAuth } from '@/lib/authContext';
import { ProtectedRoute } from '@/components/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, TrendingUp, DollarSign, AlertCircle, Search } from 'lucide-react';
import { useState } from 'react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  company: string;
  walletBalance: number;
  totalSent: number;
  createdAt: string;
  status: 'active' | 'suspended';
}

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  // Mock admin data
  const adminStats = [
    { label: 'Total Users', value: '1,234', change: '+5.2%', icon: Users },
    { label: 'Total SMS Sent', value: '2.5M', change: '+12.3%', icon: MessageSquare },
    { label: 'Revenue', value: '₦45,230', change: '+8.1%', icon: DollarSign },
    { label: 'Avg Delivery Rate', value: '99.2%', change: '+0.5%', icon: TrendingUp },
  ];

  const allUsers: AdminUser[] = [
    {
      id: 'user-demo',
      name: 'Demo User',
      email: 'demo@example.com',
      company: 'Demo Company',
      walletBalance: 5000,
      totalSent: 12450,
      createdAt: '2024-01-15',
      status: 'active',
    },
    {
      id: 'user-1',
      name: 'John Smith',
      email: 'john@acmecorp.com',
      company: 'Acme Corp',
      walletBalance: 25000,
      totalSent: 185320,
      createdAt: '2023-11-20',
      status: 'active',
    },
    {
      id: 'user-2',
      name: 'Sarah Johnson',
      email: 'sarah@globaltrade.io',
      company: 'Global Trade Inc',
      walletBalance: 0,
      totalSent: 89234,
      createdAt: '2023-10-05',
      status: 'active',
    },
    {
      id: 'user-3',
      name: 'Mike Davis',
      email: 'mike@retailplus.com',
      company: 'Retail Plus',
      walletBalance: 15500,
      totalSent: 234567,
      createdAt: '2023-08-12',
      status: 'active',
    },
    {
      id: 'user-4',
      name: 'Emma Wilson',
      email: 'emma@techstart.co',
      company: 'TechStart',
      walletBalance: 3200,
      totalSent: 45600,
      createdAt: '2024-02-01',
      status: 'suspended',
    },
  ];

  const filteredUsers = allUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <ProtectedRoute requiredRole={user?.role}>
      <div className="p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-foreground/60 mt-1">Manage users, monitor system, and view platform analytics</p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index + 1} className="p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-6 h-6 text-primary/60" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
                <p className="text-foreground/60 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        {/* System Health */}
        <Card className="p-6 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">API Status</p>
                <p className="text-sm text-foreground/60">All endpoints operational</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Database</p>
                <p className="text-sm text-foreground/60">Response time: 12ms</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">SMS Gateway</p>
                <p className="text-sm text-foreground/60">Connected and stable</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        </Card>

        {/* User Management */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-foreground">User Management</h2>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Add User
            </Button>
          </div>

          {/* Filters */}
          <Card className="p-4 border border-border mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <select
                value={userStatusFilter}
                onChange={(e) => setUserStatusFilter(e.target.value as any)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </Card>

          {/* Users Table */}
          <Card className="border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-secondary/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">User</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Company</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Balance</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Total Sent</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Joined</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-secondary/30 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{u.name}</p>
                          <p className="text-sm text-foreground/60">{u.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{u.company}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">
                        ₦{(u.walletBalance / 100).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/70">{u.totalSent}</td>
                      <td className="px-6 py-4 text-sm text-foreground/70">{u.createdAt}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          u.status === 'active'
                            ? 'bg-green-100 text-green-900'
                            : 'bg-red-100 text-red-900'
                        }`}>
                          {u.status === 'active' ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" className="text-xs text-primary hover:bg-primary/10">
                            View
                          </Button>
                          <Button variant="ghost" className="text-xs text-foreground/60 hover:bg-secondary">
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* System Alerts */}
        <Card className="p-6 border border-border bg-yellow-50">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Upcoming Maintenance</h3>
              <p className="text-sm text-yellow-800">
                Scheduled maintenance window on May 5th from 2-4 AM UTC. Services will be temporarily unavailable.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
