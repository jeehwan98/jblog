import LoginForm from "./login/login-form";

export default function AuthForm() {
  return (
    <div className="flex bg-white text-black items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg p-8 shadow-lg w-80 relative">
        <h2 className="text-center text-2xl font-bold mb-6">로그인</h2>
        <LoginForm />
      </div>
    </div>
  )
}