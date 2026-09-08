import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create a connection pool for handling multiple database requests.
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Checks if the database connection is working when the app starts.
export const connectDb = async () => {
  try {
    const connection = await pool.getConnection();

    console.log("Database connection successful");
    console.log(`DB-HOST: ${process.env.DB_HOST}`);

    connection.release();
  } catch (error) {
    console.error("Couldn't connect to Database:", error);
    process.exit(1);
  }
};

export default connectDb;
