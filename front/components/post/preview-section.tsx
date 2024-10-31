import { ContextField, PreviewSectionWrapper, TagField, TitleField } from "./ui/previewUI";

interface Blog {
  title: string;
  tags: string[];
  context: string;
}

interface PreviewSectionProps {
  blog: Blog;
}

export default function PreviewSection({ blog }: PreviewSectionProps) {
  return (
    <PreviewSectionWrapper>
      <TitleField title={blog.title} />
      <TagField tags={blog.tags} />
      <ContextField context={blog.context} />
    </PreviewSectionWrapper>
  )
};