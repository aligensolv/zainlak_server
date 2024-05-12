import OtpRepository from "../repositories/Otp.js";
import asyncWrapper from '../middlewares/async_wrapper.js'
import { OK } from "../constants/status_codes.js";

export const sendOtpResetCode = asyncWrapper(
  async (req, res) => {
    const { email } = req.body
    const otp = await OtpRepository.sendOtpResetCode(email)
    return res.status(OK).json(otp)
  }
)
  

// Verify reset code
export const verifyResetCode = asyncWrapper(
  async (req, res) => {
    const { email, code } = req.body

    const result = await OtpRepository.verifyResetCode({ email, code })
    return res.status(OK).json(result)
  }
);

export const changeUserPassword = asyncWrapper(
  async (req, res) => {
    const { email, password } = req.body
    const result = await OtpRepository.changeUserPassword({ email, password })
    return res.status(OK).json(result)
  }
)