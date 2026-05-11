import { Zap, BarChart3, Users, TrendingUp, Lock, MessageSquare } from 'lucide-react'

export const pricing = [
    {
        name: 'Starter', 
        price: '₦9.99', 
        credits: '100 SMS', 
        costPer: '₦0.08/SMS',
        features: ['100 SMS per month', 'Basic Analytics', 'API Access', 'Email Support'],
    },
    {
        name: 'Professional', 
        price: '₦39.99', 
        credits: '500 SMS', 
        costPer: '₦0.07/SMS',
        features: ['500 SMS per month', 'Advanced Analytics', 'Priority API', 'Chat Support', 'Custom Branding'],
        popular: true,
    },
    {
        name: 'Enterprise', 
        price: '₦99.99', 
        credits: '2000 SMS', 
        costPer: '₦0.05/SMS',
        features: ['2000 SMS per month', 'Real-time Analytics', 'Dedicated Account', 'Phone Support', 'Custom Integration'],
    }
];

export const stats = [
    {
        label: "Active Users",
        value: "50K+"
    },
    {
        label: "Countries",
        value: "150+"
    },
    {
        label: "Uptime",
        value: "99.9%"
    },
    {
        label: "Avg. Latency",
        value: "<50ms"
    }
]

export const features = [
    {
        icon: Zap,
        title: "Instant Delivery",
        description: "Send SMS in milliseconds with 99.9% guaranteed delivery rate to any country."
    },
    {
        icon: BarChart3,
        title: "Real-time Analytics",
        description: "Track campaign performance with detailed DLR reports and engagement metrics."
    },
    {
        icon: Users,
        title: "Bulk Messaging",
        description: "Send to thousands of contacts simultaneously with powerful segmentation options."
    },
    {
        icon: TrendingUp,
        title: "Smart Scheduling",
        description: "Schedule campaigns to send at optimal times for maximum engagement."
    },
    {
        icon: Lock,
        title: "Enterprise Security",
        description: "Bank-level encryption and compliance with GDPR, CCPA, and more."
    },
    {
        icon: MessageSquare,
        title: "API Integration",
        description: "Integrate SMS into your apps with our simple, well-documented REST API."
    }
]