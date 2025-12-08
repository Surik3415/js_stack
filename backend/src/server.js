import express from 'express'

const app = express()

app.get("/api/v1/health",(req, res) => {
  res.status(200).json({message: 'Server is healthy'})
})

app.listen(3000, () => console.log('Server is running!'))
