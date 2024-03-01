import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide user email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide user password'],
    }
}, { timestamps: true });

export const UserSchema = mongoose.model('user', schema)