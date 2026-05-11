import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';

export default function Navbar() {
    // const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'SMS';
    const appLogo = process.env.NEXT_PUBLIC_SITE_LOGO ?? '/logo/intarvaslogowhite.svg';

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <div className="w-40 h-40 flex items-center justify-center">
                            <Image src={appLogo} alt="Logo" width={100} height={100} className='w-full object-contain' loading="eager" />
                        </div>
                        {/* <span className="font-bold text-xl text-foreground">{appName}</span> */}
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-foreground/70 hover:text-foreground transition">Features</a>
                        <a href="#stats" className="text-foreground/70 hover:text-foreground transition">Stats</a>
                        {/* <a href="#about" className="text-foreground/70 hover:text-foreground transition">About</a> */}
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link href="/auth/login">
                            <Button variant="outline">Sign In</Button>
                        </Link>
                        <Link href="/auth/register" className="hidden md:block">
                            <Button variant="default">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}