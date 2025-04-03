
-- Create the database
CREATE DATABASE IF NOT EXISTS call_management;
USE call_management;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role ENUM('admin', 'supervisor', 'agent') NOT NULL DEFAULT 'agent',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert admin user (password: admin123)
INSERT INTO users (username, password, full_name, email, role) VALUES 
('admin', '$2a$10$rnUz7LxHyu1W5P7aCrX9s.1ThUC5TfD.bCJINIVvtzfXqN9p1xTeO', 'Admin User', 'admin@example.com', 'admin');

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  agent_id VARCHAR(20) UNIQUE NOT NULL,
  status ENUM('available', 'busy', 'offline', 'break') NOT NULL DEFAULT 'offline',
  skills JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Callers table
CREATE TABLE IF NOT EXISTS callers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  name VARCHAR(100),
  email VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Calls table
CREATE TABLE IF NOT EXISTS calls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  call_id VARCHAR(50) UNIQUE NOT NULL,
  caller_id INT,
  agent_id INT,
  start_time DATETIME NOT NULL,
  end_time DATETIME,
  duration INT,
  status ENUM('active', 'waiting', 'completed', 'abandoned', 'transferred') NOT NULL,
  recording_url VARCHAR(255),
  notes TEXT,
  call_type ENUM('inbound', 'outbound') NOT NULL,
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (caller_id) REFERENCES callers(id) ON DELETE SET NULL,
  FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE SET NULL
);

-- Call metrics table
CREATE TABLE IF NOT EXISTS call_metrics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  total_calls INT DEFAULT 0,
  answered_calls INT DEFAULT 0,
  abandoned_calls INT DEFAULT 0,
  avg_wait_time FLOAT DEFAULT 0,
  avg_talk_time FLOAT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type VARCHAR(50) NOT NULL DEFAULT 'string',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, setting_type) VALUES
('company_name', 'Call Control Systems', 'string'),
('admin_email', 'admin@example.com', 'string'),
('support_phone', '+1 (555) 123-4567', 'string'),
('welcome_message', 'Thank you for calling. Your call is important to us.', 'string'),
('email_notifications', 'true', 'boolean'),
('sms_notifications', 'false', 'boolean'),
('desktop_notifications', 'true', 'boolean'),
('missed_call_alerts', 'true', 'boolean'),
('system_updates', 'true', 'boolean');

-- Create views for statistics
CREATE OR REPLACE VIEW daily_call_stats AS
SELECT 
  DATE(start_time) AS call_date,
  COUNT(*) AS total_calls,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_calls,
  SUM(CASE WHEN status = 'abandoned' THEN 1 ELSE 0 END) AS abandoned_calls,
  AVG(CASE WHEN status = 'completed' AND duration IS NOT NULL THEN duration ELSE NULL END) AS avg_duration
FROM calls
GROUP BY DATE(start_time)
ORDER BY call_date DESC;
