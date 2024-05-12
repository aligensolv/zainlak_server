import { Router } from 'express'
import path from 'path'
import Randomstring from 'randomstring'
import multer from 'multer'
import { createSlider, deleteAllSliders, deleteSlider, getAllSliders } from '../controllers/slider_controller.js'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/sliders')
    },
    filename: (req, file, cb) => {
        cb(null, `slider_${Randomstring.generate(10)}${path.extname(file.originalname.replace(/\s/g, ''))}`)
    },
})

const upload = multer({ storage: storage })

const router = Router()

router.get('/sliders', getAllSliders)
router.post('/sliders', upload.single('image'), createSlider)
router.delete('/sliders/:id', deleteSlider)
router.delete('/sliders', deleteAllSliders)

export default router