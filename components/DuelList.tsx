'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Share2, Clock } from 'lucide-react'
import { Duel } from '@/lib/types'
import { getDuels, voteDuel, getVotes } from '@/lib/storage'
import { sampleDuels } from '@/lib/sampleData'

interface Props {
  refresh?: number
}

function timeLeft(createdAt: number) {
  const end = createdAt + 24 * 60 * 60 * 1000
  const diff = end - Date.now()
  if (diff <= 0) return 'expiré'
  const h = Math.floor(diff / 1000 / 60 / 60)
  const m = Math.floor((diff / 1000 / 60) % 60)
  return `${h}h ${m}m`
}

export default function DuelList({ refresh }: Props) {
  const [duels, setDuels] = useState<Duel[]>([])
  const [votes, setVotes] = useState<Record<string, 'A' | 'B'>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = getDuels()
    const all = stored.length ? stored : sampleDuels
    if (!stored.length) {
      localStorage.setItem('tct_duels', JSON.stringify(sampleDuels))
    }
    setDuels(all)
    setVotes(getVotes())
  }, [refresh])

  const handleVote = (id: string, option: 'A' | 'B') => {
    voteDuel(id, option)
    setDuels(getDuels())
    setVotes(getVotes())
  }

  const handleShare = async (duel: Duel) => {
    const text = `${duel.question}\nA: ${duel.optionA}\nB: ${duel.optionB}\nVote sur TCT 🔥`
    if (navigator.share) {
      await navigator.share({ title: 'TCT Duel', text, url: window.location.href })
    } else {
      await navigator.clipboard.writeText(text + ' ' + window.location.href)
      alert('Lien copié dans le presse-papiers !')
    }
  }

  if (!mounted) return null

  return (
    <section id="feed" className="py-16 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-2">
        <Flame className="text-orange-500" /> Duels en cours
      </h2>
      <AnimatePresence>
        {duels.map((duel) => {
          const total = duel.votesA + duel.votesB || 1
          const pctA = Math.round((duel.votesA / total) * 100)
          const pctB = Math.round((duel.votesB / total) * 100)
          const voted = votes[duel.id]

          return (
            <motion.div
              key={duel.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-6 rounded-3xl bg-viral-card border border-white/5 p-6 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{duel.question}</h3>
                  <p className="text-sm text-gray-500">par @{duel.author}</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-gray-400 bg-viral-black rounded-full px-3 py-1">
                  <Clock size={12} /> {timeLeft(duel.createdAt)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  onClick={() => handleVote(duel.id, 'A')}
                  disabled={!!voted}
                  className={`relative rounded-2xl p-4 text-left font-bold transition overflow-hidden ${
                    voted === 'A'
                      ? 'ring-2 ring-viral-cyan bg-viral-cyan/10'
                      : 'bg-viral-black hover:bg-white/5'
                  }`}
                >
                  <div className="relative z-10">
                    <div className="text-sm text-gray-400 mb-1">Option A</div>
                    {duel.optionA}
                    <div className="mt-2 text-viral-cyan">{pctA}%</div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-viral-cyan transition-all"
                    style={{ width: `${pctA}%` }}
                  />
                </button>

                <button
                  onClick={() => handleVote(duel.id, 'B')}
                  disabled={!!voted}
                  className={`relative rounded-2xl p-4 text-left font-bold transition overflow-hidden ${
                    voted === 'B'
                      ? 'ring-2 ring-viral-pink bg-viral-pink/10'
                      : 'bg-viral-black hover:bg-white/5'
                  }`}
                >
                  <div className="relative z-10">
                    <div className="text-sm text-gray-400 mb-1">Option B</div>
                    {duel.optionB}
                    <div className="mt-2 text-viral-pink">{pctB}%</div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-viral-pink transition-all"
                    style={{ width: `${pctB}%` }}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{total} votes</span>
                <button
                  onClick={() => handleShare(duel)}
                  className="flex items-center gap-1 text-viral-lime hover:underline"
                >
                  <Share2 size={14} /> Partager
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </section>
  )
}
