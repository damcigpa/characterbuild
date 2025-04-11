import React from 'react'
import { fetchData } from '@/app/Utils/utils'
import { useLoginSession } from '@/app/Hooks/useLoginSession'
import CharacterPage from '@/Components/CharacterPage';

const CharacterProfile = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  const session = await useLoginSession()

  if (!session) {
    return
  }

  const data = await fetchData(
    `http://localhost:5474/api/character/get?id=${slug}&userId=${session.user.id}`
  )

  return (
    <div>
     <CharacterPage character={data} userId={session.user.id} id={slug} />
    </div>
  )
}

export default CharacterProfile
