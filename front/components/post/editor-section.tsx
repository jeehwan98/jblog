"use client";

import { PreviousPageButton } from "@/ui/button/button-ui"
import dynamic from "next/dynamic";
import 'react-quill-new/dist/quill.snow.css';
import { useActionState, useCallback, useMemo, useRef, useState } from "react";
import { blogPostAction } from "@/actions/blog/blog-action";
import { ContentArea, EditorWrapper, FooterBar, PublishButton, SaveDraftButton, TagInput } from "./editorUI";

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface Blog {
  title: string;
  tags: string[];
  content: string;
}

interface EditSectionProps {
  blog: Blog;
  setBlog: React.Dispatch<React.SetStateAction<Blog>>;
}

const TitleField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <input
      type="text"
      name='title'
      placeholder="제목을 입력하세요"
      value={value}
      onChange={onChange}
      className="w-full text-4xl font-bold mb-4 p-2 border-b border-gray-300 outline-none"
    />
  )
}

const TagsField = ({
  tags,
  tagInput,
  onTagRemove,
  onInputChange,
  onInputKeyDown,
}: {
  tags: string[];
  tagInput: string;
  onTagRemove: (index: number) => void;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement>
}) => {
  return (
    <div className="flex items-center mb-4 flex-wrap">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-gray-200 text-green-600 px-3 py-1 rounded-full mr-2 mb-2 flex items-center hover:bg-gray-300 cursor-pointer"
          onClick={() => onTagRemove(index)}
        >
          {tag}
          <button className="ml-2 text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </span>
      ))}
      <TagInput
        value={tagInput}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
      />
    </div>
  )
}

export default function EditSection({ blog, setBlog }: EditSectionProps) {
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setTagInput(value);
    }

    if (name === 'title') {
      setBlog((prevBlog) => ({
        ...prevBlog,
        [name]: value
      }));
    }
  }

  const handleContentChange = (content: string) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      content: content,
    }));
  }

  const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      if (tagInput.trim()) {
        setBlog((prevBlog) => ({
          ...prevBlog,
          tags: [...prevBlog.tags, tagInput.trim()],
        }));
        setTagInput("");
      }
    } else if (e.key === "Backspace" && tagInput === "") { // remove last tag
      setBlog((prevBlog) => ({
        ...prevBlog,
        tags: prevBlog.tags.slice(0, -1),
      }));
    }
  };

  const removeTag = (index: number) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      tags: prevBlog.tags.filter((_, i) => i !== index),
    }));
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        console.log(file);
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          ["code-block"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }), []
  )

  const [state, formAction] = useActionState(blogPostAction, undefined);

  return (
    <EditorWrapper>
      <form action={formAction}>
        <ContentArea>
          <TitleField
            value={blog.title}
            onChange={handleInputChange}
          />
          <TagsField
            tags={blog.tags}
            tagInput={tagInput}
            onTagRemove={removeTag}
            onInputChange={handleInputChange}
            onInputKeyDown={handleTagKey}
          />
          <ReactQuill
            theme="snow"
            className="h-96 mb-20"
            placeholder="내용을 입력하세요..."
            value={blog.content}
            onChange={handleContentChange}
            modules={modules}
          />
        </ContentArea>
        <FooterBar>
          <PreviousPageButton />
          {/* <SaveDraftButton /> */}
          <PublishButton />
        </FooterBar>
      </form>
    </EditorWrapper>
  )
}