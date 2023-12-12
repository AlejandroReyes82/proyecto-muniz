import conn from "@/app/db/conf";
export async function GET(req) {
  try {
    const {searchParams} = new URL(req.url)
    const idmateria = searchParams.get("id")
    const unidad = searchParams.get("unidad")
    const tema = searchParams.get("tema")
    const idcarrera = searchParams.get("idcarrera")
    let result = ''
    if(idmateria && unidad && tema){
      result = await GET_BY_ID(idmateria, unidad, tema)
    }else if(idcarrera && idmateria && unidad){
      result = await GET_BY_IDCARRERA_MATERIA_UNIDAD(idcarrera, idmateria, unidad)
    }else if(idcarrera && idmateria){
      result = await GET_BY_IDCARRERA_MATERIA(idcarrera, idmateria)
    }else if(idcarrera){
      result = await GET_BY_IDCARRERA(idcarrera)
    }else{
      result = await GET_ALL()
    }
    return new Response(JSON.stringify(result.rows), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

export async function POST(req) {
  try {
    const { idcarrera, idmateria, nombremateria, horassemana, unidad, nombreunidad, idtema, nombretema  } = await req.json();
    const client = await conn.connect()
    const result1 = await client.query(`SELECT * FROM Materia WHERE idcarrera = '${idcarrera}' and idmateria = '${idmateria}' and unidad = '${unidad}' and tema = '${idtema}'`);
    if(result1.rows.length > 0){
      return new Response(JSON.stringify({error: "La combinación de carrera, materia, unidad y tema ya existen"}), { status: 200 });
    }
    await client.query(
      `INSERT INTO Materia (idcarrera, idmateria, nombremateria, horassemana, unidad, nombreunidad, tema, nombretema) VALUES (${idcarrera}, ${idmateria}, '${nombremateria}', ${horassemana}, ${unidad}, '${nombreunidad}', ${idtema}, '${nombretema}')`
    );
    client.release()
    return new Response(JSON.stringify({message:"Materia creada con éxito"}), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

export async function PUT(req) {
  try {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get("id")
    const { idcarrera, nombremateria, horassemana, unidad, nombreunidad, idtema, nombretema } = await req.json();
    const client = await conn.connect()
    await client.query('UPDATE Materia SET idcarrera = $1, nombremateria = $2, horassemana = $3, unidad = $4, nombreunidad = $5, tema = $6, nombretema = $7 WHERE idmateria = $8', [idcarrera, nombremateria, horassemana, unidad, nombreunidad, idtema, nombretema, id])
    client.release()
    return new Response(JSON.stringify({message:"Materia actualizada con éxito"}), { status: 200 });
  } catch (error) {
    if(error.code === '23505'){
      return new Response(JSON.stringify({error: "La combinación de materia,unidad y tema ya existen"}), { status: 200 });
    }
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

export async function DELETE(req) {
  try {
    const {searchParams} = new URL(req.url)
    const idmateria = searchParams.get("idmateria")
    const unidad = searchParams.get("unidad")
    const tema = searchParams.get("tema")
    const client = await conn.connect()
    const result = await client.query('DELETE FROM Materia WHERE idmateria = $1 and unidad = $2 and tema = $3', [idmateria, unidad, tema])
    client.release()
    return new Response(JSON.stringify(result.rows), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

async function GET_ALL() {
  try {
    const client = await conn.connect()
    const result = await client.query('SELECT * FROM Materia')
    client.release()
    return result
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

async function GET_BY_ID(id, unidad, tema) {
  try {
    const client = await conn.connect()
    const result = await client.query('SELECT * FROM Materia WHERE idmateria = $1 and unidad = $2 and tema = $3', [id, unidad, tema])
    client.release()
    return result
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

async function GET_BY_IDCARRERA(id) {
  try {
    const client = await conn.connect()
    const result = await client.query('SELECT DISTINCT(idmateria) as idmateria, nombremateria FROM Materia WHERE idcarrera = $1', [id])
    client.release()
    return result
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}


async function GET_BY_IDCARRERA_MATERIA(idcarrera, idmateria) {
  try {
    const client = await conn.connect()
    const result = await client.query('SELECT DISTINCT(unidad) as unidad, nombreunidad FROM Materia WHERE idcarrera = $1 AND idmateria = $2', [idcarrera, idmateria])
    client.release()
    return result
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

async function GET_BY_IDCARRERA_MATERIA_UNIDAD(idcarrera, idmateria, unidad) {
  try {
    const client = await conn.connect()
    const result = await client.query('SELECT DISTINCT(tema) as tema, nombretema FROM Materia WHERE idcarrera = $1 AND idmateria = $2 AND unidad = $3', [idcarrera, idmateria, unidad])
    client.release()
    return result
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}