import express from 'express';
import multer from 'multer';
import Randomstring from 'randomstring'
import { createCategory, deleteAllCategories, deleteCategory, getAllCategories, getAllSubCategories, getCategoryById, updateCategory } from '../controllers/category_controller.js';
import path from 'path'

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/categories')
  },
  filename: (req, file, cb) => {
    cb(null, 'category_' + Randomstring.generate(10) + path.extname(file.originalname.replace(/\s/g, '')));
  },
})

const upload = multer({ storage: storage })

router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.get('/categories/:id/subs', getAllSubCategories);

router.post('/categories', upload.single('category'), createCategory);
router.delete('/categories/:id', deleteCategory);
router.delete('/categories', deleteAllCategories);

router.put('/categories/:id', upload.single('category'), updateCategory);




export default router