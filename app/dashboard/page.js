import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function page() {
    const cookieStore = cookies()
    const user = cookieStore.get('usuario')
    const { nombre, apellido } = JSON.parse(user.value)
    if (!user) {
        redirect('/')
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-8xl">Bienvenido {nombre} {apellido}</h1>
        </div>
    )
}
