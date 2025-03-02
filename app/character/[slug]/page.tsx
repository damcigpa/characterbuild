const CharacterPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  return (
    <div>
      <h1>Card Details</h1>
      <p>Card ID: {slug}</p>
    </div>
  )
}

export default CharacterPage
