'use client'

import { useState } from 'react'
import WorldMap from '../components/worldMap'
import AuthorInfo from '../components/authorInfo'
import ExcerptAnalysis from '../components/excerptAnalysis'
import { Author } from '../types/Author'

const authors: Author[] = [
  {
    id: 1,
    name: "Gabriel García Márquez",
    country: "Colombia",
    coordinates: [-74, 4],
    bio: "Gabriel García Márquez was a Colombian novelist, short-story writer, screenwriter, and journalist, known affectionately as Gabo throughout Latin America.",
    excerpt: "Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.",
    analysis: "This opening line from 'One Hundred Years of Solitude' immediately captivates the reader with its non-linear narrative structure, blending past, present, and future.",
    picture: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 2,
    name: "Haruki Murakami",
    country: "Japan",
    coordinates: [139, 35],
    bio: "Haruki Murakami is a Japanese writer. His novels, essays, and short stories have been bestsellers in Japan as well as internationally.",
    excerpt: "The wind-up bird Chronicle",
    analysis: "Murakami's surrealist style often blends the mundane with the extraordinary, creating a dreamlike atmosphere that challenges readers' perceptions of reality.",
    picture: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 3,
    name: "Chimamanda Ngozi Adichie",
    country: "Nigeria",
    coordinates: [8, 9],
    bio: "Chimamanda Ngozi Adichie is a Nigerian writer whose works range from novels to short stories to nonfiction.",
    excerpt: "The thing about cross-cultural relationships is that you spend so much time explaining. My ex-boyfriend and I spent a lot of time explaining.",
    analysis: "This excerpt from 'Americanah' highlights Adichie's keen observations on cultural differences and the complexities of relationships across different backgrounds.",
    picture: "/placeholder.svg?height=200&width=200"
  }
]

export default function Home() {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null)

  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center py-8">Literature Around the World</h1>
      <WorldMap authors={authors} onSelectAuthor={setSelectedAuthor} />
      {selectedAuthor && (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
          <AuthorInfo author={selectedAuthor} />
          <div className="my-6 border-t border-gray-200"></div>
          <ExcerptAnalysis excerpt={selectedAuthor.excerpt} analysis={selectedAuthor.analysis} />
        </div>
      )}
    </main>
  )
}

