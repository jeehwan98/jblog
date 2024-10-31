"use client";

import { fetchAllBlogsAPI } from "@/api/blogAPICalls";
import BlogCard from "@/components/blogs/blog-card";
import Body from "@/components/body";
import { useEffect, useState } from "react";

interface Blog {
  blogPostId: number;
  title: string;
  context: string;
  imageUrl: string | null;
  visibilityStatus: string;
  publishedAt: Date;
  updatedAt: Date;
  likesCount: number;
  viewCount: number;
}

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await fetchAllBlogsAPI();
      console.log('fetched blogs:', fetchedBlogs);
      setBlogs(fetchedBlogs);
    };

    fetchBlogs();
  }, []);

  return (
    <Body>
      <div className="max-w-[90%] m-auto">
        <div className='text-black text-center text-5xl mb-10'>Blog Posts</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10 justify-center items-center">
          {blogs.map(blog => (
            <BlogCard key={blog.blogPostId} blog={blog} />
          ))}
        </div>
      </div>
    </Body>
  )
}
