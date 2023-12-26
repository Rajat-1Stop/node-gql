const { ApiError } = require('@sequelize/infrastructure/handler');

// Create auth middleware to check token from client
const role = (role) => {
    return (req) => {
        if(!req.user || req.user.role !== role) {
            throw ApiError.forbidden('Access Forbidden: This resource is not available for your account.');
        }
        next();
    };
};

module.exports = {role};