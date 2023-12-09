'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "./ui/button"
import DeleteMateriaButton from "./DeleteMateriaButton";
import { getMateria } from '@/app/services/materia'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ListOfMaterias() {
    const [materias, setMaterias] = React.useState([])
    const router = useRouter()

    const handleEditMateria = (materia) => {
      const destination = '/dashboard/materias/materia?id=' + materia.idmateria + '&unidad=' + materia.unidad + '&tema=' + materia.tema
      router.push(destination)
    }

    useEffect(() => {
      async function getMaterias() {
        const data = await getMateria()
        setMaterias(data)
      }
      getMaterias()
    }, [])

    return (
      <>
      {materias.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-xl">Cargando...</p>
        </div>
      ):
        <Table>
        <TableCaption>Lista de materias registradas en el sistema</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead> ID Carrera </TableHead>
            <TableHead> ID Materia </TableHead>
            <TableHead> Nombre Materia </TableHead>
            <TableHead> Hrs Semana </TableHead>
            <TableHead> Unidad </TableHead>
            <TableHead> Nombre Unidad </TableHead>
            <TableHead> Tema </TableHead>
            <TableHead> Nombre Tema </TableHead>
            <TableHead className="text-right"> Accion </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materias.map((item) => (
          <TableRow key={item.idmateria}>
            <TableCell>{item.idcarrera}</TableCell>
            <TableCell>{item.idmateria}</TableCell>
            <TableCell>{item.nombremateria}</TableCell>
            <TableCell>{item.horassemana}</TableCell>
            <TableCell>{item.unidad}</TableCell>
            <TableCell>{item.nombreunidad}</TableCell>
            <TableCell>{item.tema}</TableCell>
            <TableCell>{item.nombretema}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" onClick={() => handleEditMateria(item)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </Button>
              <DeleteMateriaButton idmateria={item.idmateria} unidad={item.unidad} tema={item.tema} setMaterias={setMaterias}/>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>}
      </>
    )
}
