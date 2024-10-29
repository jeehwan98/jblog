"use server";

import { redirect } from "next/navigation";
import { postBlogURL } from "./api-routes";

interface RegisterBlogProps {
  title: string;
  tags: string[];
  content: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function postBlogAPI(registerBlog: RegisterBlogProps) {
  console.log('register blog:?', registerBlog);
  try {
    const response = await fetch(postBlogURL, {
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
        redirect('/');
      };
    };
  } catch (error) {
    throw error;
  }
}