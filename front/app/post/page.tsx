"use client";

import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { PreviousPageButton } from '@/ui/button/button-ui';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function BlogPostPage() {
  const [blog, setBlog] = useState({
    title: '',
    tags: '',
    content: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleContentChange = (content: string) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      content: content,
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

  return (
    <main className="h-screen w-full text-black flex">
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
          <input
            type="text"
            name='tags'
            placeholder="태그를 입력하세요"
            value={blog.tags}
            onChange={handleInputChange}
            className="w-full text-lg text-gray-500 mb-4 p-2 outline-none"
          />
          {/* <ReactQuill
            value={blog.content}
            onChange={handleContentChange}
            placeholder="당신의 이야기를 적어보세요..."
            className="h-96 mb-20"
          /> */}
          <ReactQuill
            // ref={reactQuillRef}
            theme="snow"
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
              "bullet",
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
          <div>
            <button className="px-4 py-2 mr-2 rounded hover:bg-gray-100">임시저장</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">출간하기</button>
          </div>
        </EditorSectionBottom>
      </EditorSection>
      <PreviewSection>
        <h1 className="text-4xl font-bold mb-2">{blog.title || ""}</h1>
        <p className="text-lg text-gray-500 mb-4">{blog.tags || ""}</p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />
      </PreviewSection>
    </main>
  );
}

function EditorSection({ children }: { children: React.ReactNode }) {
  return (
    // <div className="w-1/2 pr-5 justify-between">
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

function PreviewSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-1/2 p-10 border-gray-200 bg-gray-50">
      {children}
    </div>
  )
}