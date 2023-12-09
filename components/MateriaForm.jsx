'use client'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { useState } from 'react'
import { createMateria, getMateriaById, updateMateria } from '@/app/services/materia'
import { useRouter, useSearchParams } from 'next/navigation'

export default function MateriaForm() {
    const [loading, setLoading] = useState(false)
    const [materia, setMateria] = useState({})
    const router = useRouter()
    const id = useSearchParams().get('id')
    const unidad = useSearchParams().get('unidad')
    const tema = useSearchParams().get('tema')

    useEffect(() => {
        async function getMateriaToEdit() {
            const data = await getMateriaById(id, unidad, tema)
            setMateria(data[0])
        }
        if (id){
            getMateriaToEdit()
        }
    }, [id, unidad, tema])

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const data = new FormData(e.target)
        const mat = {
            idcarrera: data.get('idcarrera'),
            idmateria: data.get('idmateria'),
            nombremateria: data.get('nombremateria'),
            horassemana: data.get('horassemana'),
            unidad: data.get('idunidad'),
            nombreunidad: data.get('nombreunidad'),
            idtema: data.get('idtema'),
            nombretema: data.get('nombretema')
        }
        setMateria(mat)
        let result = {}
        if(id){
            result = await updateMateria(id, mat)
        }else{
            result = await createMateria(mat)
        }
        if (!result.data.error) {
            toast.success(result.data.message)
            e.target.reset()
            setMateria({})
            setTimeout(() => {
                router.push("/dashboard/materias")
            }, 1000)
        }else{
            toast.error(result.data.error)
            e.target[0].select()
        }
        setLoading(false)
    }

  return (
    <>
    {id && !materia ? <h1 className="text-2xl font-bold sm:text-3xl">Cargando datos: {materia?.nombremateria}</h1> :
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
                <div className="w-full space-y-6 sm:max-w-md">
                    <div className="text-center">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-2xl font-bold sm:text-3xl">{id ? <>Editar Materia</>:<>Nueva Materia</>}</h3>
                        </div>
                    </div>
                    <div className="shadow p-4 py-6 sm:p-6 sm:rounded-lg">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div>
                                <label className="font-medium">
                                    ID Carrera
                                </label>
                                <input
                                    type="number"
                                    name="idcarrera"
                                    required
                                    onChange={(event) => setMateria({ ...materia, idcarrera: event.target.value })}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    value={id ? materia?.idcarrera : null}
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    ID Materia
                                </label>
                                <input
                                    type="number"
                                    name="idmateria"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    value={id ? materia?.idmateria : null}
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Nombre Materia
                                </label>
                                <input
                                    type="text"
                                    name="nombremateria"
                                    required
                                    onChange={(event) => setMateria({ ...materia, nombremateria: event.target.value })}
                                    value={id ? materia?.nombremateria : null}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Horas Semana
                                </label>
                                <input
                                    type="number"
                                    name="horassemana"
                                    required
                                    onChange={(event) => setMateria({ ...materia, horassemana: event.target.value })}
                                    value={id ? materia?.horassemana : null}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    ID Unidad
                                </label>
                                <input
                                    type="number"
                                    name="idunidad"
                                    required
                                    onChange={(event) => setMateria({ ...materia, unidad: event.target.value })}
                                    value={id ? materia?.unidad : null}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Nombre Unidad
                                </label>
                                <input
                                    type="text"
                                    name="nombreunidad"
                                    required
                                    onChange={(event) => setMateria({ ...materia, nombreunidad: event.target.value })}
                                    value={id ? materia?.nombreunidad : null}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    ID Tema
                                </label>
                                <input
                                    type="number"
                                    name="idtema"
                                    required
                                    onChange={(event) => setMateria({ ...materia, tema: event.target.value })}
                                    value={id ? materia?.tema : null}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Nombre Tema
                                </label>
                                <input
                                    type="text"
                                    name="nombretema"
                                    required
                                    value={id ? materia?.nombretema : null}
                                    onChange={(event) => setMateria({ ...materia, nombretema: event.target.value })}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg mb-4"
                                />
                            </div>
                            <Button type="submit" className="w-full px-4 py-2 font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 text-white" disabled={loading}>
                                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cargando... </> : id ? <>Guardar Cambios</> : <>Crear Materia</>}
                            </Button>
                        </form>
                    </div>
                </div>
                <Toaster richColors />
            </main>}
    </>
  )
}
