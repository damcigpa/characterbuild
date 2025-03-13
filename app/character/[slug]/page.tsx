import { fetchData } from '@/app/Utils/utils'

const CharacterPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  const data = await fetchData(`http://localhost:5474/api/character/get?id=${slug}`)

  return (
    <div>
      <h1>{data.character.name}</h1>
    </div>
  )
}

export default CharacterPage
