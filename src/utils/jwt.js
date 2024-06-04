import jwt from 'jsonwebtoken';

const sign = jwt.sign;
const verify = jwt.verify;

const generateToken = (documento) => {
    const token = sign({documento}, process.env.JWT_SECRET)
    return token
}

const verifyToken = (token) => {
    const valid = verify(token, process.env.JWT_SECRET)
    return valid
}

export {generateToken, verifyToken}