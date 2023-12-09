import ListOfMaterias from '@/components/ListOfMaterias'
import React from 'react'
import { cookies } from 'next/headers'
import NewRegisterButton from '@/components/NewRegisterButton'

export default function page() {
  return (
    <>
    <div className="flex justify-end pb-4">
      <NewRegisterButton name={'Nueva Materia'} href={'/dashboard/materias/materia'}/>
    </div>
    <ListOfMaterias/>
    </>
  )
}
