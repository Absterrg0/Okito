'use client'
import { motion, useInView } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Terminal,
  Layers,
  Coins,
  Wallet,
  Database,
  Lock,
  BookOpen,
  ArrowRight,
  Copy,
  CheckCircle,
  Clock,
  Package,
  TrendingUp,
  Users,
  Shield,
} from "lucide-react"
import { useState, useRef } from "react"
import { containerVariants, itemVariants } from "./variants" // Assuming these are correctly defined
import Link from "next/link"

export default function Packages({id}:{id:string}) {
  const packagesRef = useRef<HTMLDivElement>(null)
  const isInViewPackages = useInView(packagesRef)

  const [activePackage, setActivePackage] = useState("sdk")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div id={id}>
      <section  ref={packagesRef} className="relative py-32">
        <div className="absolute inset-0" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInViewPackages ? "visible" : "hidden"}
          className="container mx-auto px-4 lg:px-6 relative"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="rounded-full bg-red-500/20 text-red-300 border-red-500/30 px-4 py-2 mb-6">
              Alpha Release
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">Choose your development path</h2>
            <p className="text-xl text-gray-300 mb-16 leading-relaxed max-w-3xl mx-auto">
              Powerful packages designed to accelerate your Solana development journey
            </p>
          </motion.div>

          {/* Liquid Glass Package Selector */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="relative px-2 py-2 rounded-full overflow-hidden" style={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.15),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {/* Multi-layered glass background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/8 to-white/3 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 via-transparent to-slate-600/5 rounded-full"></div>
              
              {/* Animated Background Blob with Smooth Color Transitions */}
              <motion.div
                className="absolute top-2 left-2 h-[calc(100%-16px)] rounded-full backdrop-blur-sm"
                animate={{
                  x: activePackage === "sdk" ? 0 : "100%",
                  width: "calc(50% - 8px)",
                  background: activePackage === "sdk" 
                    ? "linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(16, 185, 129, 0.15) 50%, rgba(5, 150, 105, 0.1) 100%)"
                    : "linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(139, 92, 246, 0.1) 100%)",
                  borderColor: activePackage === "sdk" ? "rgba(34, 197, 94, 0.3)" : "rgba(59, 130, 246, 0.3)",
                  boxShadow: activePackage === "sdk" 
                    ? "0 4px 20px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(34, 197, 94, 0.2)"
                    : "0 4px 20px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(59, 130, 246, 0.2)"
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 35,
                  mass: 0.8
                }}
                style={{
                  border: '1px solid'
                }}
              />
              
              {/* Subtle shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full pointer-events-none"
                animate={{
                  x: activePackage === "sdk" ? "-100%" : "100%"
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              />
              
              <div className="flex relative z-10">
                <motion.button
                  onClick={() => setActivePackage("sdk")}
                  className="px-8 py-4 rounded-full font-semibold flex items-center min-w-[140px] justify-center transition-all duration-300"
                  animate={{
                    color: activePackage === "sdk" ? "rgb(134, 239, 172)" : "rgb(156, 163, 175)"
                  }}
                  whileHover={{
                    color: activePackage === "sdk" ? "rgb(134, 239, 172)" : "rgb(209, 213, 219)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Terminal className="h-5 w-5 mr-2" />
                  SDK
                </motion.button>
                <motion.button
                  onClick={() => setActivePackage("ui")}
                  className="px-8 py-4 rounded-full font-semibold flex items-center min-w-[140px] justify-center transition-all duration-300"
                  animate={{
                    color: activePackage === "ui" ? "rgb(147, 197, 253)" : "rgb(156, 163, 175)"
                  }}
                  whileHover={{
                    color: activePackage === "ui" ? "rgb(147, 197, 253)" : "rgb(209, 213, 219)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Layers className="h-5 w-5 mr-2" />
                  UI
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Package Content */}
          <motion.div
            key={activePackage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
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
          
                      <div>
                        <h3 className="text-3xl font-bold text-white font-['Roboto_Mono',monospace]">@okito/sdk</h3>
                        <motion.p
                          className="text-green-400 font-semibold"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          Available 
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
                    whileHover={{ scale: 1.02 }}
                    className="glass-enhanced p-6 rounded-2xl relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <h4 className="text-lg font-semibold text-white">Quick Installation</h4>
                      <motion.div  whileTap={{ scale: 0.9 }}>
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

                  {/* Features Grid */}
                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {[
                      { icon: Coins, title: "Token Creation", desc: "SPL token deployment", delay: 0 },
                      { icon: Wallet, title: "Airdrop", desc: "Airdrop tokens to users", delay: 0.1 },
                      { icon: Database, title: "Transactions", desc: "Smart execution", delay: 0.2 },
                      { icon: Lock, title: "Customisation", desc: "Customise your transactions", delay: 0.3 },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: feature.delay + 0.5, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        className="glass-enhanced p-4 rounded-xl group cursor-pointer relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <motion.div

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
               
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link href="https://docs.okito.dev">
                    <Button className="w-full bg-green-500/20 text-green-100 border border-green-500/30 py-6 text-md hover:bg-green-500/30 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-400/10 "></div>
                      <BookOpen className="h-5 w-5 mr-2 relative z-10" />
                      <span className="relative z-10 text-sm">Explore Docs</span>
                    </Button>
                    </Link>
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
                   
                      <div>
                        <h3 className="text-3xl font-bold text-white font-['Roboto_Mono',monospace]">@okito/ui</h3>
                        <div className="flex items-center space-x-2">

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
    </div>
  )
}