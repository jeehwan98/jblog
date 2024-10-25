"use client";

import { validateLoginDetails } from "@/actions/auth-action";
import { SubmitButton } from "@/ui/button/button-ui";
import { FormGroup, InputFieldLogin } from "@/ui/form/form-ui";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AnotherLinks from "./another-links";

export interface LoginErrors {
  userId?: string;
  password?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<{ userId?: string; password?: string } | null>(null);
  const [loginDetails, setLoginDetails] = useState({
    userId: '',
    password: ''
  });

  // handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    });
  }

  // validate and submit the login form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoginDetails(loginDetails);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8090/api/v1/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDetails)
      });

      const responseData = await response.json();

      if (responseData.error) {
        setErrors({ userId: responseData.error });
        return;
      }

      if (response.ok) {
        if (responseData.message === 'login success') {
          router.push('/');
        }
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
        {errors?.userId && <ErrorMessage message={errors.userId} />}
        <FormGroup>
          <InputFieldLogin
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleChange}
          />
        </FormGroup>
        {errors?.password && <ErrorMessage message={errors.password} />}
        <SubmitButton name="로그인" />
        <AnotherLinks />
      </form>
    </>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return <p className="text-xs text-red-500 my-3">{message}</p>
}