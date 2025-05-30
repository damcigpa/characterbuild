import React from 'react'
import { fetchData } from '../../Utils/utils'
import CharacterList from '@/Components/CharacterList'
import { loginSession } from '@/app/Utils/loginSession'

export default async function CharacterListPage() {
  const session = await loginSession()

  if (!session) {
    return <h1>Go log in!</h1>
  }


  const data = await fetchData(
    `http://localhost:5474/api/characters/get?userId=${session.user.id}`
  )

  return (
    <>
      <CharacterList characters={data.characters} userId={session.user.id} />
    </>
  )
}
