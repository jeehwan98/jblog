import { postBlogAPI } from "@/api/blogAPICalls";

interface PostBlogProps {
  title: string;
  tags: string[];
  content: string;
}

export async function blogPostAction(prevState: null, formData: FormData) {

  const registerBlog = {
    title: formData.get('title') as string,
    tags: formData.get('tags'),
    content: formData.get('content') as string
  };

  // const validatePostBlog = validateBlogPost(registerBlog);

  const result = await postBlogAPI(registerBlog);
  if (result) {
    console.log('result?:', result);
    return result;
  }
}