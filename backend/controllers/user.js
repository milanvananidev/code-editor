import bcrypt from 'bcrypt';
import { UserSchema } from '../models/user.js'
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import { getToken } from '../utils/jwt.js';
import ErrorHandler from '../utils/ErrorHandler.js'

export const registerUser = catchAsyncErrors(async (req, res, next) => {

    const { username, email, password } = req.body;

    const isUser = await UserSchema.findOne({ email });

    if (isUser) {
        return next(new ErrorHandler('User is already exists'))
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let createdUser = await UserSchema.create({ username, email, password: hashedPassword });

    const token = getToken(createdUser._id)

    return res.status(201).json({
        success: true,
        token: token
    });
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please provide email or username and password', 401))
    };

    const user = await UserSchema.findOne({
        email
    }).select('+password');

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        return next(new ErrorHandler('Email and password is invalid', 401));
    }

    const token = getToken(user._id);

    user.password = undefined;

    return res.status(200).json({
        success: true,
        user,
        token
    })
});