const { User } = require('../../core/models');
const { ApiError } = require('@sequelize/infrastructure/handler');
const { decodeToken } = require('@sequelize/infrastructure/utils');

// Create auth middleware to check token from client
const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw ApiError.unauthorized('You are not authorized to access this resource.');
        }
        const token = req.headers.authorization.split(' ');

        if (token[0] !== 'Bearer') {
            throw ApiError.unauthorized('You are not authorized to access this resource.');
        }

        const decode_token = await decodeToken(token[1]);
        if (!decode_token) {
            throw ApiError.unauthorized('Token is not valid.');
        }
        console.log("=== Token === ", token)
        req.user = null;
        const user = await User.findByPk(decode_token.id);
        if (!user) {
            throw ApiError.unauthorized('Token is not valid.');
        }

        req.user = user?.dataValues;
        next();
    } catch (error) {
        throw ApiError.internal(error.message);
    }
};

module.exports = {auth};