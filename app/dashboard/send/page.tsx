'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getSessionToken } from '@/lib/auth';
import { Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

type Tab = 'single' | 'bulk';

export default function SendSmsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('single');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bulkNumbers, setBulkNumbers] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSendSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setIsLoading(true);

    try {
      const token = getSessionToken();
      if (!token) throw new Error('Not authenticated');

      const res = await fetch('/api/sms/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber,
          message,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setResult({
        success: true,
        messageId: data.messageId,
        cost: `₦${data.cost / 100}`,
        remainingBalance: `₦${data.remainingBalance / 100}`,
      });

      setMessage('');
      setPhoneNumber('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send SMS');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendBulk = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setIsLoading(true);

    try {
      const token = getSessionToken();
      if (!token) throw new Error('Not authenticated');

      const phoneNumbers = bulkNumbers
        .split('\n')
        .map(num => num.trim())
        .filter(num => num);

      if (phoneNumbers.length === 0) {
        throw new Error('Please enter at least one phone number');
      }

      const res = await fetch('/api/sms/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          campaignName: campaignName || 'Bulk Campaign',
          message,
          phoneNumbers,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setResult({
        success: true,
        campaignId: data.campaignId,
        sent: data.sent,
        failed: data.failed,
        total: data.total,
        cost: `₦${data.totalCost.toFixed(2)}`,
        remainingBalance: `₦${data.remainingBalance.toFixed(2)}`,
      });

      setMessage('');
      setBulkNumbers('');
      setCampaignName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send bulk SMS');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Send SMS</h1>
        <p className="text-foreground/60 mt-1">Send single or bulk SMS messages to your contacts</p>
      </div>

      <div className="flex gap-4 border-b border-border">
        {(['single', 'bulk'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-foreground/60 hover:text-foreground border-b-2 border-transparent'
            }`}
          >
            {tab === 'single' ? 'Send Single SMS' : 'Send Bulk SMS'}
          </button>
        ))}
      </div>

      <Card className="p-6 border border-border">
        {activeTab === 'single' ? (
          <form onSubmit={handleSendSingle} className="space-y-6 max-w-2xl">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <p className="text-xs text-foreground/60 mt-1">Include country code (e.g., +1 for US)</p>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message (160 characters)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 160))}
                placeholder="Type your message here..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-foreground/60">
                  {message.length} / 160 characters
                </p>
                <p className="text-xs text-foreground/60">
                  Cost: ₦{((message.length > 0 ? 10 : 0) / 100).toFixed(2)}
                </p>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 text-destructive flex gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {result?.success && (
              <div className="p-4 rounded-lg bg-green-50 text-green-900 flex gap-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">SMS Sent Successfully!</p>
                  <p className="text-sm mt-1">Message ID: {result.messageId}</p>
                  <p className="text-sm mt-1">Remaining Balance: {result.remainingBalance}</p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !phoneNumber || !message}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send SMS
                </>
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSendBulk} className="space-y-6 max-w-2xl">
            <div>
              <label htmlFor="campaign" className="block text-sm font-medium text-foreground mb-2">
                Campaign Name
              </label>
              <input
                id="campaign"
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g., Summer Sale 2024"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="numbers" className="block text-sm font-medium text-foreground mb-2">
                Phone Numbers (one per line)
              </label>
              <textarea
                id="numbers"
                value={bulkNumbers}
                onChange={(e) => setBulkNumbers(e.target.value)}
                placeholder="+1234567890&#10;+1987654321&#10;+1555555555"
                rows={6}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm resize-none"
              />
              <p className="text-xs text-foreground/60 mt-1">
                {bulkNumbers.split('\n').filter(n => n.trim()).length} phone numbers
              </p>
            </div>

            <div>
              <label htmlFor="bulkMessage" className="block text-sm font-medium text-foreground mb-2">
                Message (160 characters)
              </label>
              <textarea
                id="bulkMessage"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 160))}
                placeholder="Type your message here..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-foreground/60">
                  {message.length} / 160 characters
                </p>
                <p className="text-xs text-foreground/60">
                  Cost: ₦{(bulkNumbers.split('\n').filter(n => n.trim()).length * 10 / 100).toFixed(2)}
                </p>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 text-destructive flex gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {result?.success && (
              <div className="p-4 rounded-lg bg-green-50 text-green-900 flex gap-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Campaign Sent Successfully!</p>
                  <p className="text-sm mt-1">Sent: {result.sent} | Failed: {result.failed} | Total: {result.total}</p>
                  <p className="text-sm mt-1">Cost: {result.cost}</p>
                  <p className="text-sm mt-1">Remaining Balance: {result.remainingBalance}</p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !bulkNumbers || !message}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Bulk SMS
                </>
              )}
            </Button>
          </form>
        )}
      </Card>

      <Card className="p-6 border border-border bg-secondary/30">
        <h3 className="font-semibold text-foreground mb-4">Wallet Balance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground/60 text-sm">Current Balance</p>
            <p className="text-2xl font-bold text-foreground">₦{(user?.walletBalance || 0) / 100}</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Add Funds
          </Button>
        </div>
      </Card>
    </div>
  );
}
