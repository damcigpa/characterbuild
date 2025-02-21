'use client'
import Form from '@/Components/Form'
import { useRouter } from 'next/navigation'

export default function ArmorForm() {
  const router = useRouter()
  return (
    <>
      <Form formType="armors" inputType="checkbox" />
      <button type="submit" onClick={() => router.push('/talisman_form')}>
        Submit
      </button>
    </>
  )
}
