"use client";

import { loginAPI } from "@/api/authAPICalls";

interface LoginDetailsProps {
  userId: string;
  password: string;
}

export function validateLoginDetails(loginDetails: LoginDetailsProps) {
  const errors: { userId?: string; password?: string } = {};
  const userIdValidation = validateUserId(loginDetails.userId);
  const passwordValidation = validatePassword(loginDetails.password);

  if (userIdValidation) {
    errors.userId = userIdValidation.errors?.userId;
  }

  if (passwordValidation) {
    errors.password = passwordValidation.errors?.password;
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return null;
}

function validateUserId(userId: string) {
  if (userId.length < 5) {
    return {
      errors: {
        userId: '아이디는 5자 이상이어야 합니다.'
      }
    };
  }

  return null;
}

function validatePassword(password: string) {
  if (password.length < 6) {
    return {
      errors: {
        password: '비밀번호는 6자 이상이어야 합니다.'
      }
    };
  }

  return null;
}