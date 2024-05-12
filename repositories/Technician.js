import Technician from "../models/Technician.js"
import promiseAsyncWrapper from '../middlewares/promise_async_wrapper.js'
import moment from "moment"
import Auth from "./Auth.js"

class TechnicianRepository{
    static async getAllTechnicians(){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                const technicians = await Technician.find({}).populate({
                    path: 'category',
                    ref: 'Category'
                })
                resolve(technicians)
            })
        )
    }

    static async getAllTechniciansByCategory(category){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                const technicians = await Technician.find({
                    category
                }).populate({
                    path: 'category',
                    ref: 'Category'
                })
                resolve(technicians)
            })
        )
    }

    static async getTechnicianById(technician_id){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                const tech = await Technician.findOne({ _id: technician_id }).populate({
                    path: 'category',
                    ref: 'Category'
                })

                if(!tech){
                    let tech_not_found_error = new CustomError(`Technician does not exist`, NOT_FOUND)
                    return reject(tech_not_found_error)
                }

                return resolve(tech)
            })
        )
    }

    static async deleteTechnician(technician_id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    let result = await Technician.deleteOne({ _id: technician_id })
                    return resolve(result.deletedCount > 0 ? 'Technician was deleted Successfully' : 'Failed to delete Technician')
                }
            )
        )
    }

    static async deleteAllTechnicians(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    let result = await Technician.deleteMany({})
                    return resolve(result.deletedCount > 0 ? 'All Technician were deleted Successfully' : 'No Technicians were deleted')
                }
            )
        )
    }

    static async createTechnician({ name,email,phone,location,profile_image,password,is_popular,category,is_available,shift_start_time,shift_end_time, price }){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                const created_at = moment().format('DD-MM-YYYY HH:mm:ss')

                const hashed_password = await Auth.encryptPassword(password)

                const tech = await Technician.create({
                    name,
                    email,
                    phone,
                    location,
                    profile_image,
                    password: hashed_password,
                    created_at,
                    is_popular,
                    category,
                    is_available,
                    shift_start_time,
                    shift_end_time,
                    price
                })

                return resolve(tech)
            })
        )
    }

    static async updateTechnician({ id,name,email,phone,location,profile_image,category,shift_start_time,shift_end_time, price }){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {

                const tech = await Technician.updateOne({ _id: id }, {
                    name,
                    email,
                    phone,
                    location,
                    profile_image,
                    category,
                    shift_start_time,
                    shift_end_time,
                    price
                })

                return resolve(tech)
            })
        )
    }

    static async getTechniciansCount(){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                const count = await Technician.countDocuments({})
                return resolve(count)
            })
        )
    }
}

export default TechnicianRepository