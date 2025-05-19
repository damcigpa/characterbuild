'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CharacterInterface } from '@/Interfaces/Interfaces'
import Character from '@/Components/Character'
interface CharacterListProps {
  characters: CharacterInterface[]
  userId: string
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  userId,
}) => {
  const queryClient = new QueryClient()
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <h1>Character List</h1>
        {characters.map((item: CharacterInterface) => {
          return (
            <div key={item.id}>
              <Character character={item} id={item.id} userId={userId} />
            </div>
          )
        })}
      </QueryClientProvider>
    </div>
  )
}

export default CharacterList
