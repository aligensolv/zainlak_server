import moment from 'moment'
import promiseAsyncWrapper from '../middlewares/promise_async_wrapper.js'
import Otp from '../models/Otp.js'
import Randomstring from 'randomstring'
import EmailRepository from './Email.js'
import { NOT_CHANGED, NOT_FOUND } from '../constants/status_codes.js'
import CustomError from '../interfaces/custom_error_class.js'
import UserRepository from './User.js'
import User from '../models/User.js'
import Auth from './Auth.js'

class OtpRepository{
    static async storeOtpCode({ email, code }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    
                    const created_at = moment().format('DD-MM-YYYY HH:mm:ss')

                    const otp = await Otp.create({ code, email, created_at })

                    resolve(otp)
                }
            )
        )
    }

    static async sendOtpResetCode(email){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    await UserRepository.getUserByEmail(email)
                    const code = Randomstring.generate(6)
                    const existing_otp = await Otp.findOne({ email })

                    if(!existing_otp){
                        await this.storeOtpCode({ email, code })
                    }else{
                        await Otp.updateOne({ email }, { code })
                    }

                    await EmailRepository.sendMail({
                        subject: 'Reset password code',
                        to: email,
                        text: `Your reset code is ${code}`,
                        html: `<h1>Your reset code is ${code}</h1>`
                    })

                    resolve('rest code was sent successfully')
                }
            )
        )
    }

    static async verifyResetCode({ email, code }) {
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const otp = await Otp.findOne({ email, code })

                    if(!otp){
                        let otp_not_found_error = new CustomError('Invalid reset code' , NOT_FOUND)
                        return reject(otp_not_found_error)
                    }

                    resolve('Reset code verified successfully')
                }
            )
        )
    }

    static async changeUserPassword({ email, password }) {
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const hashed_password = await Auth.encryptPassword(password)
                    const result = await User.updateOne({ email }, { password: hashed_password })

                    if(result.modifiedCount == 0){
                        let user_password_not_changed_error = new CustomError('Failed to change password' , NOT_CHANGED)
                        return reject(user_password_not_changed_error)
                    }
                    resolve('Password is successfully changed')
                }
            )
        )
    }
}

export default OtpRepository