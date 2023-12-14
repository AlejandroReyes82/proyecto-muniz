import { Pool } from "pg";

let conn;

// si no existe la conexion, la crea
if (!conn) {
  conn = new Pool({
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    database: process.env.PGSQL_DATABASE,
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

export default conn;
