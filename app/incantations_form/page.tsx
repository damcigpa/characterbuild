'use client'
import Form from '@/Components/Form'
import { useRouter } from 'next/navigation'
import PageWrapper from '@/Components/PageWrapper'

export default function IncantationsForm() {
  const router = useRouter()
  return (
    <>
      <PageWrapper>
        <Form formType="incantations" inputType="checkbox" />
      </PageWrapper>
      <button
        type="submit"
        onClick={() => router.push('/character_finalization')}
      >
        Submit
      </button>
    </>
  )
}
