import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/authContext'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SMS Campaign Platform',
  description: 'Professional SMS marketing platform for bulk campaigns',
  icons: {
    icon: [
      {
        url: "/logo/intarvasfavicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/logo/intarvasfavicon.svg",
    apple: "/logo/intarvasfavicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${notoSans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
          </AuthProvider>
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}