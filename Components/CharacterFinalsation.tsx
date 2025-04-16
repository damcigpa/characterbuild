'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function CharacterFinalization() {
  const [file, setFile] = useState<File | null>(null)
  const { data: session } = useSession()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const char = localStorage.getItem('character')
    const obj = char ? JSON.parse(char) : {}
    obj.userId = session?.user.id

    fetch('http://localhost:5474/api/characters/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then(() => {
        localStorage.removeItem('character')
        router.push('/character_list')
      })
      .catch((error) => console.error('Error:', error))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const char = localStorage.getItem('character')
    const obj = char ? JSON.parse(char) : {}

    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/images/post', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    obj.image = data.fileName
    localStorage.setItem('character', JSON.stringify(obj))
  }

  return (
    <div>
      <h1>Upload a File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <button onClick={submitHandler}>Submit</button>
    </div>
  )
}
