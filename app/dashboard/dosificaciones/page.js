import ListOfDosificaciones from '@/components/ListOfDosificaciones'
import React from 'react'
import { cookies } from 'next/headers'
import NewRegisterButton from '@/components/NewRegisterButton'

export default function page() {
  const cookieStore = cookies()
  const user = cookieStore.get('usuario')
  const { id, tipo } = JSON.parse(user.value)
  let href = ''
  if(tipo === 'Administrador'){
    href = '/dashboard/dosificaciones/dosificacion'
  }else{
    href = `/dashboard/dosificaciones/dosificacion?id=${id}`
  }
  return (
    <>
      <div className="flex justify-end pb-4">
        <NewRegisterButton name={'Nueva Dosificación'} href={href}/>
      </div>
      <ListOfDosificaciones id={id} tipo={tipo}/>
    </>
  )
}
