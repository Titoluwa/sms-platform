'use client';

import { useAuth } from '@/lib/authContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Key, Bell, Lock, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [copied, setCopied] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(user?.id || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-foreground/60 mt-1">Manage your account preferences and security</p>
      </div>

      {/* Account Information */}
      <Card className="p-6 border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-6">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              value={user?.name || ''}
              readOnly
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-secondary/30 text-foreground focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-secondary/30 text-foreground focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Account Role</label>
            <input
              type="text"
              value={user?.role === 'admin' ? 'Administrator' : 'User'}
              readOnly
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-secondary/30 text-foreground focus:outline-none"
            />
          </div>
          <div className="pt-4">
            <Button variant="outline" className="border border-border">
              Edit Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* API Keys */}
      <Card className="p-6 border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Key className="w-5 h-5" />
          API Keys
        </h2>
        <p className="text-foreground/60 text-sm mb-6">
          Use these keys to authenticate API requests for programmatic SMS sending
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border bg-secondary/30">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-foreground/60 mb-1">Production API Key</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-foreground">
                    {showApiKey ? 'sk_test_' + user?.id?.slice(0, 20) : 'sk_test_••••••••••••••••••'}
                  </code>
                </div>
              </div>
              <button
                onClick={handleCopyApiKey}
                className="p-2 rounded-lg hover:bg-secondary transition"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-foreground/60" />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowApiKey(!showApiKey)}
              className="border border-border"
            >
              {showApiKey ? 'Hide' : 'Show'} Key
            </Button>
            <Button variant="outline" className="border border-border">
              Regenerate
            </Button>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h2>

        <div className="space-y-4">
          {[
            { label: 'Campaign Completion Alerts', description: 'Notify when SMS campaigns complete' },
            { label: 'Low Balance Warnings', description: 'Alert when wallet balance drops below ₦10' },
            { label: 'Failed Message Alerts', description: 'Notify about delivery failures' },
            { label: 'Marketing Emails', description: 'Receive tips and product updates' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/30 transition">
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-foreground/60">{item.description}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked={index < 3}
                className="w-5 h-5 rounded border-border cursor-pointer"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6 border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Security
        </h2>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-foreground">Password</p>
              <Button variant="ghost" className="text-primary hover:bg-primary/10">
                Change
              </Button>
            </div>
            <p className="text-sm text-foreground/60">Last changed 3 months ago</p>
          </div>

          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <Button variant="ghost" className="text-primary hover:bg-primary/10">
                Enable
              </Button>
            </div>
            <p className="text-sm text-foreground/60">Add an extra layer of security to your account</p>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border border-red-200 bg-red-50">
        <h2 className="text-lg font-semibold text-red-900 mb-6">Danger Zone</h2>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-red-200 bg-red-50">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-red-900">Sign Out from All Devices</p>
              <Button variant="ghost" className="text-red-600 hover:bg-red-100">
                Sign Out All
              </Button>
            </div>
            <p className="text-sm text-red-800">End your session on all devices</p>
          </div>

          <div className="p-4 rounded-lg border border-red-200 bg-red-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-red-900">Delete Account</p>
                <p className="text-sm text-red-800">Permanently delete your account and all data</p>
              </div>
              <Button variant="ghost" className="text-red-600 hover:bg-red-100">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Logout */}
      <div className="flex gap-4">
        <Button
          onClick={logout}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
