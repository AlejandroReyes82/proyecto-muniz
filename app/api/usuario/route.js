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
    // Obtenemos el id del usuario a eliminar de la url
    const {searchParams} = new URL(req.url)
    const id = searchParams.get("id")
    const client = await conn.connect();
    const result = await client.query(`DELETE FROM Usuario WHERE idusuario = ${id};`);
    client.release();
    // Si no se elimino ningun registro se envia mensaje de que el usuario no existe
    if (result.rowCount === 0) {
      return new Response(JSON.stringify({error: "Usuario no existe"}), { status: 200 });
    }
    // Si se elimino el registro se envia mensaje de que se elimino con exito
    return new Response(JSON.stringify({message: "Usuario eliminado con éxito"}), { status: 200 });
  } catch (error) {
    // Si el error es por que el usuario tiene dosificaciones asociadas se envia mensaje de que no se puede eliminar
    // Error code 23503 es el error que se obtiene cuando se intenta eliminar un registro que tiene registros asociados
    if(error.code === '23503'){
      return new Response(JSON.stringify({error: "No se puede eliminar el usuario porque tiene dosificaciones asociadas"}), { status: 200 });
    }
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
    // Obtenemos el id del usuario a actualizar de la url
    const {searchParams} = new URL(req.url)
    const idusuario = searchParams.get("id")
    // Obtenemos los datos del usuario a actualizar del body
    const { usuario, contrasena, nombre, apellido, tipo } = await req.json();
    const client = await conn.connect();
    // Verificamos que el usuario a actualizar exista
    const result1 = await client.query(`SELECT * FROM Usuario WHERE idusuario = ${idusuario}`);
    // Si no existe el usuario a actualizar se envia mensaje de que no existe
    if(result1.rows.length === 0){
      return new Response(JSON.stringify({error: "No existe el usuario a actualizar"}), { status: 200 });
    }
    // El deber ser es no actualizar la contraseña por este método, es preferible utilizar algun otro medio como link de recuperación de contraseña o código de verificación
    await client.query(
      `UPDATE Usuario SET usuario = '${usuario}', contrasena = '${contrasena}', tipo = '${tipo}', nombre = '${nombre}', apellido = '${apellido}' WHERE idusuario = ${idusuario}`
    );
    client.release();
    return new Response(JSON.stringify({message:"Usuario actualizado con éxito"}), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}


