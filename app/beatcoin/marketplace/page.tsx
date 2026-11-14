'use client'

import { useMemo, useState } from 'react'
import { MOCK_TRACKS } from '../tracks'

export default function BeatcoinMarketplace() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return MOCK_TRACKS.filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  return (
    <main className="beatcoin-section">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-white text-2xl">Marketplace</h2>
        <div className="search-box">
          <i className="fa fa-search text-gray-300"></i>
          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="market-grid mt-6">
        {filtered.map((track) => (
          <a key={track.id} href={`/beatcoin/player?id=${track.id}`} className="market-card">
            <img src={track.image} alt={track.title} />
            <h3>{track.artist}</h3>
            <h3>{track.title}</h3>
            <p className="text-sm text-gray-400">{track.description}</p>
            <p className="price">{track.price}</p>
          </a>
        ))}
      </div>
    </main>
  )
}
