import Image from "next/image";

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'SMS';
const appLogo = process.env.NEXT_PUBLIC_SITE_LOGO ?? '/logo/intarvaslogowhite.svg';

export default function Footer() {
    return (
        <footer className="px-4 sm:px-6 lg:px-8 py-12 border-t border-border bg-secondary/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li><a href="#features" className="text-foreground/60 hover:text-foreground transition">Features</a></li>
                            <li><a href="#pricing" className="text-foreground/60 hover:text-foreground transition">Pricing</a></li>
                            <li><a href="/security" className="text-foreground/60 hover:text-foreground transition">Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#about" className="text-foreground/60 hover:text-foreground transition">About</a></li>
                            <li><a href="/blog" className="text-foreground/60 hover:text-foreground transition">Blog</a></li>
                            <li><a href="/careers" className="text-foreground/60 hover:text-foreground transition">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="/docs" className="text-foreground/60 hover:text-foreground transition">API Docs</a></li>
                            <li><a href="/support" className="text-foreground/60 hover:text-foreground transition">Support</a></li>
                            <li><a href="/status" className="text-foreground/60 hover:text-foreground transition">Status</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="/privacy" className="text-foreground/60 hover:text-foreground transition">Privacy</a></li>
                            <li><a href="/terms" className="text-foreground/60 hover:text-foreground transition">Terms</a></li>
                            <li><a href="/contact" className="text-foreground/60 hover:text-foreground transition">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex items-center gap-2 mb-4 sm:mb-0">
                        <Image src={appLogo} alt="Logo" width={100} height={100} loading="eager"/>
                        {/* <span className="font-semibold text-foreground">{appName}</span> */}
                    </div>
                    <p className="text-foreground/60 text-sm">© {new Date().getFullYear()} {appName}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}