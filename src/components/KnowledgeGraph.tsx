"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

export default function KnowledgeGraph() {
  const [nodes, setNodes] = useState<Node[]>([])

  // Generate random nodes on mount to avoid hydration mismatch
  useEffect(() => {
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
    const newNodes = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10% to 90%
      y: Math.random() * 80 + 10,
      size: Math.random() * 12 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2
    }))
    setNodes(newNodes)
  }, [])

  return (
    <div className="glass-panel flex flex-col h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 z-0" />
      
      <div className="p-4 flex items-center justify-between border-b border-[var(--glass-border)] relative z-10">
        <h3 className="font-semibold text-slate-200">Landscape Mapping</h3>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
          Vector DB Connected
        </span>
      </div>

      <div className="flex-1 relative flex items-center justify-center p-4">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.8, 
              scale: 1,
              y: [0, -15, 0],
              x: [0, Math.random() * 10 - 5, 0]
            }}
            transition={{
              y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: node.delay },
              x: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: node.delay },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 }
            }}
            whileHover={{ scale: 2, opacity: 1, zIndex: 50, transition: { duration: 0.2 } }}
            className="absolute rounded-full cursor-pointer"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
              backgroundColor: node.color,
              boxShadow: `0 0 ${node.size * 2}px ${node.color}`
            }}
          />
        ))}
        
        <div className="relative z-20 pointer-events-none flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-300 flex items-center gap-2"
            style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.3))" }}
          >
            Interactive Domain Graph
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-slate-400 mt-2"
          >
             Roles · Skills · Tools
          </motion.p>
        </div>
      </div>
    </div>
  )
}
