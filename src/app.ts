import express, { Application } from "express"
import { handleCors } from './middlewares/'
import apiRoutes from "./routes"

const app: Application = express()

app.use(express.json())
app.use(handleCors())
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by')

app.use('/api/v1/', apiRoutes)

export { app }

