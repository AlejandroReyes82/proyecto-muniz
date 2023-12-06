import conn from "@/app/db/conf";
export async function GET(req) {
  try {
    const {searchParams} = new URL(req.url)
    const param = searchParams.get("id")
    const client = await conn.connect()
    const result = await client.query(`SELECT * FROM Materia WHERE idcarrera = ${param}`)
    client.release()
    return new Response(JSON.stringify(result.rows), { status: 200 })
  } catch (error) {
    return {
      status: 500,
      body: {
        error: "Error obteniendo datos de la base de datos",
      },
    }
  }
}