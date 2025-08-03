'use client'
import { motion } from "motion/react"
import { useState } from "react"

export default function OkitoMobilePower() {
  const [isCardHovered, setIsCardHovered] = useState(false)

  // Enhanced card variants with subtle depth
  const cardVariants = {
    paused: {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
    },
    animate: {
      scale: 1.02,
      rotateY: 1,
      rotateX: 0.5,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  // Phone variants with sophisticated charging glow and entrance animation
  const phoneVariants = {
    initial: {
      y: 50,
      scale: 0.8,
      opacity: 0,
      rotateX: -15,
      rotateZ: 5,
      boxShadow: "0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(16, 185, 129, 0)",
      borderColor: "rgba(16, 185, 129, 0.2)",
    },
    paused: {
      y: 0,
      scale: 1,
      opacity: 1,
      rotateX: 0,
      rotateZ: 0,
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 rgba(16, 185, 129, 0)",
      borderColor: "rgba(16, 185, 129, 0.4)",
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
    animate: {
      y: [0, -2, 0, -1, 0],
      scale: [1, 1.02, 1, 1.01, 1],
      opacity: 1,
      rotateX: [0, 1, 0, -0.5, 0],
      rotateZ: [0, 0.2, -0.1, 0],
      boxShadow: [
        "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 rgba(16, 185, 129, 0)",
        "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(16, 185, 129, 0.3)",
        "0 10px 36px rgba(0, 0, 0, 0.35), 0 0 35px rgba(20, 184, 166, 0.25)",
        "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(16, 185, 129, 0.3)",
        "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 rgba(16, 185, 129, 0)",
      ],
      borderColor: [
        "rgba(16, 185, 129, 0.4)",
        "rgba(16, 185, 129, 0.6)",
        "rgba(20, 184, 166, 0.4)",
        "rgba(16, 185, 129, 0.6)",
        "rgba(16, 185, 129, 0.4)",
      ],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    exit: {
      y: 0,
      scale: 1,
      opacity: 1,
      rotateX: 0,
      rotateZ: 0,
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 rgba(16, 185, 129, 0)",
      borderColor: "rgba(16, 185, 129, 0.4)",
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  // Enhanced screen variants with breathing effect and entrance animation
  const phoneScreenVariants = {
    initial: {
      background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(51, 65, 85, 0.8) 100%)",
      boxShadow: "inset 0 0 0 rgba(16, 185, 129, 0)",
      scale: 0.95,
      opacity: 0,
    },
    paused: {
      background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.95) 100%)",
      boxShadow: "inset 0 0 0 rgba(16, 185, 129, 0)",
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
    animate: {
      // Synchronized glow that activates when power reaches phone
      background: [
        "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.95) 100%)",
        "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.95) 100%)", // Wait for power to arrive
        "linear-gradient(135deg, rgba(4, 120, 87, 0.12) 0%, rgba(16, 185, 129, 0.08) 50%, rgba(51, 65, 85, 0.95) 100%)",
        "linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(5, 150, 105, 0.08) 50%, rgba(51, 65, 85, 0.95) 100%)",
        "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.95) 100%)",
      ],
      boxShadow: [
        "inset 0 0 0 rgba(16, 185, 129, 0)",
        "inset 0 0 0 rgba(16, 185, 129, 0)", // Wait for power to arrive
        "inset 0 0 25px rgba(16, 185, 129, 0.12)",
        "inset 0 0 35px rgba(20, 184, 166, 0.08)",
        "inset 0 0 0 rgba(16, 185, 129, 0)",
      ],
      scale: 1,
      opacity: 1,
      transition: {
        duration: 3,
        times: [0, 0.5, 0.7, 0.9, 1], // Power arrives at 50% of cable animation (1.5s total cable duration)
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
    exit: {
      background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.95) 100%)",
      boxShadow: "inset 0 0 0 rgba(16, 185, 129, 0)",
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  // Sophisticated charger variants with entrance animation
  const chargerVariants = {
    initial: {
      scale: 0.6,
      opacity: 0,
      y: 20,
      rotateY: -15,
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    paused: {
      scale: 1,
      opacity: 1,
      y: 0,
      rotateY: 0,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
    animate: {
      scale: [1, 1.05, 1, 1.02, 1],
      y: 0,
      opacity: 1,
      rotateY: [0, 5, -2, 0],
      boxShadow: [
        "0 4px 12px rgba(0, 0, 0, 0.2)",
        "0 6px 20px rgba(16, 185, 129, 0.4), 0 0 15px rgba(16, 185, 129, 0.3)",
        "0 4px 16px rgba(16, 185, 129, 0.3), 0 0 20px rgba(16, 185, 129, 0.2)",
        "0 6px 18px rgba(16, 185, 129, 0.35), 0 0 18px rgba(16, 185, 129, 0.25)",
        "0 4px 12px rgba(0, 0, 0, 0.2)",
      ],
      transition: {
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    exit: {
      scale: 1,
      y: 0,
      opacity: 1,
      rotateY: 0,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  // Smooth cable power flow (from charger to phone) with entrance animation
  const cableVariants = {
    initial: {
      scaleY: 0,
      opacity: 0,
      background: "linear-gradient(180deg, #374151 0%, #1f2937 100%)",
      boxShadow: "0 0 0 rgba(16, 185, 129, 0), inset 0 2px 4px rgba(0, 0, 0, 0.3)",
    },
    paused: {
      scaleY: 1,
      opacity: 1,
      background: "linear-gradient(180deg, #374151 0%, #1f2937 100%)",
      boxShadow: "0 0 0 rgba(16, 185, 129, 0), inset 0 2px 4px rgba(0, 0, 0, 0.3)",
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
    animate: {
      scaleY: 1,
      opacity: 1,
      background: [
        "linear-gradient(180deg, #374151 0%, #1f2937 100%)",
        "linear-gradient(180deg, #374151 0%, #1f2937 70%, #10b981 100%)",
        "linear-gradient(180deg, #374151 0%, #10b981 50%, #1f2937 100%)",
        "linear-gradient(180deg, #10b981 0%, #374151 30%, #1f2937 100%)",
        "linear-gradient(180deg, #374151 0%, #1f2937 100%)",
      ],
      boxShadow: [
        "0 0 0 rgba(16, 185, 129, 0), inset 0 2px 4px rgba(0, 0, 0, 0.3)",
        "0 0 12px rgba(16, 185, 129, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.3)",
        "0 0 12px rgba(20, 184, 166, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.3)",
        "0 0 12px rgba(16, 185, 129, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.3)",
        "0 0 0 rgba(16, 185, 129, 0), inset 0 2px 4px rgba(0, 0, 0, 0.3)",
      ],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as const,
      },
    },
    exit: {
      scaleY: 1,
      opacity: 1,
      background: "linear-gradient(180deg, #374151 0%, #1f2937 100%)",
      boxShadow: "0 0 0 rgba(16, 185, 129, 0), inset 0 2px 4px rgba(0, 0, 0, 0.3)",
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  // Battery fill animation
  const batteryVariants = {
    paused: {
      width: "20%",
      backgroundColor: "#ef4444",
      boxShadow: "0 0 0 rgba(239, 68, 68, 0)",
    },
    animate: {
      width: ["20%", "45%", "70%", "100%", "100%", "20%"],
      backgroundColor: ["#ef4444", "#f97316", "#10b981", "#059669", "#059669", "#ef4444"],
      boxShadow: [
        "0 0 0 rgba(239, 68, 68, 0)",
        "0 0 8px rgba(249, 115, 22, 0.4)",
        "0 0 8px rgba(16, 185, 129, 0.4)",
        "0 0 12px rgba(5, 150, 105, 0.6)",
        "0 0 12px rgba(5, 150, 105, 0.6)",
        "0 0 0 rgba(239, 68, 68, 0)",
      ],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  // Okito SDK Development Icon
  const OkitoSDKIcon = () => {
    return (
      <motion.svg
        width="120"
        height="80"
        viewBox="0 0 120 80"
        fill="none"
        className="text-emerald-400"
        initial={{ opacity: 0, scale: 0, rotate: -5 }}
        animate={
          isCardHovered
            ? {
                opacity: 1,
                scale: 1,
                rotate: 0,
                filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.6))",
                transition: {
                  duration: 0.8,
                  delay: 1.0,
                  ease: [0.23, 1, 0.32, 1] as const,
                },
              }
            : {
                opacity: 0,
                scale: 0,
                rotate: -5,
                filter: "drop-shadow(0 0 0px rgba(16, 185, 129, 0))",
                transition: {
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1] as const,
                },
              }
        }
      >
        {/* Main Code Block */}
        <motion.rect
          x="10"
          y="20"
          width="60"
          height="40"
          rx="8"
          fill="rgba(16, 185, 129, 0.08)"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isCardHovered
              ? {
                  pathLength: 1,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    delay: 1.1,
                    ease: [0.4, 0, 0.2, 1] as const,
                  },
                }
              : {
                  pathLength: 0,
                  opacity: 0,
                }
          }
        />

        {/* Code Lines */}
        <motion.rect
          x="16"
          y="28"
          width="24"
          height="2"
          rx="1"
          fill="rgba(16, 185, 129, 0.6)"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            isCardHovered
              ? {
                  opacity: 1,
                  scaleX: 1,
                  transition: {
                    duration: 0.4,
                    delay: 1.3,
                    ease: "easeOut",
                  },
                }
              : {
                  opacity: 0,
                  scaleX: 0,
                }
          }
        />

        <motion.rect
          x="16"
          y="34"
          width="36"
          height="2"
          rx="1"
          fill="rgba(16, 185, 129, 0.4)"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            isCardHovered
              ? {
                  opacity: 1,
                  scaleX: 1,
                  transition: {
                    duration: 0.4,
                    delay: 1.4,
                    ease: "easeOut",
                  },
                }
              : {
                  opacity: 0,
                  scaleX: 0,
                }
          }
        />

        <motion.rect
          x="16"
          y="40"
          width="18"
          height="2"
          rx="1"
          fill="rgba(16, 185, 129, 0.5)"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            isCardHovered
              ? {
                  opacity: 1,
                  scaleX: 1,
                  transition: {
                    duration: 0.4,
                    delay: 1.5,
                    ease: "easeOut",
                  },
                }
              : {
                  opacity: 0,
                  scaleX: 0,
                }
          }
        />

        <motion.rect
          x="16"
          y="46"
          width="30"
          height="2"
          rx="1"
          fill="rgba(16, 185, 129, 0.4)"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            isCardHovered
              ? {
                  opacity: 1,
                  scaleX: 1,
                  transition: {
                    duration: 0.4,
                    delay: 1.6,
                    ease: "easeOut",
                  },
                }
              : {
                  opacity: 0,
                  scaleX: 0,
                }
          }
        />

        {/* Lightning Bolt (Speed/Power indicator) */}
        <motion.path
          d="M74 30 L82 22 L78 22 L84 14 L76 22 L80 22 L74 30 Z"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isCardHovered
              ? {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: 1.2,
                    ease: "easeOut",
                  },
                }
              : {
                  opacity: 0,
                  scale: 0,
                }
          }
        />

        {/* Connection Flow Arrow */}
        <motion.path
          d="M70 40 L88 40"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={
            isCardHovered
              ? {
                  pathLength: 1,
                  transition: {
                    duration: 0.5,
                    delay: 1.2,
                    ease: "easeOut",
                  },
                }
              : {
                  pathLength: 0,
                }
          }
        />

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="currentColor"
            />
          </marker>
        </defs>

        {/* Mobile Phone Icon */}
        <motion.rect
          x="90"
          y="25"
          width="20"
          height="30"
          rx="4"
          fill="rgba(16, 185, 129, 0.1)"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ opacity: 0, x: 85 }}
          animate={
            isCardHovered
              ? {
                  opacity: 1,
                  x: 90,
                  transition: {
                    duration: 0.4,
                    delay: 1.5,
                    ease: "easeOut",
                  },
                }
              : {
                  opacity: 0,
                  x: 85,
                }
          }
        />

        {/* Phone Screen */}
        <motion.rect
          x="93"
          y="29"
          width="14"
          height="18"
          rx="2"
          fill="rgba(16, 185, 129, 0.2)"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isCardHovered
              ? {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.4,
                    delay: 1.6,
                    ease: "easeOut",
                  },
                }
              : {
                  opacity: 0,
                  scale: 0,
                }
          }
        />

        {/* Success Indicator */}
        <motion.circle
          cx="100"
          cy="15"
          r="8"
          fill="rgba(34, 197, 94, 0.1)"
          stroke="rgb(34, 197, 94)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isCardHovered
              ? {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: 1.7,
                    ease: "easeOut",
                  },
                }
              : {
                  opacity: 0,
                  scale: 0,
                }
          }
        />

        {/* Checkmark */}
        <motion.path
          d="M96 15 L99 18 L104 13"
          stroke="rgb(34, 197, 94)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={
            isCardHovered
              ? {
                  pathLength: 1,
                  transition: {
                    duration: 0.6,
                    delay: 1.8,
                    ease: [0.4, 0, 0.2, 1] as const,
                  },
                }
              : {
                  pathLength: 0,
                }
          }
        />

        {/* Energy Flow Particles */}
        <motion.circle
          cx="76"
          cy="40"
          r="2"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={
            isCardHovered
              ? {
                  opacity: [0, 1, 0],
                  x: [0, 12, 0],
                  transition: {
                    duration: 1.5,
                    delay: 1.6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }
              : {
                  opacity: 0,
                }
          }
        />

        <motion.circle
          cx="80"
          cy="40"
          r="1.5"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={
            isCardHovered
              ? {
                  opacity: [0, 1, 0],
                  x: [0, 8, 0],
                  transition: {
                    duration: 1.5,
                    delay: 1.8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }
              : {
                  opacity: 0,
                }
          }
        />

        <motion.circle
          cx="84"
          cy="40"
          r="1"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={
            isCardHovered
              ? {
                  opacity: [0, 1, 0],
                  x: [0, 4, 0],
                  transition: {
                    duration: 1.5,
                    delay: 2.0,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }
              : {
                  opacity: 0,
                }
          }
        />
      </motion.svg>
    )
  }

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
      {/* Subtle background accents */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-transparent to-teal-950/20"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-emerald-500/5 to-transparent blur-2xl"></div>

      {/* Phone Container - Larger with overflow */}
      <motion.div
        className="absolute -top-24 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Phone Body */}
        <motion.div
          className="w-80 h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border-2 relative"
          initial="initial"
          animate={isCardHovered ? "animate" : "exit"}
          variants={phoneVariants}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Phone Screen */}
          <motion.div
            className="absolute inset-3 rounded-2xl overflow-hidden"
            initial="initial"
            animate={isCardHovered ? "animate" : "exit"}
            variants={phoneScreenVariants}
          >
            {/* Status Bar */}
            <motion.div 
              className="absolute top-3 left-3 right-3 flex justify-between items-center text-sm text-gray-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1 }}
            >
              <div className="text-xs">9:41</div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-3 border border-emerald-400 rounded-sm relative">
                  <motion.div
                    className="h-full rounded-sm"
                    variants={batteryVariants}
                    animate={isCardHovered ? "animate" : "paused"}
                  />
                  <div className="absolute -right-1 top-0.5 w-1 h-2 bg-emerald-400 rounded-r-sm"></div>
                </div>
              </div>
            </motion.div>

            {/* Okito SDK Development Icon */}
            <div 
              className="absolute top-0 left-0 transform pointer-events-none"
              style={{ 
                zIndex: 9999,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <OkitoSDKIcon />
            </div>
          </motion.div>
        </motion.div>

        {/* Charging Cable */}
        <motion.div
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-40 rounded-full origin-top"
          initial="initial"
          animate={isCardHovered ? "animate" : "exit"}
          variants={cableVariants}
        />

        {/* Charger Block */}
        <motion.div
          className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-34 w-12 h-8 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg"
          initial="initial"
          animate={isCardHovered ? "animate" : "exit"}
          variants={chargerVariants}
        >
          {/* Charger Prongs */}
          <motion.div 
            className="absolute top-1.5 left-1/2 transform -translate-x-1/2 flex gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <motion.div 
        className="absolute bottom-6 left-6 right-6 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full"></div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-white via-gray-50 to-white bg-clip-text text-transparent">
            Supercharge Your Development
          </h3>
        </div>
        <p className="text-gray-400/80 text-sm font-light">
          Build faster with Okito's powerful Solana toolkit
        </p>
      </motion.div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
    </motion.div>
  )
}