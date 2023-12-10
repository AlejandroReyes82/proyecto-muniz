import conn from "@/app/db/conf";
export async function GET(req) {
  try {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get("id")
    let result = ''
    if (!id) {
      result = await GET_ALL()
    }else{
      result = await GET_BY_ID(id)
    }
    return new Response(JSON.stringify(result.rows), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

async function GET_ALL() {
  try {
    const client = await conn.connect()
    const result = await client.query('SELECT * FROM PropuestaDosificacion')
    client.release()
    return result
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

async function GET_BY_ID(id) {
  try {
    const client = await conn.connect()
    const result = await client.query(`SELECT * FROM PropuestaDosificacion WHERE idusuario=${id}`)
    client.release()
    return result
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}