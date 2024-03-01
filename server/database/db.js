import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: 'code-editor' });
        console.log('Database Connected')
    } catch (error) {
        console.error('Error in database connection', error)
    }
}