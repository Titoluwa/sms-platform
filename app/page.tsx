'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, MessageSquare } from 'lucide-react';
import Navbar from '@/components/mainNavbar';
import Footer from '@/components/footer';
import { features, stats } from '@/lib/constant';
import NewsLetterSubscribe from '@/components/newsletter-subscribe';

export default function LandingPage() {

  return (
    <main className="w-full overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-16 sm:pb-24 lg:pb-32 bg-gradient-to-br from-background via-background to-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-16 sm:pt-24 lg:pt-32">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                  Reach Your Customers Instantly
                </h1>
                <p className="text-lg sm:text-xl text-foreground/60 mt-4 sm:mt-6 max-w-xl text-balance">
                  Send bulk SMS campaigns in seconds. Reach millions of customers with industry-leading delivery rates.
                </p>
                <p className="text-lg sm:text-xl text-[#002F6C] mt-3 max-w-xl text-balance">Fast, reliable, affordable.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Free Trial <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 sm:pt-8">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">99.9%</div>
                  <p className="text-sm text-foreground/60">Delivery Rate</p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">5M+</div>
                  <p className="text-sm text-foreground/60">SMS Sent Daily</p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">50k+</div>
                  <p className="text-sm text-foreground/60">Active Users</p>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-primary/20 blur-3xl absolute -top-32 -right-32" />
                <div className="w-64 h-64 rounded-full bg-accent/20 blur-3xl absolute -bottom-32 -left-32" />
                <div className="relative text-center space-y-4">
                  <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40 mx-auto" />
                  <p className="text-foreground/40 font-medium text-sm sm:text-base">Intuitive SMS Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Powerful Features for Your Campaign
            </h2>
            <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto text-balance">
              Everything you need to run successful SMS marketing campaigns
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index.toFixed()} className="p-5 sm:p-6 border border-border hover:border-primary/50 transition">
                <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-foreground/60">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-foreground/5 dark:bg-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index.toFixed()} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">{stat.value}</div>
                <p className="text-sm sm:text-base text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section id="pricing" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto text-balance">
              Pay only for what you use. No hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {pricing.map((plan, index) => (
              <Card key={index.toFixed()} className={`p-6 sm:p-8 relative ${ plan.popular ? 'border-primary ring-2 ring-primary/20 lg:scale-105' : 'border-border' }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-foreground/60">/month</span>
                </div>
                <p className="text-sm text-primary font-semibold mb-5 sm:mb-6">{plan.costPer}</p>
                <Button
                  className={`w-full mb-5 sm:mb-6 ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'border border-border hover:bg-secondary'
                  }`}
                >
                  Get Started
                </Button>
                <ul className="space-y-2 sm:space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx.toFixed()} className="flex items-center gap-2 text-sm sm:text-base text-foreground/70">
                      <div className="w-4 h-4 shrink-0 rounded-full bg-primary/20" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Newsletter Section */}
      <NewsLetterSubscribe />

      {/* Footer */}
      <Footer />
    </main>
  );
}
