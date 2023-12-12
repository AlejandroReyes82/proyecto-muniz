import { BASE_API_URL } from "@/utils/constants"

export async function auth(usuario,contrasena){
    const res = await fetch(`${BASE_API_URL}/api/auth`, {
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
