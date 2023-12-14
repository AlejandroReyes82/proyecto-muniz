import conn from "@/app/db/conf";
export async function POST(req) {
    try {
      // Obtiene los datos del la peticion
      const { user, pass } = await req.json();

      // se conecta a la base de datos con la conexion importada de db/conf.js
      const client = await conn.connect();

      //hace la consulta a la base de datos
      const result = await client.query(
        `SELECT idusuario, usuario, tipo, nombre, apellido FROM Usuario WHERE usuario='${user}' AND contrasena='${pass}'`
      );

      // libera la conexion
      client.release();

      // si no hay resultados, devuelve un error
      if (result.rows.length == 0)
        return new Response("Usuario y/o contraseña incorrectos", {
          status: 401,
      });
        return new Response(JSON.stringify(result.rows,{ status: 200,
          headers: {
            'Access-Control-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        })
      );
    } catch (error) {
      // si hay un error, devuelve un error
      return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 401 });
    }
  }