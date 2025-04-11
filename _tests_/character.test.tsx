import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Character from '@/Components/Character'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CharacterInterface } from '@/Interfaces/Interfaces'

describe('Character Component', () => {
  const mockUserId = 'user123'
  const likeNum = 10
  const client = new QueryClient()

  const createMockCharacter = (userLiked: boolean) => {
    return {
      id: 1,
      name: 'Test Character',
      image: 'test-character-image.jpg',
      likes: likeNum,
      dexterity: 15,
      weapons: [
        {
          id: 1,
          name: 'Test Sword',
          image: 'sword-image.jpg',
        },
      ],
      armors: [],
      talismans: [],
      sorceries: [],
      incantations: [],
      comments: [
        {
          id: 1,
          userId: 123,
          comment: 'Great character!',
          characterId: 1,
          commenter: { id: 123, name: 'Test User' },
        },
      ],
      userLiked: userLiked,
    }
  }

  const mockLikeFetch = (change: number) => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        redirected: false,
        type: 'basic',
        url: '',
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        json: async () => ({ likes: likeNum + change }),
        text: jest.fn(),
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
      } as unknown as Response)
    )
  }

  const renderComponent = (mockCharacter: CharacterInterface) => {
    return render(
      <QueryClientProvider client={client}>
        <Character
          character={mockCharacter}
          id={mockCharacter.id}
          userId={mockUserId}
        />
      </QueryClientProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('tests like button', async () => {
    mockLikeFetch(+1)
    const character = createMockCharacter(false)
    renderComponent(character)

    const likeButton = screen.getByTestId('Like')
    const likesSpan = screen.getByTestId('likes')
    expect(likesSpan).toHaveTextContent('10')

    expect(likeButton).toBeInTheDocument()
    fireEvent.click(likeButton)
    await waitFor(() => {
      expect(screen.getByTestId('Unlike')).toBeInTheDocument()
      expect(likesSpan).toHaveTextContent('11')
    })
  })

  it('tests unlike button', async () => {
    mockLikeFetch(-1)
    const character = createMockCharacter(true)
    renderComponent(character)
    const likeButton = screen.getByTestId('Unlike')
    const likesSpan = screen.getByTestId('likes')
    expect(likesSpan).toHaveTextContent('10')

    expect(likeButton).toBeInTheDocument()
    fireEvent.click(likeButton)
    await waitFor(() => {
      expect(screen.getByTestId('Like')).toBeInTheDocument()
      expect(likesSpan).toHaveTextContent('9')
    })
  })
})
