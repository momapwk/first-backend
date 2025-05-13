import { Document } from 'mongoose'

export interface ITask extends Document {
    title: string
    description: string
    dueDate: Date
    completed:Boolean
}