'use client'

import React, { useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CharacterFinalization from '@/app/(main)/character_finalization/CharacterFinalsation'

export default function PageWrapper() {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <CharacterFinalization />
      </QueryClientProvider>
    </SessionProvider>
  )
}
