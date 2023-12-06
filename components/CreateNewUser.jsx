'use client'
export default function CreateNewUser () {
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
            <div className="w-full space-y-6 sm:max-w-md">
                <div className="text-center">
                    <div className="mt-5 space-y-2">
                        <h3 className="text-2xl font-bold sm:text-3xl">Nuevo Usuario</h3>
                    </div>
                </div>
                <div className="shadow p-4 py-6 sm:p-6 sm:rounded-lg">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-5"

                    >
                        <div>
                            <label className="font-medium">
                                Usuario
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Tipo
                            </label>
                            <select
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            >
                                <option value="Administrador">Administrador</option>
                                <option value="Usuario">Docente</option>
                            </select>
                        </div>
                        <div>
                            <label className="font-medium">
                                Nombre
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Apellido
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg mb-4"
                            />
                        </div>
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        >
                            Crear Usuario
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}