'use client'
import React, { useState } from "react"
import { Coins, Zap, CheckCircle, ArrowRight } from "lucide-react"
import { motion } from "motion/react"

export default function SolanaTokenCard() {
  const [isComplete, setIsComplete] = useState(false)

  const handleCreateToken = () => {
    setIsComplete(true)
    setTimeout(() => setIsComplete(false), 1000)
  }

  const cardVariants = {
    paused: { y: 0 },
    animate: { y: -4, transition: { duration: 0.3, ease: "easeOut" as const } },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="paused"
      whileHover="animate"
      className="group px-4 py-6 bg-gradient-to-br from-slate-900/90 via-gray-900/80 to-slate-900/90 rounded-xl relative overflow-hidden w-full sm:w-[32rem] md:w-[36rem] lg:w-[40rem] h-[24rem] border border-emerald-500/20 shadow-[0_4px_12px_rgba(16,185,129,0.07)] hover:shadow-[0_16px_48px_rgba(16,185,129,0.15)] hover:border-emerald-500/30 "
    >
      {/* Simplified background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-transparent to-teal-950/20"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-radial from-emerald-500/8 to-transparent blur-3xl group-hover:from-emerald-500/12 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-radial from-teal-500/6 to-transparent blur-3xl group-hover:from-teal-500/10 transition-all duration-700"></div>
      </div>

      <div className="relative z-10">
        {/* Simplified Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="relative p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-400/30 shadow-lg shadow-emerald-500/10">
              <Coins className="w-6 h-6 text-emerald-400 relative z-10" />
            </div>
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-white via-gray-50 to-white bg-clip-text text-transparent">
                Token Creation Studio
              </h3>
              <p className="text-sm text-gray-400/80 font-light">Deploy SPL tokens with zero configuration</p>
            </div>
          </div>
          
          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-400/30 rounded-full hover:bg-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300">
            <span className="text-xs text-emerald-300 font-medium">3 Lines of Code</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-5 gap-6">
          {/* Simplified Token Form */}
          <div className="col-span-2 space-y-4">
            <motion.div 
              className="relative group/input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="text-xs text-emerald-300/80 font-medium mb-1 block">Token Name</label>
              <input
                type="text"
                placeholder="Enter token name"
                defaultValue="Okito Token"
                className="w-full px-4 py-3 bg-slate-800/80 border border-emerald-500/20 rounded-lg text-white placeholder-gray-500/70 focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 hover:border-emerald-400/30 hover:bg-slate-800/90 transition-all duration-300"
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="relative group/input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="text-xs text-emerald-300/80 font-medium mb-1 block">Symbol</label>
                <input
                  type="text"
                  placeholder="Symbol"
                  defaultValue="OKTO"
                  className="w-full px-4 py-3 bg-slate-800/80 border border-emerald-500/20 rounded-lg text-white placeholder-gray-500/70 focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 hover:border-emerald-400/30 hover:bg-slate-800/90 transition-all duration-300"
                />
              </motion.div>

              <motion.div 
                className="relative group/input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="text-xs text-emerald-300/80 font-medium mb-1 block">Supply</label>
                <input
                  type="text"
                  placeholder="Total supply"
                  defaultValue="1,000,000"
                  className="w-full px-4 py-3 bg-slate-800/80 border border-emerald-500/20 rounded-lg text-white placeholder-gray-500/70 focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 hover:border-emerald-400/30 hover:bg-slate-800/90 transition-all duration-300"
                />
              </motion.div>
            </div>

            <motion.button
              onClick={handleCreateToken}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/35 disabled:opacity-50 flex items-center justify-center gap-3 relative overflow-hidden group/button"
            >
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5" />
                <span>Deploy Token</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </div>
            </motion.button>
          </div>

          {/* Simplified Code Preview */}
          <motion.div
            className="col-span-3 p-5 rounded-xl border border-emerald-500/20 relative group/code bg-slate-900/40 hover:bg-slate-900/60 hover:border-emerald-500/30 transition-all duration-500"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              {/* Simplified Terminal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 bg-red-400/70 rounded-full shadow-sm"></div>
                    <div className="w-3 h-3 bg-yellow-400/70 rounded-full shadow-sm"></div>
                    <div className="w-3 h-3 bg-green-400/70 rounded-full shadow-sm"></div>
                  </div>
                  <span className="text-xs text-emerald-300/80 font-mono tracking-wide">create-token.ts</span>
                </div>
                <div className="text-xs text-gray-400 bg-slate-800/50 px-2 py-1 rounded border border-emerald-500/20 hover:border-emerald-500/30 transition-colors duration-300">
                  SDK v2.1.0
                </div>
              </div>
              
              {/* Simplified Code Block */}
              <div className="bg-slate-900/60 rounded-lg p-4 border border-emerald-500/10 hover:border-emerald-500/20 transition-colors duration-300">
                <pre className="text-sm leading-relaxed overflow-hidden">
                  <code>
                    <div>
                      <span className="text-purple-400 font-medium">import</span> <span className="text-white">{"{"}</span> <span className="text-emerald-400 font-semibold">createToken</span> <span className="text-white">{"}"}</span> <span className="text-purple-400 font-medium">from</span> <span className="text-amber-300">'@okito/sdk'</span><span className="text-white">;</span>
                    </div>
                    <br />
                    <div>
                      <span className="text-emerald-400/60 italic">// Deploy your SPL token in seconds</span>
                    </div>
                    <br />
                    <div>
                      <span className="text-purple-400 font-medium">const</span> <span className="text-cyan-400 font-semibold">token</span> <span className="text-white">=</span> <span className="text-purple-400 font-medium">await</span> <span className="text-emerald-400 font-semibold">createToken</span><span className="text-white">({"{"}</span>
                    </div>
                    <br />
                    <div>
                      <span className="text-white">  </span><span className="text-rose-400 font-medium">name</span><span className="text-white">:</span> <span className="text-amber-300">"Okito Token"</span><span className="text-white">,</span>
                    </div>
                    <br />
                    <div>
                      <span className="text-white">  </span><span className="text-rose-400 font-medium">symbol</span><span className="text-white">:</span> <span className="text-amber-300">"OKTO"</span><span className="text-white">,</span>
                    </div>
                    <br />
                    <div>
                      <span className="text-white">  </span><span className="text-rose-400 font-medium">supply</span><span className="text-white">:</span> <span className="text-emerald-300 font-semibold">1000000</span>
                    </div>
                    <br />
                    <div>
                      <span className="text-white">{"}"});</span>
                    </div>
                  </code>
                </pre>
              </div>

              {/* Simplified Progress indicator */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden border border-emerald-500/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400"
                    initial={{ width: "75%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>
                <div className="p-1.5 bg-emerald-500/20 rounded-full border border-emerald-400/30 hover:bg-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                </div>
              </div>

              {/* Deployment stats */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: "Gas Cost", value: "~0.002 SOL" },
                  { label: "Deploy Time", value: "< 3 sec" },
                  { label: "Network", value: "Mainnet" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-2 rounded-lg bg-slate-800/20 hover:bg-slate-800/40 transition-colors duration-300">
                    <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                    <div className="text-xs text-emerald-300 font-medium">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Success notification */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ 
            opacity: isComplete ? 1 : 0, 
            y: isComplete ? 0 : 30,
            scale: isComplete ? 1 : 0.9
          }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="absolute top-40 left-6 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 rounded-xl backdrop-blur-sm shadow-lg shadow-emerald-500/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
                transition={{ duration: 0.6 }}
                className="p-2 bg-emerald-500/20 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </motion.div>
              <div>
                <span className="text-sm text-emerald-300 font-semibold">Token deployed successfully!</span>
                <div className="text-xs text-emerald-400/70 mt-0.5">Transaction: 0x4a2b...f8c9</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}