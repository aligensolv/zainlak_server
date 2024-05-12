import express from 'express'
import { changeUserPassword, sendOtpResetCode, verifyResetCode } from '../controllers/otp_controller.js';


const router = express.Router();

router.post('/otp/send', sendOtpResetCode);
router.post('/otp/verify', verifyResetCode);
router.post('/otp/change', changeUserPassword);


export default router