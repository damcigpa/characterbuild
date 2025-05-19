'use client'
import React from 'react'
import CharacterFinalization from '@/app/(main)/character_finalization/CharacterFinalsation'
import { SessionProvider } from 'next-auth/react'


export default function PageWrapper() {
  return (
    <SessionProvider>
      <CharacterFinalization />
    </SessionProvider>
  )
}