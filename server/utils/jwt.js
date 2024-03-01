import jwt from 'jsonwebtoken';

export const getToken = (userid) => {
    return jwt.sign({ id: userid }, process.env.JWT_TOKEN)
}