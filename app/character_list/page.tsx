import { fetchData } from '../Utils/utils'
import CharacterList from '@/Components/CharactrList'
import { useLoginSession } from '../Hooks/useLoginSession'

export default async function CharacterListPage() {
  const session = await useLoginSession()

  if (!session) {
    return <h1>Go log in</h1>
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
