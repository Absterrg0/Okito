'use client'

import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const navItems = [
    { name: "Packages", href: "packages" },
    { name: "Features", href: "bento" },
    { name: "Pricing", href: "pricing" },
    { name: "FAQ", href: "faq" }
  ];

  const handleScroll = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: `#${id}`,
      ease: "power2.inOut",
      offsetY: 60, 
    });
  };



  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4"
    >
      <div className="liquid-glass-nav rounded-full px-6 py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-full"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-green-500/10 rounded-full"></div>
        <div className="absolute inset-0 border border-white/20 rounded-full shadow-2xl shadow-black/20"></div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />

        <div className="relative flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 cursor-pointer">
            <motion.div
              initial={{ scale: 0, }}
              animate={{ scale: 1, }}
              transition={{ delay: 0.2, duration: 0.6 }}
              onClick={() => handleScroll('hero')}
            >
              <Image
                src={'/image.png'}
                alt='logo'
                width={80}
                height={80}
                className="shadow-lg"
                priority
                quality={95}
              />
            </motion.div>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
              >
                <button
                  onClick={() => handleScroll(item.href)}
                  className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-xs group focus:outline-none"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r rounded-full from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center space-x-4"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="https://github.com/Absterrg0/Okito" className="text-gray-300 hover:text-white transition-colors duration-300">
                <Github className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Link href="https://docs.okito.dev">
              <Button className="group relative overflow-hidden bg-gradient-to-t from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/30 transition-all duration-300 text-sm px-6 py-3 rounded-full border border-emerald-700/90">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/10 to-white/0"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300" />
                </span>
              </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}