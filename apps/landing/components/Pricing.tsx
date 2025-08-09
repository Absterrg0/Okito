'use client'
import React, { useRef, useState } from 'react';
import { motion, useInView, Variants } from 'motion/react';
import { 
  Github, ArrowRight, Star, Heart,
} from 'lucide-react';
import Link from 'next/link';

const containerVariants:Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.8,
    },
  },
};

const itemVariants:Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const floatingVariants:Variants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 3, -3, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut"
    }
  }
};

export default function EnhancedPricing({id}:{id:string}) {
  const pricingRef = useRef(null);
  const isInViewPricing = useInView(pricingRef, { once: true, margin: "-100px" });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    "Complete TypeScript SDK with IntelliSense",
    "Unlimited transactions & rate limits",
    "Advanced wallet integration tools",
    "24/7 developer support community"
  ];

  const coreFeatures = [
    {
      title: "Lightning Fast Development",
      description: "Pre-built components and utilities that reduce development time by 80%. Get from idea to deployment in hours, not weeks.",
      highlight: "80% faster"
    },
    {
      title: "Production Ready",
      description: "Battle-tested code used by 50,000+ developers. Every component is optimized for performance and security.",
      highlight: "50k+ users"
    },
    {
      title: "Zero Configuration",
      description: "Smart defaults that work out of the box. Spend time building features, not wrestling with setup and configuration.",
      highlight: "Just works"
    }
  ];


  return (
    <section 
      id={id} 
      ref={pricingRef} 
      className="relative py-32 overflow-hidden"
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInViewPricing ? "visible" : "hidden"}
        className="container mx-auto px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants } className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-full px-6 py-3 mb-8"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-emerald-300 font-medium">Premium Quality, Zero Cost</span>
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Free 
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            The complete Solana development toolkit that doesn't compromise on quality. 
            Build faster, ship sooner, scale infinitely.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Pricing Card */}
          <motion.div 
            variants={itemVariants }
            className="relative group mb-16"
          >
            
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10">
              {/* Subtle floating elements */}
              <motion.div 
                variants={floatingVariants}
                animate="animate"
                className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-full blur-xl"
              />
              <motion.div 
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: "3s" }}
                className="absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 rounded-full blur-xl"
              />

              <div className="grid lg:grid-cols-2 gap-12 p-8 lg:p-12">
                
                {/* Left Side - Pricing */}
                <div className="space-y-6">
                  <div>
                    <div className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                      $0
                    </div>
                    <div className="text-xl text-slate-300 mb-2">Free sdk package available</div>
                    <div className="text-slate-400 text-sm">No credit card • No hidden fees • No gotchas</div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white mb-4">Everything included:</h3>
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ x: 4, scale: 1.02 }}
                        className="flex items-start space-x-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300 group/feature cursor-pointer"
                        onMouseEnter={() => setHoveredFeature(index as number)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <motion.div 
                          className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center mt-0.5 flex-shrink-0"
                          animate={hoveredFeature === index ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </motion.div>
                        <span className="text-slate-300 group-hover/feature:text-white transition-colors text-sm">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <Link href="https://docs.okito.dev">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-14 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold rounded-xl shadow-xl shadow-emerald-500/20 transition-all duration-300 relative overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center">
                      <Github className="h-5 w-5 mr-2" />
                      Start Building Now
                      <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                    </Link>
                </div>

                {/* Right Side - Value Props */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6">Why developers love it</h3>
                    
                    <div className="space-y-6">
                      {coreFeatures.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 + index * 0.2 }}
                          whileHover={{ scale: 1.02 }}
                          className="group cursor-pointer"
                        >
                          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-emerald-500/30 transition-all duration-300">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">
                                {feature.title}
                              </h4>
                              <span className="text-xs font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                {feature.highlight}
                              </span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

       
        </div>
      </motion.div>
    </section>
  );
}