import { Router } from "express"
import asyncWrapper from '../middlewares/async_wrapper.js'
import fs from 'fs'
import { BAD_REQUEST } from "../constants/status_codes.js"
import CustomError from '../interfaces/custom_error_class.js'

const router = Router()

router.get('/terms', asyncWrapper(
    async (req,res) => {
        const terms = fs.readFileSync('data/terms.txt', 'utf8').replace('"','').trim()

        return res.status(200).send(terms)
    }
))

router.put('/terms', asyncWrapper(
    async (req,res,next) => {
        const {content} = req.body

        if(!content){
            const content_missing = new CustomError('Content missing', BAD_REQUEST)
            return next(content_missing)
        }

        const terms = fs.writeFileSync('data/terms.txt', content,'utf-8')

        return res.status(200).send(terms)
    }
))

export default router