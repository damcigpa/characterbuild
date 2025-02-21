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
