export interface Duel {
  id: string
  question: string
  optionA: string
  optionB: string
  votesA: number
  votesB: number
  createdAt: number
  author: string
  tags: string[]
}
