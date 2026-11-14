import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TCT — The Next Viral Thing',
  description: 'Crée des duels, fais voter le monde, deviens viral.',
  openGraph: {
    title: 'TCT 🔥',
    description: 'Vote sur les duels les plus fous ou crée le tien.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
