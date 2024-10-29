interface Blog {
  title: string;
  tags: string[];
  content: string;
}

interface PreviewSectionProps {
  blog: Blog;
}

export default function PreviewSection({ blog }: PreviewSectionProps) {
  return (
    <PreviewSectionContainer>
      <h1 className="text-4xl font-bold mb-2">{blog.title || ""}</h1>
      <p className="text-lg text-gray-500 mb-4">{blog.tags || ""}</p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: blog.content || "" }}
      />
    </PreviewSectionContainer>
  )
}

function PreviewSectionContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-1/2 p-10 border-gray-200 bg-gray-50">
      {children}
    </div>
  )
}