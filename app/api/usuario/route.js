import conn from "@/app/db/conf";

export async function GET(req) {
  try {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get("id")
    const client = await conn.connect();
    let result = ''
    if(id){
      result = await client.query(`SELECT idusuario, usuario, tipo, nombre, apellido FROM Usuario WHERE idusuario = ${id}`);
    }else{
      result = await client.query("SELECT idusuario, usuario, tipo, nombre, apellido FROM Usuario");
    }
    client.release();
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({error: "Error al obtener la información"}), { status: 200 });
  }
}

export async function DELETE(req) {
  try {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get("id")
    const client = await conn.connect();
    const result = await client.query(
      `BEGIN;
      DELETE FROM propuestadosificacion WHERE idusuario = ${id};
      DELETE FROM Usuario WHERE idusuario = ${id};
      COMMIT;
      `
    );
    client.release();
    if (result.rowCount === 0) {
      return new Response(JSON.stringify({error: "Usuario no existe"}), { status: 200 });
    }
    return new Response(JSON.stringify({message: "Usuario eliminado con éxito"}), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

export async function POST(req) {
  try {
    const { usuario, contrasena, nombre, apellido, tipo } = await req.json();
    const client = await conn.connect();
    const result1 = await client.query(`SELECT * FROM Usuario WHERE usuario = '${usuario}'`);
    if(result1.rows.length > 0){
      return new Response(JSON.stringify({error: "El nombre de usuario ya existe"}), { status: 200 });
    }
    await client.query(
      `INSERT INTO Usuario (usuario, contrasena, tipo, nombre, apellido) VALUES ('${usuario}', '${contrasena}', '${tipo}', '${nombre}', '${apellido}')`
    );
    client.release();
    return new Response(JSON.stringify({message:"Usuario creado con éxito"}), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

export async function PUT(req) {
  try {
    const {searchParams} = new URL(req.url)
    const idusuario = searchParams.get("id")
    const { usuario, contrasena, nombre, apellido, tipo } = await req.json();
    const client = await conn.connect();
    const result1 = await client.query(`SELECT * FROM Usuario WHERE idusuario != ${idusuario}`);
    if(result1.rows.length === 0){
      return new Response(JSON.stringify({error: "No existe el usuario a actualizar"}), { status: 200 });
    }
    const result2 = await client.query(`SELECT * FROM Usuario WHERE usuario = '${usuario}'`);
    if(result2.rows.length > 0){
      return new Response(JSON.stringify({error: "El nombre de usuario ya existe"}), { status: 200 });
    }
    await client.query(
      `UPDATE Usuario SET usuario = '${usuario}', contrasena = '${contrasena}', tipo = '${tipo}', nombre = '${nombre}', apellido = '${apellido}' WHERE idusuario = ${idusuario}`
    );
    client.release();
    return new Response(JSON.stringify({message:"Usuario actualizado con éxito"}), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}


