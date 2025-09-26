-- Database initialization script for Mind-Script Backend
-- This script creates the necessary tables for your application

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dueDate DATE,
    status ENUM('onProgress', 'Completed', 'Upcoming', 'Overdue') DEFAULT 'Upcoming',
    project VARCHAR(100),
    team VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


-- Create indexes for better performance
--CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
--CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
--CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

-- Insert sample data for testing (optional)
-- You can uncomment these lines if you want test data

-- INSERT IGNORE INTO users (username, firstname, lastname, email, password) VALUES 
-- ('testuser', 'Test', 'User', 'test@example.com', 'password123'),
-- ('johnhero', 'John', 'Hero', 'john@example.com', 'securepass456');

-- INSERT IGNORE INTO tasks (user_id, title, description, dueDate, status, project, team) VALUES 
-- (1, 'Sample Task 1', 'This is a sample task description', '2025-08-15', 'Completed', 'Mind-Script', 'Development'),
-- (1, 'Sample Task 2', 'Another sample task', '2025-08-20', 'onProgress', 'Mind-Script', 'Testing');
