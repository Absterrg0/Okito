'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Chrome, ArrowRight, Shield, Fingerprint, Lock } from "lucide-react"
import Image from "next/image"
import { signIn } from "@/lib/auth-client"
import GlassButton from "../ui/glass-button"
import { useLoading } from "@/hooks/useLoading"
import Loader from "../ui/loader"
export const SignInForm = () => {

  const {startLoading,isLoading} = useLoading();
    const handleGoogleSignIn = () => {
        try {
          startLoading();
            signIn.social({
                provider: "google",
                callbackURL: "/dashboard/overview",
                newUserCallbackURL: "/verify",
            })
          
        } catch (error) {
          console.error("Sign in error:", error)
        } 
      }
    
    return (
        <Card className="crypto-glass border-0 shadow-2xl relative overflow-hidden">
        {/* Card background - simplified */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 opacity-50" aria-hidden="true" />
        
        <CardHeader className="text-center pb-6 relative z-10">
          <div className="mx-auto mb-6">
            <h2 className="text-2xl font-semibold text-primary/80 tracking-wide">Welcome</h2>
          </div>
          <CardTitle className="text-3xl font-bold mb-3 text-foreground tracking-tight">Sign in to Okito</CardTitle>
          <div className="space-y-2">
            <p className="text-muted-foreground font-medium">Access your developer dashboard</p>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">Manage projects, keys, events, and webhooks</p>
          </div>
        </CardHeader>

        <CardContent className="pb-8 relative z-10">
          <GlassButton onClick={handleGoogleSignIn}>
            {isLoading ? (<div className="flex gap-2 text-foreground items-center justify-center">
              <Loader size={0.2} color="#FFFFFF" />
              Signing in with Google
            </div>):(
              <div className="flex items-center relative z-10">
                <Chrome className="w-5 h-5 mr-3" aria-hidden="true" />
                Continue with Google
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </div>
            )}
            
          </GlassButton>

          {/* Security Indicators */}
          <div className="mt-6 grid grid-cols-3 gap-3" role="group" aria-label="Security features">
            <div className="text-center">
              <div className="w-10 h-10 crypto-glass rounded-xl flex items-center justify-center mx-auto mb-2">
                <Shield className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">Secure</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 crypto-glass rounded-xl flex items-center justify-center mx-auto mb-2">
                <Fingerprint className="w-4 h-4 text-blue-600" aria-hidden="true" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">Verified Auth</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 crypto-glass rounded-xl flex items-center justify-center mx-auto mb-2">
                <Lock className="w-4 h-4 text-purple-600" aria-hidden="true" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">Key Management</p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground/70 leading-relaxed">Secure APIs for crypto payments & webhooks</p>
          </div>
        </CardContent>
      </Card>
    )
}   