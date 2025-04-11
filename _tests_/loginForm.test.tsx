import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from '@/Components/LoginForm'
import { signIn } from 'next-auth/react'

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the login form', () => {
    render(<LoginForm />)

    expect(screen.getByTestId("email")).toBeInTheDocument()
    expect(screen.getByTestId("password")).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument()
  })

  it('calls signIn with correct values and handles success', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: true })

    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: 'securePass' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Login/i }))

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: true,
        email: 'user@example.com',
        pass: 'securePass',
        callbackUrl: '/character_list',
      })
    })
  })

  it('shows error when signIn fails', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({
      error: 'Invalid credentials',
    })

    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'wrong@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: 'wrongPass' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Login/i }))

    await waitFor(() => {
      expect(
        screen.getByText('Incorrect password or email')
      ).toBeInTheDocument()
    })
  })
})
