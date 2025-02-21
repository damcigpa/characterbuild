'use client'
import Form from '@/Components/Form'
import { useRouter } from 'next/navigation'

export default function ArmorForm() {
  const router = useRouter()
  return (
    <>
      <Form formType="sorceries" inputType="checkbox" />
      <button type="submit" onClick={() => router.push('/incantations_form')}>
        Submit
      </button>
    </>
  )
}
