"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CardContent } from "@/components/ui/card"
import { CardDescription } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Code2,
  Zap,
  Coins,
  Rocket,
  BookOpen,
  Github,
  Twitter,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Wallet,
  Database,
  Lock,
  Globe,
  Star,
  Play,
  Copy,
  Terminal,
  Layers,
  Package,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Activity,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "motion/react"

export default function OkitoLanding() {
  // Animation states
  const [isVisible, setIsVisible] = useState({
    hero: false,
    packages: false,
    features: false,
    pricing: false,
    faq: false,
  })

  // Interactive states
  const [activeTab, setActiveTab] = useState("create")
  const [activePackage, setActivePackage] = useState("sdk")
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  // Refs for sections
  const heroRef = useRef(null)
  const packagesRef = useRef(null)
  const featuresRef = useRef(null)
  const pricingRef = useRef(null)
  const faqRef = useRef(null)

  // Animation controls
  const controls = useAnimation()
  const isInViewHero = useInView(heroRef)
  const isInViewPackages = useInView(packagesRef)

  // Progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 50)
    return () => clearInterval(timer)
  }, [])

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    if (heroRef.current) observer.observe(heroRef.current)
    if (packagesRef.current) observer.observe(packagesRef.current)
    if (featuresRef.current) observer.observe(featuresRef.current)
    if (pricingRef.current) observer.observe(pricingRef.current)
    if (faqRef.current) observer.observe(faqRef.current)

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current)
      if (packagesRef.current) observer.unobserve(packagesRef.current)
      if (featuresRef.current) observer.unobserve(featuresRef.current)
      if (pricingRef.current) observer.unobserve(pricingRef.current)
      if (faqRef.current) observer.unobserve(faqRef.current)
    }
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden relative">
      {/* Add custom styles */}
      <style jsx global>{`
        .floating-nav {
          backdrop-filter: blur(12px);
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.1);
        }
        
        .glass-card {
          backdrop-filter: blur(16px);
          background: rgba(30, 41, 59, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.1);
        }
        
        .glass-enhanced {
          backdrop-filter: blur(20px);
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.15);
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes pulse-glow {
          from {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
          }
          to {
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.6);
          }
        }
        
        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>

      {/* Floating Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4"
      >
        <div className="floating-nav rounded-full px-6 py-3">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
                <Code2 className="h-4 w-4 text-black" />
              </div>
              <span className="text-xl font-bold text-white">Okito</span>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {["Packages", "Features", "Pricing", "Documentation", "FAQ"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-sm"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center space-x-3"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  <Github className="h-5 w-5" />
                </Link>
              </motion.div>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-black font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 text-sm px-4 py-2">
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
      >
        {/* Subtle Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
          <div className="absolute inset-0 bg-gradient-to-tr from-green-950/20 via-transparent to-blue-950/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400/30 rounded-full"
              animate={{
                x: [0, Math.random() * 1000],
                y: [0, Math.random() * 800],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            />
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInViewHero ? "visible" : "hidden"}
          className="container mx-auto px-4 lg:px-6 relative z-10 pt-20"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div variants={itemVariants} className="mb-8 flex justify-center">
        
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Build the future</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
                with Okito
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              The most elegant way to create tokens, manage wallets, and build decentralized applications on Solana.{" "}
              <span className="text-green-400 font-semibold">Effortlessly powerful.</span>
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-black px-8 py-4 text-lg font-semibold shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Documentation
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium transition-all duration-300 bg-transparent"
                >
                  <Github className="h-5 w-5 mr-2" />
                  View Source
                </Button>
              </motion.div>
            </motion.div>
            {/* Code Preview Card */}
            <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
              <motion.div whileHover={{ scale: 1.02 }} className="glass-card rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">quick-start.js</span>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard("npm install @okito/sdk")}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                      >
                        {copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </motion.div>
                  </div>
                </div>
                <pre className="text-left overflow-x-auto">
                  <code className="text-sm lg:text-base">
                    <span className="text-purple-400">import</span> <span className="text-gray-300">{"{"}</span>{" "}
                    <span className="text-green-400">createToken</span> <span className="text-gray-300">{"}"}</span>{" "}
                    <span className="text-purple-400">from</span> <span className="text-yellow-300">'@okito/sdk'</span>
                    <span className="text-gray-300">;</span>
                    <br />
                    <br />
                    <span className="text-gray-500">// Create a token in just 3 lines</span>
                    <br />
                    <span className="text-purple-400">const</span> <span className="text-blue-400">token</span>{" "}
                    <span className="text-gray-300">=</span> <span className="text-purple-400">await</span>{" "}
                    <span className="text-green-400">createToken</span>
                    <span className="text-gray-300">({"{"}</span>
                    <br />
                    <span className="text-gray-300"> </span>
                    <span className="text-red-400">name</span>
                    <span className="text-gray-300">:</span> <span className="text-yellow-300">"My Token"</span>
                    <span className="text-gray-300">,</span>
                    <br />
                    <span className="text-gray-300"> </span>
                    <span className="text-red-400">symbol</span>
                    <span className="text-gray-300">:</span> <span className="text-yellow-300">"MTK"</span>
                    <span className="text-gray-300">,</span>
                    <br />
                    <span className="text-gray-300"> </span>
                    <span className="text-red-400">supply</span>
                    <span className="text-gray-300">:</span> <span className="text-yellow-300">1000000</span>
                    <br />
                    <span className="text-gray-300">{"}"});</span>
                  </code>
                </pre>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Packages Section */}
      <section id="packages" ref={packagesRef} className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/20 to-slate-950" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInViewPackages ? "visible" : "hidden"}
          className="container mx-auto px-4 lg:px-6 relative"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-4 py-2 mb-6">
              <Star className="h-4 w-4 mr-2" />
              Alpha Release
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">Choose your development path</h2>
            <p className="text-xl text-gray-300 mb-16 leading-relaxed max-w-3xl mx-auto">
              Two powerful packages designed to accelerate your Solana development journey
            </p>
          </motion.div>

          {/* Package Selector */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="glass-card p-2 rounded-2xl">
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActivePackage("sdk")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activePackage === "sdk"
                      ? "bg-green-500/20 text-green-300 shadow-lg shadow-green-500/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Terminal className="h-5 w-5 mr-2 inline" />
                  SDK Package
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActivePackage("ui")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activePackage === "ui"
                      ? "bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-500/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Layers className="h-5 w-5 mr-2 inline" />
                  UI Package
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Package Content */}
          <motion.div
            key={activePackage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {activePackage === "sdk" ? (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* SDK Info - Enhanced Dynamic Layout */}
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center relative overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 animate-pulse-glow rounded-2xl"></div>
                        <Terminal className="h-8 w-8 text-green-400 relative z-10" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">@okito/sdk</h3>
                        <motion.p
                          className="text-green-400 font-semibold"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          Available Now
                        </motion.p>
                      </div>
                    </div>
                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                      Core blockchain functions exposed through elegant APIs. Everything you need to interact with
                      Solana's ecosystem.
                    </p>
                  </motion.div>

                  {/* Enhanced Installation Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="glass-enhanced p-6 rounded-2xl relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <h4 className="text-lg font-semibold text-white">Quick Installation</h4>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard("npm install @okito/sdk")}
                          className="text-gray-400 hover:text-white"
                        >
                          {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </motion.div>
                    </div>
                    <code className="text-green-400 font-mono text-lg relative z-10">$ npm install @okito/sdk</code>
                  </motion.div>

                  {/* Enhanced Features Grid with Staggered Animation */}
                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {[
                      { icon: Coins, title: "Token Creation", desc: "SPL token deployment", delay: 0 },
                      { icon: Wallet, title: "Wallet Ops", desc: "Secure key management", delay: 0.1 },
                      { icon: Database, title: "Transactions", desc: "Smart execution", delay: 0.2 },
                      { icon: Lock, title: "Security", desc: "Enterprise-grade", delay: 0.3 },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: feature.delay + 0.5, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="glass-enhanced p-4 rounded-xl group cursor-pointer relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="relative z-10"
                        >
                          <feature.icon className="h-6 w-6 text-green-400 mb-2" />
                        </motion.div>
                        <h5 className="font-semibold text-white text-sm relative z-10">{feature.title}</h5>
                        <p className="text-xs text-gray-400 relative z-10">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button className="w-full bg-green-500/20 text-green-300 border border-green-500/30 py-6 text-lg hover:bg-green-500/30 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <BookOpen className="h-5 w-5 mr-2 relative z-10" />
                      <span className="relative z-10">Explore SDK Documentation</span>
                      <ArrowRight className="h-5 w-5 ml-2 relative z-10" />
                    </Button>
                  </motion.div>
                </div>

                {/* SDK Code Example */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="glass-card p-8 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-white">Live Example</h4>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <pre className="text-sm overflow-x-auto">
                    <code>
                      <span className="text-purple-400">import</span> <span className="text-gray-300">{"{"}</span>{" "}
                      <span className="text-green-400">createToken</span>
                      <span className="text-gray-300">, </span>
                      <span className="text-green-400">transfer</span> <span className="text-gray-300">{"}"}</span>{" "}
                      <span className="text-purple-400">from</span>{" "}
                      <span className="text-yellow-300">'@okito/sdk'</span>
                      <br />
                      <br />
                      <span className="text-gray-500">// Create token with retries</span>
                      <br />
                      <span className="text-purple-400">const</span> <span className="text-blue-400">token</span>{" "}
                      <span className="text-gray-300">=</span> <span className="text-purple-400">await</span>{" "}
                      <span className="text-green-400">createToken</span>
                      <span className="text-gray-300">({"{"}</span>
                      <br />
                      <span className="text-gray-300"> </span>
                      <span className="text-red-400">name</span>
                      <span className="text-gray-300">:</span> <span className="text-yellow-300">"DeFi Token"</span>
                      <span className="text-gray-300">,</span>
                      <br />
                      <span className="text-gray-300"> </span>
                      <span className="text-red-400">symbol</span>
                      <span className="text-gray-300">:</span> <span className="text-yellow-300">"DEFI"</span>
                      <span className="text-gray-300">,</span>
                      <br />
                      <span className="text-gray-300"> </span>
                      <span className="text-red-400">retries</span>
                      <span className="text-gray-300">:</span> <span className="text-yellow-300">3</span>
                      <span className="text-gray-300">,</span>
                      <br />
                      <span className="text-gray-300"> </span>
                      <span className="text-red-400">timeout</span>
                      <span className="text-gray-300">:</span> <span className="text-yellow-300">30000</span>
                      <br />
                      <span className="text-gray-300">{"}"});</span>
                    </code>
                  </pre>
                </motion.div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* UI Info */}
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center">
                        <Layers className="h-8 w-8 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">@okito/ui</h3>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <p className="text-blue-400 font-semibold">Coming Soon</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                      Pre-built React components that you can drop into your code. No setup required, just import and
                      use.
                    </p>
                  </div>

                  {/* Installation (Disabled) */}
                  <div className="glass-card p-6 rounded-2xl opacity-60">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">Installation</h4>
                      <Copy className="h-4 w-4 text-gray-400" />
                    </div>
                    <code className="text-blue-400 font-mono text-lg">$ npm install @okito/ui</code>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Package, title: "Wallet Connect", desc: "Ready-to-use buttons" },
                      { icon: TrendingUp, title: "Token Display", desc: "Beautiful components" },
                      { icon: Users, title: "Transaction UI", desc: "Form components" },
                      { icon: Shield, title: "Balance Cards", desc: "Styled indicators" },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-4 rounded-xl opacity-60"
                      >
                        <feature.icon className="h-6 w-6 text-blue-400 mb-2" />
                        <h5 className="font-semibold text-white text-sm">{feature.title}</h5>
                        <p className="text-xs text-gray-400">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    disabled
                    className="w-full bg-blue-500/10 text-blue-400/60 border border-blue-500/20 cursor-not-allowed py-6 text-lg"
                  >
                    <Clock className="h-5 w-5 mr-2" />
                    Coming Soon - Join Waitlist
                  </Button>
                </div>

                {/* UI Preview */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="glass-card p-8 rounded-2xl opacity-60"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-white">Component Preview</h4>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-2 py-1 text-xs">
                      Coming Soon
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="glass-card p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full"></div>
                        <div>
                          <div className="h-3 bg-blue-500/20 rounded w-24 mb-1"></div>
                          <div className="h-2 bg-blue-500/10 rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                    <div className="glass-card p-4 rounded-lg">
                      <div className="h-4 bg-blue-500/20 rounded w-32 mb-2"></div>
                      <div className="h-8 bg-blue-500/10 rounded"></div>
                    </div>
                    <div className="glass-card p-3 rounded-lg">
                      <div className="h-3 bg-blue-500/20 rounded w-20"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* New Animated Bento Grid Features Section */}
      <section id="features" ref={featuresRef} className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.features ? "visible" : "hidden"}
          className="container mx-auto px-4 lg:px-6 relative"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">Built for modern developers</h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Every feature designed with performance, security, and developer experience in mind
            </p>
          </motion.div>

          {/* Enhanced 3x3 Bento Grid Layout with Animated Components */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Large Feature Card - Token Creation with Interactive Demo */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              className="md:col-span-2 group perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="glass-enhanced hover:shadow-2xl hover:shadow-green-500/20 h-full overflow-hidden transition-all duration-700 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-6 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 animate-pulse-glow rounded-2xl"></div>
                    <Coins className="h-7 w-7 text-green-400 relative z-10" />
                  </motion.div>
                  <CardTitle className="text-white text-2xl font-semibold">Token Creation & Management</CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed text-lg">
                    Create and deploy SPL tokens with custom metadata, supply controls, and advanced configurations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 glass-enhanced">
                      <TabsTrigger value="create" className="text-xs text-gray-300 data-[state=active]:text-green-300">
                        Create
                      </TabsTrigger>
                      <TabsTrigger value="manage" className="text-xs text-gray-300 data-[state=active]:text-green-300">
                        Manage
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="create" className="mt-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-enhanced p-4 rounded-lg overflow-hidden relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent"></div>
                        <pre className="text-left overflow-x-auto relative z-10">
                          <code className="text-sm lg:text-base">
                            <span className="text-purple-400">const</span> <span className="text-blue-400">token</span>{" "}
                            <span className="text-gray-300">=</span> <span className="text-purple-400">await</span>{" "}
                            <span className="text-green-400">createToken</span>
                            <span className="text-gray-300">({"{"}</span>
                            <br />
                            <span className="text-gray-300"> </span>
                            <span className="text-red-400">name</span>
                            <span className="text-gray-300">:</span>{" "}
                            <span className="text-yellow-300">"GameFi Token"</span>
                            <span className="text-gray-300">,</span>
                            <br />
                            <span className="text-gray-300"> </span>
                            <span className="text-red-400">symbol</span>
                            <span className="text-gray-300">:</span> <span className="text-yellow-300">"GAME"</span>
                            <span className="text-gray-300">,</span>
                            <br />
                            <span className="text-gray-300"> </span>
                            <span className="text-red-400">supply</span>
                            <span className="text-gray-300">:</span> <span className="text-yellow-300">1000000</span>
                            <br />
                            <span className="text-gray-300">{"}"});</span>
                          </code>
                        </pre>
                      </motion.div>
                    </TabsContent>
                    <TabsContent value="manage" className="mt-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-enhanced p-4 rounded-lg relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"></div>
                        <pre className="text-left overflow-x-auto relative z-10">
                          <code className="text-sm">
                            <span className="text-gray-500">// Mint additional tokens</span>
                            <br />
                            <span className="text-purple-400">await</span> <span className="text-blue-400">token</span>
                            <span className="text-gray-300">.</span>
                            <span className="text-green-400">mint</span>
                            <span className="text-gray-300">(</span>
                            <span className="text-yellow-300">50000</span>
                            <span className="text-gray-300">);</span>
                            <br />
                            <br />
                            <span className="text-gray-500">// Transfer tokens</span>
                            <br />
                            <span className="text-purple-400">await</span> <span className="text-blue-400">token</span>
                            <span className="text-gray-300">.</span>
                            <span className="text-green-400">transfer</span>
                            <span className="text-gray-300">(</span>
                            <span className="text-blue-400">recipient</span>
                            <span className="text-gray-300">, </span>
                            <span className="text-yellow-300">1000</span>
                            <span className="text-gray-300">);</span>
                          </code>
                        </pre>
                      </motion.div>
                    </TabsContent>
                  </Tabs>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <Play className="h-4 w-4 mr-2 relative z-10" />
                      <span className="relative z-10">Try Interactive Demo</span>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Animated Performance Card with Live Metrics */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group animate-float-gentle"
              style={{ animationDelay: "0s" }}
            >
              <Card className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 h-full transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-6 relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-4"
                  >
                    <Zap className="h-6 w-6 text-blue-400" />
                  </motion.div>
                  <CardTitle className="text-white text-xl font-semibold">Lightning Performance</CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed mb-4">
                    Optimized execution with connection pooling and intelligent caching.
                  </CardDescription>
                  {/* Live Performance Metrics */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Transaction Speed</span>
                      <span className="text-sm text-blue-300 font-semibold">~400ms</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                        animate={{ width: `${Math.sin(Date.now() / 1000) * 20 + 80}%` }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Animated Security Card with Security Level Indicator */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10, rotateX: 5 }}
              className="group animate-float-gentle"
              style={{ animationDelay: "2s" }}
            >
              <Card className="glass-enhanced hover:shadow-2xl hover:shadow-red-500/20 h-full transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-6 relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center mb-4"
                  >
                    <Lock className="h-6 w-6 text-red-400" />
                  </motion.div>
                  <CardTitle className="text-white text-xl font-semibold">Enterprise Security</CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed mb-4">
                    Bank-grade security with comprehensive validation protocols.
                  </CardDescription>
                  {/* Security Level Indicator */}
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-green-400 font-semibold">Security Level: Maximum</span>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Animated Wallet Card with Balance Display */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group animate-float-gentle"
              style={{ animationDelay: "4s" }}
            >
              <Card className="glass-enhanced hover:shadow-2xl hover:shadow-purple-500/20 h-full transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-6 relative z-10">
                  <motion.div
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center mb-4"
                  >
                    <Wallet className="h-6 w-6 text-purple-400" />
                  </motion.div>
                  <CardTitle className="text-white text-xl font-semibold">Smart Retries</CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed mb-4">
                    Intelligent retry logic with configurable timeouts for failed transactions.
                  </CardDescription>
                  {/* Retry Counter */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Success Rate</span>
                    <motion.span
                      className="text-sm text-purple-400 font-semibold"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      99.7%
                    </motion.span>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Animated Analytics Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Card className="glass-enhanced hover:shadow-2xl hover:shadow-green-500/10 h-full transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-6 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mb-4"
                  >
                    <BarChart3 className="h-6 w-6 text-green-400" />
                  </motion.div>
                  <CardTitle className="text-white text-xl font-semibold">Real-time Analytics</CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed mb-4">
                    Monitor transactions, balances, and performance metrics in real-time.
                  </CardDescription>
                  {/* Mini Chart Animation */}
                  <div className="flex items-end space-x-1 h-8">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-green-400/60 rounded-sm flex-1"
                        animate={{ 
                          height: [
                            Math.random() * 20 + 10, 
                            Math.random() * 25 + 15, 
                            Math.random() * 20 + 10
                          ] 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Number.POSITIVE_INFINITY, 
                          delay: i * 0.2 
                        }}
                      />
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Configuration Card with Settings Animation */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Card className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/10 h-full transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-6 relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-4"
                  >
                    <Settings className="h-6 w-6 text-blue-400" />
                  </motion.div>
                  <CardTitle className="text-white text-xl font-semibold">Custom Configuration</CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed mb-4">
                    Fine-tune every aspect with extensive configuration options and presets.
                  </CardDescription>
                  {/* Config Options */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">RPC Endpoint</span>
                      <motion.div 
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Retry Config</span>
                      <motion.div 
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" ref={pricingRef} className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950" />
        
        {/* Floating Particles for Pricing */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400/20 rounded-full"
              animate={{
                x: [0, Math.random() * 800],
                y: [0, Math.random() * 600],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 8,
              }}
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            />
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.pricing ? "visible" : "hidden"}
          className="container mx-auto px-4 lg:px-6 relative"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2 mb-6">
              <Coins className="h-4 w-4 mr-2" />
              Simple Pricing
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">
              Start building for <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">free</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Open source and completely free. No hidden costs, no premium tiers, just powerful tools for everyone.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Tier - Highlighted */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="lg:col-start-2 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse-glow"></div>
              <Card className="glass-enhanced relative z-10 border-green-500/30 shadow-2xl shadow-green-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-400/5"></div>
                <CardHeader className="text-center pb-8 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 animate-pulse-glow rounded-2xl"></div>
                    <Rocket className="h-8 w-8 text-green-400 relative z-10" />
                  </motion.div>
                  <CardTitle className="text-white text-3xl font-bold mb-2">Free Forever</CardTitle>
                  <CardDescription className="text-gray-300 text-lg mb-6">
                    Everything you need to build on Solana
                  </CardDescription>
                  <div className="text-center">
                    <span className="text-5xl font-bold text-white">$0</span>
                    <span className="text-gray-400 text-lg ml-2">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-4 mb-8">
                    {[
                      { icon: CheckCircle, text: "Unlimited token creation", highlight: true },
                      { icon: CheckCircle, text: "Full SDK access", highlight: true },
                      { icon: CheckCircle, text: "Community support", highlight: false },
                      { icon: CheckCircle, text: "Open source code", highlight: false },
                      { icon: CheckCircle, text: "MIT License", highlight: false },
                      { icon: CheckCircle, text: "No rate limits", highlight: true },
                      { icon: CheckCircle, text: "Production ready", highlight: true },
                    ].map((feature, index) => (
                      <motion.li
                        key={feature.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className={`${feature.highlight ? 'text-green-400' : 'text-gray-400'}`}
                        >
                          <feature.icon className="h-5 w-5" />
                        </motion.div>
                        <span className={`${feature.highlight ? 'text-white font-semibold' : 'text-gray-300'}`}>
                          {feature.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-black font-semibold py-6 text-lg shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-300/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <Github className="h-5 w-5 mr-2 relative z-10" />
                      <span className="relative z-10">Get Started Now</span>
                      <ArrowRight className="h-5 w-5 ml-2 relative z-10" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feature Highlights - Side Cards */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="lg:col-start-1 lg:row-start-1 animate-float-gentle"
              style={{ animationDelay: "1s" }}
            >
              <Card className="glass-card h-full border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-4"
                  >
                    <Globe className="h-6 w-6 text-blue-400" />
                  </motion.div>
                  <CardTitle className="text-white text-xl font-semibold mb-2">Open Source</CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed">
                    Complete transparency with MIT license. Fork, modify, and contribute to the codebase.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-semibold">Community Driven</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="lg:col-start-3 lg:row-start-1 animate-float-gentle"
              style={{ animationDelay: "2s" }}
            >
              <Card className="glass-card h-full border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center mb-4"
                  >
                    <Activity className="h-6 w-6 text-purple-400" />
                  </motion.div>
                  <CardTitle className="text-white text-xl font-semibold mb-2">Always Free</CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed">
                    No premium plans, no feature gates. Every developer gets access to the full suite of tools.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex items-center space-x-2 text-purple-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-semibold">No Hidden Costs</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Why Free?</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                We believe powerful developer tools should be accessible to everyone. Okito is built by developers, for developers, 
                with the mission to democratize blockchain development on Solana.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  Community First
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                  <Code2 className="h-4 w-4 mr-2" />
                  Developer Focused
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                  <Rocket className="h-4 w-4 mr-2" />
                  Innovation Driven
                </Badge>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced FAQ Section */}
      <section id="faq" ref={faqRef} className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/20 to-slate-950" />
        
        {/* FAQ Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              animate={{
                x: [0, Math.random() * 600],
                y: [0, Math.random() * 500],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 12 + 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 6,
              }}
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            />
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.faq ? "visible" : "hidden"}
          className="container mx-auto px-4 lg:px-6 relative"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 mb-6">
              <MessageCircle className="h-4 w-4 mr-2" />
              Frequently Asked Questions
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">Got questions?</h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Everything you need to know about Okito and getting started with Solana development
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div variants={itemVariants}>
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    value: "what-is-okito",
                    question: "What is Okito and how does it work?",
                    answer: "Okito is a comprehensive development platform for Solana blockchain applications. It provides two main packages: @okito/sdk for core blockchain functions like token creation and wallet management, and @okito/ui (coming soon) for pre-built React components. Our SDK abstracts complex Solana operations into simple, elegant APIs that developers can use to build powerful dApps quickly.",
                    icon: Code2,
                    color: "text-green-400"
                  },
                  {
                    value: "is-it-really-free",
                    question: "Is Okito really completely free?",
                    answer: "Yes, absolutely! Okito is 100% free and open source under the MIT license. There are no hidden costs, premium tiers, or feature limitations. We believe powerful developer tools should be accessible to everyone, regardless of budget. You can use Okito for personal projects, commercial applications, or anything in between without any restrictions.",
                    icon: Coins,
                    color: "text-blue-400"
                  },
                  {
                    value: "getting-started",
                    question: "How do I get started with Okito?",
                    answer: "Getting started is simple! Install the SDK with 'npm install @okito/sdk', import the functions you need, and start building. Our documentation provides comprehensive guides, code examples, and tutorials to help you create your first token or dApp in minutes. You can also check out our GitHub repository for example projects and community contributions.",
                    icon: Rocket,
                    color: "text-purple-400"
                  },
                  {
                    value: "token-creation",
                    question: "Can I create custom tokens with advanced features?",
                    answer: "Absolutely! Okito supports creating SPL tokens with custom metadata, supply controls, freeze authority, mint authority, and more. You can configure decimals, create tokens with fixed or unlimited supply, add custom metadata including images and descriptions, and implement advanced tokenomics. Our SDK handles all the complex Solana Program Library interactions for you.",
                    icon: Coins,
                    color: "text-yellow-400"
                  },
                  {
                    value: "ui-package",
                    question: "When will the UI package be available?",
                    answer: "The @okito/ui package is currently in development and will be released soon. It will include pre-built React components for wallet connections, token displays, transaction forms, balance cards, and more. All components will follow the same design principles as our landing page - modern, accessible, and highly customizable. Join our community to get early access!",
                    icon: Layers,
                    color: "text-pink-400"
                  },
                  {
                    value: "production-ready",
                    question: "Is Okito production-ready and secure?",
                    answer: "Yes! Okito is built with production use in mind. We implement enterprise-grade security practices, comprehensive error handling, intelligent retry logic, and extensive testing. The SDK includes features like connection pooling, automatic failover, transaction confirmation, and detailed logging. Many developers are already using Okito in production applications.",
                    icon: Shield,
                    color: "text-red-400"
                  },
                  {
                    value: "support-community",
                    question: "What kind of support and community does Okito have?",
                    answer: "Okito has a growing community of developers building on Solana. You can get support through our GitHub issues, join discussions in our community forums, and contribute to the project. We also provide comprehensive documentation, video tutorials, and example projects. As an open-source project, community contributions and feedback help make Okito better for everyone.",
                    icon: Users,
                    color: "text-cyan-400"
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={faq.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <AccordionItem 
                      value={faq.value} 
                      className="glass-enhanced rounded-2xl px-6 border-slate-700/40 group-hover:border-slate-600/60 transition-all duration-300 overflow-hidden relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 via-transparent to-slate-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <AccordionTrigger className="text-left hover:no-underline py-6 relative z-10 group">
                        <div className="flex items-center space-x-4 w-full">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className={`w-10 h-10 bg-gradient-to-br from-${faq.color.split('-')[1]}-500/20 to-${faq.color.split('-')[1]}-600/20 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                          >
                            <faq.icon className={`h-5 w-5 ${faq.color}`} />
                          </motion.div>
                          <span className="text-white font-semibold text-lg group-hover:text-gray-100 transition-colors duration-300">
                            {faq.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pb-6 pl-14 leading-relaxed text-base relative z-10">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {faq.answer}
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>

            {/* Contact CTA */}
            <motion.div 
              variants={itemVariants}
              className="text-center mt-16"
            >
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Can't find what you're looking for? Our community is here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 px-6 py-3 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <Github className="h-4 w-4 mr-2 relative z-10" />
                      <span className="relative z-10">GitHub Discussions</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 px-6 py-3 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <MessageCircle className="h-4 w-4 mr-2 relative z-10" />
                      <span className="relative z-10">Community Chat</span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative py-16 bg-slate-950 border-t border-slate-800/40">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/5 via-transparent to-transparent" />
        </div>
        
        {/* Subtle floating particles in footer */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400/20 rounded-full"
              animate={{
                x: [0, Math.random() * 400],
                y: [0, Math.random() * 200],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 10,
              }}
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                className="flex items-center space-x-3 mb-6"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 relative overflow-hidden">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-green-300/20 to-transparent"
                  />
                  <Code2 className="h-5 w-5 text-black relative z-10" />
                </div>
                <span className="text-2xl font-bold text-white">Okito</span>
              </motion.div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                The most elegant way to build on Solana. Open source, free forever, and built by developers for developers.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: "#", label: "GitHub", color: "hover:text-gray-300" },
                  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
                  { icon: MessageCircle, href: "#", label: "Discord", color: "hover:text-purple-400" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-gray-400 ${social.color} transition-all duration-300 p-2 rounded-lg hover:bg-slate-800/50`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: "Documentation", href: "#documentation" },
                  { name: "Get Started", href: "#packages" },
                  { name: "Examples", href: "#" },
                  { name: "API Reference", href: "#" }
                ].map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Resources</h4>
              <ul className="space-y-3">
                {[
                  { name: "Community", href: "#" },
                  { name: "Blog", href: "#" },
                  { name: "Tutorials", href: "#" },
                  { name: "Support", href: "#faq" }
                ].map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6 rounded-2xl mb-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="text-white font-semibold text-lg mb-2">Stay Updated</h4>
                <p className="text-gray-300">Get notified about new features and updates</p>
              </div>
              <div className="flex space-x-3 w-full md:w-auto">
                <div className="flex-1 md:w-64">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30 px-6 py-3 relative overflow-hidden group whitespace-nowrap">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative z-10">Subscribe</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Footer */}
          <div className="border-t border-slate-800/60 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-gray-500 text-sm">
                <span>&copy; {new Date().getFullYear()} Okito. All rights reserved.</span>
                <div className="flex items-center space-x-4">
                  <Link href="#" className="hover:text-white transition-colors duration-300">Privacy</Link>
                  <Link href="#" className="hover:text-white transition-colors duration-300">Terms</Link>
                  <Link href="#" className="hover:text-white transition-colors duration-300">License</Link>
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-2 h-2 bg-green-400 rounded-full"
                  />
                  <span className="text-green-400 text-xs font-medium">All Systems Operational</span>
                </div>
              </div>
            </div>
          </div>

          {/* Built with love section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-8 pt-6 border-t border-slate-800/40"
          >
            <p className="text-gray-500 text-sm flex items-center justify-center space-x-2">
              <span>Built with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="text-red-400"
              >
                ♥
              </motion.span>
              <span>for the Solana community</span>
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}