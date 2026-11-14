import type { Metadata } from 'next'
import { Jura } from 'next/font/google'
import './beatcoin.css'

const jura = Jura({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Beatcoin — Music NFT Marketplace',
  description: 'Génère, publie et achète des beats tokenisés sur Beatcoin.',
}

export default function BeatcoinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`beatcoin-app ${jura.className}`}>
      <header className="beatcoin-header">
        <div className="beatcoin-wrapper">
          <img
            className="beatcoin-logo"
            src="https://unrealnft.github.io/Demo-Beatcoin/logo.webp"
            alt="Beatcoin Logo"
          />
          <nav className="beatcoin-nav">
            <ul>
              <li><a href="/beatcoin"><i className="fas fa-home"></i> Home</a></li>
              <li><a href="/beatcoin/generate">Generator</a></li>
              <li><a href="/beatcoin/marketplace">Marketplace</a></li>
              <li><a href="/beatcoin/publish">Publish</a></li>
            </ul>
          </nav>
        </div>
      </header>
      {children}
    </div>
  )
}
