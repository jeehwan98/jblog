"use server";

import { registerUserAPI } from "@/api/authAPICalls";
import { validateRegisterDetails } from "@/validation/register-details";

interface RegisterDetailsProps {
  userId: string;
  password: string;
  imageUrl: string;
  gender: string;
  username: string;
}

export async function registerAction(prevState: null, formData: FormData) {

  const registerDetails = {
    username: formData.get('username') as string,
    userId: formData.get('userId') as string,
    password: formData.get('password') as string,
    imageUrl: formData.get('imageUrl') as string,
    gender: formData.get('gender') as string
  };

  const validationResult = validateRegisterDetails(registerDetails);

  const result = await registerUserAPI(registerDetails);
  if (result) {
    console.log('result:?', result);
    return result;
  }
}