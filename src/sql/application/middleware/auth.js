const { User } = require('@sql/core/models');
const { ApiError } = require('@sql/infrastructure/handler');
const { decodeToken } = require('@sql/infrastructure/utils');

// Create auth middleware to check splitToken from client
const auth = async (token) => {
    try {
        if (!token) {
            throw ApiError.unauthorized('You are not authorized to access this resource.');
        }
        const splitToken = token.split(' ');

        if (splitToken[0] !== 'Bearer') {
            throw ApiError.unauthorized('You are not authorized to access this resource.');
        }

        const decode_token = await decodeToken(splitToken[1]);
        if (!decode_token) {
            throw ApiError.unauthorized('Token is not valid.');
        }
        console.log("=== Token === ", splitToken)
        
        const user = await User.findByPk(decode_token.id);
        if (!user) {
            throw ApiError.unauthorized('Token is not valid.');
        }

        return user?.dataValues;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
};

module.exports = {auth};