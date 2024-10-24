"use client";

import { validateLoginDetails } from "@/actions/auth-action";
import { SubmitButton } from "@/ui/button/button-ui";
import { FormGroup, InputFieldLogin } from "@/ui/form/form-ui";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export interface LoginErrors {
  userId?: string;
  password?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function LoginForm() {

  const [errors, setErrors] = useState<{ userId?: string; password?: string } | null>(null);
  const [loginDetails, setLoginDetails] = useState({
    userId: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoginDetails(loginDetails);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

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
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <InputFieldLogin
            type="string"
            name="userId"
            placeholder="아이디"
            onChange={handleChange}
          />
        </FormGroup>
        {errors?.userId && <p className="text-xs text-red-500 my-3">{errors.userId}</p>}
        <FormGroup>
          <InputFieldLogin
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleChange}
          />
        </FormGroup>
        {errors?.password && <p className="text-xs text-red-500 my-3">{errors.password}</p>}
        <SubmitButton name="로그인" />
      </form>
      <div className="flex justify-between items-center mt-3">
        <ForgotPasswordLink />
        <ToRegisterLink />
      </div>
    </>
  )
}

function ForgotPasswordLink() {
  return (
    <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-600">
      비밀번호를 잊으셨나요?
    </Link>
  )
}

function ToRegisterLink() {
  return (
    <Link href="/register" className="text-sm text-blue-400 hover:text-blue-600">
      회원가입
    </Link>
  )
}