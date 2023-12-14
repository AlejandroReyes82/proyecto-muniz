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
        // Función para obtener los datos del usuario cuando se edita
        async function getUser() {
            const data = await getUsuarioById(id)
            // Se asignan los datos del usuario al estado
            setUser(data[0])
        }
        if (id){
            getUser()
        }
    }, [id])

    // Función para crear un nuevo usuario
    const handleCreateUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        // Se obtienen los datos del formulario
        const data = new FormData(e.target)
        // Se crea el objeto con los datos del usuario
        const userData = {
            usuario: data.get('username'),
            contrasena: data.get('password'),
            tipo: data.get('type'),
            nombre: data.get('name'),
            apellido: data.get('lastname')
        }
        // Se asignan los datos al estado
        setUser(userData)
        //  Se crea una variable para almacenar la respuesta del servicio y se le asigna un valor por defecto
        let result = {data: {error: "Sin conexion al servicio", message: null}}
        // Si el id existe (se está editando un usuario), se manda llamar el servicio de editar usuario
        if(id){
            result = await putUsuario(userData, id)
        }else{
            result = await postUsuario({userData})
        }
        // Se muestra un mensaje dependiendo de la respuesta del servicio
        if (!result.data.error) {
            // Se muestra un mensaje de éxito
            toast.success(result.data.message)
            // Se limpia el formulario
            e.target.reset()
            // Se limpia el estado
            setUser({})
            // Se redirige a la lista de usuarios después de 1 segundo
            setTimeout(() => {
                router.push("/dashboard/usuarios")
            }, 1000)
        }else{
            // Se muestra un mensaje de error
            toast.error(result.data.error)
            // Se selecciona el input de usuario
            e.target[0].select()
        }
        setLoading(false)
    }
    return (
        <>
        {/* // Si es una edicion de usuario y la información del usuario aun no carga, se muestra un mensaje de cargando */}
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
                                    // cuando el valor del input cambia, se asigna el valor al estado
                                    // la funcion setUser recibe el estado actual y se le asigna el valor del input
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
                                {/* // Si el estado loading es true, se muestra un icono de carga, de lo contrario se muestra el texto */}
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