import conn from "@/app/db/conf";
export async function GET() {
  try {
    const client = await conn.connect()
    const result = await client.query('SELECT * FROM Materia')
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