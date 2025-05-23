import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { extractObjectFromLocalStorage } from '../Utils/utils'

export const useUploadImage = () => {
    const [fileName, setFileName] = useState<string | null>(null)

    const uploadImage = async (file: File): Promise<string> => {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/images/post', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      return data.fileName
    }

    const {
      mutate: upload,
      status,
      isError,
      isSuccess,
      error,
    } = useMutation({
      mutationFn: uploadImage,
      onSuccess: (fileName) => {
        const obj = extractObjectFromLocalStorage()
        if (!obj) return
        obj.image = fileName
        localStorage.setItem('character', JSON.stringify(obj))
        setFileName(fileName)
      },
    })

    return { upload, status, isError, isSuccess, error, fileName, setFileName }
}

