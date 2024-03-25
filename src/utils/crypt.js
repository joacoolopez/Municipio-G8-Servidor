import { hash, compare } from 'bcrypt';

const encrypt = async (password) => {
    const encryptPassword = await hash(password, 8)
    return encryptPassword
}

const isValidPassword = async (password, hashPassword) => {
    const valid = await compare(password, hashPassword)
    return valid
}

export {encrypt, isValidPassword}