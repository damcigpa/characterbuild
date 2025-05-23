import { useMutation } from '@tanstack/react-query'
import { extractObjectFromLocalStorage } from '../Utils/utils'

export const useDeleteImage = (clearStates: () => void) => {
  const deleteImage = async (fileName: string): Promise<void> => {
    const encodedFileName = encodeURIComponent(fileName)
    const res = await fetch(`/api/images/${encodedFileName}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Delete failed')
    }
  }

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      clearStates()
      const obj = extractObjectFromLocalStorage()
      if (!obj) return
      obj.image = ''
      localStorage.setItem('character', JSON.stringify(obj))
    },
  })

  return { deleteMutate }
}
