'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/Components/LoginForm'

export default function ModalLogin() {
  const router = useRouter()

  const handlecloseButton = () => {
    router.back()
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-xl shadow-xl p-6 w-full max-w-md">
        <LoginForm />
      </div>
      <button
        onClick={handlecloseButton}
        className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-700 rounded-full p-2"
      >
        Close
      </button>
    </div>
  )
}
