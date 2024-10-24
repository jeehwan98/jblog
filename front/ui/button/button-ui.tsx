import { useFormStatus } from "react-dom";

export function SubmitButton({ name }: { name: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full py-3 text-white bg-blue-600 rounded-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {pending ? `${name}중...` : `${name}`}
    </button>
  )
}