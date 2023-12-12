export async function auth(usuario,contrasena){
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const res = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario,
            pass: contrasena
        })
    })
    if(!res.ok || res.body === null){
        return {error: 'Usuario y/o contraseña incorrectos'}
    }
    const data = await res.json()
    return data[0]
}
