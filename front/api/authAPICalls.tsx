"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface LoginDetailsProps {
  userId: string;
  password: string;
}

export async function loginAPI(loginDetails: LoginDetailsProps) {
  console.log('login details?:', loginDetails);
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(loginDetails)
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.message === 'login success') {
        revalidatePath('/');
        redirect('/');
      } else {
        return { error: responseData.message };
      }
    } else {
      return { error: 'Failed to login' };
    }
  } catch (error) {
    throw error;
  }
}