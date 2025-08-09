import Navbar from "@/components/navbar"
import Hero from "@/components/Hero"
import Packages from "@/components/packages"
import Bento from "@/components/Bento"
import Pricing from "@/components/Pricing"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"
export default function OkitoLanding() {
  return (
    <div className="h-full bg-slate-950 text-white overflow-x-hidden relative">
      <div className="absolute inset-0">
        {/* All your background divs, which are fixed and should not scroll */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-gray-950 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_60%,_rgba(16,185,129,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,_rgba(6,182,212,0.06)_0%,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,_rgba(34,197,94,0.05)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/30 via-transparent via-transparent to-slate-900/20" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-teal-950/15 via-transparent to-gray-900/25" />
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,255,255,0.1)_1px,rgba(255,255,255,0.1)_2px)] bg-[length:100%_60px]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_1px,rgba(255,255,255,0.05)_1px,rgba(255,255,255,0.05)_2px)] bg-[length:60px_100%]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_400px_at_center,_rgba(16,185,129,0.03)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20" />
      </div>

      {/* The Navbar component should be outside the LenisProvider as it's a fixed element */}
      <Navbar />

        {/* Enhanced Hero Section */}
        <Hero id="hero" />

        {/* Enhanced Packages Section */}
        <Packages id="packages" />

        {/* Animated Bento Grid Features Section: show only on lg+ */}
        <div className="hidden lg:block">
          <Bento id="bento" />
        </div>
        {/* Mobile spacer to keep rhythm without UI change */}
        <div className="block lg:hidden h-12" />

        {/* Enhanced Pricing Section */}
        <Pricing id="pricing" />

        {/* Enhanced FAQ Section */}
        <FAQ id="faq" />

        {/* Enhanced Footer */}
        <Footer id="footer" />
  
    </div>
  )
}