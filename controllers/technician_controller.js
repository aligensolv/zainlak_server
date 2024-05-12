import { BAD_REQUEST, OK } from '../constants/status_codes.js';
import asyncWrapper from '../middlewares/async_wrapper.js'
import TechnicianRepository from '../repositories/Technician.js';
import CustomError from '../interfaces/custom_error_class.js'
import { static_absolute_files_host } from '../config.js';

export const getAllTechnicians = asyncWrapper(
  async (req, res) => {
    const technicians = await TechnicianRepository.getAllTechnicians()
    res.status(OK).json(technicians);
  }
)

export const getAllTechniciansByCategory = asyncWrapper(
  async (req, res) => {
    const {id} = req.params
    const technicians = await TechnicianRepository.getAllTechniciansByCategory(id)
    res.status(OK).json(technicians);
  }
)

export const getTechnicianById = asyncWrapper(
  async (req,res) => {
    const {id} = req.params
    const technician = await TechnicianRepository.getTechnicianById(id)

    res.status(OK).json(technician)
  }
)

export const deleteTechnician = asyncWrapper(
  async (req,res) => {
    const {id} = req.params
    const result = await TechnicianRepository.deleteTechnician(id)
    res.status(OK).json(result)
  }
)

export const deleteAllTechnicians = asyncWrapper(
  async (req,res) => {
    const result = await TechnicianRepository.deleteAllTechnicians()
    res.status(OK).json(result)
  }
)

export const createTechnician = asyncWrapper(
  async (req,res,next) => {
    const {name,email,phone,location,password,shift_start_time,shift_end_time,price, category} = req.body

    if(!req.file){
      const image_is_required_error = new CustomError('Image is required', BAD_REQUEST)
      return next(image_is_required_error)
    }

    const profile_image = static_absolute_files_host + req.file.path

    const technician = await TechnicianRepository.createTechnician({
      name,email,phone,location,password,shift_start_time,shift_end_time,price, profile_image, category
    })
    res.status(OK).json(technician)
  }
)

export const updateTechnician = asyncWrapper(
  async (req,res) => {
    const {id} = req.params
    const {name, email, phone, location, password, shift_start_time, shift_end_time, price, category} = req.body
    const profile_image = req.file != null ? static_absolute_files_host + req.file.path : undefined

    const result = await TechnicianRepository.updateTechnician({id, name, email, phone, location, password, shift_start_time, shift_end_time, price, profile_image, category})
    res.status(OK).json(result)
  }
)

export const getTechniciansCount = asyncWrapper(
  async (req,res) => {
    const count = await TechnicianRepository.getTechniciansCount()
    res.status(OK).json(count)
  }
)