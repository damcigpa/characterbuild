import { fetchData } from './Utils/utils'
import Character from '@/Components/Character'
import { CharacterInterface } from '@/Interfaces/Interfaces'

export default async function Home() {
  const data = await fetchData('http://localhost:5474/api/characters/get')

  return (
    <>
      <h1>Characters</h1>
      {data.character.map((item: CharacterInterface) => {
        return (
          <div key={item.id}>
             <Character character={item} id={item.id}/>
          </div>
        )
      })}
    </>
  )
}
