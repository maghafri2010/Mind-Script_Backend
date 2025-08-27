import db from '../config/db.js';

export const setupDatabase = async (req, res) => {
    try {
        console.log('🚀 Manual database setup triggered...');
        
        // Test connection first
        const connection = await db.getConnection();
        console.log('✅ Database connection successful');
        connection.release();

        // Create users table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Create tasks table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS tasks (
                task_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                dueDate DATE,
                status ENUM('pending', 'in-progress', 'completed', 'cancelled') DEFAULT 'pending',
                project VARCHAR(100),
                team VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Create indexes
        await db.execute(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
        await db.execute(`CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id)`);
        await db.execute(`CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)`);

        // Verify tables were created
        const [tables] = await db.execute('SHOW TABLES');
        const tableNames = tables.map(t => Object.values(t)[0]);

        console.log('🎉 Database setup completed successfully!');
        
        res.status(200).json({
            success: true,
            message: 'Database setup completed successfully',
            tables: tableNames
        });
    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        res.status(500).json({
            success: false,
            message: 'Database setup failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const checkDatabase = async (req, res) => {
    try {
        // Test connection
        const connection = await db.getConnection();
        connection.release();

        // Check tables
        const [tables] = await db.execute('SHOW TABLES');
        const tableNames = tables.map(t => Object.values(t)[0]);

        // Check users table structure
        let usersStructure = null;
        let tasksStructure = null;

        try {
            const [usersDesc] = await db.execute('DESCRIBE users');
            usersStructure = usersDesc;
        } catch (error) {
            usersStructure = 'Table does not exist';
        }

        try {
            const [tasksDesc] = await db.execute('DESCRIBE tasks');
            tasksStructure = tasksDesc;
        } catch (error) {
            tasksStructure = 'Table does not exist';
        }

        res.status(200).json({
            success: true,
            message: 'Database check completed',
            tables: tableNames,
            usersTable: usersStructure,
            tasksTable: tasksStructure
        });
    } catch (error) {
        console.error('❌ Database check failed:', error.message);
        res.status(500).json({
            success: false,
            message: 'Database check failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
