'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [pass, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      redirect: true,
      email,
      pass,
      callbackUrl: '/character_list',
    })

    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading ? <div>Loading...</div> : <button type="submit">Login</button>}
      </form>
    </div>
  )
}