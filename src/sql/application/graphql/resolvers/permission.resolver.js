const {
    userAction,
    roleAction
} = require('@sql/core/services');
const { ApiError } = require('@sql/infrastructure/handler');

const roleResolver = {
    Mutation: {
        userAction: async (_, { data }, context) => {
            try {
                const add = await userAction(data);
                return add;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
        roleAction: async (_, { data }, context) => {
            try {
                const add = await roleAction(data);
                return add;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
    },
};

module.exports = roleResolver;