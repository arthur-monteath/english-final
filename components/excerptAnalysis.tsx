interface ExcerptAnalysisProps {
    excerpt: string
    analysis: string
    title: string
  }
  
  export default function ExcerptAnalysis({ excerpt, analysis, title }: ExcerptAnalysisProps) {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Excerpt - {title}</h3>
        <blockquote className="italic border-l-4 pl-4 mb-6">
          {excerpt}
        </blockquote>
        <h3 className="text-2xl font-semibold mb-4">Analysis</h3>
        <p className="">{analysis}</p>
      </div>
    )
  }
  
  