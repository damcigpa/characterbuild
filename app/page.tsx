import React from 'react'
import LoginForm from '@/Components/LoginForm'
import SignupForm from '@/Components/SignupForm'

export default async function Home() {

  return (
    <>
      <h1>Characters</h1>
      <SignupForm />
      Or
      <LoginForm />
    </>
  )
}
