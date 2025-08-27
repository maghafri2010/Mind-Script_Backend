import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=tcps)(HOST=${process.env.DB_HOST})(PORT=${process.env.DB_PORT}))(CONNECT_DATA=(SERVICE_NAME=${process.env.DB_SERVICE_NAME})))`
};

let pool;

const initDB = async () => {
  try {
    pool = await oracledb.createPool(dbConfig);
    console.log('✅ Oracle Database connected successfully');
  } catch (err) {
    console.error('❌ Oracle Database connection failed:', err);
  }
};

// Test connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Test query successful');
    connection.release();
  } catch (err) {
    console.error('❌ Test query failed:', err);
  }
};

await initDB();
await testConnection();

export default pool;
