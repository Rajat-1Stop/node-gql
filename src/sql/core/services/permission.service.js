const { 
    Role, 
    User, 
    Module, 
    ActionType,
    RoleAction,
    UserAction 
} = require('../models');
const { ApiError } = require('@sql/infrastructure/handler');

const roleAction = async (data) => {
    try {
        const role = await Role.findByPk(data.roleId);
        if (!role) {
            throw ApiError.internal("Role not found.");
        } 
        const module = await Module.findByPk(data.moduleId);
        if (!module) {
            throw ApiError.internal("Module not found.");
        } 
        const roleAct = await RoleAction.findOne({where: {roleId: data.roleId, moduleId: data.moduleId}});
        if (roleAct) {
            throw ApiError.internal("Already assing this module.");
        } 
        const action = await RoleAction.create(data);
        return action;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

const userAction = async (data) => {
    try {
        const actionType = await ActionType.findByPk(data.actionId);
        if (!actionType) {
            throw ApiError.internal("Action not found.");
        } 
        const user = await User.findByPk(data.userId);
        if (!user) {
            throw ApiError.internal("User not found.");
        } 
        const userAct = await UserAction.findOne({where: {actionId: data.actionId, userId: data.userId}});
        if (userAct) {
            throw ApiError.internal("Already assing this action.");
        } 
        const action = await UserAction.create(data);
        return action;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

module.exports = {
    roleAction,
    userAction
};