import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignupForm from '@/Components/SignupForm'
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('SignupForm', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  it('submits form successfully and redirects', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock

    render(<SignupForm />)

    fireEvent.change(screen.getByLabelText(/name:/i), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByLabelText(/email:/i), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password:/i), {
      target: { value: 'secret123' },
    })

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/user registered successfully/i)
      ).toBeInTheDocument()
    })

    jest.runAllTimers()

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/character_list')
    })
  })

  it('shows error message on failed signup', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Email already in use' }),
      })
    ) as jest.Mock

    render(<SignupForm />)

    fireEvent.change(screen.getByLabelText(/name:/i), {
      target: { value: 'Jane Doe' },
    })
    fireEvent.change(screen.getByLabelText(/email:/i), {
      target: { value: 'jane@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password:/i), {
      target: { value: 'pass123' },
    })

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(screen.getByText(/email already in use/i)).toBeInTheDocument()
    })

    expect(mockPush).not.toHaveBeenCalled()
  })
})
