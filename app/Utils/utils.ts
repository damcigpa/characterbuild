export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const isChecked = (arr: [], value: string): boolean => {
  return arr?.some((item: { id: string }) => item.id === value)
}


export const postData= async (file: File): Promise<string> => {
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
