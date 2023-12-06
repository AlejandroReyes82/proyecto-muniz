import conn from "@/app/db/conf";
export async function GET() {
  try {
    // const {searchParams} = new URL(req.url)
    // const param = searchParams.get("id")
    const client = await conn.connect()
    const result = await client.query("SELECT pd.idusuario, pd.idcarrera, pd.idmateria, nombreunidad as unidad, nombretema as tema, horassemana as tiempo FROM propuestadosificacion pd LEFT JOIN materia m ON pd.idmateria=m.idmateria LEFT JOIN usuario u ON pd.idusuario=u.idusuario")
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