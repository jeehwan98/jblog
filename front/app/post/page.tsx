"use client";

import React, { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import EditSection from '@/components/post/edit-section';
import PreviewSection from '@/components/post/preview-section';

export default function BlogPostPage() {
  const [blog, setBlog] = useState({
    title: '',
    tags: [],
    content: ''
  });

  return (
    <PostContainer>
      <EditSection blog={blog} setBlog={setBlog} />
      <PreviewSection blog={blog} />
    </PostContainer>
  );
}

function PostContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-full text-black flex">
      {children}
    </main>
  )
}