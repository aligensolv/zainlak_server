import moment from 'moment';
import { NOT_FOUND } from '../constants/status_codes.js';
import CustomError from '../interfaces/custom_error_class.js';
import promiseAsyncWrapper from '../middlewares/promise_async_wrapper.js';
import User from '../models/User.js'
import Auth from './Auth.js';

class UserRepository{
    static async getAllUsers(){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                const users = await User.find({});
                return resolve(users)
            })
        )
    }


    static async getUserById(user_id){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                const user = await User.findOne({
                    _id: user_id
                });

                if(!user){
                    let user_not_found_error = new CustomError(`User '${user_id}' does not exist`, NOT_FOUND)
                    return reject(user_not_found_error)
                }

                return resolve(user)
            })
        )
    }

    static async getUserByEmail(email){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                const user = await User.findOne({
                    email
                })
                

                if(!user){
                    let user_not_found_error = new CustomError(`User with email '${email}' does not exist`, NOT_FOUND)
                    return reject(user_not_found_error)
                }

                return resolve(user)
            })
        )
    }

    static async registerUser({ name, email, phone, password, profile_image, location }){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                const hashed_password = await Auth.encryptPassword(password)

                const created_at = moment().format('DD-MM-YYYY HH:mm:ss')

                const user = await User.create({
                    name,
                    email,
                    phone,
                    password: hashed_password,
                    profile_image,
                    location,
                    created_at
                })
                
                return resolve(user)
            })
        )
    }

    static async loginUser({ email, password }){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                const user = await User.findOne({
                    email
                });

                if(!user){
                    let user_not_found_error = new CustomError(`User '${email}' does not exist`, NOT_FOUND)
                    return reject(user_not_found_error)
                }

                const isMatch = await Auth.decryptAndCheckPasswordMatch({
                    normal: password,
                    hashed: user.password
                })

                if(!isMatch){
                    let invalid_password_error = new CustomError('Invalid Password', NOT_FOUND)
                    return reject(invalid_password_error)
                }

                const token = await Auth.generateToken({
                    id: user._id,
                    role: 'user',
                    email: user.email
                })

                return resolve({ user, token })
            })
        )
    }

    static async updateUser({ user_id, name, email, password, location, profile_image }) {
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {

                const result = await User.updateOne({ _id: user_id },{
                    name,
                    email,
                    password,
                    location,
                    profile_image
                })


                return resolve(result.modifiedCount > 0 ? 'User was updated successfully' : 'Failed to update user')
            })
        )
    }

    static async deleteUser(user_id){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                let result = await User.deleteOne({
                    _id: user_id
                })

                return resolve(result.deletedCount > 0 ? 'User was deleted successfully' : 'Failed to delete user')
            })
        )
    }

    static async deleteAllUsers(){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                await User.deleteMany({})
                return resolve('All Users were deleted successfully')
            })
        )
    }

    static async getUsersCount(){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                const count = await User.countDocuments({})
                return resolve(count)
            })
        )
    }

    static async deleteAccount({ token }){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                const { id } = await Auth.verifyToken(token)

                await User.deleteOne({
                    _id: id
                })

                return resolve(id)
            })
        )
    }

    static async deleteAccountByEmail({ email, reason, additionalInfo }){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                await User.deleteOne({
                    email
                })
                return resolve('Account was deleted successfully')
            })
        )
    }
}

export default UserRepository