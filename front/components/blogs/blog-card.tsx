import Image from "next/image";
import Link from "next/link";
import blogCard from '@/app/defaultImage.jpg';
import React from "react";

export default function BlogCard() {
  return (
    <div className="flex justify-center align-middle shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-2">
      <div className="max-w-full h-auto mb-2 cursor-pointer">
        <div className="max-w-full">
          <Link href="/blogs/blog-id">
            <Image
              className="max-w-full h-auto mb-2"
              src={blogCard}
              alt="Music Blog Image"
              width={400}
              height={400}
            />
          </Link>
          <BlogDetails />
          <CardBottom>
            <BlogUser />
            <ReadMoreButton />
          </CardBottom>
        </div>
      </div>
    </div>
  )
}

function CardBottom({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-2">
      {children}
    </div>
  )
}

function BlogDetails() {
  return (
    <>
      <div className="text-xl font-bold p-2">blog title</div>
      <div className="p-2">조회수 없어서 우째 생각해 이거치 실험해 그에 대해...</div>
    </>
  )
}

function BlogUser() {
  return (
    <div className="flex items-center">
      <Image
        className="rounded-full"
        src={blogCard}
        alt='profile picture'
        height={40}
      />
      <div className="ml-3">by <span className='font-bold'>김지환</span></div>
    </div>
  )
}

function ReadMoreButton() {
  return (
    <button className="px-2 py-2 text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out">
      <Link href="/blogs/blog-id" className='button-text'>더 보기</Link>
    </button>
  )
}