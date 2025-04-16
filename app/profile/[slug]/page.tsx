
import React from 'react'
import { fetchData } from '@/app/Utils/utils'
import { useLoginSession } from '@/app/Hooks/useLoginSession'
import CharacterList from '@/Components/CharacterList'

const UserProfile = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  console.log(slug)
  const session = await useLoginSession()

  if (!session) {
    return
  }

  const data = await fetchData(
    `http://localhost:5474/api/profile?userId=${session.user.id}`
  )

  return (
    <div>
     <CharacterList characters={data.characterBuilds} userId={session.user.id} />
    </div>
  )
}

export default UserProfile
