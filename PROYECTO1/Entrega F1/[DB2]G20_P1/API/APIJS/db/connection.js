import sql from "mssql";
import config from "./db_creds.js";

export const dbSettings = {
  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbDatabase,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    console.log("DB is connected");
    return pool;
  } catch (error) {
    console.error("llega a este errror");
    console.error(error);
  }
};

export { sql };
