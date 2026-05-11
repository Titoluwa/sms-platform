"use client";

import { useAuth } from "@/lib/authContext";
import { Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function TemplatesPage() {
    const { user } = useAuth();
    return (
        <div className="p-6 md:p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Templates</h1>
                <p className="text-foreground/60 mt-1">Manage your SMS templates</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-2">
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-foreground/60 text-sm font-medium mb-2">Current Balance</p>
                                <p className="text-4xl font-bold text-foreground">₦{(user?.walletBalance || 0) / 100}</p>
                                <p className="text-foreground/60 text-sm mt-2">Ready to send SMS campaigns</p>
                            </div>
                            <Wallet className="w-16 h-16 text-primary/20" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
