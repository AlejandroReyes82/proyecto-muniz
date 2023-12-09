export async function getUsuarios(){
    const res = await fetch('http://localhost:3000/api/usuario')
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function deleteUsuario({id}){
    console.log(id)
    const res = await fetch(`http://localhost:3000/api/usuario?id=${id}`,{
        method: 'DELETE'
    })
    if(!res.ok || res.body === null){
        return {error: 'Error eliminando usuario'}
    }
    const data = await res.json()
    return data
}

export async function postUsuario({userData})  {
    const res = await fetch('http://localhost:3000/api/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json();
    return {data}
}

export async function getUsuarioById(id){
    const res = await fetch(`http://localhost:3000/api/usuario?id=${id}`)
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json()
    return data
}

export async function putUsuario(userData, id) {
    const res = await fetch(`http://localhost:3000/api/usuario?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    if(!res.ok || res.body === null){
        return {error: 'Error obteniendo datos de la base de datos'}
    }
    const data = await res.json();
    return {data}
}
