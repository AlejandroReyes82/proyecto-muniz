import React from 'react'
import ListOfUsers from '../../../components/ListOfUsers'
import NewRegisterButton from '@/components/NewRegisterButton'
export default function Usuarios() {

  return (
    <>
      <div className="flex justify-end pb-4">
        <NewRegisterButton name={'Nuevo Usuario'} href={'/dashboard/usuarios/user'}/>
      </div>
      <ListOfUsers />
    </>
  )
}
