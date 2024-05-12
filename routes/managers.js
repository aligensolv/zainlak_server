import { Router } from 'express'
import { deleteAllManagers, deleteManager, getAllManagers, loginManager, registerManager, updateManagerCredentials } from '../controllers/manager_controller.js'

const router = Router()

router.get('/managers', getAllManagers)

router.post('/managers/login',loginManager)

router.post('/managers', registerManager)

router.delete('/managers', deleteAllManagers)
router.delete('/managers/:id', deleteManager)

router.put('/managers/:id/credentials', updateManagerCredentials)

export default router