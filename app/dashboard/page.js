import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function page() {
    const cookieStore = cookies()
    const user = cookieStore.get('usuario')
    if (!user) {
        redirect('/')
    }
    return (
        <h1>Dashboard</h1>
    )
}
