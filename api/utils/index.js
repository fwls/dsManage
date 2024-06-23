const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');
const cache = require('./cache')
const { generateJobs } = require('./jobPulgin');
const WebSocket = require('ws');

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

async function pushDataToChannel(channel, data) {
    const clientsByChannel = cache.get('clientsByChannel')
    if (clientsByChannel[channel]) {
        clientsByChannel[channel].forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
}


module.exports = {
    verifyToken,
    errorHandler,
    pushDataToChannel,
    generateJobs
}