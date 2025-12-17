import { requireAuth } from "@clerk/express"
import { User } from "../models/user.model.js"
import { ENV } from "../config/env.js"

// це масив мідлверів яерез який буде проходити запит
export const protectRoute = [
  requireAuth(), // Перевіряє JWT токен з заголовка Authorization
// Якщо токен валідний → додає req.auth об'єкт
// req.auth = { userId: "clerk_user_123", sessionId: "..." }
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId
      if (!clerkId) return res.status(401).json({message: "Unauthorized user or invalid token"})

      const user = await User.findOne({ clerkId })
      if (!user) return res.status(404).json({message: "User not found"})

      req.user = user // тут додали юзера і в adminOnly можемо з ним працювати 
    } catch (error) {
      console.error("ERROR IN AUTH MIDDLEWARE", error)
      res.status(500).json({message: "Internal error"})
    }
    next()
  }
]

export const adminOnly = (req,res,next) => {
  if(!req.user) {
    return res.status(401).json({message: "Unauthorized user"})
  }

  if (req.user.email !== ENV.ADMIN_EMAIL) {
    return res.status(403).json({message: "Forbiden!"})
  }
  next()
}
