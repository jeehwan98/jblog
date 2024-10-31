const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// auth
export const registerUserURL = `${baseUrl}/auth/register`;
export const userURL = `${baseUrl}/users`;
export const logoutURL = `${baseUrl}/auth/logout`;
export const checkUserURL = `${baseUrl}/auth/users`;

// blog
export const blogURL = `${baseUrl}/blogs`;
