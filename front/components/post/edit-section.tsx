"use client";

import { PreviousPageButton } from "@/ui/button/button-ui"
import dynamic from "next/dynamic";
import 'react-quill-new/dist/quill.snow.css';
import { useCallback, useState } from "react";
import { ContextArea, EditorWrapper, FooterBar, PublishButton, TagWrapper } from "./editorUI";
import { validateBlogPost } from "@/validation/blog-post";
import { postBlogURL } from "@/api/api-routes";

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const TitleInput = ({
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

const TagField = ({
  tags,
  removeTag
}: {
  tags: string[],
  removeTag: (index: number) => void
}
) => {
  return (
    <>
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-gray-200 text-green-600 px-3 py-1 rounded-full mr-2 mb-2 flex items-center hover:bg-gray-300 cursor-pointer"
          onClick={() => removeTag(index)}
        >
          {tag}
          <button className="ml-2 text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </span>
      ))}
    </>
  )
}

const TagInput = ({
  value,
  onChange,
  onKeyDown,
  onBlur,
}: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}) => {
  return (
    <input
      type="text"
      name="tags"
      placeholder="태그를 입력하세요"
      className="w-full text-lg text-gray-500 mb-4 p-2 outline-none"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  )
}

interface Blog {
  title: string;
  tags: string[];
  context: string;
}

interface EditSectionProps {
  blog: Blog;
  setBlog: React.Dispatch<React.SetStateAction<Blog>>;
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

  const handleContextChange = (context: string) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      context,
    }));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      addTags();
    } else if (e.key === "Backspace" && tagInput === "") {
      setBlog((prevBlog) => ({
        ...prevBlog,
        tags: prevBlog.tags.slice(0, -1),
      }));
    };
  };

  const handleBlur = () => {
    addTags();
  };

  const addTags = () => {
    if (tagInput.trim()) {
      setBlog((prevBlog) => ({
        ...prevBlog,
        tags: [...prevBlog.tags, tagInput.trim()],
      }));
      setTagInput("");
    };
  };

  const removeTag = (index: number) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      tags: prevBlog.tags.filter((_, i) => i !== index),
    }));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateBlogPost(blog);
    if (validation.length > 0) {
      console.error("Validation errors:", validation);
      return { errors: validation };
    }

    const payload = {
      title: blog.title,
      context: blog.context,
      tags: blog.tags,
    };

    try {
      const response = await fetch(postBlogURL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();
      if (response.ok) {
        if (responseData.message === 'blog post success') {
          console.log('success!');
          // redirect("/");
        }
      };
    } catch (error) {
      console.error("API Error:", error);
    }
  };


  return (
    <EditorWrapper>
      <form onSubmit={handleSubmit}>
        <ContextArea>
          <TitleInput
            value={blog.title}
            onChange={handleInputChange}
          />
          <TagWrapper>
            <TagField
              tags={blog.tags}
              removeTag={removeTag}
            />
            <TagInput
              value={tagInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          </TagWrapper>
          <ReactQuill
            theme="snow"
            className="h-96 mb-20"
            placeholder="내용을 입력하세요..."
            value={blog.context}
            onChange={handleContextChange}
            modules={modules}
          />
        </ContextArea>
        <FooterBar>
          <PreviousPageButton />
          <PublishButton />
        </FooterBar>
      </form>
    </EditorWrapper>
  )
}