import asyncWrapper from '../middlewares/async_wrapper.js'
import SliderRepository from '../repositories/Slider.js'
import CustomError from '../interfaces/custom_error_class.js'
import { BAD_REQUEST, OK } from '../constants/status_codes.js'
import { static_absolute_files_host } from '../config.js'

export const getAllSliders = asyncWrapper(
    async (req,res) => {
        const sliders = await SliderRepository.getAllSliders()
        return res.status(OK).json(sliders)
    }
)

export const deleteSlider = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const result = await SliderRepository.deleteSlider(id)
        return res.status(OK).json(result)
    }
)

export const deleteAllSliders = asyncWrapper(
    async (req,res) => {
        const result = await SliderRepository.deleteAllSliders()
        return res.status(OK).json(result)
    }
)

export const createSlider = asyncWrapper(
    async (req,res,next) => {
        const {description} = req.body

        if(!req.file){
            let image_missing_error = new CustomError('Image is required', BAD_REQUEST)
            return next(image_missing_error)
        }

        const image = static_absolute_files_host + req.file.path

        const result = await SliderRepository.createSlider({image,description})
        return res.status(OK).json(result)
    }
)
