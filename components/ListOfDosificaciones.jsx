'use client'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

import { Button } from "./ui/button"
import { getDosificacion, getDosificacionByID } from '@/app/services/dosificacion'
import React, { useEffect } from 'react'
import DeleteDosificacionButton from "./DeleteDosificacionButton"
import { useRouter } from 'next/navigation'

export default function ListOfDosificaciones({id, tipo}) {
  const [dosificaciones, setDosificaciones] = React.useState(null)
  const router = useRouter()

  // si es administrador, obtiene todas las dosificaciones
  useEffect(() => {
    async function getDosificaciones() {
      let dosificacion = []
      if(tipo === "Administrador") {
        dosificacion = await getDosificacion()
      }else{
        dosificacion = await getDosificacionByID({id})
      }
      setDosificaciones(dosificacion)
    }
    getDosificaciones()
  }, [id, tipo])

  const handleEditDosificacion = (dosificacion) => {
    const destination = '/dashboard/dosificaciones/dosificacion?idusuario=' + dosificacion.idusuario + '&idcarrera=' + dosificacion.idcarrera + '&idmateria=' + dosificacion.idmateria + '&idunidad=' + dosificacion.unidad + '&idtema=' + dosificacion.tema
    router.push(destination)
  }

    return (
      <>
      {/* // si no hay dosificaciones o estan cargando, muestra un mensaje */}
        {!dosificaciones ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-xl">Cargando...</p>
          </div>
        ):
        <Table>
        <TableCaption>Lista de dosificaciones</TableCaption>
        <TableHeader>
          <TableRow>
            {tipo === "Administrador" ? <TableHead> ID Usuario </TableHead> : null}
            {tipo === "Administrador" ? <TableHead> Usuario </TableHead> : null}
            <TableHead> ID Carrera </TableHead>
            <TableHead> ID Materia </TableHead>
            <TableHead> Nombre Materia </TableHead>
            <TableHead> Unidad </TableHead>
            <TableHead> Nombre Unidad </TableHead>
            <TableHead> Tema </TableHead>
            <TableHead> Nombre Tema </TableHead>
            <TableHead> Tiempo </TableHead>
            <TableHead className="text-right"> Accion </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dosificaciones.map((item) => (
          <TableRow key={item.idmateria}>
            {tipo === "Administrador" ? <TableCell className="font-medium">{item.idusuario}</TableCell> : null}
            {tipo === "Administrador" ? <TableCell className="font-medium">{item.usuario}</TableCell> : null}
            <TableCell>{item.idcarrera}</TableCell>
            <TableCell>{item.idmateria}</TableCell>
            <TableCell>{item.nombremateria}</TableCell>
            <TableCell>{item.unidad}</TableCell>
            <TableCell>{item.nombreunidad}</TableCell>
            <TableCell>{item.tema}</TableCell>
            <TableCell>{item.nombretema}</TableCell>
            <TableCell>{item.tiempo}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" onClick={() => handleEditDosificacion(item)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </Button>
              <DeleteDosificacionButton dosificacion={item} setDosificaciones={setDosificaciones} />
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>}
      </>
    )
}
