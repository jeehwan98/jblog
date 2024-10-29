const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// auth
export const registerUserURL = `${baseUrl}/auth/register`;
export const currentlyLoggedInUserURL = `${baseUrl}/users`;
export const logoutURL = `${baseUrl}/auth/logout`;

// blog post
export const postBlogURL = `${baseUrl}/blog`;

