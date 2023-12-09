import conn from "@/app/db/conf";
export async function GET(req) {
  try {
    const {searchParams} = new URL(req.url)
    const idmateria = searchParams.get("id")
    let result = ''
    if(idmateria){
      result = await GET_BY_ID(idmateria)
    }else{
      result = await GET_ALL()
    }
    return new Response(JSON.stringify(result.rows), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  } finally {
    conn.end()
  }
}

export async function POST(req) {
  try {
    const { idcarrera, idmateria, nombremateria, horassemana, unidad, nombreunidad, idtema, nombretema  } = await req.json();
    const client = await conn.connect()
    const result1 = await client.query(`SELECT * FROM Materia WHERE idmateria = '${idmateria}'`);
    if(result1.rows.length > 0){
      return new Response(JSON.stringify({error: "La materia ya existe"}), { status: 200 });
    }
    const result = await client.query(
      `INSERT INTO Materia (idcarrera, idmateria, nombremateria, horassemana, unidad, nombreunidad, tema, nombretema) VALUES (${idcarrera}, ${idmateria}, '${nombremateria}', ${horassemana}, ${unidad}, '${nombreunidad}', ${idtema}, '${nombretema}')`
    );
    client.release()
    return new Response(JSON.stringify({message:"Materia creada con éxito"}), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  } finally {
    conn.end()
  }
}

export async function PUT(id, body) {
  try {
    const client = await conn.connect()
    const result = await client.query('UPDATE Materia SET nombre = $1 WHERE id = $2 RETURNING *', [body.nombre, id])
    client.release()
    return new Response(JSON.stringify(result.rows), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  } finally {
    conn.end()
  }
}

export async function DELETE(id) {
  try {
    const client = await conn.connect()
    const result = await client.query('DELETE FROM Materia WHERE id = $1', [id])
    client.release()
    return new Response(JSON.stringify(result.rows), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  } finally {
    conn.end()
  }
}

export async function GET_ALL() {
  try {
    const client = await conn.connect()
    const result = await client.query('SELECT * FROM Materia')
    client.release()
    return result
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  } finally {
    conn.end()
  }
}

export async function GET_BY_ID(id) {
  try {
    const client = await conn.connect()
    const result = await client.query('SELECT * FROM Materia WHERE idmateria = $1', [id])
    client.release()
    return result
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  } finally {
    conn.end()
  }
}