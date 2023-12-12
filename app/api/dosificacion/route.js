import conn from "@/app/db/conf";
export async function GET(req) {
  try {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get("id") //idusuario
    const idcarrera = searchParams.get("idcarrera")
    const idmateria = searchParams.get("idmateria")
    const idunidad = searchParams.get("idunidad")
    const idtema = searchParams.get("idtema")
    let result = null
    if(idcarrera && idmateria && idunidad && idtema && id){
      result = await GET_BY_IDCARRERA_MATERIA_UNIDAD_TEMA_USUARIO(idcarrera, idmateria, idunidad, idtema, id)
    }else if (!id) {
      result = await GET_ALL()
    }else{
      result = await GET_BY_ID(id)
    }
    return new Response(JSON.stringify(result.rows), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const client = await conn.connect()
    const result = await client.query(
      `BEGIN;
        INSERT INTO PropuestaDosificacion (idusuario, idcarrera, idmateria, unidad, tema, tiempo) VALUES (${body.idusuario}, ${body.idcarrera}, ${body.idmateria}, ${body.unidad}, ${body.tema}, ${body.tiempo});
        UPDATE Materia SET horassemana = horassemana + ${body.tiempo} WHERE idmateria = ${body.idmateria} AND idcarrera = ${body.idcarrera} AND unidad = ${body.unidad} AND tema = ${body.tema};
      COMMIT;`
    )
    client.release()
    return new Response(JSON.stringify({message: "Dosificación agregada con éxito"}), { status: 200 })
  }
  catch (error) {
    switch (error.code) {
      case '23505':
        return new Response(JSON.stringify({error: "La dosificación ya existe"}), { status: 200 });
      case '23503':
        return new Response(JSON.stringify({error: "La carrera y/o materia no existen"}), { status: 200 });
        default:
          return new Response(JSON.stringify({error: "Error insertando datos a la base de datos"}), { status: 200 });
    }
  }
}


//Revisar funcion
export async function PUT(req) {
  try {
    const body = await req.json()
    const client = await conn.connect()
    await client.query(
      `
      BEGIN;
        -- Obtener el tiempo actual
        DO $$
        DECLARE
            tiempo_actual INT;
        BEGIN
          SELECT tiempo INTO tiempo_actual FROM PropuestaDosificacion
          WHERE idusuario = ${body.idusuario}
              AND idcarrera = ${body.idcarrera}
              AND idmateria = ${body.idmateria}
              AND unidad = ${body.unidad}
              AND tema = ${body.tema};

          -- Realizar la actualización en PropuestaDosificacion
          UPDATE PropuestaDosificacion
          SET tiempo = ${body.tiempo}
          WHERE idusuario = ${body.idusuario}
              AND idcarrera = ${body.idcarrera}
              AND idmateria = ${body.idmateria}
              AND unidad = ${body.unidad}
              AND tema = ${body.tema};

          -- Actualizar Materia con el cambio en horassemana
          UPDATE Materia
          SET horassemana = horassemana + (${body.tiempo} - tiempo_actual)
          WHERE idmateria = ${body.idmateria}
              AND idcarrera = ${body.idcarrera}
              AND unidad = ${body.unidad}
              AND tema = ${body.tema};
        END $$;
      COMMIT;
      `
    )
    client.release()
    return new Response(JSON.stringify({message: "Dosificación actualizada con éxito"}), { status: 200 })
  }
  catch (error) {
    console.log(error)
    if(error.code === '23503'){
      return new Response(JSON.stringify({error: "La carrera y/o materia no existe"}), { status: 200 });
    }
    return new Response(JSON.stringify({error: "Error actualizando datos de la base de datos"}), { status: 200 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json()
    const client = await conn.connect()
    const result = await client.query(
      `BEGIN;
        DELETE FROM PropuestaDosificacion WHERE idusuario = ${body.idusuario} AND idcarrera = ${body.idcarrera} AND idmateria = ${body.idmateria} AND unidad = ${body.unidad} AND tema = ${body.tema};
        UPDATE Materia SET horassemana = horassemana - ${body.tiempo} WHERE idmateria = ${body.idmateria} AND idcarrera = ${body.idcarrera} AND unidad = ${body.unidad} AND tema = ${body.tema};
      COMMIT;`
    )
    client.release()
    return new Response(JSON.stringify({message: "Dosificación eliminada con éxito"}), { status: 200 })
  }
  catch (error) {
    return new Response(JSON.stringify({error: "Error eliminando datos de la base de datos"}), { status: 200 });
  }
}

async function GET_ALL() {
  try {
    const client = await conn.connect()
    const result = await client.query(
      `SELECT pd.IdUsuario, u.Usuario, pd.IdCarrera, pd.IdMateria, m.NombreMateria, pd.Unidad, m.NombreUnidad, pd.Tema, m.NombreTema, Tiempo FROM PropuestaDosificacion pd
        LEFT JOIN Materia m ON pd.idmateria = m.idmateria AND pd.idcarrera = m.idcarrera AND pd.unidad = m.unidad AND pd.tema = m.tema
        LEFT JOIN Usuario u ON u.IdUsuario =pd.IdUsuario`
      )
    client.release()
    return result
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

async function GET_BY_ID(id) {
  try {
    const client = await conn.connect()
    const result = await client.query(
      `SELECT pd.IdUsuario, u.Usuario, pd.IdCarrera, pd.IdMateria, m.NombreMateria, pd.Unidad, m.NombreUnidad, pd.Tema, m.NombreTema, Tiempo FROM PropuestaDosificacion pd
        LEFT JOIN Materia m ON pd.idmateria = m.idmateria AND pd.idcarrera = m.idcarrera AND pd.unidad = m.unidad AND pd.tema = m.tema
        LEFT JOIN Usuario u ON u.IdUsuario =pd.IdUsuario WHERE pd.idusuario=${id}`
      )
    client.release()
    return result
  } catch (error) {
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}

async function GET_BY_IDCARRERA_MATERIA_UNIDAD_TEMA_USUARIO(idcarrera, idmateria, idunidad, idtema, idusuario) {
  try {
    const client = await conn.connect()
    const result = await client.query(
      `SELECT pd.IdCarrera, pd.IdMateria, m.NombreMateria, pd.Unidad, m.NombreUnidad, pd.Tema, m.NombreTema, Tiempo FROM PropuestaDosificacion pd
        LEFT JOIN Materia m ON pd.idmateria = m.idmateria AND pd.idcarrera = m.idcarrera AND pd.unidad = m.unidad AND pd.tema = m.tema
        LEFT JOIN Usuario u ON u.IdUsuario =pd.IdUsuario WHERE pd.idcarrera=${idcarrera} AND pd.idmateria=${idmateria} AND pd.unidad=${idunidad} AND pd.tema=${idtema} AND pd.idusuario=${idusuario}`
      )
    client.release()
    return result
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({error: "Error obteniendo datos de la base de datos"}), { status: 200 });
  }
}
