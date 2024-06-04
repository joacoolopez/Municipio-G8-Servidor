import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }
    try {
        const firma = verifyToken(token)
        if (firma){
            req.documento = firma.documento
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Token inválido');
    }
};

export {authMiddleware}
