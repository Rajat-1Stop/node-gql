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
                throw ApiError.internal(error.message);
            }
        },
        roles: async (_, { data }, context) => {
            try {
                const allRoles = await getRoles(data);
                return allRoles;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
    },
    Mutation: {
        createRole: async (_, { data }, context) => {
            try {
                const newRole = await createRole(data);
                console.log("=== Create === ", newRole)
                return newRole;
            } catch (error) {
                console.log("=== Error === ", error.message)
                throw ApiError.internal(error.message);
            }
        },
        updateRole: async (_, { id, data }, context) => {
            try {
                const updatedRole = await updateRole(id, data);
                return updatedRole;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
        deleteRole: async (_, { id }, context) => {
            try {
                const deletedRole = await deleteRole(id);
                return deletedRole;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
    },
};

module.exports = roleResolver;
