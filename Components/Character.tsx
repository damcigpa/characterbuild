'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { CharacterInterface } from '@/Interfaces/Interfaces'
interface CharacterProps {
  character: CharacterInterface
  id: number
}

const Character: React.FC<CharacterProps> = ({ character, id }) => {
  const [likes, setLikes] = useState(character.likes)

  interface LikeEvent extends React.MouseEvent<HTMLButtonElement> {
    target: HTMLButtonElement & { dataset: { id: string } }
  }

  const handleLike = async (event: LikeEvent): Promise<void> => {
    const id: string = event.target.dataset.id

    const response: Response = await fetch('/api/likes/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id }),
    })

    const character = await response.json()
    setLikes(character.likes)
  }

  return (
    <div>
      <Link href={`/character/[id]`} as={`/character/${id}`}>
        <h1>{character.name}</h1>
        <img
          src={`/upload/${character.image}`}
          alt={character.name}
          width={300}
        />
        <p>Name: {character.name}</p>
        <p>Dexterity {character.dexterity}</p>
      </Link>
      <button data-id={character.id} onClick={handleLike}>
        {character.id} {likes}
      </button>
    </div>
  )
}

export default Character
