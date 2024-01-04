const { ApiError } = require('@sql/infrastructure/handler');
// const { ActionTypes } = require('@sql/core/enums')
const { 
    Module, 
    ActionType, 
    UserRole, 
    RoleAction, 
    UserAction 
} = require('@sql/core/models');

// const {LIST, VIEW, INSERT, UPDATE, DELETE} = ActionTypes;

// Create auth middleware to check token from client
const permission = async (user, moduleType, actionType) => {
    try {
        const action = await ActionType.findOne({ where: { name: actionType } });
        if(!action) {
            throw ApiError.internal("There is no action found.");
        }
        const module = await Module.findOne({ where: { name: moduleType } });
        if(!module) {
            throw ApiError.internal("There is no module found.");
        }
        const userRole = await UserRole.findOne({ where: { userId: user.id } });
        if(!userRole) {
            throw ApiError.internal("There is no user type identification found.");
        }
        const roleAction = await RoleAction.findOne({ where: {
            roleId: userRole.roleId,
            moduleId: module.id,
            isActive: 1
        } });
        if(!roleAction) {
            throw ApiError.internal("You are not authorized to access this module.");
        }
        const userAction = await UserAction.findOne({ where: {
            userId: user.id,
            actionId: action.id,
            isActive: 1
        } });
        if(!userAction) {
            throw ApiError.internal("You are not authorized to access this action.");
        }
        
        return true;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
};

module.exports = {permission};