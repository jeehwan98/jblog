"use server";

import { redirect } from "next/navigation";
import { blogURL } from "./api-routes";

interface RegisterBlogProps {
  title: string;
  tags: string[];
  content: string;
}

export async function fetchAllBlogsAPI() {
  try {
    const response = await fetch(blogURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Error fetching all blogs:', responseData);
    }

    return responseData;
  } catch (error) {
    throw error;
  }
}

export async function postBlogAPI(registerBlog: RegisterBlogProps) {
  console.log('블로그에 저장할 정보들:', registerBlog);
  try {
    const response = await fetch(blogURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(registerBlog)
    });

    const responseData = await response.json();
    if (response.ok) {
      if (responseData.message === 'blog post success') {
        console.log('success!');
        // redirect("/");
      }
    };
  } catch (error) {
    throw error;
  };
};