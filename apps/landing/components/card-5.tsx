'use client'
import React, { useState } from 'react';
import { motion, Variants } from 'motion/react';
import { X, ArrowUpRight, CheckCircle, Clock, Wallet } from 'lucide-react';

export default function PaymentCard() {
  const [isCardOpen, setIsCardOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');

  const handleClose = () => {
    setIsCardOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsCardOpen(true);
  };

  const handlePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('completed');
      setTimeout(() => {
        setPaymentStatus('pending');
      }, 1000);
    }, 1000);
  };

  // Card hover: only raise by 4px
  const cardVariants: Variants = {
    initial: { y: 0 },
    hover: {
      y: -4,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
    },
  };

  // Panel and inner item variants (remove scale usage on hover)
  const panelVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1], staggerChildren: 0.08, delayChildren: 0.1 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
  };

  const buttonVariants: Variants = {
    pending: { backgroundColor: 'rgb(16, 185, 129)' },
    processing: {
      backgroundColor: 'rgb(251, 191, 36)',
      transition: { duration: 0.2 },
    },
    completed: { backgroundColor: 'rgb(34, 197, 94)' },
  };

  return (
    <motion.div
      className="px-6 py-6 bg-gradient-to-br from-emerald-950/20 via-slate-900/90 to-teal-950/20 rounded-xl relative overflow-hidden w-[26rem] h-[24rem] border border-emerald-500/10"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Header content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div 
          className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent"
        >
          Web3 Payment Integration
        </motion.div>
        <motion.div 
          className="text-gray-300/80 mt-2"
          animate={isHovered ? { color: 'rgba(209, 213, 219, 0.9)' } : {}}
          transition={{ duration: 0.4 }}
        >
          Drop-in payments with webhooks
        </motion.div>
      </motion.div>

      {/* Payment panel */}
      <motion.div
        className="absolute bg-gradient-to-b from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-sm w-[20rem] h-[20rem] left-8 rounded-xl mt-8 px-6 py-4 border border-emerald-500/20"
        variants={panelVariants}
        initial="hidden"
        animate={isCardOpen ? 'visible' : 'closed'}
        style={{ 
          transformStyle: 'preserve-3d',
          boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(16, 185, 129, 0.15)' : '0 6px 25px rgba(0,0,0,0.3)'
        }}
      >
        {/* Header with close button */}
        <motion.div 
          className="flex justify-between items-center mb-4"
          variants={itemVariants}
        >
          <motion.div 
            className="text-emerald-300 text-xs font-semibold flex items-center gap-2"
            animate={isHovered ? { color: '#10b981' } : {}}
            transition={{ duration: 0.3 }}
          >
            <Wallet className="w-3 h-3" />
            Payment Gateway
          </motion.div>
          <motion.button
            onClick={handleClose}
            className="text-gray-400 hover:text-white hover:bg-red-500/20 rounded-full p-1 transition-all duration-200"
            whileHover={{ rotate: 90 }}
            whileTap={{}}
            variants={itemVariants}
          >
            <X width={16} height={16} />
          </motion.button>
        </motion.div>

        {/* Payment amount section */}
        <motion.div 
          className="mb-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
          variants={itemVariants}
          whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
        >
          <motion.div className="text-xs text-emerald-300/80 mb-1">Amount</motion.div>
          <motion.div 
            className="text-2xl font-bold text-white flex items-center gap-2"
          >
            0.5 SOL
            <motion.span 
              className="text-sm text-gray-400"
              whileHover={{ color: '#9ca3af' }}
            >
              ≈ $73.62
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Recipient info */}
        <motion.div 
          className="mb-4"
          variants={itemVariants}
        >
          <motion.div className="text-xs text-gray-400 mb-2">Recipient</motion.div>
          <motion.div 
            className="text-xs font-mono text-gray-300 bg-slate-800/50 overflow-hidden p-2 rounded border border-slate-700/50"
            whileHover={{ backgroundColor: 'rgba(51, 65, 85, 0.8)', borderColor: 'rgba(100, 116, 139, 0.5)' }}
          >
            9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9z...
          </motion.div>
        </motion.div>

        {/* Payment button */}
        <motion.button
          className="w-full py-3 px-4 rounded-lg text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
          variants={buttonVariants}
          animate={paymentStatus}
          onClick={handlePayment}
          disabled={paymentStatus === 'processing'}
          whileHover={paymentStatus === 'pending' ? { y: -1 } : {}}
          whileTap={{}}
        >
          {paymentStatus === 'pending' && (
            <>
              <ArrowUpRight className="w-4 h-4" />
              Send Payment
            </>
          )}
          {paymentStatus === 'processing' && (
            <>
              <Clock className="w-4 h-4 animate-spin" />
              Processing...
            </>
          )}
          {paymentStatus === 'completed' && (
            <>
              <CheckCircle className="w-4 h-4" />
              Payment Sent
            </>
          )}
        </motion.button>

        {/* Webhook status */}
        <motion.div 
          className="mt-3 text-xs text-gray-400 flex items-center gap-2"
          variants={itemVariants}
          animate={paymentStatus === 'completed' ? { color: '#10b981' } : {}}
        >
          <motion.div 
            className={`w-2 h-2 rounded-full ${
              paymentStatus === 'completed' ? 'bg-emerald-400' : 'bg-gray-500'
            }`}
            animate={paymentStatus === 'completed' ? { boxShadow: '0 0 8px rgba(16, 185, 129, 0.8)' } : {}}
          />
          {paymentStatus === 'completed' ? 'Webhook sent to dashboard' : 'Webhook ready'}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}