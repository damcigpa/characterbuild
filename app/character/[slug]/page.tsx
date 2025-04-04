import { fetchData } from '@/app/Utils/utils'
import { useLoginSession } from '@/app/Hooks/useLoginSession'

const CharacterPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  const session = await useLoginSession()
  const data = await fetchData(
    `http://localhost:5474/api/character/get?id=${slug}&userId=${session.user.id}`
  )

  console.log('Character data:', data)

  return (
    <div>
      <h1>{data.character.name}</h1>
    </div>
  )
}

export default CharacterPage
