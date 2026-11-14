import { Duel } from './types'

export const sampleDuels: Duel[] = [
  {
    id: 'sample-1',
    question: 'Ton superpouvoir ultime :',
    optionA: 'Lire dans les pensées',
    optionB: 'Devenir invisible',
    votesA: 142,
    votesB: 89,
    createdAt: Date.now() - 1000 * 60 * 30,
    author: 'anon_fire',
    tags: ['superpowers'],
  },
  {
    id: 'sample-2',
    question: 'Pour 1 000 000 € tu devrais :',
    optionA: 'Ne plus jamais utiliser de tel',
    optionB: 'Ne plus jamais sortir de chez toi',
    votesA: 67,
    votesB: 201,
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    author: 'moneybag',
    tags: ['money'],
  },
  {
    id: 'sample-3',
    question: 'Dans une apocalypse zombie tu prends :',
    optionA: 'Un katana',
    optionB: 'Un fusil à pompe',
    votesA: 312,
    votesB: 156,
    createdAt: Date.now() - 1000 * 60 * 15,
    author: 'zombieking',
    tags: ['apocalypse'],
  },
]
