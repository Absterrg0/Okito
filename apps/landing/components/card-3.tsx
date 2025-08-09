'use client'
import React, { useState } from "react"
import { Settings, ChevronDown, Zap, Database, Timer } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

export default function OkitoConfigManager() {
  const [isCardHovered, setIsCardHovered] = useState(false)
  const [selectedRPC, setSelectedRPC] = useState("Helius")
  const [selectedStrategy, setSelectedStrategy] = useState("Confirmed")
  const [retryCount, setRetryCount] = useState("3")

  // Simplified card variants
  const cardVariants = {
    paused: {
      rotateY: 0,
      rotateX: 0,
    },
    animate: {
      rotateY: 2,
      rotateX: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  // Simplified dropdown variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1] as const,
      },
    },
  }

  const rpcProviders = [
    { name: "Helius", status: "99.9%", latency: "12ms", color: "text-green-400" },
    { name: "QuickNode", status: "99.8%", latency: "15ms", color: "text-blue-400" },
    { name: "Alchemy", status: "99.7%", latency: "18ms", color: "text-purple-400" },
    { name: "Custom RPC", status: "Custom", latency: "—", color: "text-orange-400" },
  ]

  const confirmationStrategies = [
    { name: "Confirmed", description: "Balance between speed & security", time: "~400ms" },
    { name: "Finalized", description: "Maximum security guarantee", time: "~13s" },
    { name: "Processed", description: "Fastest confirmation", time: "~150ms" },
    { name: "Single Gossip", description: "Single node confirmation", time: "~50ms" },
  ]

  return (
    <motion.div
      initial="paused"
      whileHover="animate"
      onHoverStart={() => setIsCardHovered(true)}
      onHoverEnd={() => setIsCardHovered(false)}
      variants={cardVariants}
      className="px-6 py-6 bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-slate-900/95 backdrop-blur-xl rounded-2xl relative overflow-hidden w-[26rem] h-[24rem] border border-emerald-500/20 shadow-2xl shadow-emerald-500/10"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Simplified background accents */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-transparent to-teal-950/20"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-emerald-500/5 to-transparent blur-2xl"></div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative z-10"
      >
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-semibold bg-gradient-to-r from-white via-gray-50 to-white bg-clip-text text-transparent">
            Smart Configuration
          </h3>
        </div>
        <p className="text-sm text-gray-400/80">Optimize your dApp's performance and reliability</p>
      </motion.div>

      {/* Main Config Interface */}
      <motion.div
        className="mt-6 p-4 bg-gradient-to-br from-slate-800/60 via-gray-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl border border-emerald-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Retry Configuration */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 uppercase tracking-wide">Retry Attempts</span>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <Timer className="w-3 h-3" />
              Auto-backoff
            </span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-slate-900/60 rounded-lg border border-emerald-500/20">
            <input
              type="text"
              value={retryCount}
              onChange={(e) => setRetryCount(e.target.value)}
              className="flex-1 bg-transparent text-lg font-medium text-gray-100 outline-none min-w-0 placeholder-gray-500"
              placeholder="3"
            />
            <span className="text-sm text-gray-400">attempts</span>
          </div>
        </div>

        {/* RPC Provider Selection */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 uppercase tracking-wide">RPC Provider</span>
            <span className="text-xs text-gray-500">
              {rpcProviders.find((r) => r.name === selectedRPC)?.latency} avg
            </span>
          </div>
          
          <div className="relative">
            <motion.button 
              className="flex items-center justify-between w-full gap-3 p-3 bg-slate-900/60 rounded-lg border border-emerald-500/20 hover:border-emerald-400/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"></div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-200">{selectedRPC}</div>
                  <div className="text-xs text-emerald-400">
                    {rpcProviders.find((r) => r.name === selectedRPC)?.status} uptime
                  </div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.button>

            {/* RPC Provider Dropdown */}
            <AnimatePresence>
              {isCardHovered && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full mt-2 left-0 right-0 bg-slate-900/95 backdrop-blur-xl rounded-lg border border-emerald-500/20 shadow-2xl z-50 overflow-hidden"
                >
                  {rpcProviders.map((provider) => (
                    <motion.div
                      key={provider.name}
                      className="px-3 py-3 cursor-pointer border-b border-gray-700/30 last:border-b-0 hover:bg-emerald-500/10 transition-colors"
                      onClick={() => setSelectedRPC(provider.name)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-100">{provider.name}</div>
                            <div className="text-xs text-emerald-400">{provider.latency}</div>
                          </div>
                          <div className="text-xs text-gray-400">{provider.status} uptime</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Confirmation Strategy */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 uppercase tracking-wide">Confirmation</span>
            <div className="flex items-center gap-1 text-xs">
              <Database className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-medium">
                {confirmationStrategies.find((s) => s.name === selectedStrategy)?.time}
              </span>
            </div>
          </div>
          
          <div className="relative">
            <motion.button 
              className="flex items-center justify-between w-full gap-3 p-3 bg-slate-900/60 rounded-lg border border-emerald-500/20 hover:border-emerald-400/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-500/20 to-emerald-500/20 flex items-center justify-center border border-teal-500/30">
                  <Database className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-200">{selectedStrategy}</div>
                  <div className="text-xs text-gray-400">
                    {confirmationStrategies.find((s) => s.name === selectedStrategy)?.description}
                  </div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.button>

            {/* Confirmation Strategy Dropdown */}
            <AnimatePresence>
              {isCardHovered && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full mt-2 left-0 right-0 bg-slate-900/95 backdrop-blur-xl rounded-lg border border-emerald-500/20 shadow-2xl z-50 overflow-hidden"
                >
                  {confirmationStrategies.map((strategy) => (
                    <motion.div
                      key={strategy.name}
                      className="px-3 py-3 cursor-pointer border-b border-gray-700/30 last:border-b-0 hover:bg-emerald-500/10 transition-colors"
                      onClick={() => setSelectedStrategy(strategy.name)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-500/20 to-emerald-500/20 flex items-center justify-center border border-teal-500/30">
                          <Database className="w-4 h-4 text-teal-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-100">{strategy.name}</div>
                            <div className="text-xs text-emerald-400">{strategy.time}</div>
                          </div>
                          <div className="text-xs text-gray-400">{strategy.description}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Apply Configuration Button */}
      <motion.button
        className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/35 transition-all duration-300 relative overflow-hidden group"
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-center gap-2 relative z-10">
          <Zap className="w-4 h-4" />
          Apply Configuration
        </div>
      </motion.button>
    </motion.div>
  )
}