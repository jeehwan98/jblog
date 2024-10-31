import DOMPurify from "dompurify";
import React from "react";

export const PreviewSectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-1/2 p-10 border-gray-200 bg-gray-50">
      {children}
    </div>
  )
}

export const TagField = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex items-center mb-4 flex-wrap">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-gray-200 text-green-600 px-3 py-1 rounded-full mr-2 mb-2"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export const TitleField = ({ title }: { title: string }) => {
  return <h1 className="text-4xl font-bold mb-2">{title}</h1>
}

export const ContextField = ({ context }: { context: string }) => {
  const sanitizedContext = DOMPurify.sanitize(context);
  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: sanitizedContext }}
      style={{
        overflow: 'hidden',
        whiteSpace: 'pre-wrap',
      }}
    />
  )
}