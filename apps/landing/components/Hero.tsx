'use client'
import { motion, useInView, Variants } from "motion/react"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight, Github, Copy, CheckCircle } from "lucide-react"
import { useState, useRef } from "react"
import Link from "next/link"

const containerVariants:Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6
    }
  }
}

const itemVariants:Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export default function Hero({id}:{id:string}) {
  const heroRef = useRef<HTMLDivElement>(null)
  const isInViewHero = useInView(heroRef, {
    once: true,
    initial: true
  })

  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div id = {id}>
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
      >
        {/* Minimalistic Gradient Background System */}
        <div className="absolute inset-0">
          {/* Primary gradient background */}
          
          {/* Subtle color accents */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-transparent to-teal-950/20"></div>
          
          {/* Radial gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-radial from-emerald-900/10 via-transparent to-transparent"></div>
          
          {/* Top lighting effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-emerald-500/5 to-transparent blur-3xl"></div>
          
          {/* Bottom ambient glow */}
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-teal-500/4 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-radial from-emerald-500/4 to-transparent blur-3xl"></div>
        </div>

        {/* Refined Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(120)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 5 === 0 
                  ? 'w-1.5 h-1.5 bg-emerald-400/30' 
                  : i % 5 === 1 
                  ? 'w-1 h-1 bg-teal-300/25' 
                  : i % 5 === 2 
                  ? 'w-0.5 h-0.5 bg-white/40' 
                  : i % 5 === 3
                  ? 'w-2 h-2 bg-cyan-400/20'
                  : 'w-0.5 h-0.5 bg-emerald-300/35'
              }`}
              animate={{
                x: [0, Math.random() * 800 - 400],
                y: [0, Math.random() * 600 - 300],
                opacity: [0, 0.6, 0],
                scale: [0.3, 1, 0.3],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 0.1,
                ease: "easeInOut",
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
          className="container mx-auto px-4 lg:px-8 relative z-10 pt-16"
        >
          <div className="max-w-7xl mx-auto text-center">
            {/* Refined accent line */}
            <motion.div 
              variants={itemVariants} 
              className="mb-8 flex justify-center"
            >
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full shadow-sm"></div>
            </motion.div>

            {/* Main Headline - Better spacing */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.1] tracking-tight"
            >
              <motion.span 
                className="bg-gradient-to-r from-white via-gray-50 to-white bg-clip-text text-transparent block"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                Build dApps
              </motion.span>
              <motion.span 
                className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent block mt-2"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                without limits
              </motion.span>
            </motion.h1>

            {/* Enhanced Subtitle with better typography */}
            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl xl:text-2xl text-gray-300/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Okito provides the complete developer toolkit for building{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-medium">
                production-ready Solana applications
              </span>{" "}
              with unprecedented simplicity and power.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.div 
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link href={"https://docs.okito.dev/"}>
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold px-8 py-4 text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/35 transition-all duration-300 border-0 overflow-hidden group rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Documentation
                </Button>
                  </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link href="https://github.com/Absterrg0/Okito">
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-emerald-500/30 bg-emerald-950/10 backdrop-blur-sm text-white hover:bg-emerald-900/20 hover:border-emerald-400/50 px-8 py-4 text-base font-medium transition-all duration-300 shadow-sm hover:shadow-md rounded-xl"
                >
                  <Github className="h-5 w-5 mr-2" />
                  View Source
                </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Refined Code Preview Terminal */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
              <motion.div 
                whileHover={{  y: -1 }}
                className="relative group"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Refined border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/15 via-teal-500/20 to-emerald-500/15 rounded-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-slate-900/90 via-gray-900/90 to-slate-900/90 backdrop-blur-xl rounded-xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 overflow-hidden">
                  {/* Refined Terminal Header */}
                  <div className="flex items-center justify-between px-6 py-4 bg-slate-900/60 border-b border-emerald-500/20">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500/80 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500/80 rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-emerald-300/70 text-xs font-mono tracking-wider">token-creation.tsx</span>
                      <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard("npm install @okito/sdk")}
                          className="h-7 w-7 p-0 text-emerald-400/60 hover:text-emerald-300 hover:bg-emerald-800/20 rounded-md transition-colors duration-200"
                        >
                          {copied ? <CheckCircle className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Refined Code Block */}
                  <div className="p-8">
                    <pre className="text-left overflow-x-auto">
                      <code className="text-sm lg:text-base leading-loose tracking-wide">
                        <span className="text-purple-400 font-medium">import</span> <span className="text-slate-200">{"{"}</span>{" "}
                        <span className="text-emerald-400 font-semibold">createToken</span> <span className="text-slate-200">{"}"}</span>{" "}
                        <span className="text-purple-400 font-medium">from</span> <span className="text-amber-300">&apos;@okito/sdk&apos;</span>
                        <span className="text-slate-200">;</span>
                        <br />
                        <br />
                        <span className="text-emerald-400/60 italic">// Create a token in just 3 lines </span>
                        <br />
                        <span className="text-purple-400 font-medium">const</span> <span className="text-cyan-400 font-semibold">token</span>{" "}
                        <span className="text-slate-200">=</span> <span className="text-purple-400 font-medium">await</span>{" "}
                        <span className="text-emerald-400 font-semibold">createToken</span>
                        <span className="text-slate-200">({"{"}</span>
                        <br />
                        <span className="text-slate-200">  </span>
                        <span className="text-rose-400 font-medium">name</span>
                        <span className="text-slate-200">:</span> <span className="text-amber-300">&quot;My Token&quot;</span>
                        <span className="text-slate-200">,</span>
                        <br />
                        <span className="text-slate-200">  </span>
                        <span className="text-rose-400 font-medium">symbol</span>
                        <span className="text-slate-200">:</span> <span className="text-amber-300">&quot;MTK&quot;</span>
                        <span className="text-slate-200">,</span>
                        <br />
                        <span className="text-slate-200">  </span>
                        <span className="text-rose-400 font-medium">supply</span>
                        <span className="text-slate-200">:</span> <span className="text-emerald-300 font-semibold">1000000</span>
                        <br />
                        <span className="text-slate-200">{"}"});</span>
                      </code>
                    </pre>
                  </div>

                  {/* Refined bottom accent */}
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}