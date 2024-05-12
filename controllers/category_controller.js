import { BAD_REQUEST, OK } from '../constants/status_codes.js'
import asyncWrapper from '../middlewares/async_wrapper.js'
import CustomError from '../interfaces/custom_error_class.js'
import CategoryRepository from '../repositories/Category.js'
import { static_absolute_files_host } from '../config.js'

export const getAllCategories = asyncWrapper(
  async (req, res) => {
    const categories = await CategoryRepository.getAllCategories()

    console.log(categories);

    return res.status(OK).json(categories)
  }
)

export const getAllSubCategories = asyncWrapper(
  async (req, res) => {
    const { id } = req.params
    const categories = await CategoryRepository.getAllSubCategories(id)

    return res.status(OK).json(categories)
  }
)

export const getCategoryById = asyncWrapper(
  async (req, res) => {
    const { id } = req.params
    const category = await CategoryRepository.getCategoryById(id)
    return res.status(OK).json(category)
  }
)

export const deleteCategory = asyncWrapper(
  async (req, res) => {
    const {id} = req.params
    let result = await CategoryRepository.deleteCategory(id)


    return res.status(OK).json(result)
  }
)


export const deleteAllCategories = asyncWrapper(
  async (req, res) => {
    const result = await CategoryRepository.deleteAllCategories()
    return res.status(OK).json(result)
  }
)

export const createCategory = asyncWrapper(
  async (req, res, next) => {
    const { name, arabic_name, description, parent_category, price } = req.body
    console.log(req.body);
    console.log(req.file);
    
    if(!req.file){
      let image_missing_error = new CustomError('Image is required', BAD_REQUEST)
      return next(image_missing_error)
    }

    const image = static_absolute_files_host + req.file.path

    const category = await CategoryRepository.createCategory({ name, arabic_name, description, image, parent_category, price })

    return res.status(OK).json(category)
  }
)

export const updateCategory = asyncWrapper(
  async (req, res, next) => {
    const { name, arabic_name, description, parent_category, price } = req.body
    const {id} = req.params

    console.log(req.body);
    console.log(req.params);

    const image = req.file != null ? static_absolute_files_host + req.file.path : undefined

    const result = await CategoryRepository.updateCategory({ id, name, arabic_name, description, image, parent_category, price })

    return res.status(OK).json(result)
  }
)

