'use client'

import { useState } from 'react'

export default function BeatcoinHome() {
  const [fav, setFav] = useState(false)

  const buy = () => {
    const useNibi = window.confirm('Do you want to buy "Midnight Wave" with Nibi or Beatcoin? (OK = Nibi, Cancel = Beatcoin)')
    alert(useNibi ? 'Purchased with Nibi' : 'Purchased with Beatcoin')
  }

  return (
    <main className="beatcoin-section">
      <div className="beatcoin-trending">
        <h2>Trending Songs</h2>
        <div>
          <h5>Current Price</h5>
          <span>100 Nibi or 50 Beatcoin</span>
        </div>
        <div>
          <h5>Auction Ending in</h5>
          <span>05h:25m:46s</span>
        </div>
        <span className="artist-name">
          <img
            src="https://yudiz.com/codepen/nft-store/user-pic1.svg"
            alt="artist-image"
            width="32"
            height="32"
          />
          Artist Name
        </span>
        <div className="music-actions">
          <button className="btn-heart" onClick={() => setFav(!fav)}>
            <i className={fav ? 'fas fa-heart' : 'far fa-heart'}></i>{' '}
            {fav ? 'Favorited' : 'Add to Favorites'}
          </button>
          <button className="btn-buy" onClick={buy}>Buy Now</button>
        </div>
      </div>

      <section className="text-center mt-10">
        <h3 className="text-white text-xl mb-4">Discover Beats</h3>
        <p className="mb-6">Generate your own track, publish it and sell it on the marketplace.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/beatcoin/generate" className="btn-buy inline-block">Generate</a>
          <a href="/beatcoin/marketplace" className="btn-heart inline-block">Marketplace</a>
        </div>
      </section>
    </main>
  )
}
