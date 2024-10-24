export function SelectFieldRegister({ name, defaultValue, children }: { name: string, defaultValue: string, children: React.ReactNode }) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </select>
  )
}