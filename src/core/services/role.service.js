const { Role } = require('../models');
const { ApiError, ok } = require('../../infrastructure/handler');

const getRoles = async (req, res, next) => {
    try {
        const roles = await Role.findAll();
        return roles;
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
            next(ApiError.internal("Role not found."));
            return;
        }

        // ok(res, 'Role fetched successfully.', role);
        return role;
    } catch (error) {
        next(ApiError.badRequest(`Role View === ${error.message}`));
        return;
    }
}

const createRole = async (req, res, next) => {
    try {
        const data = req.body;
        const role = await Role.create(data);

        // ok(res, 'Role added successfully.', role);
        return role;
    } catch (error) {
        next(ApiError.badRequest(`Role Create === ${error.message}`));
        return;
    }
}

const updateRole = async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.params;

        const roleToUpdate = await Role.findByPk(id);
        if (!roleToUpdate) {
            next(ApiError.internal("Role not found."));
            return;
        }
        
        const updatedRole = await roleToUpdate.update({id, data});
        // ok(res, 'Role updated successfully.', updatedRole);
        return updatedRole;
    } catch (error) {
        next(ApiError.badRequest(`Role Update === ${error.message}`));
        return;
    }
}

const deleteRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const roleToDelete = await Role.findByPk(id);
        if (!roleToDelete) {
            next(ApiError.internal("Role not found."));
            return;
        }
        await roleToDelete.destroy();
        // ok(res, 'Role deleted successfully.', roleToDelete);
        return roleToDelete;
    } catch (error) {
        next(ApiError.badRequest(`Role Delete === ${error.message}`));
        return;
    }
}

// const RoleService = {
//     async getAllRoles() {},
//     async getRoleById(id) {},
//     async createRole(name, isActive) {},
//     async updateRole(id, updatedFields) {},
//     async deleteRole(id) {},
// }

module.exports = {
    getRole,
    getRoles,
    createRole,
    updateRole,
    deleteRole
};