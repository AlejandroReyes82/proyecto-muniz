'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { useSearchParams, useRouter } from 'next/navigation'
import { getMateriasByIdCarrera, getTemasByIdCarreraMateriaUnidad, getUnidadesByIdCarreraMateria } from '@/app/services/materia'
import { createDosificacion, getDosificacionByIdCarreraMateriaUnidadTema, updateDosificacion } from '@/app/services/dosificacion'
import { useCookies } from 'next-client-cookies'

export default function DosificacionForm() {

    const [unidades, setUnidades] = React.useState([])
    const [temas, setTemas] = React.useState([])
    const [materias, setMaterias] = React.useState([])
    const [nombreunidad, setNombreUnidad] = React.useState('')
    const [nombretema, setNombreTema] = React.useState('')
    const [nombremateria, setNombreMateria] = React.useState('')
    const [loading, setLoading] = useState(false)
    const [selectedIdCarrera, setSelectedIdCarrera] = useState(null)
    const [selectedIdMateria, setSelectedIdMateria] = useState(null)
    const [dosificacion, setDosificacion] = useState(null)

    const [loadingNombreMateria, setLoadingNombreMateria] = useState(false)
    const [loadingNombreUnidad, setLoadingNombreUnidad] = useState(false)
    const [loadingNombreTema, setLoadingNombreTema] = useState(false)

    const idcarrera = useSearchParams().get('idcarrera')
    const idmateria = useSearchParams().get('idmateria')
    const idunidad = useSearchParams().get('idunidad')
    const idtema = useSearchParams().get('idtema')
    const idusuario = useSearchParams().get('idusuario')

    const router = useRouter()
    const cookies = useCookies()
    const user = cookies.get('usuario')
    const { id } = JSON.parse(user)

    // Cuando se edita una dosificacion, obtiene la dosificacion por idcarrera, idmateria, idunidad, idtema
    useEffect(() => {
            if (idcarrera && idmateria && idunidad && idtema && idusuario) {
            const getDosificacion = async () => {
                const dosificacionbycarreramateriaunidadtema = await getDosificacionByIdCarreraMateriaUnidadTema({idcarrera, idmateria, idunidad, idtema, idusuario})
                setDosificacion(dosificacionbycarreramateriaunidadtema[0])
            }
            getDosificacion()
        }
    }, [idcarrera, idmateria, idunidad, idtema, idusuario])

    // Cuando se selecciona una carrera, obtiene las materias de la carrera seleccionada
    const handleSelectCarrera = async (e) => {
        // se activa el loading
        setLoadingNombreMateria(true)
        // se limpian los campos
        setMaterias([])
        // Obtiene las materias de la carrera seleccionada
        // pasamos el id de la carrera seleccionada a numero entero
        const selectedValueCarrera = parseInt(e.target.value, 10);
        // asignamos el id de la carrera seleccionada al estado
        setSelectedIdCarrera(selectedValueCarrera)
        // obtenemos las materias de la carrera seleccionada de la base de datos
        const materiasbycarrera = await getMateriasByIdCarrera(selectedValueCarrera)
        // seteamos las materias obtenidas al estado
        setMaterias(materiasbycarrera)
        // desactivamos el loading
        setLoadingNombreMateria(false)
    }

    // Cuando se selecciona una materia, obtiene las unidades de la carrera y materia seleccionada y el nombre de la materia seleccionada
    const handleSelectMateria = async (e) => {
        setLoadingNombreUnidad(true)
        // Obtiene las unidades de la carrera y materia seleccionada
        const selectedValueMateria = parseInt(e.target.value, 10);
        // si no se selecciona una materia, se setea el estado a string vacio, y por consecuencia se limpia el campo nombre
        if (selectedValueMateria === 0) {
            setNombreMateria('')
            return;
        }
        // asignamos el id de la materia seleccionada al estado
        setSelectedIdMateria(selectedValueMateria)
        // obtenemos las unidades de la carrera y materia seleccionada de la base de datos
        const unidad = await getUnidadesByIdCarreraMateria(idcarrera ? idcarrera : selectedIdCarrera, selectedValueMateria)
        // seteamos las unidades obtenidas al estado
        setUnidades(unidad)

        // Setea el nombre de la materia seleccionada
        const selectedMateria = materias.find(materia => materia.idmateria === selectedValueMateria)
        setNombreMateria(selectedMateria.nombremateria)
        setLoadingNombreUnidad(false)
    }

    const handleSelectUnidad = async (e) => {
        setLoadingNombreTema(true)
        // Obtiene los temas de la carrera, materia y unidad seleccionada
        const selectedValueUnidad = parseInt(e.target.value, 10);
        if (selectedValueUnidad === 0) {
            setNombreUnidad('')
            return;
        }
        const tema = await getTemasByIdCarreraMateriaUnidad(selectedIdCarrera, selectedIdMateria, selectedValueUnidad)
        setTemas(tema)

        // Setea el nombre de la unidad seleccionada
        const selectedUnidad = unidades.find(unidad => unidad.unidad === selectedValueUnidad)
        setNombreUnidad(selectedUnidad.nombreunidad)
        setLoadingNombreTema(false)
    }

    const handleSearchNombreTema = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        if (selectedValue === 0) {
            setNombreTema('')
            return;
        }
        const selectedTema = temas.find(tema => tema.tema === selectedValue)
        setNombreTema(selectedTema.nombretema)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
const dosificacionData = {
            idusuario: idusuario ? idusuario : id,
            idcarrera: e.target[0].value,
            idmateria: e.target[1].value,
            unidad: e.target[3].value,
            tema: e.target[5].value,
            tiempo: e.target[7].value
        }
        let result = {data: {error: "Sin conexion al servicio", message: null}}
        // si se edita una dosificacion, se actualiza, sino se crea
        if (dosificacion) {
            // si es una dosificacion existente, se toma la informacion del estado y se agrega el idusuario al objeto dosificacion
            const newDosificacion = {...dosificacion, idusuario: parseInt(idusuario)}
            result = await updateDosificacion({newDosificacion})
        } else {
                        result = await createDosificacion({dosificacionData})
        }
        // si no hay error, muestra mensaje de exito y redirecciona a la lista de dosificaciones
        if (!result.data.error) {
            toast.success(result.data.message)
            e.target.reset()
            // se espera 1 segundo para redireccionar para alcanzar a ver el mensaje de exito
            setTimeout(() => {
                router.push("/dashboard/dosificaciones")
            }, 1000)
        }else{
            toast.error(result.data.error)
            e.target[0].select()
        }
        setLoading(false)
    }


  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
    <div className="w-full space-y-6 sm:max-w-md">
        <div className="text-center">
            <div className="mt-5 space-y-2">
                <h3 className="text-2xl font-bold sm:text-3xl">{idcarrera ? <>Editar Dosificación</>:<>Nueva Dosificación</>}</h3>
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
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        onBlur={handleSelectCarrera}
                        value={dosificacion ? dosificacion.idcarrera : undefined}
                        />
                </div>
                <div>
                    <label className="font-medium">
                        ID Materia
                    </label>
                    <select
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        name="idmateria"
                        onChange={handleSelectMateria}
                        value={dosificacion ? dosificacion.idmateria : undefined}
                        disabled={dosificacion ? true : false}
                        >
                        <option value="0">{loadingNombreMateria ? <>Cargando...</>:<>Seleccione una Materia</>}</option>
                        {/* // si se edita una dosificacion, se muestra la materia seleccionada */}
                        {dosificacion && <option key={dosificacion.idmateria} value={dosificacion.idmateria} >{dosificacion.idmateria}</option>}
                        {/* // si no se edita una dosificacion, se muestran las materias de la carrera seleccionada */}
                        {materias && materias.map((materia) => (
                            <option key={materia.idmateria} value={materia.idmateria}>{materia.idmateria}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="font-medium">
                        Nombre Materia
                    </label>
                    <input
                        type="text"
                        name="nombremateria"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        value={dosificacion ? dosificacion.nombremateria : nombremateria}
                        readOnly
                    />
                </div>
                <div>
                    <label className="font-medium">
                        Unidad
                    </label>
                    <select
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        name="unidad"
                        onChange={handleSelectUnidad}
                        value={dosificacion ? dosificacion.unidad : undefined}
                        disabled={dosificacion ? true : false}
                    >
                        <option value="0">{loadingNombreUnidad ? <>Cargando...</>:<>Seleccione una Unidad</>}</option>
                        {dosificacion && <option key={dosificacion.unidad} value={dosificacion.unidad} >{dosificacion.unidad}</option>}
                        {unidades && unidades.map((unidad) => (
                            <option key={unidad.unidad} value={unidad.unidad}>{unidad.unidad}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="font-medium">
                        Nombre Unidad
                    </label>
                    <input
                        type="text"
                        name="nombreunidad"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        value={dosificacion ? dosificacion.nombreunidad : nombreunidad}
                        readOnly
                    />
                </div>
                <div>
                    <label className="font-medium">
                        Tema
                    </label>
                    <select
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        name="tema"
                        onChange={handleSearchNombreTema}
                        value={dosificacion ? dosificacion.tema : undefined}
                        disabled={dosificacion ? true : false}
                    >
                        <option value="0">{loadingNombreTema ? <>Cargando...</>:<>Seleccione un Tema</>}</option>
                        {dosificacion && <option key={dosificacion.tema} value={dosificacion.tema} >{dosificacion.tema}</option>}
                        {temas && temas.map((tema) => (
                            <option key={tema.tema} value={tema.tema}>{tema.tema}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="font-medium">
                        Nombre Tema
                    </label>
                    <input
                        type="text"
                        name="nombretema"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        value={dosificacion ? dosificacion.nombretema : nombretema}
                        readOnly
                    />
                </div>
                <div>
                    <label className="font-medium">
                        Tiempo
                    </label>
                    <input
                        type="number"
                        name="tiempo"
                        required
                        value={dosificacion ? dosificacion.tiempo : undefined}
                        onChange={(event) => dosificacion && setDosificacion({ ...dosificacion, tiempo: event.target.value })}
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <Button type="submit" className="w-full px-4 py-2 font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 text-white" disabled={loading}>
                    {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cargando... </> : idcarrera ? <>Guardar Cambios</> : <>Guardar Dosificación</>}
                </Button>
            </form>
        </div>
    </div>
    <Toaster richColors />
</main>
)}
