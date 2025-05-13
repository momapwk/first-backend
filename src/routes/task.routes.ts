import { Router } from "express"
import { createTask, deleteTask, getTask, getTaskById, updateTask } from "../controllers/task.controller"

const router = Router()

router.get('/', getTask)

router.post('/', createTask)

router.get('/:id', getTaskById)

router.patch('/:id', updateTask)

router.delete('/:id', deleteTask)

export default router