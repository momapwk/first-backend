import { Router } from 'express'
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user.controller'

const router = Router()

//  Get all users
router.get('/', getUsers)

//  Create new user
router.post('/', createUser)

//  Get user by ID
router.get('/:id', getUserById)

//  Update user
router.patch('/:id', updateUser)

//  Delete user
router.delete('/:id', deleteUser)

export default router