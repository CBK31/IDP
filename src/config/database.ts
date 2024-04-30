import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const connectionString = `mongodb://${dbHost}:${dbPort}/${dbName}`;

export const connect = () => {
  mongoose
    .connect(connectionString)
    .then(() => console.log("MongoDB connected successfully."))
    .catch((err) => console.error("MongoDB connection error:", err));
};
