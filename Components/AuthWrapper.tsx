'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

type AuthWrapperProps = {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (!session) {
    return <h2>You have to log in to see this page</h2>
  }

  return <>{children}</>
}
