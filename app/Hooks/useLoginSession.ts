import { getServerSession } from 'next-auth'
import { authOptions } from '../api/lib/auth'

export async function useLoginSession() {
  try {
    const session = await getServerSession(authOptions)
    return session
  } catch (error) {
    console.error('Error fetching session:', error)
    return null
  }
}
