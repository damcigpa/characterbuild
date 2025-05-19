'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { CharacterPreview } from './CharacterPreview'


const NameAndRaceFormPage = () => {
  return (
    <SessionProvider>
      <CharacterPreview/>
    </SessionProvider>
  )
}

export default NameAndRaceFormPage