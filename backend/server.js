import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'
import cors from 'cors'
// import path from 'path'
// import { fileURLToPath } from 'url'

dotenv.config()

connectDB()

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// app.use(express.static(path.join(__dirname, './client/build')))


//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

// app.get('/', (req, res) => {
//     res.send("<h1>Welcome to e-commerce app</h1>")
// })

// app.use('*', function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"))
// })

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running in the ${process.env.DEV_MODE} mode on the port number ${PORT}`.bgCyan.white)
})