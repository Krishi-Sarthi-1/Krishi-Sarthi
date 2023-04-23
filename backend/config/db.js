import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB ${response.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`error in connecting to the mongoDB ${error}`.bgRed.white)
    }
}

export default connectDB