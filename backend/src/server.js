import express from 'express'
import path from 'path'
import { ENV } from './config/env.js'
import { connectDB } from './config/db.js'
import { clerkMiddleware } from '@clerk/nextjs/server'

const app = express()
const __dirname = path.resolve()

app.use(clerkMiddleware()) // adds auth object under the request => req.auth

app.get("/api/v1/health",(req, res) => {
  res.status(200).json({message: 'Server is healthy'})
})

// make app ready for deployment
if (ENV.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "../admin/dist" )))
  app.get("/{*any}",(req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"))
  })
}
app.listen(ENV.PORT, () => {
  console.log('Server is running!')
  connectDB()
})
