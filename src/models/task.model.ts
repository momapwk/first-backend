import mongoose, { Schema } from "mongoose"
import { ITask } from '../types/task'

const TaskSchema: Schema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

export default mongoose.model<ITask>('Task', TaskSchema)