import moment from "moment"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import Product from "../models/Product.js"
import QrcodeRepository from "./Qrcode.js"
import { NOT_CHANGED } from "../constants/status_codes.js"
import CustomError from '../interfaces/custom_error_class.js'

class ProductRepository{
    static async getAllProducts(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const products = await Product.find({})

                    return resolve(products)
                }
            )
        )
    }

    static async getProductById(product_id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const product = await Product.findOne({ _id: product_id })

                    return resolve(product)
                }
            )
        )
    }

    static async getProductsCount(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const count = await Product.countDocuments({})

                    return resolve(count)
                }
            )
        )
    }

    static async deleteProduct(product_id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const result = await Product.deleteOne({ _id: product_id })
                    if(result.deletedCount == 0){
                        const delete_product_error = new CustomError('Failed to delete product', NOT_CHANGED)
                        return reject(delete_product_error)
                    }
                    return resolve('Product was deleted successfully')
                }
            )
        )
    }

    static async deleteAllProducts(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const result = await Product.deleteMany({})
                    if(result.deletedCount == 0 && await this.getProductsCount() != 0){
                        const delete_product_error = new CustomError('Failed to delete all products', NOT_CHANGED)
                        return reject(delete_product_error)
                    }
                    return resolve('Products were deleted successfully')
                }
            )
        )
    }

    static async createProduct({ image, name, description, link, price, quantity }){
        console.log( image, name, description, link, price, quantity);
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    
                    const created_at = moment().format('DD-MM-YYYY HH:mm:ss')
                    const qrcode = await QrcodeRepository.generateProductQrcode({ link, name })

                    console.log(qrcode);
                    console.log(created_at);
                    const product = await Product.create({
                        image, name, description, link, price: +price, quantity: +quantity, created_at, qrcode
                    })

                    return resolve(product)
                }
            )
        )
    }

    static async updateProduct({ id, image, name, description, link, price, quantity }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    
                    const created_at = moment().format('DD-MM-YYYY HH:mm:ss')
                    const qrcode = await QrcodeRepository.generateProductQrcode({ link, name })

                    const result = await Product.updateOne({ _id: id },{
                        image, name, description, link, price: +price, quantity: +quantity, created_at, qrcode
                    })

                    return resolve(result)
                }
            )
        )
    }

}

export default ProductRepository