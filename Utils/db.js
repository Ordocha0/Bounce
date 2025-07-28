import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

let isConnected = false;

const connectDb = async () => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
};

const disconnectDb = async () => {
  if (isConnected) {
    await client.end();
    isConnected = false;
  }
};

export { client, connectDb, disconnectDb };
