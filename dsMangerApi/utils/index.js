const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

const errorHandler = async (err, req, res, next) => {
    // Log the error
    console.error(err.message);

    // Set the response status code and message
    res.status(500).json({
        error: err.message,
        message: 'Something went wrong',
        code: 500
    });
}


module.exports = {
    verifyToken,
    errorHandler
}