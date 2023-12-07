import CreateNewUser from '@/components/CreateNewUser'
import ListOfDosificaciones from '@/components/ListOfDosificaciones'
import React from 'react'
import { cookies } from 'next/headers'

export default function page() {
  const cookieStore = cookies()
  const user = cookieStore.get('usuario')
  const { id, tipo } = JSON.parse(user.value)
  return (
    <>
      <ListOfDosificaciones id={id} tipo={tipo}/>
      {/* <CreateNewUser /> */}
    </>
  )
}
