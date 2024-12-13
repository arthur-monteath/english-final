import Image from 'next/image'
import { Author } from '../types/Author'

interface AuthorInfoProps {
  author: Author
}

export default function AuthorInfo({ author }: AuthorInfoProps) {
  return (
    <div className="mb-6 flex items-start">
      <Image
        src={author.picture}
        alt={author.name}
        width={200}
        height={200}
        className="rounded-lg mr-6"
      />
      <div>
        <h2 className="text-3xl font-bold mb-2">{author.name}</h2>
        <h3 className="text-xl mb-4">{author.country}</h3>
        <p className="">{author.bio}</p>
      </div>
    </div>
  )
}

