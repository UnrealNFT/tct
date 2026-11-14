'use client'

import { useState } from 'react'

export default function BeatcoinGenerate() {
  const [tempo, setTempo] = useState(120)
  const [length, setLength] = useState(60)
  const [note, setNote] = useState('C')
  const [style, setStyle] = useState('Pop')

  return (
    <main className="beatcoin-section">
      <h2 className="text-center text-white text-2xl mb-6">Beat Generator</h2>
      <form className="beatcoin-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="tempo-range">Tempo (80 - 160): {tempo}</label>
        <input
          id="tempo-range"
          type="range"
          min={80}
          max={160}
          value={tempo}
          onChange={(e) => setTempo(Number(e.target.value))}
        />

        <label htmlFor="note-select">Choose a note:</label>
        <select id="note-select" value={note} onChange={(e) => setNote(e.target.value)}>
          {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label htmlFor="length-range">Length (10 - 180 sec): {length}</label>
        <input
          id="length-range"
          type="range"
          min={10}
          max={180}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />

        <label htmlFor="style-select">Choose a style:</label>
        <select id="style-select" value={style} onChange={(e) => setStyle(e.target.value)}>
          {['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Lo-Fi'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button type="submit" onClick={() => alert(`Generated: ${style} ${note} at ${tempo} BPM, ${length}s`)}>
          Generate Music
        </button>
      </form>
    </main>
  )
}
