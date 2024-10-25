const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUserUrl = `${baseUrl}/auth/register`;
export const currentlyLoggedInUserURL = `${baseUrl}/users`;
export const logoutURL = `${baseUrl}/auth/logout`;