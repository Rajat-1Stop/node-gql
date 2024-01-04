const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    assignRole
} = require('@sql/core/services');
const { ModuleList, ActionTypes } = require('@sql/core/enums')
const { ApiError } = require('@sql/infrastructure/handler');
const { permission } = require('@sql/application/middleware');

const {USER} = ModuleList;
const {LIST, VIEW, INSERT, UPDATE, DELETE} = ActionTypes;

const userResolver = {
    Query: {
        user: async (_, { id }, context) => {
            try {
                const checkPermission = await permission(context.user, USER, VIEW);
                if(!checkPermission) {
                    throw ApiError.unauthorized("You're not authorized to perform this action.");
                }
                const fetchedUser = await getUser(id);
                return fetchedUser;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
        users: async (_, { data }, context) => {
            try {
                const checkPermission = await permission(context.user, USER, LIST);
                if(!checkPermission) {
                    throw ApiError.unauthorized("You're not authorized to perform this action.");
                }
                
                const allUsers = await getUsers(data);
                return allUsers;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
    },
    Mutation: {
        createUser: async (_, { data }, context) => {
            try {
                const newUser = await createUser(data);
                return newUser;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
        updateUser: async (_, { id, data }, context) => {
            try {
                const updatedUser = await updateUser(id, data);
                return updatedUser;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
        deleteUser: async (_, { id }, context) => {
            try {
                const deletedUser = await deleteUser(id);
                return deletedUser;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
        assignRole: async (_, { data }, context) => {
            try {
                const assigned = await assignRole(data);
                return assigned;
            } catch (error) {
                throw ApiError.internal(error.message);
            }
        },
    },
};

module.exports = userResolver;
