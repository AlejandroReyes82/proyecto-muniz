export async function getMateria() {
    const res = await fetch('http://localhost:3000/api/materia');
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function getMateriaById(id, unidad, tema) {
    const res = await fetch(`http://localhost:3000/api/materia?id=${id}&unidad=${unidad}&tema=${tema}`);
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
    const res = await fetch(`http://localhost:3000/api/materia?id=${id}`, {
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
    console.log(data)
    return { data }
}

export async function deleteMateria( materia) {
    const { idmateria, unidad, tema } = materia
    const res = await fetch(`http://localhost:3000/api/materia?idmateria=${idmateria}&unidad=${unidad}&tema=${tema}`, {
        method: 'DELETE'
    })
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}
