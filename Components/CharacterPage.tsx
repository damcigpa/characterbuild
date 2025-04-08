'use client'

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Character from './Character'
import CommentBlock from './CommentBlock'
import { CharacterInterface } from '@/Interfaces/Interfaces'

interface CharacterPageProps {
  character: CharacterInterface
  userId: string
  id: string
}

const CharacterPage: React.FC<CharacterPageProps> = ({
  character,
  userId,
  id,
}) => {
  const queryClient = new QueryClient()

  console.log(character)

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Character id={Number(id)} character={character} userId={userId} />
        <CommentBlock
          commenterId={id}
          characterBuildId={userId}
          comments={character.comments}
        />
      </QueryClientProvider>
    </div>
  )
}

export default CharacterPage
