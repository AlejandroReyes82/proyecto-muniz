const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function getDosificacion(){
    const res = await fetch(`${API_URL}/dosificacion`)
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function getDosificacionByID({id}){
    const res = await fetch(`${API_URL}/dosificacion?id=${id}`)
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function getDosificacionByIdCarreraMateriaUnidadTema({idcarrera, idmateria, idunidad, idtema, idusuario}){
    const res = await fetch(`${API_URL}/dosificacion?idcarrera=${idcarrera}&idmateria=${idmateria}&idunidad=${idunidad}&idtema=${idtema}&id=${idusuario}`)
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function createDosificacion({dosificacionData})  {
    const res = await fetch(`${API_URL}/dosificacion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dosificacionData)
    });
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json();
    return {data}
}

export async function updateDosificacion({newDosificacion})  {
    const res = await fetch(`${API_URL}/dosificacion`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDosificacion)
    });
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json();
    return {data}
}

export async function deleteDosificacion({dosificacion})  {
    const res = await fetch(`${API_URL}/dosificacion`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dosificacion)
    });
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json();
    return {data}
}