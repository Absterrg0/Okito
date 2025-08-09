'use client'
import React, { useState } from "react"
import { motion, Variants } from "motion/react"
import { Code2, Zap, Coins, Rocket, GitBranch, Database, Shield, Users } from "lucide-react"

interface ActivityCardData {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  status: string;
  time: string;
  color: string;
  bgColor: string;
}

function ActivityCard({ card }: { card: ActivityCardData }) {
  return (
    <div className="flex-shrink-0 w-56 h-14 bg-gradient-to-br from-slate-800/90 via-gray-900/90 to-slate-900/90 backdrop-blur-sm rounded-lg border border-emerald-500/20 shadow-lg shadow-emerald-500/5 p-3 hover:border-emerald-400/30 transition-all duration-300">
      <div className="flex items-center space-x-2.5 h-full">
        <div className={`p-1.5 rounded-md ${card.bgColor} shadow-sm flex-shrink-0`}>
          {card.icon}
        </div>
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-0.5">
            <h4 className="text-xs font-semibold text-white truncate pr-1">{card.title}</h4>
            <span className={`text-xs font-medium ${card.color} flex-shrink-0`}>{card.status}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400 truncate pr-1">{card.subtitle}</p>
            <span className="text-xs text-gray-500 flex-shrink-0">{card.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OkitoActivityShowcase() {
  // Row 1 - Token & Smart Contract Development
  const row1Cards: ActivityCardData[] = [
    {
      icon: <Coins className="h-4 w-4 text-emerald-400" />,
      title: 'Token Created',
      subtitle: 'MYTOKEN deployed successfully',
      status: 'Live',
      time: '2m ago',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      icon: <Code2 className="h-4 w-4 text-blue-400" />,
      title: 'Smart Contract',
      subtitle: 'NFT marketplace contract',
      status: 'Building',
      time: '5m ago',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    }
  ];

  // Row 2 - DeFi & Integration
  const row2Cards: ActivityCardData[] = [
    {
      icon: <Zap className="h-4 w-4 text-yellow-400" />,
      title: 'DeFi Integration',
      subtitle: 'Jupiter swap integration',
      status: 'Testing',
      time: '8m ago',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: <Database className="h-4 w-4 text-cyan-400" />,
      title: 'RPC Setup',
      subtitle: 'Mainnet connection configured',
      status: 'Active',
      time: '12m ago',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    }
  ];

  // Row 3 - Deployment & Management
  const row3Cards: ActivityCardData[] = [
    {
      icon: <Rocket className="h-4 w-4 text-purple-400" />,
      title: 'dApp Deployed',
      subtitle: 'Production build deployed',
      status: 'Success',
      time: '15m ago',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: <Shield className="h-4 w-4 text-orange-400" />,
      title: 'Security Audit',
      subtitle: 'Contract security check',
      status: 'Passed',
      time: '18m ago',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: <Users className="h-4 w-4 text-pink-400" />,
      title: 'User Onboarding',
      subtitle: 'Wallet integration setup',
      status: 'Ready',
      time: '20m ago',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10'
    }
  ];

  // Simplified variants with reduced complexity
  const cardVariants: Variants = {
    paused: {
      y: 0,
    },
    animate: {

      y: -4,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  const row1Variants: Variants = {
    paused: { x: -192 },
    animate: {
      x: -768,
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      },
    },
  }
  
  const row2Variants: Variants = {
    paused: { x: -576 },
    animate: {
      x: 192,
      transition: {
        duration: 30,
        ease: "linear",
        repeat: Infinity,
      },
    },
  }
  
  const row3Variants: Variants = {
    paused: { x: -96 },
    animate: {
      x: -1152,
      transition: {
        duration: 35,
        ease: "linear",
        repeat: Infinity,
      },
    },
  }

  return (
    <motion.div
      className="px-4 py-6 bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-slate-900/95 backdrop-blur-xl rounded-2xl relative overflow-hidden w-[40rem] h-[24rem] border border-emerald-500/20 shadow-2xl shadow-emerald-500/10"
      initial="paused"
      whileHover="animate"
      variants={cardVariants}
    >
      {/* Simplified background accents */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-transparent to-teal-950/20"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-emerald-500/5 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-radial from-teal-500/4 to-transparent blur-3xl"></div>

      {/* Row 1 - Top row */}
      <motion.div 
        className="absolute top-2 left-0 w-full overflow-hidden h-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-slate-900/95 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-slate-900/95 to-transparent z-10"></div>

        <motion.div className="flex gap-4 h-full items-center" variants={row1Variants}>
          {[...row1Cards, ...row1Cards, ...row1Cards, ...row1Cards].map((card, idx) => (
            <ActivityCard key={`row1-${idx}`} card={card} />
          ))}
        </motion.div>
      </motion.div>

      {/* Row 2 - Middle row */}
      <motion.div 
        className="absolute top-20 left-0 w-full overflow-hidden h-14"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-slate-900/95 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-slate-900/95 to-transparent z-10"></div>

        <motion.div className="flex gap-4 h-full items-center" variants={row2Variants}>
          {[...row2Cards, ...row2Cards, ...row2Cards, ...row2Cards].map((card, idx) => (
            <ActivityCard key={`row2-${idx}`} card={card} />
          ))}
        </motion.div>
      </motion.div>

      {/* Row 3 - Bottom row */}
      <motion.div 
        className="absolute top-36 left-0 w-full overflow-hidden h-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-slate-900/95 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-slate-900/95 to-transparent z-10"></div>

        <motion.div className="flex gap-4 h-full items-center" variants={row3Variants}>
          {[...row3Cards, ...row3Cards, ...row3Cards, ...row3Cards].map((card, idx) => (
            <ActivityCard key={`row3-${idx}`} card={card} />
          ))}
        </motion.div>
      </motion.div>

      {/* Title Section */}
      <motion.div 
        className="absolute bottom-4 left-4 right-4 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-1 h-5 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full"></div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-white via-gray-50 to-white bg-clip-text text-transparent">
            Monitor Your Development Activity
          </h3>
        </div>
        <p className="text-gray-400/80 text-sm font-light">
          Real-time insights into your Solana dApp development workflow
        </p>
      </motion.div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
    </motion.div>
  )
}