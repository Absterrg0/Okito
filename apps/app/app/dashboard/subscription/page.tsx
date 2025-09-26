




import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Clock, Star } from "lucide-react"

export default function SubscriptionPage(){
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md mx-auto crypto-base text-center">
                <CardHeader className="space-y-4">
                    <div className="flex justify-center">
                        <div className="relative">
                            <Sparkles className="h-12 w-12 text-primary" />
                            <div className="absolute -top-1 -right-1">
                                <Star className="h-6 w-6 text-yellow-500 fill-current" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold">
                            Subscription Plans
                        </CardTitle>
                       
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center space-y-3">
                        <div className="text-3xl font-bold text-primary">
                            FREE
                        </div>
                        <CardDescription className="text-base">
                            During our beta period
                        </CardDescription>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">Coming Soon</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Premium features and advanced plans will be available in the near future
                        </p>
                    </div>

                    <div className="text-xs text-muted-foreground">
                        Enjoy all features at no cost while we perfect your experience
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}