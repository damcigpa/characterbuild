'use client'
import React from 'react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [pass, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    setLoading(true)

    const result = await signIn('credentials', {
      redirect: true,
      email,
      pass,
      callbackUrl: '/character_list',
    })

    if (result?.error) {
      setError(true)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            data-testid="email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            data-testid="password"
            id="password"
            type="password"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>Incorrect password or email</p>}
        {loading ? <div>Loading...</div> : <button type="submit">Login</button>}
      </form>
    </div>
  )
}
