'use client'
import React from 'react'
import { Button } from './ui/button'
import { Toaster, toast } from 'sonner'
import { deleteDosificacion } from '@/app/services/dosificacion'

export default function DeleteDosificacionButton({dosificacion, setDosificaciones}) {
    const handleRemoveDosificacion = async () => {
        // llamada a la api para eliminar la dosificacion de la base de datos
        const response = await deleteDosificacion({dosificacion})
        // si la respuesta es correcta, elimina la dosificacion de la lista (estado)
        if (response) {
            setDosificaciones((prev) =>
                prev.filter(
                    (item) =>
                    item.idcarrera !== dosificacion.idcarrera ||
                    item.idmateria !== dosificacion.idmateria ||
                    item.unidad !== dosificacion.unidad ||
                    item.tema !== dosificacion.tema
                )
            );
            toast.success('Dosificacion eliminada correctamente')
        } else {
            toast.error('Error al eliminar dosificacion')
        }
    }

    return (
        <>
            <Button variant="ghost" className="text-red-500" onClick={() => handleRemoveDosificacion()}>
                <svg arial-label="Eliminar Usuario" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </Button>
            <Toaster richColors />
        </>
    )
}
