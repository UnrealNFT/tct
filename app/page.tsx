'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import CreateDuel from '@/components/CreateDuel'
import DuelList from '@/components/DuelList'
import Leaderboard from '@/components/Leaderboard'
import Footer from '@/components/Footer'

export default function Home() {
  const [refresh, setRefresh] = useState(0)

  return (
    <main className="min-h-screen">
      <Hero />
      <CreateDuel onCreated={() => setRefresh((r) => r + 1)} />
      <Leaderboard refresh={refresh} />
      <DuelList refresh={refresh} />
      <Footer />
    </main>
  )
}
