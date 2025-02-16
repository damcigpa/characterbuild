import { PageContextProvider } from '@/Contexts/PageContext'

export default function Home() {
  return (
    <PageContextProvider>
      <h1>Hello, World!</h1>
    </PageContextProvider>
  )
}
