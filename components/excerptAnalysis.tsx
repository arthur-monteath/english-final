interface ExcerptAnalysisProps {
    excerpt: string
    analysis: string
  }
  
  export default function ExcerptAnalysis({ excerpt, analysis }: ExcerptAnalysisProps) {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Excerpt</h3>
        <blockquote className="italic text-gray-700 border-l-4 border-gray-300 pl-4 mb-6">
          "{excerpt}"
        </blockquote>
        <h3 className="text-2xl font-semibold mb-4">Analysis</h3>
        <p className="text-gray-700">{analysis}</p>
      </div>
    )
  }
  
  