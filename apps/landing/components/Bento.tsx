'use client'
import React, { useState, useRef } from "react"
import { motion, useInView } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { containerVariants, itemVariants } from "./variants"
import Card1 from "./card-1"
import Card2 from "./card-2"
import Card3 from "./card-3"
import Card4 from "./card-4"
import Card5 from "./card-5"

export default function Bento({id}:{id:string}) {
  const featuresRef = useRef<HTMLDivElement>(null)
  const isInViewFeatures = useInView(featuresRef, { 
    once: true, // Only trigger once
    margin: "-100px 0px -100px 0px" // Trigger earlier
  })

  const [activeTab, setActiveTab] = useState("create")

  return (
    <div id={id} className="hidden lg:block">
      <section ref={featuresRef} className="relative py-32">
        <div className="absolute inset-0" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInViewFeatures ? "visible" : "hidden"}
          className="container mx-auto px-4 lg:px-6 relative"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 rounded-full px-4 py-2 mb-6">
              Powerful Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">Built for modern developers</h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Every feature designed with performance, security, and developer experience in mind
            </p>
          </motion.div>
          
          <div className="mx-auto w-[82rem] grid grid-cols-6 gap-4">
            <div className="col-span-3">
              <Card1 />
            </div>
            <div className="col-span-3">
              <Card2 />
            </div>
            <div className="col-span-2">
              <Card3 />
            </div>
            <div className="col-span-2">
              <Card4 />
            </div>
            <div className="col-span-2">
              <Card5 />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
