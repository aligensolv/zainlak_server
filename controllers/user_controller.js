import { BAD_REQUEST, OK } from '../constants/status_codes.js';
import asyncWrapper from '../middlewares/async_wrapper.js'
import UserRepository from '../repositories/User.js';
import CustomError from '../interfaces/custom_error_class.js';
import { static_absolute_files_host } from '../config.js';

export const getAllUsers = asyncWrapper(
    async (req, res) => {
        const users = await UserRepository.getAllUsers()
        res.status(OK).json(users);
    }
);

export const getUserById = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const user = await UserRepository.getUserById(id)
        res.status(OK).json(user)
    }
);

export const registerUser = asyncWrapper(
    async (req, res, next) => {
        const { name, email, phone, password, location } = req.body

        const profile_image = req.file != null ? static_absolute_files_host + req.file.path : null

        const user = await UserRepository.registerUser({ name, email, phone, password, profile_image, location })
        res.status(OK).json(user)
    }
)

export const loginUser = asyncWrapper(
    async (req, res) => {
        const { email, password } = req.body
        const user = await UserRepository.loginUser({ email, password })
        res.status(OK).json(user)
    }
)

export const updateUser = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const { name, email, phone, location } = req.body

        const profile_image = req.file != null ? static_absolute_files_host + req.file.path : undefined

        const result = await UserRepository.updateUser({ user_id: id, name, email, phone, location, profile_image })
        res.status(OK).json(result)
    }
)

export const deleteUser = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const result = await UserRepository.deleteUser(id)
        res.status(OK).json(result)
    }
)

export const deleteAllUsers = asyncWrapper(
    async (req, res) => {
        const result = await UserRepository.deleteAllUsers()
        res.status(OK).json(result)
    }
)

export const getUsersCount = asyncWrapper(
    async (req, res) => {
        const count = await UserRepository.getUsersCount()
        res.status(OK).json(count)
    }
)