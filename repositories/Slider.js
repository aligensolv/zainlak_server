import moment from 'moment'
import promiseAsyncWrapper from '../middlewares/promise_async_wrapper.js'
import Slider from '../models/Slider.js'
import CustomError from '../interfaces/custom_error_class.js'
import { NOT_CHANGED } from '../constants/status_codes.js'

class SliderRepository{
    static async createSlider({ image, description }){
        const created_at = moment().format('DD-MM-YYYY HH:mm:ss')
        return new Promise(
            promiseAsyncWrapper(
                async(resolve,reject) => {
                    const slider = await Slider.create({ image, description, created_at })
                    return resolve(slider)
                }
            )
        )
    }

    static async getAllSliders(){
        return new Promise(
            promiseAsyncWrapper(
                async(resolve,reject) => {
                    const sliders = await Slider.find({})
                    return resolve(sliders)
                }
            )
        )
    }

    static async getAllSlidersCount(){
        return new Promise(
            promiseAsyncWrapper(
                async(resolve,reject) => {
                    const count = await Slider.countDocuments({})
                    return resolve(count)
                }
            )
        )
    }

    static async deleteAllSliders(){
        return new Promise(
            promiseAsyncWrapper(
                async(resolve,reject) => {
                    const result = await Slider.deleteMany({})
                    if(result.deletedCount == 0 && await this.getAllSlidersCount() != 0){
                        const delete_slider_error = new CustomError('Failed to delete all sliders', NOT_CHANGED)
                        return reject(delete_slider_error)
                    }

                    return resolve('All Sliders were deleted successfully')
                }
            )
        )
    }

    static async deleteSlider(slider_id){
        return new Promise(
            promiseAsyncWrapper(
                async(resolve,reject) => {
                    const result = await Slider.deleteOne({ _id: slider_id })
                    if(result.deletedCount == 0){
                        const delete_slider_error = new CustomError('Failed to delete slider', NOT_CHANGED)
                        return reject(delete_slider_error)
                    }

                    return resolve('Slider was deleted successfully')
                }
            )
        )
    }

}

export default SliderRepository