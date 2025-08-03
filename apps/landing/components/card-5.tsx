import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle, Clock, Wallet } from 'lucide-react';

export default function PaymentCard() {
  const [isCardOpen, setIsCardOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending', 'processing', 'completed'

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
      }, 1000); // Wait 1 second after 'pending'
    }, 1000); // Wait 1 second to change to 'pending'
  };

  // Card variants for enhanced animations
  const cardVariants:Variants = {
    initial: { 
      scale: 1, 
      rotateY: 0, 
      rotateX: 0,
      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.07), 0 -2px 3px rgba(16, 185, 129, 0.1)"
    },
    hover: {
      scale: 1.03,
      rotateY: 2,
      rotateX: 1,
      boxShadow: "0 12px 40px rgba(16, 185, 129, 0.15), 0 -4px 8px rgba(20, 184, 166, 0.2), 0 0 30px rgba(16, 185, 129, 0.1)",
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  // Payment panel variants
  const panelVariants:Variants = {
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 25,
      rotateX: -12,
      rotateY: -3,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: 0.9,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      scale: 0.88,
      y: 20,
      rotateX: -8,
      rotateY: -2,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    floating: {
      y: [0, -2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1],
      },
    },
  };

  // Individual item variants
  const itemVariants:Variants = {
    hidden: { 
      opacity: 0, 
      x: -15, 
      scale: 0.9,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    hover: {
      x: 3,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  // Button variants based on payment status
  const buttonVariants:Variants = {
    pending: {
      backgroundColor: "rgb(16, 185, 129)",
      scale: 1,
    },
    processing: {
      backgroundColor: "rgb(251, 191, 36)",
      scale: [1, 1.02, 1],
      transition: {
        scale: {
          duration: 1,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
        }
      }
    },
    completed: {
      backgroundColor: "rgb(34, 197, 94)",
      scale: 1,
    }
  };

  return (
    <motion.div
      className="px-6 py-6 bg-gradient-to-br from-emerald-950/20 via-slate-900/90 to-teal-950/20 rounded-xl relative overflow-hidden w-[26rem] h-[24rem] border border-emerald-500/10"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Header content with enhanced animations */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div 
          className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent"
          animate={isHovered ? { scale: 1.02 } : {}}
          transition={{ duration: 0.4 }}
        >
          Web3 Payment Integration
        </motion.div>
        <motion.div 
          className="text-gray-300/80 mt-2"
          animate={isHovered ? { color: "rgba(209, 213, 219, 0.9)" } : {}}
          transition={{ duration: 0.4 }}
        >
          Drop-in payments with webhooks
        </motion.div>
      </motion.div>

      {/* Enhanced payment panel */}
      <motion.div
        className="absolute bg-gradient-to-b from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-sm w-[20rem] h-[20rem] left-8 rounded-xl mt-8 px-6 py-4 border border-emerald-500/20"
        variants={panelVariants}
        initial="hidden"
        animate={isCardOpen ? (isHovered ? ["visible", "floating"] : "visible") : "closed"}
        style={{ 
          transformStyle: "preserve-3d",
          boxShadow: isHovered ? 
            "0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)" : 
            "0 6px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
        }}
      >
        {/* Header with close button */}
        <motion.div 
          className="flex justify-between items-center mb-4"
          variants={itemVariants}
        >
          <motion.div 
            className="text-emerald-300 text-xs font-semibold flex items-center gap-2"
            animate={isHovered ? { color: "#10b981" } : {}}
            transition={{ duration: 0.3 }}
          >
            <Wallet className="w-3 h-3" />
            Payment Gateway
          </motion.div>
          <motion.button
            onClick={handleClose}
            className="text-gray-400 hover:text-white hover:bg-red-500/20 rounded-full p-1 transition-all duration-200"
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            variants={itemVariants}
          >
            <X width={16} height={16} />
          </motion.button>
        </motion.div>

        {/* Payment amount section */}
        <motion.div 
          className="mb-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
          variants={itemVariants}
          whileHover={{ 
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            borderColor: "rgba(16, 185, 129, 0.3)",
            scale: 1.02 
          }}
        >
          <motion.div className="text-xs text-emerald-300/80 mb-1">Amount</motion.div>
          <motion.div 
            className="text-2xl font-bold text-white flex items-center gap-2"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 12px rgba(16, 185, 129, 0.6)",
            }}
          >
            0.5 SOL
            <motion.span 
              className="text-sm text-gray-400"
              whileHover={{ color: "#9ca3af" }}
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
            whileHover={{
              backgroundColor: "rgba(51, 65, 85, 0.8)",
              borderColor: "rgba(100, 116, 139, 0.5)",
            }}
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
          whileHover={paymentStatus === 'pending' ? { scale: 1.02, y: -1 } : {}}
          whileTap={paymentStatus === 'pending' ? { scale: 0.98 } : {}}
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
          animate={paymentStatus === 'completed' ? { 
            color: "#10b981",
            scale: 1.02
          } : {}}
        >
          <motion.div 
            className={`w-2 h-2 rounded-full ${
              paymentStatus === 'completed' ? 'bg-emerald-400' : 'bg-gray-500'
            }`}
            animate={paymentStatus === 'completed' ? {
              boxShadow: "0 0 8px rgba(16, 185, 129, 0.8)"
            } : {}}
          />
          {paymentStatus === 'completed' ? 'Webhook sent to dashboard' : 'Webhook ready'}
        </motion.div>
      </motion.div>

      {/* Subtle breathing border effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl pointer-events-none border border-emerald-400/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isHovered ? [0, 0.6, 0] : 0,
          scale: isHovered ? [0.95, 1.02, 0.98] : 0.95
        }}
        transition={{ 
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: [0.4, 0, 0.6, 1]
        }}
      />
    </motion.div>
  );
}