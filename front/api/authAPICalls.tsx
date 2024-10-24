"use server";

import { redirect } from "next/navigation";

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
    const response = await fetch(`${baseUrl}/auth/register`, {
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