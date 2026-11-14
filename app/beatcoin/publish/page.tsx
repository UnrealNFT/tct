'use client'

import { useRef, useState } from 'react'

export default function BeatcoinPublish() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [duration, setDuration] = useState('')

  const calculateDuration = () => {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const audio = new Audio(url)
    audio.onloadedmetadata = () => {
      setDuration(Math.floor(audio.duration / 60).toString())
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Song submitted! (mock)')
  }

  return (
    <main className="beatcoin-section">
      <h2 className="text-center text-white text-2xl mb-6">Publish Your Song</h2>
      <form className="beatcoin-form" onSubmit={submit}>
        <label htmlFor="title">Title:</label>
        <input id="title" type="text" required />

        <label htmlFor="artist_name">Artist Name:</label>
        <input id="artist_name" type="text" required />

        <label htmlFor="album">Album:</label>
        <input id="album" type="text" />

        <label htmlFor="style">Style:</label>
        <input id="style" type="text" required />

        <label htmlFor="price">Price:</label>
        <input id="price" type="text" required />

        <label htmlFor="currency">Currency:</label>
        <select id="currency" required>
          <option value="Beatc">$Beatc</option>
          <option value="NIBI">$NIBI</option>
        </select>

        <label htmlFor="file">Select file:</label>
        <input
          id="file"
          ref={fileRef}
          type="file"
          accept="audio/*"
          required
          onChange={calculateDuration}
        />

        <input type="hidden" value={duration} readOnly />

        <button type="submit">Publish</button>
      </form>
    </main>
  )
}
