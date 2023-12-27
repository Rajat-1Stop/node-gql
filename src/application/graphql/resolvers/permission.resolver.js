const {
    userAction,
    roleAction
} = require('../../../core/services');
const { ApiError } = require('@sequelize/infrastructure/handler');

const roleResolver = {
    Mutation: {
        userAction: async (_, { data }, context) => {
            try {
                const add = await userAction(data);
                console.log("=== Create === ", add)
                return add;
            } catch (error) {
                console.log("=== Error === ", error.message)
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