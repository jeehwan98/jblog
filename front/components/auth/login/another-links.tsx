import Link from "next/link"

export default function AnotherLinks() {
  return (
    <div className="flex justify-between items-center mt-3">
      <ForgotPasswordLink />
      <ToRegisterLink />
    </div>
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