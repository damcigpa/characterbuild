'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { CharacterInterface } from '@/Interfaces/Interfaces'

interface CharacterProps {
  character: CharacterInterface
  id: number
  userId: string
}

const Character: React.FC<CharacterProps> = ({ character, id, userId }) => {
  const [likes, setLikes] = useState(character.likes)
  const [userLiked, setUserLiked] = useState(character.userLiked)
  const buttonText = userLiked ? 'Unlike' : 'Like'

  const likeMutation = useMutation({
    mutationFn: async (characterBuildId: string) => {
      const response = await fetch('/api/likes/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterBuildId, userId }),
      })
      if (!response.ok) throw new Error('Failed to like')
      return response.json()
    },
    onSuccess: (data) => {
      setLikes(data.likes)
      setUserLiked(!userLiked)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const handleLike = (event: React.MouseEvent): void => {
    const target = event.target as HTMLElement
    const id: string | undefined = target.dataset.id
    if (!id) return
    likeMutation.mutate(id)
  }

  return (
    <div>
      <Link href={`/character/${id}`}>
        <h1>{character.name}</h1>
        <img
          src={`/upload/${character.image}`}
          alt={character.name}
          width={300}
        />
        <p>Name: {character.name}</p>
        <p>Dexterity {character.dexterity}</p>
      </Link>
      <span data-testid="likes">{likes}</span>
      <button
        data-id={character.id}
        data-testid={userLiked ? 'Unlike' : 'Like'}
        onClick={handleLike}
        disabled={likeMutation.isPending}
      >
        {likeMutation.isPending ? 'Liking...' : buttonText}
      </button>
    </div>
  )
}

export default Character
