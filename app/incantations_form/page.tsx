'use client'
import Form from '@/Components/Form'
import { useRouter } from 'next/navigation'

export default function IncantationsForm() {
  const router = useRouter()
  return (
    <>
      <Form formType="incantations" inputType="checkbox" />
      <button type="submit" onClick={() => router.push('/character_finalization')}>
        Submit
      </button>
    </>
  )
}
