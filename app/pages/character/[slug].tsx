import { useRouter } from 'next/router'

const CharacterPage = () => {
  const router = useRouter()
  const { slug } = router.query // This will get the dynamic `id` from the URL

  return (
    <div>
      <h1>Card Details</h1>
      <p>Card ID: {slug}</p>
    </div>
  )
}

export default CharacterPage
