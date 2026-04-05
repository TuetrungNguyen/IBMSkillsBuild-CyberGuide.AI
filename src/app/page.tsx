"use client"

import { motion } from "motion/react"
import { Search } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import AgentChat from "@/components/AgentChat"
import KnowledgeGraph from "@/components/KnowledgeGraph"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <main className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
        <header className="flex justify-between items-center pb-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search cybersecurity domains, roles, or skills..." 
              className="bg-[#111827] border border-[var(--glass-border)] pl-12 pr-6 py-3 rounded-full w-[450px] text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-lg"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-transparent hover:border-primary transition-colors cursor-pointer overflow-hidden shadow-lg bg-slate-800 flex justify-center items-center">
               {/* Use dicebear for an avatar instead of ui-avatars due to next/image domains, or just use normal img */}
               <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Tuetrung" alt="User Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
          {/* Welcome Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 p-8 glass-panel border-l-4 border-l-accent relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--glass)] to-transparent z-0"></div>
            <div className="relative z-10">
              <h1 className="font-['Outfit'] text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                Map your path in Cybersecurity.
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl">
                Powered by IBM Orchestrate and Granite LLMs to intelligently connect tasks to your specific entry points in the cyber landscape.
              </p>
            </div>
          </motion.section>

          {/* Graph Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 h-full min-h-[400px]"
          >
            <KnowledgeGraph />
          </motion.section>

          {/* Chat Section */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
            className="h-full min-h-[400px]"
          >
            <AgentChat />
          </motion.section>
        </div>
      </main>
    </div>
  )
}
