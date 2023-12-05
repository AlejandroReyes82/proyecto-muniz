
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
  const cookieStore = cookies()
  const user = cookieStore.get('usuario')
  if (user) {
    redirect('/dashboard')
  }else{
    redirect('/login')
  }
}
