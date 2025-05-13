import { Response } from 'express'
import mongoose from 'mongoose'

// Reusable error handler
export const handleError =(res:Response,error:unknown,statusCode =500): void => {
    const errorMessage =error instanceof Error ? error.message : 'server error'
    res.status(statusCode).json({message:errorMessage})
}

//  Validate MongoDB ObjectId
export const isValidObjectId = (id: string, res: Response): boolean => {
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({ message: 'Invalid user ID format'})
        return false
    }
    return true
}