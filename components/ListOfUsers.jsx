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

import { getUsuarios } from  "../app/services/usuario"
import { Button } from "./ui/button"
import DeleteButton from "./DeleteUserButton";
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
export default function ListOfUsers() {
  //crear estado para guardar los usuarios
  const [usuarios, setUsuarios] = React.useState([])
  //asignamos el router para navegar
  const router = useRouter()

    //Ejecutamos un useEffect para obtener los usuarios
   useEffect(() => {
    async function getUsers() {
      // Obtenemos los usuarios del servicio
      const data = await getUsuarios()
      // Guardamos los usuarios en el estado
      setUsuarios(data)
    }
    //Ejecutamos la función
    getUsers()
  }, [])

  //Función para editar un usuario
  const handleEditUser = (id) => {
    const destination = '/dashboard/usuarios/user?id=' + id
    // Navegamos a la ruta creada con el id del usuario
    router.push(destination)
  }

  return (
    <>
    {/* Verificamos si ya tenemos la lista de usuarios, si no, se renderiza Cargando... */}
      {usuarios.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-xl">Cargando...</p>
        </div>
      ):
      <Table>
        <TableCaption>Lista de usuarios registrados en el sistema</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead> ID </TableHead>
            <TableHead> Usuario </TableHead>
            <TableHead> Tipo </TableHead>
            <TableHead> Nombre </TableHead>
            <TableHead> Apellido </TableHead>
          <TableHead className="text-right"> Accion </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Recorremos los usuarios y los mostramos en la tabla */}
          {usuarios.map((item) => (
          <TableRow key={item.idusuario}>
            <TableCell className="font-medium">{item.idusuario}</TableCell>
            <TableCell>{item.usuario}</TableCell>
            <TableCell>{item.tipo}</TableCell>
            <TableCell>{item.nombre}</TableCell>
            <TableCell>{item.apellido}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" onClick={() => handleEditUser(item.idusuario)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </Button>
              {/* Pasamos el id del usuario y la función para actualizar la lista de usuarios en el boton de eliminar*/}
              <DeleteButton id={item.idusuario} setUsuarios={setUsuarios}/>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>}
    </>
  );
}