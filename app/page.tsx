'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, MessageSquare, BarChart3, Zap, Users, Lock, TrendingUp } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <main className="w-full overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">SMSHub</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-foreground/70 hover:text-foreground transition">Features</a>
              <a href="#pricing" className="text-foreground/70 hover:text-foreground transition">Pricing</a>
              <a href="#about" className="text-foreground/70 hover:text-foreground transition">About</a>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32 bg-gradient-to-br from-background via-background to-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                {/* <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 mb-4">
                  <span className="text-sm text-accent">Now available in 150+ countries</span>
                </div> */}
                <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight text-balance">
                  Reach Your Customers Instantly
                </h1>
                <p className="text-xl text-foreground/60 mt-6 max-w-xl text-balance">
                  Send bulk SMS campaigns in seconds. Reach millions of customers with industry-leading delivery rates. Fast, reliable, affordable.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Free Trial <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-8">
                <div>
                  <div className="text-3xl font-bold text-foreground">99.9%</div>
                  <p className="text-sm text-foreground/60">Delivery Rate</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">5M+</div>
                  <p className="text-sm text-foreground/60">SMS Sent Daily</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-primary/20 blur-3xl absolute -top-32 -right-32"></div>
                <div className="w-64 h-64 rounded-full bg-accent/20 blur-3xl absolute -bottom-32 -left-32"></div>
                <div className="relative text-center space-y-4">
                  <MessageSquare className="w-16 h-16 text-primary/40 mx-auto" />
                  <p className="text-foreground/40 font-medium">Intuitive SMS Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Features for Your Campaign</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto text-balance">
              Everything you need to run successful SMS marketing campaigns
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant Delivery',
                description: 'Send SMS in milliseconds with 99.9% guaranteed delivery rate to any country.',
              },
              {
                icon: BarChart3,
                title: 'Real-time Analytics',
                description: 'Track campaign performance with detailed DLR reports and engagement metrics.',
              },
              {
                icon: Users,
                title: 'Bulk Messaging',
                description: 'Send to thousands of contacts simultaneously with powerful segmentation options.',
              },
              {
                icon: TrendingUp,
                title: 'Smart Scheduling',
                description: 'Schedule campaigns to send at optimal times for maximum engagement.',
              },
              {
                icon: Lock,
                title: 'Enterprise Security',
                description: 'Bank-level encryption and compliance with GDPR, CCPA, and more.',
              },
              {
                icon: MessageSquare,
                title: 'API Integration',
                description: 'Integrate SMS into your apps with our simple, well-documented REST API.',
              },
            ].map((feature, index) => (
              <Card key={index+1} className="p-6 border border-border hover:border-primary/50 transition">
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Users', value: '50K+' },
              { label: 'Countries', value: '150+' },
              { label: 'Uptime', value: '99.9%' },
              { label: 'Avg. Latency', value: '<50ms' },
            ].map((stat, index) => (
              <div key={index + 2} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto text-balance">
              Pay only for what you use. No hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '₦9.99',
                credits: '100 SMS',
                costPer: '₦0.08/SMS',
                features: ['100 SMS per month', 'Basic Analytics', 'API Access', 'Email Support'],
              },
              {
                name: 'Pro',
                price: '₦39.99',
                credits: '500 SMS',
                costPer: '₦0.07/SMS',
                features: ['500 SMS per month', 'Advanced Analytics', 'Priority API', 'Chat Support', 'Custom Branding'],
                popular: true,
              },
              {
                name: 'Business',
                price: '₦99.99',
                credits: '2000 SMS',
                costPer: '₦0.05/SMS',
                features: ['2000 SMS per month', 'Real-time Analytics', 'Dedicated Account', 'Phone Support', 'Custom Integration'],
              },
            ].map((plan, index) => (
              <Card
                key={index + 4}
                className={`p-8 relative ${
                  plan.popular ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-foreground/60">/month</span>
                </div>
                <p className="text-sm text-primary font-semibold mb-6">{plan.costPer}</p>
                <Button
                  className={`w-full mb-6 ₦{
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'border border-border hover:bg-secondary'
                  }`}
                >
                  Get Started
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx + 5} className="flex items-center gap-2 text-foreground/70">
                      <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Stay Updated</h2>
          <p className="text-lg text-foreground/60 mb-8">
            Get the latest SMS marketing tips and platform updates delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSubmitted ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-12 border-t border-border bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition">Features</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition">About</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition">API Docs</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition">Support</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">SMSHub</span>
            </div>
            <p className="text-foreground/60 text-sm">© 2024 SMSHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
