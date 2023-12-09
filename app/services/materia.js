export async function getMateria() {
    const res = await fetch('http://localhost:3000/api/materia');
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function getMateriaById(id) {
    const res = await fetch(`http://localhost:3000/api/materia/${id}`);
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function createMateria(materia) {
    const res = await fetch('http://localhost:3000/api/materia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(materia)
    })
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return { data }
}

export async function updateMateria(id, materia) {
    const res = await fetch(`http://localhost:3000/api/materia/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(materia)
    })
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return { data }
}

export async function deleteMateria(id) {
    const res = await fetch(`http://localhost:3000/api/materia/${id}`, {
        method: 'DELETE'
    })
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}
