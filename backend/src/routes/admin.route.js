import { Router } from "express"
import { createProduct, getAllProducts, updateProduct } from "../controllers/admin.controller"
import { adminOnly, protectRoute} from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"

const router = Router()

// це включає мідлвери з protectRoute, adminOnly перед всіма викликами тут
router.use(protectRoute, adminOnly)

router.post("/products", upload.array("images", 3), createProduct)
router.get("/products", getAllProducts)
router.put("/products/:id", upload.array("images", 3), updateProduct)

router.get("/orders", getAlOrders)
router.patch("/orders/:id/status", updateOrderStatus)

export default router
