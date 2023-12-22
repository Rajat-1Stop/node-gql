const { ApiError } = require('@sequelize/infrastructure/handler');
const { 
    generateToken
} = require('../../../infrastructure/utils');
const {
    login,
    register
} = require('../../../core/services');

const authResolver = {
    Query: {},
    Mutation: {
        loginUser: async (_, { data }, context) => {
            try {
                const user = await login(data);
                const token = await generateToken(user.id, user.role);
                console.log("=== Login Token === ", token)
                return user;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
        registerUser: async (_, { data }, context) => {
            try {
                const user = await register(data);
                const token = await generateToken(user.id, user.role);
                return user;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
    },
};

module.exports = authResolver;