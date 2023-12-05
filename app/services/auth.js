export async function auth(user,pass){
    const res = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            pass: pass
        })
    })
    if(!res.ok || res.body === null){
        return {error: 'Usuario y/o contraseña incorrectos'}
    }
    const data = await res.json()
    return data[0]
}
