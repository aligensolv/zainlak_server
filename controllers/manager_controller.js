import { OK } from '../constants/status_codes.js'
import asyncWrapper from '../middlewares/async_wrapper.js'
import ManagerRepository from '../repositories/Manager.js'

export const loginManager = asyncWrapper(
    async (req, res) =>{
        const { email, password } = req.body

        const result = await ManagerRepository.loginManager({ email, password })

        res.status(OK).json(result)
    }
)


export const registerManager = asyncWrapper(
    async (req, res) =>{
        const { name, email, password } = req.body

        const result = await ManagerRepository.registerManager({ name, email, password })

        res.status(OK).json(result)
    }
)

export const deleteManager = asyncWrapper(
    async (req, res) =>{
        const { id } = req.params

        const result = await ManagerRepository.deleteManager(id)

        res.status(OK).json(result)
    }
)

export const deleteAllManagers = asyncWrapper(
    async (req, res) =>{
        const result = await ManagerRepository.deleteAllManagers()

        res.status(OK).json(result)
    }
)

export const getAllManagers = asyncWrapper(
    async (req, res) =>{
        const result = await ManagerRepository.getAllManagers()

        res.status(OK).json(result)
    }
)

export const updateManagerCredentials = asyncWrapper(
    async (req, res) =>{
        const {email, password} = req.body
        const {id} = req.params

        const result = await ManagerRepository.updateManagerCredentials({ id, email, password })

        res.status(OK).json(result)
    }
)