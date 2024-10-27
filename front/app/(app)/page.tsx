"use client";

import BlogCard from "@/components/blogs/blog-card";
import Body from "@/components/body";

export default function HomePage() {
  return (
    <Body>
      <div className="max-w-[90%] m-auto">
        <div className='text-black text-center text-5xl mb-10'>Blog Posts</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10 justify-center items-center">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          {/* {blogs.map(blog => (
          <BlogCard blog={blog} />
        ))} */}
        </div>
      </div>
    </Body>
  )
}
