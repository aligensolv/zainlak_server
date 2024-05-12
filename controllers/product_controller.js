import { BAD_REQUEST, OK } from '../constants/status_codes.js';
import asyncWrapper from '../middlewares/async_wrapper.js'
import ProductRepository from '../repositories/Product.js';
import CustomError from '../interfaces/custom_error_class.js'
import { static_absolute_files_host } from '../config.js';

export const getAllProducts = asyncWrapper(
  async (req, res) => {
    const products = await ProductRepository.getAllProducts()

    return res.status(OK).json(products)
  }
)

export const getProductsCount = asyncWrapper(
  async (req, res) => {
    const count = await ProductRepository.getProductsCount()

    return res.status(OK).json(count)
  }
)

export const getProductById = asyncWrapper(
  async (req, res) => {
    const {id} = req.params
    const product = await ProductRepository.getProductById(id)

    return res.status(OK).json(product)
  }
)

export const deleteProduct = asyncWrapper(
  async (req, res) => {
    const {id} = req.params
    const result = await ProductRepository.deleteProduct(id)

    return res.status(OK).json(result)
  }
)

export const deleteAllProducts = asyncWrapper(
  async (req, res) => {
    const result = await ProductRepository.deleteAllProducts()

    return res.status(OK).json(result)
  }
)


export const createProduct = asyncWrapper(
  async (req, res, next) => {
    const { name, description, link, price, quantity } = req.body

    if(!req.file){
      const image_not_provided_error = new CustomError('Image not provided', BAD_REQUEST)
      return next(image_not_provided_error)
    }

    let image = static_absolute_files_host + req.file.path

    const product = await ProductRepository.createProduct({ image, name, description, link, price, quantity })

    return res.status(OK).json(product)
  }
)

export const updateProduct = asyncWrapper(
  async (req, res, next) => {
    const { name, description, link, price, quantity } = req.body
    const {id} = req.params


    let image = req.file != null ? static_absolute_files_host + req.file.path : undefined

    const product = await ProductRepository.updateProduct({ id, image, name, description, link, price, quantity })

    return res.status(OK).json(product)
  }
)