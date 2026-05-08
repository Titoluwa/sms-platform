'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { getSessionToken } from '@/lib/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, TrendingUp, Download, Loader2, CheckCircle } from 'lucide-react';
import { pricingPlans } from '@/lib/mockData';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  balance: number;
}

export default function WalletPage() {
  const { user, login } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  // Mock transactions
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: 'txn_1',
        type: 'credit',
        amount: 9999,
        description: 'Purchased Pro plan - 500 credits',
        date: '2024-04-15',
        balance: 20000,
      },
      {
        id: 'txn_2',
        type: 'debit',
        amount: 234,
        description: 'Bulk SMS campaign',
        date: '2024-04-14',
        balance: 10001,
      },
      {
        id: 'txn_3',
        type: 'debit',
        amount: 45,
        description: 'SMS to +1234567890',
        date: '2024-04-13',
        balance: 10235,
      },
      {
        id: 'txn_4',
        type: 'credit',
        amount: 3999,
        description: 'Purchased Starter plan - 100 credits',
        date: '2024-04-10',
        balance: 10280,
      },
    ];
    setTransactions(mockTransactions);
  }, []);

  const handleTopup = async (planId: string) => {
    setIsLoading(true);
    setSelectedPlan(planId);

    try {
      const token = getSessionToken();
      if (!token) throw new Error('Not authenticated');

      const res = await fetch('/api/wallet/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setCheckoutId(data.checkoutId);

      // Simulate Stripe checkout and payment confirmation
      // In production, redirect to Stripe Checkout
      setTimeout(() => {
        handlePaymentConfirm(planId);
      }, 2000);
    } catch (error) {
      console.error('Top-up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentConfirm = async (planId: string) => {
    setIsProcessing(true);

    try {
      const token = getSessionToken();
      if (!token) throw new Error('Not authenticated');

      const res = await fetch('/api/wallet/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setSuccessMessage(`Successfully added ${data.creditsAdded} credits! New balance: ₦${data.newBalance}`);
      setCheckoutId(null);

      // Refresh auth data
      const currentToken = getSessionToken();
      if (currentToken) {
        const validateRes = await fetch('/api/auth/validate', {
          headers: { 'Authorization': `Bearer ${currentToken}` },
        });
        const userData = await validateRes.json();
        if (userData.user) {
          // In real app, would update auth context
        }
      }

      setTimeout(() => {
        setSuccessMessage('');
        setSelectedPlan(null);
      }, 3000);
    } catch (error) {
      console.error('Payment confirmation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
        <p className="text-foreground/60 mt-1">Manage your account balance and add funds</p>
      </div>

      {/* Current Balance */}
      <Card className="p-8 border border-border bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground/60 text-sm font-medium mb-2">Current Balance</p>
            <p className="text-4xl font-bold text-foreground">₦{(user?.walletBalance || 0) / 100}</p>
            <p className="text-foreground/60 text-sm mt-2">Ready to send SMS campaigns</p>
          </div>
          <Wallet className="w-16 h-16 text-primary/20" />
        </div>
      </Card>

      {successMessage && (
        <div className="p-4 rounded-lg bg-green-50 text-green-900 flex gap-3">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <p>{successMessage}</p>
        </div>
      )}

      {checkoutId && (
        <Card className="p-6 border border-border bg-secondary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground font-semibold">Processing payment...</p>
              <p className="text-foreground/60 text-sm">Simulating Stripe checkout (demo mode)</p>
            </div>
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        </Card>
      )}

      {/* Pricing Plans */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Choose a Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className="p-6 border border-border flex flex-col"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">{plan.name}</h3>
              <div className="mb-1">
                <span className="text-3xl font-bold text-foreground">₦{(plan.price / 100).toFixed(2)}</span>
                <span className="text-foreground/60">/month</span>
              </div>
              <p className="text-sm text-primary font-semibold mb-6">₦{(plan.costPerSms * 100).toFixed(2)}/SMS</p>

              <div className="mb-6 space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{plan.credits} SMS credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-foreground/70 text-sm">Real-time tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-foreground/70 text-sm">API access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-foreground/70 text-sm">Priority support</span>
                </div>
              </div>

              <Button
                onClick={() => handleTopup(plan.id)}
                disabled={isLoading && selectedPlan === plan.id}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading && selectedPlan === plan.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Add Funds'
                )}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <Card className="border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
            <Button variant="ghost" className="text-primary hover:bg-primary/10">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-secondary/30">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Balance</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-secondary/30 transition">
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      txn.type === 'credit'
                        ? 'bg-green-100 text-green-900'
                        : 'bg-red-100 text-red-900'
                    }`}>
                      {txn.type === 'credit' ? '+' : '-'}₦{(txn.amount / 100).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{txn.description}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">
                    <span className={txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                      {txn.type === 'credit' ? '+' : '-'}₦{(txn.amount / 100).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">₦{(txn.balance / 100).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-foreground/70">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
