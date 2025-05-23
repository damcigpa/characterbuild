'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useUploadImage } from '@/app/Hooks/useUploadImage'
import { useDeleteImage } from '@/app/Hooks/useDeleteImage'
import { extractObjectFromLocalStorage } from '@/app/Utils/utils'

export default function CharacterFinalization() {
  const { upload, status, isError, isSuccess, error, fileName, setFileName } =
    useUploadImage()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const { data: session } = useSession()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const { deleteMutate } = useDeleteImage(() => {
    setFileName(null)
    setFile(null)
    setPreview(null)
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const obj = extractObjectFromLocalStorage()
      if (!obj) return

      if (session?.user.id) {
        obj.userId = session.user.id
      }

      const response = await fetch('/api/characters/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      })

      if (!response.ok) throw new Error('Failed to submit character')

      return response.json()
    },
    onSuccess: () => {
      localStorage.removeItem('character')
      router.push('/character_list')
    },
    onError: (error) => {
      console.error('Error:', error)
    },
  })

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    mutation.mutate()
  }

  const removeImageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    deleteMutate(fileName!)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return
    upload(file)
  }

  return (
    <div>
      <h1>Upload a File</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          ref={inputRef}
          accept="image/*"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '300px', marginTop: '10px' }}
          />
        )}
        <button type="submit">Upload</button>
        {fileName && (
          <button type="button" onClick={removeImageHandler}>
            Remove
          </button>
        )}
        {status === 'pending' && <p>Uploading...</p>}
        {isError && <p>Error: {error?.message}</p>}
        {isSuccess && fileName && <p>Image uploaded successfully!</p>}
      </form>
      <button onClick={submitHandler}>Submit</button>
    </div>
  )
}
