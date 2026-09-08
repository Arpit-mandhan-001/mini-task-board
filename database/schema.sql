-- Database Schema for Mini Task Manager

CREATE DATABASE IF NOT EXISTS `mini_task_manager` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `mini_task_manager`;

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `status` ENUM('todo', 'in-progress', 'done') NOT NULL DEFAULT 'todo',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
