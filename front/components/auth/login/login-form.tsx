"use client";

import { validateLoginDetails } from "@/actions/auth-action";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormGroupProps {
  children: React.ReactNode;
}

export interface LoginErrors {
  userId?: string;
  password?: string;
}

interface LoginStateResult {
  errors?: LoginErrors;  // This will store the validation errors for userId and password
  valid?: boolean;       // Indicates if the login is successful (no errors)
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface LoginDetailsProps {
  userId: string;
  password: string;
}


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
          <InputField
            type="string"
            name="userId"
            placeholder="아이디"
            onChange={handleChange}
          />
        </FormGroup>
        {errors?.userId && <p className="text-xs text-red-500 my-3">{errors.userId}</p>}
        <FormGroup>
          <InputField
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleChange}
          />
        </FormGroup>
        {errors?.password && <p className="text-xs text-red-500 my-3">{errors.password}</p>}
        <SubmitButton />
      </form>
      <div className="flex justify-between items-center mt-3">
        <ForgotPasswordLink />
        <ToRegisterLink />
      </div>
    </>
  )
}

function FormGroup({ children }: FormGroupProps) {
  return (
    <div className="mb-4">
      {children}
    </div>
  )
}

function InputField({ type, name, placeholder, onChange }: InputFieldProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full py-3 text-white bg-blue-600 rounded-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {pending ? '로그인중...' : '로그인'}
    </button>
  )
}