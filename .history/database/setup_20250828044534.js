import db from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initializeDatabase = async () => {
    try {
        console.log('🚀 Starting database initialization...');
        
        // Test connection first
        await db.query('SELECT 1');
        console.log('✅ Database connection successful');

        // Read the SQL initialization file
        const sqlFile = path.join(__dirname, 'init.sql');
        const sqlContent = fs.readFileSync(sqlFile, 'utf8');
        
        // Split SQL commands by semicolons and execute each one
        const commands = sqlContent
            .split(';')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

        console.log(`📝 Executing ${commands.length} SQL commands...`);

        for (const command of commands) {
            if (command.trim()) {
                try {
                    await db.execute(command);
                    console.log(`✅ Executed: ${command.substring(0, 50)}...`);
                } catch (error) {
                    if (error.code !== 'ER_TABLE_EXISTS_ERROR') {
                        console.error(`❌ Error executing command: ${command.substring(0, 50)}...`);
                        console.error(`Error: ${error.message}`);
                    } else {
                        console.log(`ℹ️  Table already exists: ${command.substring(0, 50)}...`);
                    }
                }
            }
        }

        console.log('🎉 Database initialization completed successfully!');
        
        // Verify tables were created
        const [tables] = await db.execute('SHOW TABLES');
        console.log('📋 Available tables:', tables.map(t => Object.values(t)[0]));
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
};

// Run initialization
initializeDatabase();
