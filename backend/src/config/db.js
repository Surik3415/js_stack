import mongoose from "mongoose"
import { ENV } from "./env.js"

export const connectDB = async() => {
  try {
    const conn = await mongoose.connect(ENV.DB_URL)
    console.log(`Connected to MONGOBD: ${conn.connection.host}`)
  } catch {
    console.error('mongoDB connection ERROR')
    process.exit(1)
  }
}
