'use client'
import Form from '@/Components/Form'
import { useRouter } from 'next/navigation'

export default function TalismanForm() {
  const router = useRouter()
  return (
    <>
      <Form formType="talismans" inputType="checkbox" />
      <button type="submit" onClick={() => router.push('/sorceries_form')}>
        Submit
      </button>
    </>
  )
}
