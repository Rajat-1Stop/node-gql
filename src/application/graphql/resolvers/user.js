// const { ApiError } = require('../../../infrastructure/handler');

const userResolver = {
    Query: {
        // Resolver to fetch user details by ID (example implementation)
        user: async (_, { id }, context) => {
            // Fetch user details
            return null;
        },
    }
};

module.exports = userResolver;