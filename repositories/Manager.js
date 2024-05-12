import moment from 'moment'
import promiseAsyncWrapper from '../middlewares/promise_async_wrapper.js'
import Manager from '../models/manager.js'
import Auth from './Auth.js'

import CustomError from '../interfaces/custom_error_class.js'
import { NOT_FOUND } from '../constants/status_codes.js'

class ManagerRepository{
    static async loginManager({ email, password }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const manager = await Manager.findOne({
                        email
                    })

                    if(!manager){
                        const manager_not_found = new CustomError('Manager not found', NOT_FOUND)
                        return reject(manager_not_found)
                    }

                    const decoded_password = await Auth.decryptAndCheckPasswordMatch({
                        normal: password,
                        hashed: manager.password
                    })

                    if(!decoded_password){
                        const password_mismatch = new CustomError('Password mismatch', NOT_FOUND)
                        return reject(password_mismatch)
                    }

                    const token = await Auth.generateToken({
                        id: manager._id,
                        role: manager.role
                    })

                    return resolve({
                        manager,
                        token
                    })
                }
            )
        )
    }

    static async registerManager({ name, password, email }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const created_at = moment().format('DD-MM-YYYY HH:mm:ss')

                    const hashed_password = await Auth.encryptPassword(password)

                    const manager = await Manager.create({ name, email, password: hashed_password, created_at })

                    resolve(manager)
                }
            )
        )
    }

    static async deleteManager(manager_id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const result = await Manager.deleteOne({
                        _id: manager_id
                    })

                    if(result.deletedCount == 0){
                        const manager_not_found = new CustomError('Failed to delete manager', NOT_FOUND)
                        return reject(manager_not_found)
                    }

                    resolve('Manager was deleted')
                }
            )
        )
    }

    static async deleteAllManagers(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const managers = await Manager.find({ role: { $ne: 'admin' } })
                    const deleted_managers = await Manager.deleteMany({ _id: { $in: managers.map(manager => manager._id) } })
                    resolve(`${deleted_managers.deletedCount} managers were deleted`)
                }
            )
        )
    }

    static async getAllManagers(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const managers = await Manager.find({})
                    resolve(managers)
                }
            )
        )
    }

    static async updateManagerCredentials({ id, email, password }) {
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    console.log({ id, email, password });
                    const hashed_password = await Auth.encryptPassword(password)

                    const result = await Manager.updateOne({ _id: id },{
                        email, password: hashed_password
                    })
                    resolve(result)
                }
            )
        )
    }
}

export default ManagerRepository