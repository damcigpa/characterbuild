import React from 'react'
import LoginForm from '@/Components/LoginForm'
import SignupForm from '@/Components/SignupForm'

export default async function Login() {

  return (
    <>
      <SignupForm />
      Or
      <LoginForm />
    </>
  )
}
