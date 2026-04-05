"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "system"
  content: string
}

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "1", 
      role: "system", 
      content: "Hello! I'm your CyberGuide Agent. I can help interpret the messy path of entry into cybersecurity. What's your background?" 
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate Agent logic
    setTimeout(() => {
      const responses = [
        "That's interesting. I can map those skills to the 'Security Architect' domain.",
        "Based on the vector database query, your background strongly aligns with Penetration Testing.",
        "Let me query the Knowledge Graph. I see a connection between your experience and Cloud Security roles.",
        "I'm orchestrating a workflow to analyze the best entry point for you..."
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "system", content: randomResponse }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="glass-panel flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-[var(--glass-border)] flex items-center justify-between bg-black/20">
        <h3 className="font-semibold flex items-center gap-2">
          <Bot size={18} className="text-primary" />
          Cyber Career Agent
        </h3>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
          LLM Ready
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={cn("flex gap-3 max-w-[90%]", msg.role === "user" ? "ml-auto flex-row-reverse" : "")}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                msg.role === "user" ? "bg-slate-600" : "bg-gradient-to-br from-primary to-accent"
              )}>
                {msg.role === "user" ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
              </div>
              <div className={cn(
                "p-3 rounded-2xl text-sm leading-relaxed",
                msg.role === "user" 
                  ? "bg-primary/20 border border-primary/30 rounded-tr-sm text-blue-50" 
                  : "bg-white/5 border border-white/10 rounded-tl-sm text-slate-200"
              )}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 max-w-[90%]"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={14} className="text-white" />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex items-center gap-1">
                <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-black/20 border-t border-[var(--glass-border)]">
        <div className="flex gap-2 relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Tell me about your current skills..." 
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent/70 transition-colors"
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 top-2 bottom-2 bg-primary text-white p-2 w-10 h-auto rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          >
            <Send size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
