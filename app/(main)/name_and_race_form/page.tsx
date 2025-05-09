'use client'

import React from 'react'
import NameAndRaceForm from './NameAndRaceForm'
import { SessionProvider } from 'next-auth/react'


const NameAndRaceFormPage = () => {
  return (
    <SessionProvider>
      <NameAndRaceForm />
    </SessionProvider>
  )
}

export default NameAndRaceFormPage
