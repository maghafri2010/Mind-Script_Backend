import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config();

// Oracle Instant Client + Wallet
oracledb.initOracleClient({
  libDir: "/home/opc/instantclient_23_9",
  configDir: "/home/opc/wallet"
});

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING // must match alias in tnsnames.ora
};

const initDB = async () => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log("✅ Oracle Database connected successfully");
    await connection.close();
  } catch (err) {
    console.error("❌ Oracle Database connection failed:", err);
  }
};

initDB();

export default initDB;
