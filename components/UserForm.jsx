'use client'

import { postUsuario, putUsuario } from "@/app/services/usuario"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Toaster, toast } from "sonner"
import { useEffect } from "react"
import { getUsuarioById } from "@/app/services/usuario"
import { useRouter } from "next/navigation"

export default function CreateNewUser () {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const id = useSearchParams().get('id')
    const router = useRouter()

    useEffect(() => {
        async function getUser() {
            const data = await getUsuarioById(id)
            setUser(data[0])
        }
        if (id){
            getUser()
        }
    }, [id])

    const handleCreateUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = new FormData(e.target)
        const userData = {
            usuario: data.get('username'),
            contrasena: data.get('password'),
            tipo: data.get('type'),
            nombre: data.get('name'),
            apellido: data.get('lastname')
        }
        setUser(userData)
        let result = {data: {error: "Sin conexion al servicio", message: null}}
        if(id){
            result = await putUsuario(userData, id)
        }else{
            result = await postUsuario({userData})
        }
        if (!result.data.error) {
            toast.success(result.data.message)
            e.target.reset()
            setUser({})
            setTimeout(() => {
                router.push("/dashboard/usuarios")
            }, 1000)
        }else{
            toast.error(result.data.error)
            e.target[0].select()
        }
        setLoading(false)
    }
    return (
        <>
        {id && !user ? <h1 className="text-2xl font-bold sm:text-3xl">Cargando datos: {user?.usuario}</h1> :
            <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
                <div className="w-full space-y-6 sm:max-w-md">
                    <div className="text-center">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-2xl font-bold sm:text-3xl">{id ? <>Editar Usuario</> : <>Nuevo Usuario</>}</h3>
                        </div>
                    </div>
                    <div className="shadow p-4 py-6 sm:p-6 sm:rounded-lg">
                        <form
                            onSubmit={handleCreateUser}
                            className="space-y-5"
                        >
                            <div>
                                <label className="font-medium">
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    // onChange={(event) => setUser({ ...user, usuario: event.target.value })}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    value={id ? user?.usuario : null}
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    onChange={(event) => setUser({ ...user, password: event.target.value })}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Tipo
                                </label>
                                <select
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    name="type"
                                    value={id ? user?.tipo : "Administrador"}
                                    onChange={(event) => setUser({ ...user, tipo: event.target.value })}
                                >
                                    <option value="Administrador">Administrador</option>
                                    <option value="Docente">Docente</option>
                                </select>
                            </div>
                            <div>
                                <label className="font-medium">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={id ? user?.nombre : null}
                                    onChange={(event) => setUser({ ...user, nombre: event.target.value })}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    name="lastname"
                                    required
                                    value={id ? user?.apellido : null}
                                    onChange={(event) => setUser({ ...user, apellido: event.target.value })}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg mb-4"
                                />
                            </div>
                            <Button type="submit" className="w-full px-4 py-2 font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 text-white" disabled={loading}>
                                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cargando... </> : id ? <>Guardar cambios</> : <>Crear Usuario</>}
                            </Button>
                        </form>
                    </div>
                </div>
                <Toaster richColors />
            </main>
            }
        </>
    )
}