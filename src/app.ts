import express, { Express } from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes'
import taskRoutes from './routes/task.routes'

//  Initialize Express app
const app: Express = express()

//  Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/task', taskRoutes)

//  Root route
app.get('/', (req, res) => {
    res.send(`
        API is running...
        
        status: Online
        Uptime: ${Math.floor(process.uptime())} seconds
        
        
        Built with Express + Typescript + MongoDB
        `)
})

app.get('/status', (req, res) => {
    res.send(`
        
        status: Online
        Uptime: ${Math.floor(process.uptime())} seconds
        
        
        `)
})

export default app