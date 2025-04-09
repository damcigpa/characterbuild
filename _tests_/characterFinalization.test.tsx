import { render, fireEvent, waitFor } from '@testing-library/react'
import CharacterFinalization from '@/app/character_finalization/page'
import React from 'react'

const mockCharacter = {
  weapons: [{ name: 'Sword', url: 'https://example.com/sword.png' }],
}

beforeEach(() => {
  localStorage.setItem('character', JSON.stringify(mockCharacter))

  global.fetch = jest.fn((url, options) => {
    if (typeof url === 'string' && url.includes('/api/images/post')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ fileName: 'uploaded-image.png' }),
      })
    }

    if (typeof url === 'string' && url.includes('/api/characters/post')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    }

    return Promise.reject(new Error('Unknown endpoint'))
  }) as jest.Mock
})

afterEach(() => {
  localStorage.clear()
  jest.resetAllMocks()
})

describe('CharacterFinalization component', () => {
  test('uploads a file and updates localStorage with image name', async () => {
    const { getByText, getByLabelText } = render(<CharacterFinalization />)

    const file = new File(['hello'], 'avatar.png', { type: 'image/png' })
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    fireEvent.change(input, { target: { files: [file] } })

    fireEvent.click(getByText('Upload'))

    await waitFor(() => {
      const updated = JSON.parse(localStorage.getItem('character') || '{}')
      expect(updated.image).toBe('uploaded-image.png')
    })
  })

  test('submits final character data and clears localStorage', async () => {
    const { getByText } = render(<CharacterFinalization />)

    fireEvent.click(getByText('Submit'))
    const originalCharacter = JSON.parse(
      localStorage.getItem('character') || '{}'
    )

    await waitFor(() => {
      const lastFetchCall = (global.fetch as jest.Mock).mock.calls.find(
        ([url]) => url === 'http://localhost:5474/api/characters/post'
      )

      expect(lastFetchCall).toBeDefined()

      const bodySent = JSON.parse(lastFetchCall?.[1]?.body as string)

      expect(bodySent).toEqual(originalCharacter)
      expect(localStorage.getItem('character')).toBeNull()
    })
  })
})
