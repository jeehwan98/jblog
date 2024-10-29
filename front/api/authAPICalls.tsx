import { redirect } from "next/navigation";
import { currentlyLoggedInUserURL, logoutURL, registerUserURL } from "./api-routes";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RegisterDetailsProps {
  userId: string;
  password: string;
  imageUrl: string;
  gender: string;
  username: string;
}

export async function registerUserAPI(registerDetails: RegisterDetailsProps) {
  try {
    const response = await fetch(registerUserURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(registerDetails)
    });

    const responseData = await response.json();
    if (response.ok) {
      if (responseData.message === 'register success') {
        redirect('/login');
      }
    } else {
      if (responseData.message === 'userId already exists...') {
        return {
          errors: {
            userId: responseData.message
          }
        }
      }
    }
  } catch (error) {
    throw error;
  }
}

export async function loggedInUserAPI() {
  try {
    const response = await fetch(currentlyLoggedInUserURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const responseData = await response.json();
    console.log('🥰:', responseData);

    if (response.ok) {
      return responseData;
    }
  } catch (error) {
    throw error;
  }
}

export async function logoutAPI() {
  try {
    const response = await fetch(logoutURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.message === 'logout success') {
        return 'success';
      }
    }
  } catch (error) {
    throw error;
  }
}