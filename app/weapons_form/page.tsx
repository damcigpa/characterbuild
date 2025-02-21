// pages/stats.js
'use client'
import Form from "@/Components/Form"
import { useRouter } from 'next/navigation'

export default function WeaponForm() {
  const router = useRouter();
  return (
    <>
      <Form formType="weapons" inputType="radio" />
      <button type="submit" onClick={() => router.push('/armors_form')}>
        Submit
      </button>
    </>
  )
}
