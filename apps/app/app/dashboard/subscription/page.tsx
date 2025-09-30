

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GradientBg } from "@/components/ui/gradient-bg"

export default function SubscriptionPage(){
    return (
        <div className="container mx-auto p-8 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Subscription & Billing</h1>
                <p className="text-muted-foreground">Manage your subscription plan and billing preferences</p>
            </div>

            {/* Current Plan Card */}
            <Card className="crypto-glass-static border-0 mb-6 relative overflow-hidden">
                <GradientBg />
                <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl mb-1">Current Plan</CardTitle>
                            <p className="text-sm text-muted-foreground">You're currently on the Beta plan</p>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-0 px-4 py-1 text-sm font-semibold">
                            BETA
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                    {/* Price Display */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-foreground">$0</span>
                        <span className="text-lg text-muted-foreground">/month</span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 pt-4">
                        <p className="text-sm font-medium text-foreground mb-3">What's included:</p>
                        {[
                            'Unlimited API calls',
                            'All payment integrations',
                            'Webhook management',
                            'Real-time analytics',
                            'Email notifications',
                            'Priority support',
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* Beta Notice */}
                    <div className="crypto-glass-static border-0 rounded-lg p-4 mt-6 relative overflow-hidden">
                        <GradientBg />
                        <div className="relative z-10">
                            <p className="text-sm text-foreground font-medium mb-1">Early Access Pricing</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                As a beta user, you have full access to all features at no cost. We're perfecting the platform 
                                and your feedback helps shape the future of Okito.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Coming Soon Card */}
            <Card className="crypto-glass-static border-0 relative overflow-hidden">
                <GradientBg />
                <CardHeader className="relative z-10">
                    <CardTitle className="text-xl">Premium Plans</CardTitle>
                    <p className="text-sm text-muted-foreground">Advanced features coming soon</p>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Pro Plan Placeholder */}
                        <div className="p-4 rounded-lg crypto-glass-static border-0 bg-background/30 relative overflow-hidden">
                            <GradientBg />
                            <div className="relative z-10">
                                <div className="mb-3">
                                    <h3 className="font-semibold text-foreground mb-1">Pro</h3>
                                    <p className="text-xs text-muted-foreground">For growing teams</p>
                                </div>
                                <div className="space-y-2 text-xs text-muted-foreground">
                                    <div>• Advanced analytics</div>
                                    <div>• Custom branding</div>
                                    <div>• Team collaboration</div>
                                </div>
                            </div>
                        </div>

                        {/* Enterprise Placeholder */}
                        <div className="p-4 rounded-lg crypto-glass-static border-0 bg-background/30 relative overflow-hidden">
                            <GradientBg />
                            <div className="relative z-10">
                                <div className="mb-3">
                                    <h3 className="font-semibold text-foreground mb-1">Enterprise</h3>
                                    <p className="text-xs text-muted-foreground">For large organizations</p>
                                </div>
                                <div className="space-y-2 text-xs text-muted-foreground">
                                    <div>• Dedicated support</div>
                                    <div>• Custom integrations</div>
                                    <div>• SLA guarantees</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center mt-6">
                        Premium plans will be available soon. You'll be notified when they launch.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}