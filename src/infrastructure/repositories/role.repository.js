const { Role } = require('../models');
const { ApiError, ok } = require('../../infrastructure/handler');

const getRoles = async (req, res, next) => {
    try {
        const roles = await Role.findAll();
        return ok(_, 'Role get successfully', roles);
    } catch (error) {
        next(ApiError.badRequest(`Role List === ${error.message}`));
        return;
    }
}

const getRole = async (req, res, next) => {
    try {
        const { id } = req.params;

        const role = await Role.findByPk(id);
        if (!role) {
            throw ApiError.internal("Role not found.");
        }

        // ok(res, 'Role fetched successfully.', role);
        return ok(_, 'Role get successfully', role);
    } catch (error) {
        next(ApiError.badRequest(`Role View === ${error.message}`));
        return;
    }
}

const createRole = async (data, next) => {
    try {
        const role = await Role.create(data);
        
        console.log("=== Service === ", role);
        return ok(_, 'Role created successfully', role);
    } catch (error) {
        console.log("=== createRole === ", error.message)
        throw ApiError.internal(error.message);
    }
}

const updateRole = async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.params;

        const roleToUpdate = await Role.findByPk(id);
        if (!roleToUpdate) {
            throw ApiError.internal("Role not found.");
        }
        
        const updatedRole = await roleToUpdate.update({id, data});
        // ok(res, 'Role updated successfully.', updatedRole);
        return ok(_, 'Role updated successfully', updatedRole);
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

const deleteRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const roleToDelete = await Role.findByPk(id);
        if (!roleToDelete) {
            throw ApiError.internal("Role not found.");
        }
        await roleToDelete.destroy();
        return ok(_, 'Role deleted successfully', roleToDelete);
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