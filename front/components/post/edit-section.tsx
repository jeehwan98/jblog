"use client";

import { PreviousPageButton } from "@/ui/button/button-ui"
import dynamic from "next/dynamic";
import 'react-quill-new/dist/quill.snow.css';
import { useCallback, useState } from "react";

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

export default function EditSection({ blog, setBlog }: EditSectionProps) {
  const [tagInput, setTagInput] = useState("");

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
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

  function handleContentChange(content: string) {
    setBlog((prevBlog) => ({
      ...prevBlog,
      content: content,
    }));

  }

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

  console.log('tags?:', blog.tags);

  return (
    <EditorSection>
      <EditorSectionTop>
        <input
          type="text"
          name='title'
          placeholder="제목을 입력하세요"
          value={blog.title}
          onChange={handleInputChange}
          className="w-full text-4xl font-bold mb-4 p-2 border-b border-gray-300 outline-none"
        />
        <div className="flex items-center mb-4 flex-wrap">
          {blog.tags.map((tag, index) => (
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
          <input
            type="text"
            name='tags'
            placeholder="태그를 입력하세요"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyPress}
            className="w-full text-lg text-gray-500 mb-4 p-2 outline-none"
          />
        </div>
        <ReactQuill
          theme="snow"
          className="h-96 mb-20"
          placeholder="Start writing..."
          modules={{
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
              }
            },
            clipboard: {
              matchVisual: false,
            },
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "indent",
            "link",
            "image",
            "video",
            "code-block",
          ]}
          value={blog.content}
          onChange={handleContentChange}
        />
      </EditorSectionTop>
      <EditorSectionBottom>
        <PreviousPageButton />
        <>
          <button type="submit" className="px-4 py-2 mr-2 rounded hover:bg-gray-100">임시저장</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">출간하기</button>
        </>
      </EditorSectionBottom>
    </EditorSection>
  )
}

function EditorSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-1/2 flex flex-col justify-between h-full shadow-lg bg-white">
      {children}
    </div>
  )
}

function EditorSectionTop({ children }: { children: React.ReactNode }) {
  return (
    <div className='p-10'>
      {children}
    </div>
  )
}

function EditorSectionBottom({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center p-3 shadow-md border-t border-gray-200 bg-white">
      {children}
    </div>
  )
}