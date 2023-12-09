'use client'
import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { Toaster } from 'sonner'
import { useState } from 'react'

export default function MateriaForm() {
    const [loading, setLoading] = useState(false)

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
                <div className="w-full space-y-6 sm:max-w-md">
                    <div className="text-center">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-2xl font-bold sm:text-3xl">Nueva Materia</h3>
                        </div>
                    </div>
                    <div className="shadow p-4 py-6 sm:p-6 sm:rounded-lg">
                        <form
                            onSubmit={() => console.log("hola")}
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
                                    // onChange={(event) => setUser({ ...user, usuario: event.target.value })}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    // value={id ? user?.usuario : null}
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
                                    // onChange={(event) => setUser({ ...user, password: event.target.value })}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
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
                                    // onChange={(event) => setUser({ ...user, password: event.target.value })}
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
                                    // onChange={(event) => setUser({ ...user, password: event.target.value })}
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
                                    // onChange={(event) => setUser({ ...user, password: event.target.value })}
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
                                    // value={id ? user?.nombre : null}
                                    // onChange={(event) => setUser({ ...user, nombre: event.target.value })}
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
                                    // value={id ? user?.apellido : null}
                                    // onChange={(event) => setUser({ ...user, apellido: event.target.value })}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg mb-4"
                                />
                            </div>
                            <Button type="submit" className="w-full px-4 py-2 font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 text-white" disabled={loading}>
                                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cargando... </> : <>Crear Materia</>}
                            </Button>
                        </form>
                    </div>
                </div>
                <Toaster richColors />
            </main>
  )
}
