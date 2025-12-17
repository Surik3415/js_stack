import { Router } from "express"
import { createProduct } from "../controllers/admin.controller"
import { productRoute, adminOnly} from "../middleware/auth.middleware.js"

const router = Router()

router.post("/products", productRoute, adminOnly, createProduct)

export default router
