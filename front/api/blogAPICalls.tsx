"use server";

import { redirect } from "next/navigation";
import { postBlogURL } from "./api-routes";

interface RegisterBlogProps {
  title: string;
  tags: string[];
  content: string;
}

export async function postBlogAPI(registerBlog: RegisterBlogProps) {
  console.log('블로그에 저장할 정보들:', registerBlog);
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
        console.log('success!');
        // redirect("/");
      }
    };
  } catch (error) {
    throw error;
  };
};