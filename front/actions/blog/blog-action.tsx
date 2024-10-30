import { postBlogAPI } from "@/api/blogAPICalls";
import { validateBlogPost } from "@/validation/blog-post";

interface PostBlogProps {
  title: string;
  tags: string[];
  content: string;
}

export async function postBlogAction(prevState: null, formData: FormData) {
  // export async function postBlogAction(registerBlog: PostBlogProps) {

  const registerBlog = {
    title: formData.get('title') as string,
    tags: formData.getAll("tags") as string[],
    content: formData.get('content') as string
  };
  console.log('받은 내용들:', registerBlog);

  const validation = validateBlogPost(registerBlog);

  if (validation.length > 0) {
    return { errors: validation };
  }

  const result = await postBlogAPI(registerBlog);

  if (result) {
    console.log('result?:', result);
    return result;
  }
}