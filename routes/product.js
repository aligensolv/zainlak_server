import { Router } from 'express'
import { createProduct, deleteAllProducts, deleteProduct, getAllProducts, getProductById, getProductsCount, updateProduct } from '../controllers/product_controller.js'

import multer from 'multer'

import Randomstring from 'randomstring'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products')
    },
    filename: (req, file, cb) => {
        cb(null, `product_${Randomstring.generate(10)}${path.extname(file.originalname.replace(/\s/g, ''))}`)
    },
})

const upload = multer({ storage: storage })

const router = Router()

router.get('/products', getAllProducts);
router.get('/products/count', getProductsCount);

router.get('/products/:id', getProductById)
router.put('/products/:id',upload.single('image'), updateProduct);

router.post('/products',upload.single('image'), createProduct)
router.delete('/products', deleteAllProducts);

router.delete('/products/:id', deleteProduct);

export default router
