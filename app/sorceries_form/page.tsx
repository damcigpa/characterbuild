'use client'
import Form from '@/Components/Form'
import { useRouter } from 'next/navigation'
import PageWrapper from '@/Components/PageWrapper'

export default function ArmorForm() {
  const router = useRouter()
  return (
    <>
      <PageWrapper>
        <Form formType="sorceries" inputType="checkbox" />
      </PageWrapper>
      <button type="submit" onClick={() => router.push('/incantations_form')}>
        Submit
      </button>
    </>
  )
}
