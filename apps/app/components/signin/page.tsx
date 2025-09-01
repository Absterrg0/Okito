import React from "react"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "../ui/theme-toggle"
import { Lock } from "lucide-react"
import { HexElement } from "./hex-element"
import { SignInForm } from "./form"
import { features } from "@/static/data"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-secondary/2" aria-hidden="true" />

      {/* Floating Hexagons - With animation */}
      <HexElement size={80} delay={0} className="top-20 left-20 z-5" />
      <HexElement size={60} delay={2} className="top-40 right-32 z-5" />
      <HexElement size={70} delay={4} className="bottom-32 left-16 z-5" />
      <HexElement size={50} delay={1} className="bottom-20 right-20 z-5" />
      <HexElement size={40} delay={3} className="top-1/2 left-8 z-5" />
      <HexElement size={55} delay={5} className="top-1/4 right-16 z-5" />

      {/* Subtle Background Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/3 to-secondary/3 rounded-full blur-3xl animate-float z-1" aria-hidden="true" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-secondary/3 to-accent/3 rounded-full blur-3xl animate-float z-1" style={{ animationDelay: '3s' }} aria-hidden="true" />



      {/* Main Content - 2 Column Layout */}
      <div className="flex min-h-screen relative z-10">
        {/* Left Column - Signin Form */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className="w-full max-w-md">
            <SignInForm />

            {/* Footer */}
            <footer className="text-center mt-8">
              <p className="text-xs text-muted-foreground/80">
                By signing in, you agree to our{" "}
                <a 
                  href="#" 
                  className="text-primary hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="Read our Terms of Service"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a 
                  href="#" 
                  className="text-primary hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label="Read our Privacy Policy"
                >
                  Privacy Policy
                </a>
              </p>
            </footer>
          </div>
        </div>

        {/* Stylish Separator */}
        <div className="relative w-px">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent blur-sm"></div>
        </div>

        {/* Right Column - Branding & Features */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className="max-w-lg">
            {/* Hero Section */}
            <div className="mb-12">
              <Badge className="mb-6 badge-secure border-0 shadow-lg">
                <Lock className="w-3 h-3 mr-2" aria-hidden="true" />
                Crypto Payments for Developers
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-foreground">
                Welcome to <span className="gradient-text-updated">Okito</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Build, test, and scale crypto payments, wallets, and webhooks with an extremely secure and developer-friendly experience.
              </p>
            </div>

            {/* Features - Reduced interactions */}
            <div className="space-y-6" role="list" aria-label="Platform features">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4 crypto-glass rounded-2xl p-4 transition-opacity duration-200" role="listitem">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators - Static */}
            <div className="mt-12 grid grid-cols-3 gap-4" role="group" aria-label="Platform metrics">
              <div className="text-center crypto-glass rounded-xl p-4">
                <div className="text-2xl font-bold text-primary font-mono">SDKs</div>
                <div className="text-xs text-muted-foreground">TypeScript & REST</div>
              </div>
              <div className="text-center crypto-glass rounded-xl p-4">
                <div className="text-2xl font-bold text-primary font-mono">Events</div>
                <div className="text-xs text-muted-foreground">Reliable Webhooks</div>
              </div>
              <div className="text-center crypto-glass rounded-xl p-4">
                <div className="text-2xl font-bold text-primary font-mono">Sandbox</div>
                <div className="text-xs text-muted-foreground">Test Mode</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
