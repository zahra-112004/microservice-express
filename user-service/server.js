require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
// Hapus import 'mysql2/promise' dari sini, pindahkan ke Service Layer

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); 


const mysql = require('mysql2/promise');
const PORT = process.env.PORT || 4000;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

let pool;

async function initDb() {
    try {
        pool = mysql.createPool(dbConfig);

        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            role VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        await pool.query(createTableSQL);
        console.log('✅ Connected to MySQL & users table ready');
    } catch (err) {
        console.error('❌ Error initializing DB:', err);
        process.exit(1);
    }
}
module.exports.pool = pool; 

// 1. Import router dari userRoutes.js
const userRoutes = require('./routes/userRoutes');

// 2. Gunakan router sebagai middleware di path /users
app.use('/users', userRoutes);

// 3. Tambahkan rute default untuk interface (user.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'user.html'));
});




//  START SERVER 
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 User Service running on http://localhost:${PORT}`);
    });
});