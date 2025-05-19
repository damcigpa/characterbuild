import React from 'react'
import { fetchData } from '@/app/Utils/utils'
import { loginSession } from '@/app/Utils/loginSession';
import CharacterPage from '@/Components/CharacterPage';

const CharacterProfile = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  const session = await loginSession()

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
