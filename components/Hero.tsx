'use client'

import { motion } from 'framer-motion'
import { Flame, Zap, Trophy } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 text-center px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-viral-purple/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-viral-pink/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-viral-card border border-white/10 px-4 py-1.5 text-sm text-viral-pink mb-6">
          <Flame size={16} /> trending now
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-viral-cyan via-viral-purple to-viral-pink bg-clip-text text-transparent">
          TCT — The Next<br />Viral Thing
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Crée des duels impossibles, fais voter le monde, découvre ce qui rend les gens fous.
          Un seul clic peut te rendre viral.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#create"
            className="inline-flex items-center gap-2 rounded-xl bg-white text-viral-black px-6 py-3 font-bold hover:scale-105 transition"
          >
            <Zap size={20} /> Créer un duel
          </a>
          <a
            href="#feed"
            className="inline-flex items-center gap-2 rounded-xl bg-viral-card border border-white/10 px-6 py-3 font-bold hover:border-viral-purple transition"
          >
            <Trophy size={20} /> Voter maintenant
          </a>
        </div>
      </motion.div>
    </section>
  )
}
