'use client'

import React from 'react';
import { motion } from 'motion/react';
import { Code2, Github, Twitter, MessageCircle, ArrowRight, Heart, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TextHoverEffect } from './ui/text-hover-effect';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer({id}:{id:string}) {
  return (
    <div id={id} className='relative mt-64'>
      <div className='absolute inset-0 -top-160 z-0 '>
        <TextHoverEffect  
          text="OKITO"
          duration={5}
        />
      </div>
      
      <footer className="relative z-10 backdrop-blur-md">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
        <div className="absolute inset-0 pointer-events-none" style={{
          maskImage: "linear-gradient(to top, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 80%, transparent 100%)",
          opacity: 0.08
        }}>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,.08)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        
        {/* Floating gradient orbs */}
        <motion.div 
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-20 right-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/5 to-teal-500/5 rounded-full blur-3xl"
        />

        <div className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            
            {/* Main Footer Content */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
              
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div 
                  className="flex items-center space-x-3"
                >
                  <Image
                    src="/image.png"
                    alt="Okito Logo"
                    width={100}
                    height={100}
                  ></Image>
                </motion.div>
                
                <p className="text-slate-300 leading-relaxed text-lg max-w-md">
                  The most elegant way to build on Solana. Open source, free forever, 
                  and built by developers for developers.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-3">
                  {[
                    { icon: Github, href: "https://github.com/Absterrg0/Okito", label: "GitHub", color: "hover:text-white" },
                    { icon: FaXTwitter, href: "https://x.com/OkitoLabs", label: "X", color: "hover:text-gray-200" },
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 hover:border-emerald-500/30`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-white font-semibold text-xl">Quick Links</h4>
                <ul className="space-y-4">
                  {[
                    { name: "Documentation", href: "https://docs.okito.dev" },
                    { name: "Get Started", href: "https://docs.okito.dev/gettingStarted" },
                    { name: "Packages", href: "https://docs.okito.dev/sdk" },
                  ].map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-emerald-400 transition-all duration-300 flex items-center group"
                      >
                        <ArrowRight className="h-3 w-3 mr-3 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-6">
                <h4 className="text-white font-semibold text-xl">Resources</h4>
                <ul className="space-y-4">
                  {[
                    { name: "Community", href: "https://x.com/OkitoLabs" },
                    { name: "Blog", href: "#" },
                    { name: "Support", href: "https://x.com/notabbytwt" },
                  ].map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-emerald-400 transition-all duration-300 flex items-center group"
                      >
                        <ArrowRight className="h-3 w-3 mr-3 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Section */}


            {/* Bottom Footer */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 text-slate-400 text-sm">
                  <span>&copy; {new Date().getFullYear()} Okito. All rights reserved.</span>
                  <div className="flex items-center gap-6">
                    {['Privacy', 'Terms', 'License'].map((item) => (
                      <Link 
                        key={item}
                        href="#" 
                        className="hover:text-emerald-400 transition-colors duration-300"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Status Indicator */}
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                  />
                  <span className="text-emerald-400 text-sm font-medium">All Systems Operational</span>
                </div>
              </div>
            </div>

            {/* Built with love section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-8"
            >
              <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
                <span>Built for</span>
                <Image src="/solana.png" alt="Solana" width={20} height={20} />
                
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}