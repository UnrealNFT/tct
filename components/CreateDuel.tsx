'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { createDuel } from '@/lib/storage'
import { Duel } from '@/lib/types'
import { generateId } from '@/lib/utils'

interface Props {
  onCreated: () => void
}

export default function CreateDuel({ onCreated }: Props) {
  const [question, setQuestion] = useState('')
  const [optionA, setOptionA] = useState('')
  const [optionB, setOptionB] = useState('')
  const [author, setAuthor] = useState('')

  const placeholders = [
    { q: 'Tu es bloqué 1 an avec :', a: 'Un sosie parfait de toi', b: 'Ton ex' },
    { q: 'Tu dois manger ça tous les jours :', a: 'Pizza froide', b: 'Sushis chauds' },
    { q: 'Tu gagnes 100k€ mais tu dois :', a: 'Parler en rimes', b: 'Ne plus jamais mentir' },
  ]

  const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || !optionA.trim() || !optionB.trim()) return

    const duel: Duel = {
      id: generateId(),
      question: question.trim(),
      optionA: optionA.trim(),
      optionB: optionB.trim(),
      votesA: 0,
      votesB: 0,
      createdAt: Date.now(),
      author: author.trim() || 'anonymous',
      tags: ['viral'],
    }

    createDuel(duel)
    setQuestion('')
    setOptionA('')
    setOptionB('')
    setAuthor('')
    onCreated()
  }

  return (
    <section id="create" className="py-16 px-4">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-viral-purple/20 to-viral-pink/20 p-1"
        >
          <div className="rounded-[22px] bg-viral-card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="text-viral-lime" /> Crée ton duel viral
            </h2>
            <p className="text-gray-400 mb-6">
              Pose une question impossible et regarde le chaos s&apos;installer.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={randomPlaceholder.q}
                className="w-full rounded-xl bg-viral-black border border-white/10 p-4 focus:border-viral-purple outline-none transition"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  placeholder={randomPlaceholder.a}
                  className="w-full rounded-xl bg-viral-black border border-white/10 p-4 focus:border-viral-cyan outline-none transition"
                />
                <input
                  required
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  placeholder={randomPlaceholder.b}
                  className="w-full rounded-xl bg-viral-black border border-white/10 p-4 focus:border-viral-pink outline-none transition"
                />
              </div>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ton pseudo (optionnel)"
                className="w-full rounded-xl bg-viral-black border border-white/10 p-4 focus:border-viral-lime outline-none transition"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-viral-purple to-viral-pink font-bold py-4 hover:opacity-90 transition active:scale-95"
              >
                Publier et devenir viral 🔥
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
