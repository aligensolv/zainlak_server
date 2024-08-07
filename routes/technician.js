import { Router } from 'express'

const router = Router();

import multer from 'multer'
import path from 'path'
import Randomstring from 'randomstring'

import { getAllTechnicians, getTechnicianById, deleteTechnician, deleteAllTechnicians, createTechnician, updateTechnician, getAllTechniciansByCategory, getTechniciansCount, registerTechnician, loginTechnician } from '../controllers/technician_controller.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/technicians')
  },
  filename: (req, file, cb) => {
    cb(null, `technician_${Randomstring.generate(10)}${path.extname(file.originalname.replace(/\s/g, ''))}`)
  },
})

const upload = multer({ storage: storage })

router.get('/technicians', getAllTechnicians)
router.get('/technicians/count', getTechniciansCount)

router.get('/technicians/categories/:id', getAllTechniciansByCategory)

router.get('/technicians/:id', getTechnicianById)

router.post('/technicians', upload.single('image'),createTechnician);
router.post('/technicians/register', upload.single('image'),registerTechnician);
router.post('/technicians/login', upload.single('image'),loginTechnician);

router.put('/technicians/:id',upload.single('image'), updateTechnician)

router.delete('/technicians/:id', deleteTechnician)
router.delete('/technicians', deleteAllTechnicians)

export default router
