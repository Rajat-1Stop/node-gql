const { Role } = require('../models');
const { ApiError } = require('../../infrastructure/handler');

const getRoles = async (data) => {
    try {
        const {page, rowsPerPage, order, orderBy} = data;

        const sortOptions = [
            [orderBy, order]
        ];

        const paginationOptions = {
            limit: rowsPerPage,
            offset: (page - 1) * rowsPerPage
        };

        const roles = await Role.findAll({
            order: sortOptions,
            limit: paginationOptions.limit,
            offset: paginationOptions.offset,
        });
        
        return roles;
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

        return role;
    } catch (error) {
        next(ApiError.badRequest(`Role View === ${error.message}`));
        return;
    }
}

const createRole = async (data) => {
    try {
        const role = await Role.create(data);
        return role;
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
        
        const updatedRole = await roleToUpdate.update(data);
        // ok(res, 'Role updated successfully.', updatedRole);
        console.log("=== Update === ", updatedRole)
        return updatedRole;
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
        
        return roleToDelete;
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