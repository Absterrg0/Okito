'use client'
import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, Variants } from 'motion/react';
import { Plus, Minus, MessageCircle, Github, ArrowRight } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function FAQ({id}:{id:string}) {
  const faqRef = useRef(null);
  const isInViewFaq = useInView(faqRef, { once: true, margin: "-100px" });
  const [openItem, setOpenItem] = useState<string | null>(null);

  const faqs = [
    {
      id: "what-is-okito",
      question: "What is Okito and how does it work?",
      answer: "Okito is a comprehensive development platform for Solana blockchain applications. It provides two main packages: @okito/sdk for core blockchain functions like token creation and wallet management, and @okito/ui (coming soon) for pre-built React components. Our SDK abstracts complex Solana operations into simple, elegant APIs that developers can use to build powerful dApps quickly.",
    },
    {
      id: "is-it-really-free",
      question: "Is Okito really completely free?",
      answer: "Yes, absolutely! Okito is 100% free and open source under the MIT license. There are no hidden costs, premium tiers, or feature limitations. We believe powerful developer tools should be accessible to everyone, regardless of budget. You can use Okito for personal projects, commercial applications, or anything in between without any restrictions.",
    },
    {
      id: "getting-started",
      question: "How do I get started with Okito?",
      answer: "Getting started is simple! Install the SDK with 'npm install @okito/sdk', import the functions you need, and start building. Our documentation provides comprehensive guides, code examples, and tutorials to help you create your first token or dApp in minutes. You can also check out our GitHub repository for example projects and community contributions.",
    },
    {
      id: "token-creation",
      question: "Can I create custom tokens with advanced features?",
      answer: "Okito supports creating SPL tokens with custom metadata, supply controls, freeze authority, mint authority, and more. You can configure decimals, create tokens with fixed or unlimited supply, add custom metadata including images and descriptions, and implement advanced tokenomics. Our SDK handles all the complex Solana Program Library interactions for you.",

    },
    {
      id: "ui-package",
      question: "When will the UI package be available?",
      answer: "The @okito/ui package is currently in development and will be released soon. It will include pre-built React components for wallet connections, token displays, transaction forms, balance cards, and more. All components will follow the same design principles as our landing page - modern, accessible, and highly customizable. Join our community to get early access!",
    },
    {
      id: "production-ready",
      question: "Is Okito production-ready and secure?",
      answer: "Yes! Okito is built with production use in mind. We implement enterprise-grade security practices, comprehensive error handling, intelligent retry logic, and extensive testing. The SDK includes features like connection pooling, automatic failover, transaction confirmation, and detailed logging. Many developers are already using Okito in production applications.",
    },
    {
      id: "support-community",
      question: "What kind of support and community does Okito have?",
      answer: "Okito has a growing community of developers building on Solana. You can get support through our GitHub issues, join discussions in our community forums, and contribute to the project. We also provide comprehensive documentation, video tutorials, and example projects. As an open-source project, community contributions and feedback help make Okito better for everyone.",
    }
  ];

  const toggleItem = (id:string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id={id} ref={faqRef} className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      
      {/* Floating gradient orbs */}
     
      <motion.div 
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInViewFaq ? "visible" : "hidden"}
        className="container mx-auto px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants as Variants} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
          >
            <MessageCircle className="h-4 w-4 mr-2 text-emerald-400" />
            <span className="text-emerald-300 font-medium">Frequently Asked Questions</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Got <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">questions?</span>
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Everything you need to know about Okito and getting started with Solana development
          </p>
        </motion.div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants as Variants} className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300">
                  {/* Question Header */}
                  <motion.button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left hover:bg-white/5 transition-all duration-300 group"
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        {/* Category Badge */}
                     
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>
                      
                      {/* Toggle Icon */}
                      <motion.div
                        animate={{ rotate: openItem === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-shrink-0 ml-4"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                          {openItem === faq.id ? (
                            <Minus className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Plus className="h-4 w-4 text-emerald-400" />
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </motion.button>

                  {/* Answer Content */}
                  <AnimatePresence>
                    {openItem === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          ease: [0.23, 1, 0.32, 1]
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: -20 }}
                          animate={{ y: 0 }}
                          exit={{ y: -20 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="px-6 pb-6"
                        >
                          <div className="border-t border-white/5 pt-6">
                            <p className="text-slate-300 leading-relaxed text-base">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            variants={itemVariants as Variants}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Join our community of developers building the future of Solana. 
                Get help, share ideas, and contribute to the project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href={"https://x.com/OkitoLabs"}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300 flex items-center group"
                  >
                  <FaXTwitter className="h-5 w-5 mr-2" />
                  Ask Questions 
                </motion.button>
                  </Link>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                >
                  View Documentation
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}