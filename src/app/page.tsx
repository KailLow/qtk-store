import Image from 'next/image'
import Sibebar from '@/components/Sidebar'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Sibebar />
      <p>asas</p>
      <Link href='/signin'>Login</Link>
      <Link href='/customers'>customer</Link>
    </main>
  )
}
