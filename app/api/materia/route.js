import conn from "@/app/db/conf";
export async function GET() {
  try {
    const client = await conn.connect()
    const result = await client.query('SELECT * FROM Materia')
    client.release()
    return new Response(JSON.stringify(result.rows), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}