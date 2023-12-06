import ListOfMaterias from '@/components/ListOfMaterias'
import React from 'react'
import { cookies } from 'next/headers'

export default function page() {
  const cookieStore = cookies()
  const user = cookieStore.get('usuario')
  const { id } = JSON.parse(user.value)
  return (
    <ListOfMaterias id={id} />
  )
}
