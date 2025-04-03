import { fetchData } from '../Utils/utils'
import Character from '@/Components/Character'
import { CharacterInterface } from '@/Interfaces/Interfaces'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/lib/auth'
import { useLoginSession } from '../Hooks/useLoginSession'



export default async function CharacterList() {
   const session = await useLoginSession()

    if (!session) {
      return <h1>Go log in</h1>
    }

  const data = await fetchData(`http://localhost:5474/api/characters/get?userId=${session.user.id}`)

  return (
    <>
      <h1>Characters</h1>

      {data.characters.map((item: CharacterInterface) => {
        return (
          <div key={item.id}>
            <Character character={item} id={item.id} userId={session.user.id}/>
          </div>
        )
      })}
    </>
  )
}
