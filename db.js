import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  port:process.env.PORT,
  connectionLimit: 40,
  queueLimit: 20,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export default db;
