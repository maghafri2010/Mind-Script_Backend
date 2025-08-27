import oracledb from "oracledb";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// Oracle Instant Client
oracledb.initOracleClient({ libDir: path.join('/home/opc/instantclient_23_9') });

// Point to wallet folder
process.env.TNS_ADMIN = path.join('/home/opc/wallet');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING, // TNS name from tnsnames.ora
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
