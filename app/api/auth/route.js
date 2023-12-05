import conn from "@/app/db/conf";
export async function POST(req) {
    try {
      const { user, pass } = await req.json();
      const client = await conn.connect();
      const result = await client.query(
        `SELECT * FROM Usuario WHERE usuario='${user}' AND contrasena='${pass}'`
      );
      client.release();
      if (result.rows.length == 0)
        return new Response("Usuario o contraseña incorrectos", {
          status: 401,
        });
      return new Response(JSON.stringify(result.rows));
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        body: {
          error: "Error obteniendo datos de la base de datos",
        },
      };
    }
  }