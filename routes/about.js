import { Router } from "express"
import asyncWrapper from '../middlewares/async_wrapper.js'
import fs from 'fs'
import { BAD_REQUEST } from "../constants/status_codes.js"
import CustomError from '../interfaces/custom_error_class.js'

const router = Router()

router.get('/about', asyncWrapper(
    async (req,res) => {
        const about = fs.readFileSync('data/about.txt', 'utf8')

        return res.status(200).send(about)
    }
))

router.put('/about', asyncWrapper(
    async (req,res,next) => {
        const {content} = req.body
        if(!content){
            const content_missing = new CustomError('Content missing', BAD_REQUEST)
            return next(content_missing)
        }

        const about = fs.writeFileSync('data/about.txt', content,'utf-8')

        return res.status(200).send(about)
    }
))

export default router