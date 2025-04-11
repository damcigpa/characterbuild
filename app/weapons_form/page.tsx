// pages/stats.js
'use client'
import React from 'react'
import Form from "@/Components/Form"
import { useRouter } from 'next/navigation'
import PageWrapper from "@/Components/PageWrapper";

export default function WeaponForm() {
  const router = useRouter();
  return (
    <>
      <PageWrapper>
        <Form formType="weapons" inputType="radio" />
      </PageWrapper>
      <button type="submit" onClick={() => router.push('/armors_form')}>
        Submit
      </button>
    </>
  )
}
