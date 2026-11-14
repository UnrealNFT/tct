'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Crown } from 'lucide-react'
import { Duel } from '@/lib/types'
import { getDuels } from '@/lib/storage'

interface Props {
  refresh?: number
}

export default function Leaderboard({ refresh }: Props) {
  const [duels, setDuels] = useState<Duel[]>([])

  useEffect(() => {
    const all = getDuels().sort((a, b) => b.votesA + b.votesB - (a.votesA + a.votesB))
    setDuels(all.slice(0, 5))
  }, [refresh])

  if (!duels.length) return null

  return (
    <section id="leaderboard" className="py-16 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-2">
        <Trophy className="text-yellow-400" /> Top viral
      </h2>
      <div className="space-y-3">
        {duels.map((duel, i) => (
          <motion.div
            key={duel.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 rounded-2xl bg-viral-card border border-white/5 p-4"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-viral-purple to-viral-pink flex items-center justify-center font-black">
              {i === 0 ? <Crown size={18} /> : i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate">{duel.question}</p>
              <p className="text-xs text-gray-500">@{duel.author}</p>
            </div>
            <div className="text-right">
              <p className="font-black text-viral-lime">{duel.votesA + duel.votesB}</p>
              <p className="text-xs text-gray-500">votes</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
