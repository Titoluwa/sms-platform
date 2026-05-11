'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import {
  Send,
  BarChart3,
  Wallet,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  PhoneIcon,
  ClipboardEditIcon,
  MessageSquareMoreIcon,
  SendToBackIcon,
} from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/dashboard/send', label: 'Send SMS', icon: Send },
    { href: '/dashboard/sender-id', label: 'Sender IDs', icon: SendToBackIcon },
    { href: '/dashboard/campaigns', label: 'Campaigns', icon: MessageSquareMoreIcon },
    { href: '/dashboard/templates', label: 'Templates', icon: ClipboardEditIcon },
    { href: '/dashboard/contacts', label: 'Contacts', icon: PhoneIcon },
    { href: '/dashboard/wallet', label: 'Wallet', icon: Wallet },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  if (user?.role === 'admin') {
    navItems.splice(0, 0, { href: '/dashboard/admin', label: 'Admin', icon: Users });
  }
  // const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'SMS';
  const appLogo = '/logo/intarvaslogowhite.svg';

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <button
          className="fixed inset-0 bg-foreground/20 z-30 md:hidden w-full h-full cursor-default"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#111F3A] text-white border-r border-border transform transition-transform duration-300 z-30 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="px-6">
          <div className="flex items-center gap-2 border-b border-border">
            <div className="w-full h-20 p-2 px-5 flex items-center justify-center">
              <Image src={appLogo} alt="Logo" width={100} height={100} className='w-full object-contain' loading="eager" />
            </div>
            {/* <span className="font-bold text-lg text-white">{appName}</span> */}
          </div>
          <div className="px-4 py-3 rounded-2xl bg-[#0038FC]/15 mt-4 border-b-2 border-border">
            <div className="flex items-center justify-between gap-2 mb-2 justify-center">
              <Wallet className="w-5 h-5 text-white font-medium" />
              <span className="text-sm font-medium text-white">Wallet Balance</span>
            </div>
            <p className="text-2xl font-bold text-white text-center">
              ₦{new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2 }).format((user?.walletBalance || 0) / 100)}
            </p>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${isActive
                  ? 'bg-[#0038FC]/50 text-white'
                  : 'text-white hover:text-foreground hover:bg-secondary'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm text-white">Theme</span>
            <ThemeToggle />
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-white hover:text-white hover:bg-secondary/10 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
