import RegisterForm from "@/components/auth/register/register-form";

export default function RegisterPage() {
  return (
    <div className="flex bg-white text-black items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg p-8 shadow-lg w-80 relative">
        <h2 className="text-center text-2xl font-bold mb-6">회원 가입</h2>
        <RegisterForm />
      </div>
    </div>
  )
}