import { BASE_API_URL } from "@/utils/constants";

export async function getMateria() {
    const res = await fetch(`${BASE_API_URL}/api/materia` );
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function getMateriaById(id, unidad, tema) {
    const res = await fetch(`${BASE_API_URL}/api/materia?id=${id}&unidad=${unidad}&tema=${tema}`);
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function getMateriasByIdCarrera(id) {
    const res = await fetch(`${BASE_API_URL}/api/materia?idcarrera=${id}`);
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function getUnidadesByIdCarreraMateria(idcarrera, materia) {
    const res = await fetch(`${BASE_API_URL}/api/materia?idcarrera=${idcarrera}&id=${materia}`);
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function getTemasByIdCarreraMateriaUnidad(idcarrera, materia, unidad) {
    const res = await fetch(`${BASE_API_URL}/api/materia?idcarrera=${idcarrera}&id=${materia}&unidad=${unidad}`);
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function createMateria(materia) {
    const res = await fetch(`${BASE_API_URL}/api/materia`, {
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
    const res = await fetch(`${BASE_API_URL}/api/materia?id=${id}`, {
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

export async function deleteMateria(materia) {
    const { idmateria, unidad, tema } = materia
    const res = await fetch(`${BASE_API_URL}/api/materia?idmateria=${idmateria}&unidad=${unidad}&tema=${tema}`, {
        method: 'DELETE'
    })
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function getNombreMateriaByCarreraMateria(idcarrera, idmateria) {
    const res = await fetch(`${BASE_API_URL}/api/materia?idcarrera=${idcarrera}&id=${idmateria}&request=nombre`);
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}