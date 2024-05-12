import moment from 'moment'
import promiseAsyncWrapper from '../middlewares/promise_async_wrapper.js'
import Category from '../models/Category.js'

class CategoryRepository{
    static async getAllCategories(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const categories = await Category.find({}).populate({
                        path: 'parent_category',
                        ref: 'Category'
                    })
                    resolve(categories)
                }
            )
        )
    }

    static async getCategoryById(category_id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const category = await Category.findOne({
                        _id: category_id
                    }).populate({
                        path: 'parent_category',
                        ref: 'Category'
                    })
                    resolve(category)
                }
            )
        )
    }

    static async getAllSubCategories(parent_category){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    const categories = await Category.find({ parent_category }).populate({
                        path: 'parent_category',
                        ref: 'Category'
                    })
                    resolve(categories)
                }
            )
        )
    }

    static async deleteCategory(category_id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    let result = await Category.deleteOne({
                        _id: category_id
                    })

                    if(result.deletedCount > 0){
                        await this.unlinkSubCategories(category_id)
                    }

                    resolve(result.deletedCount > 0 ? 'Category was deleted' : 'Failed to delete category')
                }
            )
        )
    }

    static async unlinkSubCategories(category_id){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    let result = await Category.updateMany({ parent_category: category_id }, {parent_category: null})

                    resolve(result.deletedCount > 0 ? 'All sub categories were deleted' : 'No sub categories were deleted')
                }
            )
        )
    }

    static async deleteAllCategories(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve,reject) => {
                    await Category.deleteMany({})
                    resolve('All Categories were deleted successfully')
                }
            )
        )
    }

    static async createCategory({ name, arabic_name, description, image, parent_category, price }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const created_at = moment().format('DD-MM-YYYY HH:mm:ss')

                    const category = await Category.create({
                        name,
                        arabic_name,
                        description,
                        image,
                        parent_category,
                        price: +price,
                        created_at
                    })
                    
                    resolve(category)
                }
            )
        )
    }

    static async updateCategory({ id, name, arabic_name, description, image, parent_category, price }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {

                    const result = await Category.updateOne({
                        _id: id
                    },{ name, arabic_name, description, image, parent_category, price })
                    
                    resolve(result)
                }
            )
        )
    }
}

export default CategoryRepository