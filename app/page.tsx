import { fetchData } from "./Utils/utils"
import { Weapon } from "@prisma/client"
export default async function Home() {
  const data = await fetchData('http://localhost:5474/api/character/get')
  console.log(data)

return (
  <>
    <h1>Characters</h1>
    {data.character.map((item: Weapon) =>{
      return <div key={item.id}>{item.name}</div>
    })}
  </>
)
}
