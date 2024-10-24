"use client";

import { useActionState } from "react";
import { FormGroup, InputFieldRegister } from "@/ui/form/form-ui";
import { SubmitButton } from "@/ui/button/button-ui";
import { SelectFieldRegister } from "@/ui/select-box/select-box-ui";
import { registerAction } from "@/actions/auth/register-actions";

export default function RegisterForm() {

  const [state, formAction] = useActionState(registerAction, undefined);

  return (
    <>
      <form action={formAction}>
        <FormGroup>
          <InputFieldRegister
            type="string"
            name="username"
            placeholder="이름"
          />
        </FormGroup>
        <FormGroup>
          <InputFieldRegister
            type="string"
            name="userId"
            placeholder="아이디"
          />
        </FormGroup>
        <FormGroup>
          <InputFieldRegister
            type="password"
            name="password"
            placeholder="비밀번호"
          />
        </FormGroup>
        <FormGroup>
          <SelectFieldRegister name="gender" defaultValue="">
            <option value="" disabled>성별</option>
            <option value="남">남자</option>
            <option value="여">여자</option>
          </SelectFieldRegister>
        </FormGroup>
        <SubmitButton name="회원 가입" />
      </form>
    </>
  )
}