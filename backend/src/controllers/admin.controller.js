import cloudinary from "../config/cloudinary.js"
import { Product } from "../models/product.model.js"

export async function createProduct(req, res) {
  // Валідація БЕЗ try-catch (це не помилки, а некоректний input)
  const { name, description, price, stock, category } = req.body
  
  if (!name || !description || !price || !stock || !category) {
    return res.status(400).json({ message: "All fields are required" })
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "At least one image is required" })
  }

  if (req.files.length > 3) {
    return res.status(400).json({ message: "Maximum three images allowed" })
  }

  // Тільки асинхронні операції в try-catch
  try {
    // Завантаження в Cloudinary
    const uploadPromises = req.files.map((file) => {
      return cloudinary.uploader.upload(file.path, {
        folder: "products"
      })
    })
    const uploadResult = await Promise.all(uploadPromises)
    const imageUrls = uploadResult.map(r => r.secure_url)

    // Збереження в БД
    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      images: imageUrls
    })

    res.status(201).json(product)
    
  } catch (error) {
    console.error("Error creating product:", error)
    res.status(500).json({ 
      message: "Failed to create product",
      error: error.message 
    })
  }
}

export async function getAllProducts(_, res) {
  try {
    // -1 значить desc
    const products = (await Product.find()).sort({createdAt: -1})
    res.status(200).json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ message: "Internal Server error" })
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params
    const product = await Product.findById(id)

    if(!product){
      return res.status(404).json({ message: "Product not find" })
    }

    const { name, description, price, stock, category } = req.body
    
    if(name) product.name = name
    if(description) product.description = description
    if(price) product.price = parseFloat(price)
    if(stock !== undefined) product.stock = parseInt(stock)
    if(category) product.category = category

    // handle image updates

    if (req.files && req.files.length > 0) {
      if (req.files.length > 3) {
        return res.status(400).json({ message: "Maximum three images allowed" })
      }

      const uploadPromises = req.files.map((file) => {
        return cloudinary.uploader.upload(file.path, {
          folder: "products"
        })
      })

      const uploadResult = await Promise.all(uploadPromises)
      product.images = uploadResult.map(r => r.secure_url)
    }

    await product.save()
    res.status(200).json(product)

  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ message: "Internal Server error" })
  }
}
