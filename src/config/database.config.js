import mongoose from "mongoose";
import { env } from "./environment.config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URL);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};
