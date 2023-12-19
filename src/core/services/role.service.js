const { Role } = require('../models');
const { ApiError, ok } = require('../../infrastructure/handler');

const getRoles = async () => {
    try {
        const roles = await Role.findAll();
        return ok('Role get successfully', roles);
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

const getRole = async (id) => {
    try {
        const role = await Role.findByPk(id);
        if (!role) {
            throw ApiError.internal("Role not found.");
        }

        return ok('Role get successfully', role);
    } catch (error) {
        next(ApiError.badRequest(`Role View === ${error.message}`));
        return;
    }
}

const createRole = async (data) => {
    try {
        const role = await Role.create(data);
        
        console.log("=== Service === ", role);
        return ok('Role created successfully', role);
    } catch (error) {
        console.log("=== createRole === ", error.message)
        throw ApiError.internal(error.message);
    }
}

const updateRole = async (id, data) => {
    try {
        const roleToUpdate = await Role.findByPk(id);
        if (!roleToUpdate) {
            throw ApiError.internal("Role not found.");
        }
        
        const updatedRole = await roleToUpdate.update({id, data});
        // ok(res, 'Role updated successfully.', updatedRole);
        return ok('Role updated successfully', updatedRole);
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

const deleteRole = async (id) => {
    try {
        const roleToDelete = await Role.findByPk(id);
        if (!roleToDelete) {
            throw ApiError.internal("Role not found.");
        }
        await roleToDelete.destroy();
        return ok('Role deleted successfully', roleToDelete);
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

module.exports = {
    getRole,
    getRoles,
    createRole,
    updateRole,
    deleteRole
};