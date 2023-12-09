import conn from "@/app/db/conf";
export async function POST(req) {
    try {
      const { user, pass } = await req.json();
      const client = await conn.connect();
      const result = await client.query(
        `SELECT idusuario, usuario, tipo, nombre, apellido FROM Usuario WHERE usuario='${user}' AND contrasena='${pass}'`
      );
      client.release();
      if (result.rows.length == 0)
        return new Response("Usuario y/o contraseña incorrectos", {
          status: 401,
      });
      return new Response(JSON.stringify(result.rows));
    } catch (error) {
      return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
    } finally {
      conn.end();
    }
  }