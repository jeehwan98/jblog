const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const REGISTER_URL = `${BASE_URL}/auth/register`;
const USER_URL = `${BASE_URL}/users`;
const LOGOUT_URL = `${BASE_URL}/auth/logout`;
const AUTH_USER_URL = `${BASE_URL}/auth/users`;

// blog
const BLOG_URL = `${BASE_URL}/blogs`;

export {
  BASE_URL,
  REGISTER_URL,
  USER_URL,
  LOGOUT_URL,
  AUTH_USER_URL,
  BLOG_URL
};