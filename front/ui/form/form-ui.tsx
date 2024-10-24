interface InputFieldLoginProps {
  type: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputFieldRegisterProps {
  type: string;
  name: string;
  placeholder: string;
}

interface FormGroupProps {
  children: React.ReactNode;
}

export function FormGroup({ children }: FormGroupProps) {
  return (
    <div className="mb-4">
      {children}
    </div>
  )
}

export function InputFieldLogin({ type, name, placeholder, onChange }: InputFieldLoginProps) {
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

export function InputFieldRegister({ type, name, placeholder }: InputFieldRegisterProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}