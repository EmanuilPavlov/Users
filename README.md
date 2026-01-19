# User Management System

A modern, full-stack user management system built with Node.js, TypeScript, Express, and MySQL. Features a responsive UI with modal-based forms, search functionality, and full CRUD operations.

## ✨ Features

- **🔍 User Management**: Search, Create, Read, Update, and Delete users
- **🌈 Dynamic Avatars**: Auto-generated colorful avatars
- **🛡️ Input Validation**: Server-side validation with express-validator
- **💾 Database**: MySQL with Sequelize ORM

## 📋 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Backend runtime |
| **TypeScript** | Type-safe JavaScript |
| **Express.js** | Web framework |
| **Sequelize** | ORM for MySQL |
| **EJS** | Server-side templating |
| **Tailwind CSS** | Utility-first CSS framework |
| **MySQL** | Relational database |
| **Express Validator** | Input validation |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MySQL 8.0+ (installed locally) **with a database named `users_db`**

## 🧪 Sample Test Data

Here's sample data you can use to test the application.

### Method 1: SQL Insert (Recommended)
Run this SQL **after starting the app** (tables will be created):

```sql
-- Switch to your database
USE users_db;

-- Insert sample users with realistic data
INSERT INTO Users (id, name, email, avatar, avatarColor, createdAt, updatedAt) VALUES
(1, 'Emanuil Pavlov', 'emanuil.pavlov@gmail.com', 'EP', '#9B59B6', '2026-01-18 17:22:42', '2026-01-19 15:46:40'),
(2, 'Ivan Ivanov', 'ivan.i@gmail.com', 'II', '#9B59B6', '2026-01-18 18:03:36', '2026-01-19 16:27:28'),
(3, 'Ivaylo Pavlov', 'ivaylo.pavlov2013@gmail.com', 'IP', '#34495E', '2026-01-19 12:14:10', '2026-01-19 16:10:37'),
(4, 'Maria Petrova', 'maria.petrova@example.com', 'MP', '#E74C3C', '2026-01-19 10:00:00', '2026-01-19 10:00:00'),
(5, 'Georgi Dimitrov', 'georgi.d@example.com', 'GD', '#2ECC71', '2026-01-19 11:00:00', '2026-01-19 11:00:00'),
(6, 'Anna Ivanova', 'anna.i@example.com', 'AI', '#F39C12', '2026-01-19 12:00:00', '2026-01-19 12:00:00');

-- Verify the data
SELECT * FROM Users;

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/Users.git
cd Users
