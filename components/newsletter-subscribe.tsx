import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function NewsLetterSubscribe() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleNewsletterSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
        setTimeout(() => {
            setEmail('')
            setIsSubmitted(false)
        }, 3000)
    }
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-primary/5">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">Stay Updated</h2>
                <p className="text-base sm:text-lg text-foreground/60 mb-6 sm:mb-8">
                    Get the latest SMS marketing tips and platform updates delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-center justify-center">
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="w-full sm:w-auto flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button type="submit" size={'lg'} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                        {isSubmitted ? 'Subscribed!' : 'Subscribe'}
                    </Button>
                </form>
            </div>
        </section>
    )
}