'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { auth } from "../services/auth"
import { useCookies } from 'next-client-cookies'
import { redirect, useRouter } from 'next/navigation'
export default function Login (){

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const cookies = useCookies();
    const router = useRouter()
    const user = cookies.get('usuario')
    if(user){
        redirect('/dashboard')
    }
    async function onSubmit (e) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        const data = await auth(e.target[0].value, e.target[1].value)
        if(!data.error){
            cookies.set('usuario', JSON.stringify({id: data.id, usuario:data.usuario, tipo: data.tipo, nombre: data.nombre, apellido: data.apellido}))
            setLoading(false)
        }
        setError(data.error)
        setLoading(false)
    }

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full">
                <div className="text-center">
                    <div className="mt-5 space-y-2">
                        <h3 className="text-2xl font-bold sm:text-3xl">Ingresa tus credenciales</h3>
                        {/* <p className="">No tienes una cuenta? <a href="javascript:void(0)" className="font-medium text-indigo-600 hover:text-indigo-500">Registrarse</a></p> */}
                    </div>
                </div>
                <form
                    onSubmit={onSubmit}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <Label>
                            Usuario
                        </Label>
                        <Input type="text" required className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" placeholder="Ingresa tu usuario"/>
                    </div>
                    <div>
                        <Label>
                            Contraseña
                        </Label>
                        <Input type="password" required className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" placeholder="Ingresa tu contraseña"/>
                    </div>
                    <Button type="submit" className="w-full px-4 py-2 font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 text-white" disabled={loading}>
                        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Accesando...</> : <>Ingresar</>}
                    </Button>
                </form>
                <div className="mt-5 text-center">
                    {error && <Label className="mt-5 text-center text-red-500">{error}</Label>}
                </div>
            </div>
        </main>
    )
}