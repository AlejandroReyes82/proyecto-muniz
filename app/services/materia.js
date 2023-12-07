export async function getMateria() {
    const res = await fetch('http://localhost:3000/api/materia');
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}
