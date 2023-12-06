import conn from "@/app/db/conf";
export async function GET() {
  try {
    const client = await conn.connect();
    const result = await client.query("SELECT idusuario, usuario, tipo, nombre, apellido FROM Usuario");
    client.release();
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    return {
      status: 500,
      body: {
        error: "Error obteniendo datos de la base de datos",
      },
    };
  }
}

export async function DELETE(req) {
  try {
    const {searchParams} = new URL(req.url)
    const param = searchParams.get("id")
    const client = await conn.connect();
    const result = await client.query(
      `DELETE FROM Usuario WHERE idusuario = ${param}`
    );
    client.release();
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    return {
      status: 500,
      body: {
        error: "Error obteniendo datos de la base de datos",
      },
    };
  }
}


