import { Params } from './../../node_modules/@types/express-serve-static-core/index.d';
import {Request,response,Response} from 'express'
import User from '../models/user.model'
import {IUser} from'../types/user'

import { performance } from 'perf_hooks'
import { handleError, isValidObjectId } from '../utils/validator';



//Get all users
export const getUsers = async (_req: Request, res:  Response): Promise<void> => {
try {
    //  Use lean() for better performance when you don't
    //  need full mongoose documents
    const users = await User.find()

    .select('-password').lean()
    res.status(200).json(users)
} catch (error) {handleError(res, error)
}}

// Get Users by ID
export const getUserById = async (req:Request,res:Response):Promise<void> => {
    try {
        const {id} =req.params
        if(!isValidObjectId(id,res)) return
        const user =await User.findById(id).select('-password').lean()
        if(!user){
            res.status(404).json({message: 'User not Found'})
            return
        }
        res.status(200).json(user)

    }catch(error){
    handleError(res,error)
}
}


// Creat new user
export const createUser =async (
    req:Request<{},{},IUser>,
    res:Response

): Promise<void> => {
    try {
        const{name,email,password} =req.body
    //   check required field
    if(!name || !email ||!password){
        response.status(400).json({message:'Missing required fields'})
        return
    }

    // use findOne with project for better performance
    const existingUser =await User.findOne({email}).select('_id').lean()
    if (existingUser){
        res.status(400).json({message: 'User already exists'})
        return
    }
    const user =new User({name,email,password})
    const savedUser = await user.save()

    // Extract only needed fields for response
    const {_id,name: userName,email:userEmail,createdAt} = savedUser
    res.status(201).json({_id,name: userName,email:userEmail,createdAt})
}catch(error){
        handleError(res,error)
    }
}

//   Update user
export const updateUser = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { name, email } = req.body
        if (!isValidObjectId(id, res)) return
        //  Ensure at least one update field is provided
        if (!name && !email) {
            res.status(400).json({ message: 'No update fields provided'})
            return
        }
        //  Build update object dynnamically
        const updateData: Partial<IUser> = {}
        if (name) updateData.name = name
        if (email) updateData.email = email
        //  If email is being updated, check for duplicates
        if (email) {
        const emailExists = await User.findOne({
            email,
            _id: { $ne: id},
        })
        .select('_id')
        .lean()
        if (emailExists) {
            res.status(400).json({ messaage: 'Email already in use'})
            return
        }}
        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        })
        .select('-password')
        .lean()

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found'})
            return
        }
        res.status(200).json(updatedUser)
    }catch(error) {
        handleError(res, error)
    }
}

//  Delete user
export const deleteUser = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        if (!isValidObjectId(id, res)) return
        const deleteUser = await User.findByIdAndDelete(id).lean()
        if (!deleteUser) {
            res.status(404).json({message: 'User not found'})
            return
        }
        res.status(200).json({message: 'User deleted successfully'})
    }catch (error){
         handleError(res,error)
    }
}

