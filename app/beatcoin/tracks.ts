export interface Track {
  id: string
  artist: string
  title: string
  description: string
  duration: string
  price: string
  image: string
  audio: string
}

export const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    artist: 'Minai',
    title: 'Natural Blues',
    description: 'Deep house vibes',
    duration: '3:42',
    price: '100 Nibi',
    image: 'https://unrealnft.github.io/Demo-Beatcoin/minai.jpg',
    audio: 'https://unrealnft.github.io/Demo-Beatcoin/minai2.mp3',
  },
  {
    id: '2',
    artist: 'FL951',
    title: 'FL951 Beat',
    description: 'Electronic instrumental',
    duration: '2:55',
    price: '50 Beatcoin',
    image: 'https://unrealnft.github.io/Demo-Beatcoin/fl951.jpg',
    audio: 'https://unrealnft.github.io/Demo-Beatcoin/when.mp3',
  },
]
