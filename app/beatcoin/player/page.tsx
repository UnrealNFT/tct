'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { MOCK_TRACKS } from '../tracks'

function PlayerInner() {
  const params = useSearchParams()
  const id = params.get('id') || '1'
  const track = MOCK_TRACKS.find((t) => t.id === id) || MOCK_TRACKS[0]

  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [current, setCurrent] = useState('0:00')
  const [duration, setDuration] = useState('0:00')

  const formatTime = (num: number) => {
    if (!isFinite(num) || isNaN(num)) return '0:00'
    const seconds = Math.floor(num)
    const m = Math.floor(seconds / 60)
    const s = String(seconds % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoaded = () => setDuration(formatTime(audio.duration))
    const onTime = () => {
      setCurrent(formatTime(audio.currentTime))
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }
    const onEnded = () => setPlaying(false)

    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
    }
  }, [track.audio])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audio.currentTime = pct * audio.duration
  }

  return (
    <main className="beatcoin-section">
      <div className="player-card">
        <audio ref={audioRef} src={track.audio} preload="metadata" />
        <div className="player-cover">
          <img src={track.image} alt={track.title} />
        </div>
        <h2 className="text-white text-xl">{track.title}</h2>
        <p className="text-gray-300">{track.artist}</p>
        <p className="text-sm text-gray-400 mt-2">{track.description}</p>

        <div className="timeline" onClick={seek}>
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="time-row">
          <span>{current}</span>
          <span>{duration}</span>
        </div>

        <div className="player-controls">
          <button>
            <i className="fas fa-backward"></i>
          </button>
          <button className="play-btn" onClick={toggle}>
            <i className={playing ? 'fas fa-pause' : 'fas fa-play'}></i>
          </button>
          <button>
            <i className="fas fa-forward"></i>
          </button>
        </div>

        <p className="text-green-400 font-bold mt-4">{track.price}</p>
      </div>
    </main>
  )
}

export default function BeatcoinPlayer() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading player…</div>}>
      <PlayerInner />
    </Suspense>
  )
}
