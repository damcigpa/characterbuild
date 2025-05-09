'use client'
import React from 'react'
import CharacterFinalization from '@/Components/CharacterFinalsation'
import { SessionProvider } from 'next-auth/react'


export default function PageWrapper() {
  return (
    <SessionProvider>
      <CharacterFinalization />
    </SessionProvider>
  )
}