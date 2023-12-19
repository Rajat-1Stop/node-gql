const {
    getRole,
    getRoles,
    createRole,
    updateRole,
    deleteRole
} = require('../../../core/services');
const { ApiError } = require('@sequelize/infrastructure/handler');

const roleResolver = {
    Query: {
        role: async (_, { id }, context) => {
            try {
                const fetchedRole = await getRole(id);
                return fetchedRole;
            } catch (error) {
                next(ApiError.badRequest(`Role View === ${error.message}`));
                return;
            }
        },
        roles: async () => {
            try {
                const allRoles = await getRoles();
                return allRoles;
            } catch (error) {
                next(ApiError.badRequest(`Role List === ${error.message}`));
                return;
            }
        },
    },
    Mutation: {
        createRole: async (_, { data }, context) => {
            try {
                const newRole = await createRole(data);
                return newRole;
            } catch (error) {
                // Handle errors appropriately
            }
        },
        updateRole: async (_, { id, data }, context) => {
            try {
                const updatedRole = await updateRole(id, data);
                return updatedRole;
            } catch (error) {
                // Handle errors appropriately
            }
        },
        deleteRole: async (_, { id }, context) => {
            try {
                const deletedRole = await deleteRole(id);
                return deletedRole;
            } catch (error) {
                // Handle errors appropriately
            }
        },
    },
};

module.exports = roleResolver;
