

import { Badge } from "@/components/ui/badge"

const INCLUDED_FEATURES = [
  { label: "API Calls", value: "Unlimited" },
  { label: "Payment Methods", value: "USDC, USDT" },
  { label: "Webhooks", value: "Real-time delivery" },
  { label: "Analytics", value: "Full dashboard access" },
  { label: "Email Alerts", value: "Instant notifications" },
  { label: "Support", value: "Priority assistance" },
]

const PRO_FEATURES = [
  "Advanced analytics & insights",
  "Custom branding & white-label",
  "Team collaboration tools",
  "Enhanced webhook filters",
  "Higher API rate limits",
]

const ENTERPRISE_FEATURES = [
  "Dedicated account manager",
  "Custom integration support",
  "SLA guarantees & uptime",
  "Advanced security controls",
  "Priority roadmap requests",
]

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto flex w-full flex-col gap-12">
        {/* Beta banner */}
        <section className="crypto-glass-static rounded-3xl p-8 md:p-10 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-semibold text-foreground">Subscription & Billing</h1>
                <Badge className="bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold uppercase tracking-wide">
                  Beta Access
                </Badge>
              </div>
              <p className="text-base text-muted-foreground ">
                You're part of our early access program. Every feature across Okito is currently <span className="font-semibold text-primary">100% free</span> while we fine-tune the experience. No credit card. No limits. Just build.
              </p>
            </div>
          
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          {/* Current plan */}
          <div className="crypto-glass-static rounded-3xl p-8 md:p-10 space-y-8">
            <header className="flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">Current Plan</p>
                  <h2 className="mt-2 text-5xl font-bold text-foreground">Beta Free</h2>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  <span className="text-sm font-medium">Active</span>
                </div>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-7xl font-semibold leading-none text-foreground">$0</span>
                <div className="pb-2">
                  <span className="text-lg text-muted-foreground">per month</span>
                  <p className="text-xs text-muted-foreground">Beta pricing • Unlimited usage</p>
                </div>
              </div>
            </header>

            <div className="space-y-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Included While in Beta</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {INCLUDED_FEATURES.map(({ label, value }) => (
                  <div
                    key={label}
                    className="crypto-base flex items-center justify-between gap-2 rounded-2xl px-4 py-3 text-sm"
                  >
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="crypto-base rounded-2xl px-5 py-6 text-sm text-foreground space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Why Early Access Matters
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ship without limits while we finalize our pricing. Your team gets unrestricted access to Okito's payments, events, and analytics stack—and your feedback shapes the roadmap.
              </p>
            </div>

            <footer className="pt-2 text-center text-xs text-muted-foreground">
              Beta access remains free until public launch. You'll receive a notice before any pricing changes.
            </footer>
          </div>

          {/* Future plans */}
          <aside className="flex flex-col gap-8">
    
            <div className="space-y-6">
              <FuturePlanCard title="Pro" caption="For growing teams" features={PRO_FEATURES} />
              <FuturePlanCard title="Enterprise" caption="For mission-critical workloads" features={ENTERPRISE_FEATURES} />
            </div>

   
          </aside>
        </section>
      </div>
    </div>
  )
}

function FuturePlanCard({
  title,
  caption,
  features,
}: {
  title: string
  caption: string
  features: string[]
}) {
  return (
    <div className="crypto-glass-static rounded-3xl p-7 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-semibold text-foreground">{title}</h4>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{caption}</p>
        </div>
        <Badge className="bg-primary/10 text-primary px-2 py-1 text-xs uppercase tracking-wide">
          Coming Soon
        </Badge>
      </div>
      <div className="space-y-2">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}