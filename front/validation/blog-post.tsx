interface RegisterBlogProps {
  title: string;
  tags: string[];
  context: string;
}

export const validateBlogPost = (registerBlog: RegisterBlogProps) => {
  const { title, tags, context } = registerBlog;
  const errors: string[] = [];
  if (!title || title.trim().length === 0) {
    errors.push("Title cannot be empty.");
  };

  if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== "string")) {
    errors.push("Tags must be an array of strings.");
  };

  if (!context || context.trim().length < 1) {
    errors.push("Context is empty");
  }

  return errors;
}