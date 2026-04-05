"use client"

import { motion } from "motion/react"
import { Compass, Database, UserCheck, Settings, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const navItems = [
    { icon: Compass, label: "Dashboard", active: true },
    { icon: Database, label: "Knowledge Graph", active: false },
    { icon: UserCheck, label: "Roles & Skills", active: false },
    { icon: Settings, label: "Settings", active: false },
  ]

  return (
    <motion.aside 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-64 flex flex-col border-r border-[var(--glass-border)] bg-[#111827]/80 backdrop-blur-xl h-full p-6 relative z-10"
    >
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center text-white">
          <ShieldCheck size={20} />
        </div>
        <h2 className="font-['Outfit'] text-xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          CyberGuide.AI
        </h2>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item, idx) => {
          const Icon = item.icon
          return (
            <motion.a
              key={idx}
              href="#"
              whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-slate-400",
                item.active && "bg-gradient-to-r from-primary/20 to-transparent text-primary border-l-2 border-primary text-blue-400"
              )}
            >
              <Icon size={18} />
              {item.label}
            </motion.a>
          )
        })}
      </nav>

      {/* Status indicator */}
      <div className="flex items-center gap-2 p-4 bg-black/20 rounded-xl mt-auto">
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></div>
        <span className="text-xs text-slate-400 font-medium">IBM Orchestrate Active</span>
      </div>
    </motion.aside>
  )
}
