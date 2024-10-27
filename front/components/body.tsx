import React from "react";

export default function Body({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-20 text-black min-h-screen bg-gray-50">
      {children}
    </main>
  )
}