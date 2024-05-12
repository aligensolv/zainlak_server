import { Router } from 'express'
import Randomstring from 'randomstring'
import { deleteAllUsers, deleteUser, getAllUsers, getUserById, getUsersCount, loginUser, registerUser, updateUser } from '../controllers/user_controller.js'
import path from 'path'

import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/users/')
  },
  filename: (req, file, cb) => {
    cb(null, `user_${Randomstring.generate(10)}${path.extname(file.originalname.replace(/\s/g, ''))}`)
  },
})

const upload = multer({ storage: storage })

const router = Router()

router.get('/users', getAllUsers)
router.get('/users/count', getUsersCount)

router.get('/users/:id', getUserById)

router.post('/users', upload.single('image'), registerUser)
router.put('/users/:id', upload.single('image'), updateUser)

router.delete('/users/:id', deleteUser)
router.delete('/users', deleteAllUsers)

router.post('/users/login', loginUser)

export default router