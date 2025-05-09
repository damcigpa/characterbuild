'use client'
import React from 'react'
import Form from '@/Components/Form'
import { useRouter } from 'next/navigation'
import PageWrapper from '@/Components/PageWrapper'

export default function TalismanForm() {
  const router = useRouter()
  return (
    <>
      <PageWrapper>
        <Form formType="talismans" inputType="checkbox" />
      </PageWrapper>
      <button type="submit" onClick={() => router.push('/sorceries_form')}>
        Submit
      </button>
    </>
  )
}
