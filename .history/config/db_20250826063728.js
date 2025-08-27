import oracledb from "oracledb";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// Specify the wallet directory
oracledb.initOracleClient({ libDir: "/usr/lib/oracle/21/client64/lib" }); // only needed if using Instant Client
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
  externalAuth: false
};

const initDB = async () => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log("✅ Oracle Database connected successfully");
    await connection.close();
  } catch (err) {
    console.error("❌ Oracle Database connection failed:", err.message);
  }
};

initDB();

export default initDB;
