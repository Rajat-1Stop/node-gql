const jwt = require('jsonwebtoken');
const { JWT } = require('@sequelize/config');
const { ApiError } = require('../handler');

const { SECRET, EXPIRES, ALGORITHM } = JWT;

// Generate JWT token based on user's id and role 
const generateToken = (id, role) => {
    const token = jwt.sign(
        { id, role }, 
        SECRET, 
        { expiresIn: EXPIRES, algorithm: ALGORITHM }
    );

    return token;
};

// Verify JWT token
const verifyToken = (token) => {
    jwt.verify(token, SECRET, (err) => {
        if (err) {
            throw ApiError.unauthorized(err.message);
        }
    });
    return true;
};

// Decode JWT token
const decodeToken = (token) => {
    const verify = verifyToken(token);
    if (verify) {
        return jwt.decode(token);
    }
    return null;
};

module.exports = {
    generateToken,
    verifyToken,
    decodeToken
};