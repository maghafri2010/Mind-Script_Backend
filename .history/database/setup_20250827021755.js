import oracledb from "oracledb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Oracle connection config
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING
};

const initializeDatabase = async () => {
  let connection;

  try {
    console.log("🚀 Starting Oracle database initialization...");

    // Connect to Oracle
    connection = await oracledb.getConnection(dbConfig);
    console.log("✅ Connected to Oracle database successfully");

    // Read SQL file
    const sqlFile = path.join(__dirname, "init.sql");
    const sqlContent = fs.readFileSync(sqlFile, "utf8");

    // Split SQL commands by semicolon (simple statements)
    const commands = sqlContent
      .split(";")
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith("--"));

    console.log(`📝 Executing ${commands.length} SQL commands...`);

    for (const command of commands) {
      if (!command) continue;

      try {
        await connection.execute(command);
        console.log(`✅ Executed: ${command.substring(0, 50)}...`);
      } catch (err) {
        // ORA-00955: name is already used by an existing object
        if (err.errorNum === 955) {
          console.log(`ℹ️  Table already exists: ${command.substring(0, 50)}...`);
        } else {
          console.error(`❌ Error executing command: ${command.substring(0, 50)}...`);
          console.error(err.message);
        }
      }
    }

    // Commit changes
    await connection.commit();

    // List all tables in your schema
    const result = await connection.execute(
      `SELECT table_name FROM user_tables ORDER BY table_name`
    );
    console.log("📋 Available tables:");
    result.rows.forEach(row => console.log(" -", row[0]));

    console.log("🎉 Database initialization completed successfully!");
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("🔒 Connection closed");
      } catch (err) {
        console.error("❌ Error closing connection:", err);
      }
    }
    process.exit(0);
  }
};

// Run initialization
initializeDatabase();
