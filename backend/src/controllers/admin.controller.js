export async function createProduct(params) {
  // req.user - доступний тут
  // req.body - дані від клієнта
  // req.params - URL параметри
  // req.query - query параметри
  const product = await Product.create(req.body)
  res.status(201).json(product)
}
