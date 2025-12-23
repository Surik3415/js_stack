import multer from "multer"
import path from "path"

// Налаштування збереження файлів
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/')  // папка для збереження
  },
  filename: (req, file, callback) => {
    // Унікальне ім'я: 1703001234567-photo.jpg
    callback(null, `${Date.now()}-${file.originalname}`)
  }
})

// Фільтр типів файлів
const fileFilter = (req, file, callback) => {
  // Дозволені розширення
  const allowedTypes = /jpeg|jpg|png|webp/
  
  // Перевірка розширення файлу
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  
  // Перевірка MIME типу
  const mimetype = allowedTypes.test(file.mimetype)
  
  if (extname && mimetype) {
    callback(null, true)  // ✅ прийняти файл
  } else {
    callback(new Error('Only images (jpeg, jpg, png, webp) are allowed!'), false)
  }
}

// Експорт налаштованого multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024  // 5MB максимум
  }
})
