import CreateNewUser from '@/components/UserForm'
import ListOfDosificaciones from '@/components/ListOfDosificaciones'
import React from 'react'
import { cookies } from 'next/headers'
import NewRegisterButton from '@/components/NewRegisterButton'

export default function page() {
  const cookieStore = cookies()
  const user = cookieStore.get('usuario')
  const { id, tipo } = JSON.parse(user.value)
  return (
    <>
      <div className="flex justify-end pb-4">
        <NewRegisterButton name={'Nueva Propuesta'} href={'/dashboard/newdosificacion'}/>
      </div>
      <ListOfDosificaciones id={id} tipo={tipo}/>
    </>
  )
}
