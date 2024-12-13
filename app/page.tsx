'use client'

import { useState } from 'react'
import WorldMap from '../components/worldMap'
import AuthorInfo from '../components/authorInfo'
import ExcerptAnalysis from '../components/excerptAnalysis'
import { Author } from '../types/Author'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const authors: Author[] = [
  {
    id: 1,
    name: "Gabriel García Márquez",
    country: "Colombia",
    coordinates: [-74, 4],
    bio: "Gabriel García Márquez was a Colombian novelist, short-story writer, screenwriter, and journalist, known affectionately as Gabo throughout Latin America.",
    excerpt: "Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.",
    analysis: "This opening line from 'One Hundred Years of Solitude' immediately captivates the reader with its non-linear narrative structure, blending past, present, and future.",
    picture: "/200x200.svg"
  },
  {
    id: 2,
    name: "Haruki Murakami",
    country: "Japan",
    coordinates: [139, 35],
    bio: "Haruki Murakami is a Japanese writer. His novels, essays, and short stories have been bestsellers in Japan as well as internationally.",
    excerpt: "The wind-up bird Chronicle",
    analysis: "Murakami's surrealist style often blends the mundane with the extraordinary, creating a dreamlike atmosphere that challenges readers' perceptions of reality.",
    picture: "/200x200.svg"
  },
  {
    id: 3,
    name: "Chimamanda Ngozi Adichie",
    country: "Nigeria",
    coordinates: [8, 9],
    bio: "Chimamanda Ngozi Adichie is a Nigerian writer whose works range from novels to short stories to nonfiction.",
    excerpt: "The thing about cross-cultural relationships is that you spend so much time explaining. My ex-boyfriend and I spent a lot of time explaining.",
    analysis: "This excerpt from 'Americanah' highlights Adichie's keen observations on cultural differences and the complexities of relationships across different backgrounds.",
    picture: "/200x200.svg"
  }
]

export default function Home() {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <h1 className="text-4xl font-bold text-center py-8" style={{ color: "var(--text-color)" }}>
        Literature Around the World
      </h1>
      <WorldMap authors={authors} onSelectAuthor={setSelectedAuthor} />
      {selectedAuthor && (
        <Card className="max-w-4xl mx-auto mt-8 p-6 rounded-lg shadow-lg bg-card text-card-foreground border-4">
          <CardHeader><AuthorInfo author={selectedAuthor} /></CardHeader>
          <div className="mb-6 border-t" style={{ borderColor: "var(--accent-color)" }}></div>
          <CardContent><ExcerptAnalysis excerpt={selectedAuthor.excerpt} analysis={selectedAuthor.analysis} /></CardContent>
        </Card>
      )}
    </main>
  )
}
