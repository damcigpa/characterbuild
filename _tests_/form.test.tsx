import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Form from '@/Components/Form'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('../app/Utils/utils', () => ({
  fetchData: jest.fn(() =>
    Promise.resolve({
      count: 50,
      total: 100,
      data: [
        {
          id: '1',
          name: 'Testsword',
          image: 'https://test.com/sword.jpg',
        },
        {
          id: '2',
          name: 'Axe of Test',
          image: 'https://test.com/axe.jpg',
        },
      ],
    })
  ),
}))

let store: Record<string, string> = {}

const mockGetItem = jest.fn((key) => store[key] || null)
const mockSetItem = jest.fn((key, value) => {
  store[key] = value
})
const mockRemoveItem = jest.fn((key) => {
  delete store[key]
})

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: mockGetItem,
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
    clear: () => {
      store = {}
    },
  },
})

describe('Form component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  it('renders cards and stores selected item in localStorage', async () => {
    const client = new QueryClient()
    render(
      <QueryClientProvider client={client}>
        <Form formType="weapons" inputType="radio" />
      </QueryClientProvider>
    )

    const input = await screen.findByTestId('1')
    fireEvent.click(input)

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalled()
      const [key, value] = (localStorage.setItem as jest.Mock).mock.calls[0]
      expect(key).toBe('character')
      expect(value).toContain('Testsword')
      expect(JSON.parse(value)).toHaveProperty('weapons')
    })
  })
})
