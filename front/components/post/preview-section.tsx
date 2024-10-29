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
      {/* <div className="flex items-center mb-4 flex-wrap">
        {blog.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-green-600 px-3 py-1 rounded-full mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div> */}
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